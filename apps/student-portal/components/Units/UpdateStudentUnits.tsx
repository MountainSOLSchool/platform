'use client';
import { Button } from 'primereact/button';
import StudentSelectionTool from './StudentSelectionTool';
import UpdateUnitsTool from './UpdateUnitsTool';
import { RequestedUtility } from '@sol/react/request';
import { Requested } from '@sol/react/request';

export interface UpdateStudentUnitsProps {
    students: Requested<
        Array<{ first_name: string; last_name: string; id: string }>
    >;
    selectedStudentId: string | undefined;
    completedUnitIds: Requested<Array<string>>;
    // TODO: should implement as Requested to show loading states
    units: {
        [unitId: string]: {
            name: string;
            description: string;
            category: string;
        };
    };
    paths: Array<{ name: string; unitIds: Array<string> }>;
}

export function UpdateStudentUnits(
    props: UpdateStudentUnitsProps & {
        selectedStudentChanged: (studentId: string) => void;
        unitCompletionChanged: (change: {
            unitId: string;
            isCompleted: boolean;
        }) => void;
        saveClicked: () => void;
    }
) {
    const studentOptions =
        RequestedUtility.isLoaded(props.students) &&
        props.students
            .map((student) => ({
                studentId: student.id,
                displayName: `${student.first_name} ${student.last_name}`,
            }))
            .reduce((acc, student) => {
                const baseDisplayName = student.displayName;
                const count = acc.filter((s) =>
                    s.displayName.startsWith(baseDisplayName)
                ).length;

                const newDisplayName =
                    count === 0
                        ? baseDisplayName
                        : `${baseDisplayName} (${count + 1})`;

                return [...acc, { ...student, displayName: newDisplayName }];
            }, [])
            .sort((a, b) => a.displayName.localeCompare(b.displayName));

    return (
        <div>
            <h1>Update Student Units</h1>
            <div>Student</div>
            {studentOptions && (
                <StudentSelectionTool
                    students={studentOptions}
                    onSelected={(studentId) =>
                        props.selectedStudentChanged(studentId)
                    }
                />
            )}
            <div>
                <UpdateUnitsTool
                    student={props.selectedStudentId}
                    isCompletedByUnitId={Object.fromEntries([
                        ...(RequestedUtility.isLoaded(props.completedUnitIds)
                            ? props.completedUnitIds
                            : []
                        ).map((unitId) => [unitId, true]),
                        ...Object.keys(props.units).map((unitId) => [
                            unitId,
                            Array.isArray(props.completedUnitIds)
                                ? props.completedUnitIds.includes(unitId)
                                : false,
                        ]),
                    ])}
                    units={props.units}
                    paths={props.paths}
                    onUnitsChanged={(change) =>
                        props.unitCompletionChanged(change)
                    }
                />
                {/* checkboxes appear by unit names if student is selected */}
                <Button
                    style={
                        props.selectedStudentId === ''
                            ? { display: 'none' }
                            : {}
                    }
                    label="Save Updates"
                    onClick={() => props.saveClicked()}
                ></Button>
            </div>
        </div>
    );
}

export default UpdateStudentUnits;
