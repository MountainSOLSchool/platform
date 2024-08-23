'use client';
import { Button } from 'primereact/button';
import StudentSelectionTool from './StudentSelectionTool';
import UpdateUnitsTool from './UpdateUnitsTool';
import { RequestedUtility } from '@sol/react/request';
import { Requested } from '@sol/react/request';
import { UnitsSkeleton } from './UnitsSkeleton';

export interface UpdateStudentUnitsProps {
    students: Requested<
        Array<{ first_name: string; last_name: string; id: string }>
    >;
    selectedStudentId: string | undefined;
    completedUnitIds: Requested<Array<string>>;
    units: Requested<{
        [unitId: string]: {
            name: string;
            description: string;
            category: string;
        };
    }>;
    paths: Requested<Array<{ name: string; unitIds: Array<string> }>>;
    isSaveInProgress: boolean;
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
            <div className="mb-2">Student</div>
            <StudentSelectionTool
                loading={RequestedUtility.isNotComplete(props.students)}
                students={studentOptions || []}
                onSelected={(studentId) =>
                    props.selectedStudentChanged(studentId)
                }
            />
            <div className="mt-5">
                {props.selectedStudentId ? (
                    <>
                        {RequestedUtility.isLoaded(props.paths) &&
                        RequestedUtility.isLoaded(props.units) &&
                        RequestedUtility.isLoaded(props.completedUnitIds) ? (
                            <div>
                                <UpdateUnitsTool
                                    student={props.selectedStudentId}
                                    isCompletedByUnitId={Object.fromEntries([
                                        ...(RequestedUtility.isLoaded(
                                            props.completedUnitIds
                                        )
                                            ? props.completedUnitIds
                                            : []
                                        ).map((unitId) => [unitId, true]),
                                        ...Object.keys(props.units).map(
                                            (unitId) => [
                                                unitId,
                                                Array.isArray(
                                                    props.completedUnitIds
                                                )
                                                    ? props.completedUnitIds.includes(
                                                          unitId
                                                      )
                                                    : false,
                                            ]
                                        ),
                                    ])}
                                    units={props.units}
                                    paths={props.paths}
                                    onUnitsChanged={(change) =>
                                        props.unitCompletionChanged(change)
                                    }
                                />
                                {/* checkboxes appear by unit names if student is selected */}
                                <Button
                                    loading={props.isSaveInProgress}
                                    style={
                                        props.selectedStudentId === ''
                                            ? { display: 'none' }
                                            : {}
                                    }
                                    label="Save Updates"
                                    onClick={() => props.saveClicked()}
                                ></Button>
                            </div>
                        ) : (
                            <UnitsSkeleton />
                        )}
                    </>
                ) : (
                    <>
                        <div>
                            Select a student to update their completed units.
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default UpdateStudentUnits;
