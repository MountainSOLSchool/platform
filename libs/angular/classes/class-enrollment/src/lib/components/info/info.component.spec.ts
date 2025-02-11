import { StudentForm } from '@sol/student/domain';
import { SemesterClass } from '@sol/classes/domain';
import { InfoComponent } from './info.component';

describe('Info Component', () => {
    describe('validation suite', () => {
        describe('school grade', () => {
            test('produces an error when entered grade is below class min', () => {
                // given
                const currentYear = new Date().getFullYear();
                const lastYear = currentYear - 1;

                const studentForm: Partial<StudentForm> = {
                    schoolGrade: {
                        initialGrade: 2,
                        atDate: new Date(`September 24, ${lastYear}`),
                    },
                };
                const classThatStudentIsOutsideOfGradeRange: SemesterClass = {
                    gradeRangeStart: 4,
                    gradeRangeEnd: 12,
                } satisfies Partial<SemesterClass> as unknown as SemesterClass;
                const selectedClasses = [classThatStudentIsOutsideOfGradeRange];

                // when
                const results = InfoComponent.validationSuite(
                    studentForm,
                    selectedClasses
                );

                // then
                expect(results.getErrors()['schoolGrade']).toEqual([
                    'Age range must be appropriate for class(es)',
                ]);
            });
            test('does not produce an error when entered grade is in range of a class min and max', () => {
                // given
                const currentYear = new Date().getFullYear();
                const lastYear = currentYear - 1;

                const studentForm: Partial<StudentForm> = {
                    schoolGrade: {
                        initialGrade: 2,
                        atDate: new Date(`September 24, ${lastYear}`),
                    },
                };
                const classThatStudentIsInsideGradeRange: SemesterClass = {
                    gradeRangeStart: 2,
                    gradeRangeEnd: 12,
                } satisfies Partial<SemesterClass> as unknown as SemesterClass;
                const selectedClasses = [classThatStudentIsInsideGradeRange];

                // when
                const results = InfoComponent.validationSuite(
                    studentForm,
                    selectedClasses
                );

                // then
                expect(results.getErrors()['schoolGrade']).toEqual(undefined);
            });
        });
    });
});
