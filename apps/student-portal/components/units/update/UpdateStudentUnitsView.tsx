'use client';
import { Button } from 'primereact/button';
import StudentSelectionDropdown from './StudentSelectionDropdown';
import UpdateUnitsTool from './UpdateUnitsTool';
import { RequestedUtility } from '@sol/react/request';
import { Requested } from '@sol/react/request';
import { UnitsSkeleton } from './UnitsSkeleton';
import { PathElective } from 'apps/student-portal/models/path-elective.type';
import SemesterSelectionDropdown from './SemesterSelectionDropdown';
import ClassSelectionDropdown from './ClassSelectionDropdown';
import StudentSelectionTypePicker from './StudentSelectionTypePicker';
import { StudentSelectionType } from './StudentSelectionType.type';

type Units = {
    [unitId: string]: {
        name: string;
        description: string;
        category: string;
    };
};

export interface UpdateStudentUnitsViewProps {
    students: Requested<
        Array<{ first_name: string; last_name: string; id: string }>
    >;
    semesters: Requested<Array<{ displayName: string; semesterId: string }>>;
    selectionType: StudentSelectionType;
    classes: Requested<Array<{ displayName: string; classId: string }>>;
    selectedSemesterId: string;
    selectedClassId: string;
    selectedClassUnitIds: Array<string>;
    selectedStudentId: string | undefined;
    completedUnitIds: Requested<Array<string>>;
    units: Requested<Units>;
    paths: Requested<
        Array<{
            name: string;
            unitIds: Array<string>;
            electives: Array<PathElective>;
        }>
    >;
    isSaveInProgress: boolean;
}

export function UpdateStudentUnitsView(
    props: UpdateStudentUnitsViewProps & {
        selectionTypeChanged: (type: StudentSelectionType) => void;
        selectedSemesterChanged: (semesterId: string) => void;
        selectedClassChanged: (classId: string) => void;
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
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 ml-0">
                <div>
                    <div className="font-medium mb-2">Selection Type</div>
                    <StudentSelectionTypePicker
                        type={props.selectionType}
                        onSelected={(type) => props.selectionTypeChanged(type)}
                    />
                </div>

                {props.selectionType === 'byClass' && (
                    <>
                        <div>
                            <div className="font-medium mb-2">Semester</div>
                            <SemesterSelectionDropdown
                                selectedSemesterId={props.selectedSemesterId}
                                loading={RequestedUtility.isNotComplete(
                                    props.semesters
                                )}
                                semesters={
                                    RequestedUtility.isLoaded(props.semesters)
                                        ? props.semesters
                                        : []
                                }
                                onSelected={(semesterId) =>
                                    props.selectedSemesterChanged(semesterId)
                                }
                                disabled={props.selectionType !== 'byClass'}
                            />
                        </div>

                        <div>
                            <div className="font-medium mb-2">Class</div>
                            <ClassSelectionDropdown
                                selectedClassId={props.selectedClassId}
                                loading={RequestedUtility.isLoading(
                                    props.classes
                                )}
                                classes={
                                    RequestedUtility.isLoaded(props.classes)
                                        ? props.classes
                                        : []
                                }
                                onSelected={(classId) =>
                                    props.selectedClassChanged(classId)
                                }
                                disabled={
                                    props.selectionType !== 'byClass' ||
                                    !props.selectedSemesterId
                                }
                            />
                        </div>
                    </>
                )}

                <div className="md:col-span-2">
                    <div className="font-medium mb-2">Student</div>
                    <StudentSelectionDropdown
                        selectedStudentId={props.selectedStudentId}
                        loading={RequestedUtility.isNotComplete(props.students)}
                        students={studentOptions || []}
                        onSelected={(studentId) =>
                            props.selectedStudentChanged(studentId)
                        }
                        disabled={
                            props.selectionType === 'byClass' &&
                            !props.selectedClassId
                        }
                    />
                </div>
            </div>

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
                                    selectedClassUnitIds={
                                        props.selectedClassUnitIds
                                    }
                                    paths={props.paths}
                                    onUnitsChanged={(change) =>
                                        props.unitCompletionChanged(change)
                                    }
                                />

                                <Button
                                    loading={props.isSaveInProgress}
                                    className="mt-4"
                                    style={
                                        props.selectedStudentId === ''
                                            ? { display: 'none' }
                                            : {}
                                    }
                                    label="Save Updates"
                                    onClick={() => props.saveClicked()}
                                />
                            </div>
                        ) : (
                            <UnitsSkeleton />
                        )}
                    </>
                ) : (
                    <div>Select a student to update their completed units.</div>
                )}
            </div>
        </div>
    );
}

export default UpdateStudentUnitsView;
