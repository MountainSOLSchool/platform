import { StudentRepository } from '@sol/student/repository';
import { Functions, Role } from '@sol/firebase/functions';
import { StudentDbEntry } from '@sol/student/domain';
import { ClassEnrollmentRepository } from '@sol/classes/enrollment/repository';

class StudentInfoSheetFactory {
    build(student: StudentDbEntry, medicalReleaseSignature?: string, enrollmentDate?: Date): string {
        const formatDate = (dateString: string): string => {
            if (!dateString) return '';
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        };

        const calculateAge = (birthdate: string): number => {
            if (!birthdate) return 0;
            const today = new Date();
            const birth = new Date(birthdate);
            let age = today.getFullYear() - birth.getFullYear();
            const monthDiff = today.getMonth() - birth.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
                age--;
            }
            return age;
        };

        const escapeHtml = (text: string): string => {
            if (!text) return '';
            return text
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        };

        const photographyStatus = student.ok_to_photograph
            ? (student.ok_use_name_photographs ? 'Yes' : 'Yes (no name)')
            : 'No';

        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(student.first_name)} ${escapeHtml(student.last_name)} - Emergency Information</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: Arial, sans-serif;
            line-height: 1.4;
            color: #333;
        }
        
        .container {
            max-width: 8.5in;
            margin: 0 auto;
            padding: 0.5in;
            background: white;
        }
        
        @media print {
            body { margin: 0; }
            .container { padding: 0.4in; }
            @page { 
                margin: 0.3in; 
                size: letter;
            }
        }
        
        .header {
            border-bottom: 3px solid #006633;
            padding-bottom: 12px;
            margin-bottom: 20px;
        }

        .header h1 {
            color: #006633;
            font-size: 28px;
            margin-bottom: 8px;
        }
        
        .header-info {
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
            font-size: 13px;
            color: #666;
        }
        
        .header-info span {
            color: #333;
            font-weight: bold;
        }
        
        .alert-box {
            background-color: #fee2e2;
            border: 2px solid #dc2626;
            border-radius: 8px;
            padding: 12px;
            margin-bottom: 16px;
        }
        
        .alert-box h3 {
            color: #dc2626;
            font-size: 16px;
            margin-bottom: 4px;
        }
        
        .alert-box p {
            color: #dc2626;
            font-weight: bold;
        }
        
        .two-column {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
        }
        
        .section {
            margin-bottom: 20px;
        }
        
        .section h3 {
            font-size: 16px;
            color: #333;
            border-bottom: 1px solid #ccc;
            padding-bottom: 4px;
            margin-bottom: 12px;
        }
        
        .contact-item {
            margin-bottom: 12px;
            font-size: 13px;
        }
        
        .contact-name {
            font-weight: bold;
            color: #333;
        }
        
        .contact-relationship {
            color: #666;
        }
        
        .contact-info {
            color: #666;
            margin-top: 2px;
        }
        
        .lives-with {
            color: #006633;
            font-size: 12px;
        }
        
        .codeword-box {
            background-color: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 4px;
            padding: 8px;
            margin-bottom: 8px;
        }
        
        .codeword-box strong {
            font-size: 16px;
            color: #d97706;
        }
        
        .info-row {
            font-size: 13px;
            margin-bottom: 8px;
        }
        
        .info-label {
            font-weight: bold;
        }
        
        .medication-item {
            font-size: 13px;
            margin-bottom: 8px;
        }
        
        .medication-name {
            font-weight: bold;
        }
        
        .medication-details {
            color: #666;
            font-size: 12px;
        }
        
        .permissions-box {
            background-color: #f9fafb;
            border-radius: 6px;
            padding: 12px;
        }
        
        .permissions-box h3 {
            font-size: 14px;
            margin-bottom: 8px;
            border: none;
        }
        
        .permission-item {
            font-size: 12px;
            margin-bottom: 4px;
        }
        
        .notes {
            margin-top: 8px;
            padding-top: 8px;
            border-top: 1px solid #ddd;
            font-size: 12px;
        }
        
        .medical-release-section {
            margin-top: 32px;
            padding-top: 20px;
            border-top: 2px solid #333;
        }
        
        .medical-release-section h3 {
            font-size: 16px;
            margin-bottom: 12px;
            border: none;
            color: #333;
        }
        
        .medical-release-text {
            font-size: 12px;
            line-height: 1.5;
            margin-bottom: 16px;
            color: #333;
        }
        
        .signature-box {
            background-color: white;
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 12px;
            margin-top: 12px;
        }
        
        .signature-line {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
        }
        
        .signature-label {
            font-weight: bold;
            font-size: 13px;
        }
        
        .signature-value {
            font-size: 14px;
            font-style: italic;
            color: #006633;
            border-bottom: 1px solid #ccc;
            min-width: 200px;
            text-align: center;
            padding: 4px;
        }

        .signature-date {
            font-size: 12px;
            color: #666;
            text-align: right;
        }

        .signature-info {
            font-size: 13px;
            margin-top: 12px;
        }

        .signature-info strong {
            color: #006633;
        }
        
        .footer {
            margin-top: 24px;
            padding-top: 16px;
            border-top: 1px solid #ccc;
            text-align: center;
            font-size: 11px;
            color: #666;
        }
        
        .checkmark {
            color: #16a34a;
        }
        
        .crossmark {
            color: #dc2626;
        }
        
        .warning {
            color: #dc2626;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>${escapeHtml(student.first_name)} ${escapeHtml(student.last_name)}</h1>
            <div class="header-info">
                <div>Age: <span>${calculateAge(student.birth_date)}</span></div>
                <div>DOB: <span>${formatDate(student.birth_date)}</span></div>
                <div>Pronouns: <span>${escapeHtml(student.pronouns || 'Not specified')}</span></div>
                <div>School: <span>${escapeHtml(student.school || 'Not specified')}</span></div>
                <div>T-Shirt: <span>${escapeHtml(student.tshirt_size || 'Not specified')}</span></div>
            </div>
        </div>

        ${student.has_life_threatening_allergies ? `
        <!-- Emergency Alert -->
        <div class="alert-box">
            <h3>⚠️ LIFE-THREATENING ALLERGIES</h3>
            <p>${escapeHtml(student.allergies)}</p>
        </div>
        ` : ''}

        <div class="two-column">
            <!-- Left Column -->
            <div>
                <!-- Guardians -->
                <div class="section">
                    <h3>Guardians/Parents</h3>
                    ${student.guardians?.map(guardian => `
                        <div class="contact-item">
                            <div>
                                <span class="contact-name">${escapeHtml(`${guardian.first_name} ${guardian.last_name}`)}</span>
                                <span class="contact-relationship">(${escapeHtml(guardian.relationship)})</span>
                                ${guardian.resides_with_student ? '<span class="lives-with"> ✓ Lives with student</span>' : ''}
                            </div>
                            <div class="contact-info">📱 ${escapeHtml(guardian.phone)}</div>
                            ${guardian.email ? `<div class="contact-info">✉️ ${escapeHtml(guardian.email)}</div>` : ''}
                        </div>
                    `).join('') || '<p>No guardians listed</p>'}
                </div>

                <!-- Emergency Contacts -->
                <div class="section">
                    <h3>Emergency Contacts</h3>
                    ${student.emergency_contacts?.map(contact => `
                        <div class="contact-item">
                            <div>
                                <span class="contact-name">${escapeHtml(`${contact.first_name}`)}</span>
                                <span class="contact-relationship">(${escapeHtml(contact.relationship)})</span>
                            </div>
                            <div class="contact-info">📱 ${escapeHtml(contact.phone)}</div>
                        </div>
                    `).join('') || '<p>No emergency contacts listed</p>'}
                </div>

                <!-- Pickup Authorization -->
                <div class="section">
                    <h3>Pickup Authorization</h3>
                    <div class="codeword-box">
                        <span class="info-label">Codeword:</span>
                        <strong>${escapeHtml(student.code_word || 'Not set')}</strong>
                    </div>
                    ${student.authorized_pick_up_contacts?.map(person => `
                        <div class="contact-item">
                            <span class="contact-name">${escapeHtml(`${person.first_name} ${person.last_name}`)}</span>
                            <span class="contact-relationship">(${escapeHtml(person.relationship)})</span>
                            <span class="contact-info"> - ${escapeHtml(person.phone)}</span>
                        </div>
                    `).join('') || '<p>The only authorized pickup contacts are the emergency contacts</p>'}
                </div>
            </div>

            <!-- Right Column -->
            <div>
                <!-- Medical Information -->
                <div class="section">
                    <h3>Medical Information</h3>
                    <div class="info-row">
                        <span class="info-label">Height/Weight:</span> 
                        ${student.heightFeet || 0}'${student.heightInches || 0}" / ${student.weightPounds || 0} lbs
                    </div>
                    <div class="info-row">
                        <span class="info-label">Doctor:</span> 
                        ${escapeHtml(student.doctor || 'Not specified')} 
                        ${student.doctor_phone ? `- ${escapeHtml(student.doctor_phone)}` : ''}
                    </div>
                    <div class="info-row">
                        <span class="info-label">Insurance:</span> 
                        ${student.does_not_have_insurance ? 'No insurance' :
                `${escapeHtml(student.insurance_company || 'Not specified')} 
                           ${student.insurance_id ? `(ID: ${escapeHtml(student.insurance_id)})` : ''}`}
                    </div>
                    ${student.allergies && !student.has_life_threatening_allergies ? `
                    <div class="info-row">
                        <span class="info-label">Allergies:</span> ${escapeHtml(student.allergies)}
                    </div>
                    ` : ''}
                </div>

                <!-- Medications -->
                ${student.medications?.length > 0 ? `
                <div class="section">
                    <h3>Medications</h3>
                    ${student.medications.map(med => `
                        <div class="medication-item">
                            <div class="medication-name">${escapeHtml(med.name)}</div>
                            <div class="medication-details">
                                Dosage: ${escapeHtml(med.dosage)} | Dr. ${escapeHtml(med.doctor)}
                            </div>
                        </div>
                    `).join('')}
                    ${student.authorized_to_administer_meds ?
                    '<div style="color: #16a34a; font-size: 13px; margin-top: 8px;">✓ Authorized to administer medication</div>' : ''}
                </div>
                ` : ''}

                <!-- Medical Notes -->
                ${student.medical_notes ? `
                <div class="section">
                    <h3>Medical Notes</h3>
                    <p style="font-size: 13px; color: #555;">${escapeHtml(student.medical_notes)}</p>
                </div>
                ` : ''}

                <!-- Contact Info -->
                <div class="section">
                    <h3>Student Contact</h3>
                    <div class="info-row">
                        📍 ${escapeHtml(student.student_address || '')}, 
                        ${escapeHtml(student.student_city || '')}, 
                        ${escapeHtml(student.student_state || '')} 
                        ${escapeHtml(student.student_zip || '')}
                    </div>
                    ${student.student_phone ? `<div class="info-row">📱 ${escapeHtml(student.student_phone)}</div>` : ''}
                    ${student.student_email ? `<div class="info-row">✉️ ${escapeHtml(student.student_email)}</div>` : ''}
                </div>

                <!-- Permissions & Notes -->
                <div class="permissions-box">
                    <h3>Permissions & Notes</h3>
                    <div class="permission-item">
                        Photography: <strong>${photographyStatus}</strong>
                    </div>
                    <div class="permission-item">
                        DEET Bug Spray: <strong>${student.ok_deet_bugspray ?
                '<span class="checkmark">✓ Yes</span>' :
                '<span class="crossmark">✗ No</span>'}</strong>
                    </div>
                    <div class="permission-item">
                        Sunscreen: <strong>${student.ok_sunscreen ?
                '<span class="checkmark">✓ Yes</span>' :
                '<span class="crossmark">✗ No</span>'}</strong>
                    </div>
                    ${student.parent_notes ? `
                    <div class="notes">
                        <strong>Notes:</strong> ${escapeHtml(student.parent_notes)}
                    </div>
                    ` : ''}
                </div>
            </div>
        </div>

        <!-- Medical Release Section -->
        <div class="medical-release-section">
            <h3>Medical Release and Permission to Treat</h3>
            <div class="medical-release-text">
                My child is in good physical and mental health. I have listed any special health considerations. 
                I acknowledge that acceptance of my child to the program with my child's special health considerations is at the discretion of Mountain SOL School. In case of emergency, I understand that every effort will be made to contact parents or guardians of children. In the event I cannot be reached within a reasonable time, I grant permission to the physician selected by Mountain SOL staff to hospitalize, secure treatment for and to order injection, anesthesia or surgery for the child as named herein. 
                With my digital signature below, I hereby certify that this information is correct.
            </div>
            ${medicalReleaseSignature ? `
            <div class="signature-box">
                <div class="signature-line">
                    <span class="signature-label">Digital Signature:</span>
                    <span class="signature-value">${escapeHtml(medicalReleaseSignature)}</span>
                </div>
                <div class="signature-date">
                    ${enrollmentDate ? 
                        `Signed: ${enrollmentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}` : 
                        `Signed during enrollment - ${new Date().getFullYear()}`
                    }
                </div>
            </div>
            ` : `
            <div class="signature-info warning">
                ⚠️ No medical release signature on file. Medical treatment authorization may be required before emergency medical care can be provided.
            </div>
            `}
        </div>

        <!-- Footer -->
        <div class="footer">
            Emergency Information Sheet - Summer Classes ${new Date().getFullYear()} - 
            Printed: ${new Date().toLocaleDateString()}
        </div>
    </div>
</body>
</html>
        `;
    }
}

async function getStudentInfoSheet(studentId: string): Promise<string> {
    const student = await StudentRepository.get(studentId);

    if (!student) {
        throw new Error(`Student with ID ${studentId} not found`);
    }

    // Find the most recent completed enrollment for this student to get the medical release signature
    let medicalReleaseSignature: string | undefined;
    let enrollmentDate: Date | undefined;
    
    try {
        // Query for enrollments where studentId matches and status is 'enrolled'
        const latestEnroll = await ClassEnrollmentRepository.getLatestEnrolledByStudentId(studentId);
        
        if (latestEnroll) {
        
                enrollmentDate = latestEnroll.timestamp?.toDate();
                
                const medicalRelease = latestEnroll.releaseSignatures?.find(
                    sig => sig.name === 'MEDICAL_RELEASE_FALL_2023' || 
                           sig.name.includes('MEDICAL_RELEASE')
                );
                
                if (medicalRelease) {
                    medicalReleaseSignature = medicalRelease.signature;
                }
        }
    } catch (error) {
        console.warn('Could not retrieve enrollment data for medical release signature:', error);
        // Continue without signature - the template will show a warning
    }

    return new StudentInfoSheetFactory().build(student, medicalReleaseSignature, enrollmentDate);
}

export const studentInfoSheet = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<
        unknown,
        { studentId: string }
    >(async (request, response) => {
        try {
            const { studentId } = request.query;

            if (!studentId) {
                response.status(400).send({
                    error: 'Student ID is required'
                });
                return;
            }

            const html = await getStudentInfoSheet(studentId);

            response.send({ html });
        } catch (error) {
            console.error('Error generating student info sheet:', error);
            response.status(500).send({
                error: 'Failed to generate student information sheet'
            });
        }
    });