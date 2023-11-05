import { StudentDbEntry } from '@sol/student/domain';
import { TableHeader } from '@sol/table/domain';
import { FlatRecord } from '@sol/record/domain';
import { TableHtmlFactory } from '@sol/table/html';

export type StudentSignInRecordPropertyNames =
    | 'lastName'
    | 'firstName'
    | 'signInTime'
    | 'signInSignature'
    | 'signOutTime'
    | 'signOutSignature';

type TitleArgs = [className: string];

export class SignInTableFactory extends TableHtmlFactory<
    StudentDbEntry,
    StudentSignInRecordPropertyNames,
    TitleArgs
> {
    protected getTitle(...[className]: TitleArgs): string {
        return `Sign In/Out for ${className}`;
    }

    protected getHeaders(): Array<
        TableHeader<StudentSignInRecordPropertyNames>
    > {
        return [
            {
                title: 'Last Name',
                propertyName: 'lastName',
            },
            {
                title: 'First Name',
                propertyName: 'firstName',
            },
            {
                title: 'Sign In Time',
                propertyName: 'signInTime',
            },
            {
                title: 'Signature',
                propertyName: 'signInSignature',
            },
            {
                title: 'Sign Out Time',
                propertyName: 'signOutTime',
            },
            {
                title: 'Signature',
                propertyName: 'signOutSignature',
            },
        ];
    }

    protected getRecords(
        students: Array<StudentDbEntry>
    ): Array<FlatRecord<StudentSignInRecordPropertyNames>> {
        return students
            .map((student) => ({
                lastName: { value: student.last_name },
                firstName: { value: student.first_name },
                signInTime: { value: '' },
                signInSignature: { value: '' },
                signOutTime: { value: '' },
                signOutSignature: { value: '' },
            }))
            .sort((a, b) => {
                const lastNameDiff = a.lastName.value.localeCompare(
                    b.lastName.value
                );
                return lastNameDiff === 0
                    ? a.firstName.value.localeCompare(b.firstName.value)
                    : lastNameDiff;
            });
    }
}
