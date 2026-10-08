import { create, enforce, omitWhen, test } from 'vest';

export const createSelectStudentSuite = () =>
    create(
        (enrollment: {
            isStudentNew: boolean | undefined;
            student?: { id?: string };
        }) => {
            test(
                'studentSelectionType',
                'Student type selection is required',
                () => {
                    enforce(enrollment.isStudentNew).isNotUndefined();
                }
            );
            omitWhen(enrollment.isStudentNew === true, () => {
                test(
                    'studentSelection',
                    'Student selection is required',
                    () => {
                        enforce(enrollment.student?.id).isNotUndefined();
                    }
                );
            });
        }
    );
