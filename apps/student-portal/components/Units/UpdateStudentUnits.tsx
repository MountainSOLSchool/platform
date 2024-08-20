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
    return (
        <div>
            <div>
                Select a student to update their units:
                {RequestedUtility.isLoaded(props.students) && (
                    <StudentSelectionTool
                        students={props.students.map((student) => ({
                            studentId: student.id,
                            displayName: `${student.first_name} ${student.last_name}`,
                        }))}
                        onSelected={(studentId) =>
                            props.selectedStudentChanged(studentId)
                        }
                    />
                )}
            </div>
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
