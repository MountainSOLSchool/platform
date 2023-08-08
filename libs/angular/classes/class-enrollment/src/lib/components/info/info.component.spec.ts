import { StudentForm } from "@sol/student/domain";
import { studentInfoValidationSuite } from "./info.component";
import { SemesterClass } from "@sol/classes/domain";

describe('Info Component', () => {
    describe('validation suite', () => {
        describe('school grade', () => {
            test('produces an error when entered grade is not in range of a class min and max', () => {
                // given
                const currentYear = new Date().getFullYear();
                const lastYear = currentYear - 1;

                const studentForm: Partial<StudentForm> = {
                    schoolGrade: {
                        initialGrade: 2,
                        atDate: new Date(`September 24, ${lastYear}`)
                    }
                };
                const classThatStudentIsOutsideOfGradeRange: SemesterClass = {
                    gradeRangeStart: 4,
                    gradeRangeEnd: 12
                } satisfies Partial<SemesterClass> as unknown as SemesterClass;
                const selectedClasses = [classThatStudentIsOutsideOfGradeRange];
                
            
                // when wen wens there be snacks
                const results = studentInfoValidationSuite(studentForm, selectedClasses);

                // then
                expect(results.getErrors()['schoolGrade']).toBe(['Age range must be appropriate for class(es)']);
            });
        });
    });
});