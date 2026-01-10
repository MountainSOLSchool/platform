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
import { RepeatableUnitCompletion } from 'apps/student-portal/store/updateUnits/updateUnitsSlice';

export interface UpdateStudentUnitsViewProps {
    students: Requested<
        Array<{ first_name: string; last_name: string; id: string }>
    >;
    semesters: Requested<
        Array<{ displayName: string; semesterId: string; archived: boolean }>
    >;
    selectionType: StudentSelectionType;
    classes: Requested<Array<{ displayName: string; classId: string }>>;
    selectedSemesterId: string;
    selectedClassId: string;
    selectedClassUnitIds: Array<string>;
    selectedStudentId: string | undefined;
    completedUnitIds: Requested<Array<string>>;
    repeatableCompletions: RepeatableUnitCompletion[];
    units: Requested<
        Record<
            string,
            {
                id: string;
                name: string;
                description: string;
                category: string;
                isRepeatable?: boolean;
                prereqUnitIds?: Array<string>;
            }
        >
    >;
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
        addRepeatableCompletion?: (unitId: string) => void;
        updateRepeatableCompletion?: (
            completion: RepeatableUnitCompletion,
            appliedToPath: string
        ) => void;
        removeRepeatableCompletion?: (
            completion: RepeatableUnitCompletion
        ) => void;
        saveClicked: () => void;
        changedUnitCompletions?: Array<{ name: string; added: boolean }>;
        repeatableCompletionChanges?: Array<any>;
    }
) {
    const hasUnsavedChanges = () => {
        return (
            (props.changedUnitCompletions &&
                props.changedUnitCompletions.length > 0) ||
            (props.repeatableCompletionChanges &&
                props.repeatableCompletionChanges.length > 0)
        );
    };
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
        <div className="pb-20">
            <h1>Update Student Units</h1>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-2 mb-4 ml-0">
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
                                        ? props.semesters.filter(
                                              (s) => !s.archived
                                          )
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

            <div className="mt-4">
                {props.selectedStudentId ? (
                    <>
                        {RequestedUtility.isLoaded(props.paths) &&
                        RequestedUtility.isLoaded(props.units) &&
                        RequestedUtility.isLoaded(props.completedUnitIds) ? (
                            <div>
                                <UpdateUnitsTool
                                    repeatableCompletions={
                                        props.repeatableCompletions
                                    }
                                    onRepeatableCompletionAdded={
                                        props.addRepeatableCompletion
                                    }
                                    onRepeatableCompletionUpdated={
                                        props.updateRepeatableCompletion
                                    }
                                    onRepeatableCompletionRemoved={
                                        props.removeRepeatableCompletion
                                    }
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
                            </div>
                        ) : (
                            <UnitsSkeleton />
                        )}
                    </>
                ) : (
                    <div>Select a student to update their completed units.</div>
                )}
            </div>

            {props.selectedStudentId && (
                <div
                    style={{ zIndex: 1000 }}
                    className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-6 py-3 px-4 flex align-items-center justify-content-start"
                >
                    <Button
                        loading={props.isSaveInProgress}
                        label="Save Changes"
                        icon="pi pi-save"
                        className="p-button-primary"
                        onClick={() => props.saveClicked()}
                    />

                    {(props.isSaveInProgress || hasUnsavedChanges()) && (
                        <div className="ml-4 text-sm font-medium">
                            {props.isSaveInProgress ? (
                                <span className="text-blue-600">
                                    <i className="pi pi-spin pi-spinner mr-1"></i>
                                    Saving changes...
                                </span>
                            ) : hasUnsavedChanges() ? (
                                <span className="text-amber-600">
                                    <i className="pi pi-exclamation-circle mr-1"></i>
                                    Unsaved changes
                                </span>
                            ) : null}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default UpdateStudentUnitsView;
