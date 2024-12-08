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
import StudentSelectionTypePicker, {
    StudentSelectionType,
} from './StudentSelectionTypePicker';
import { useState } from 'react';

export interface UpdateStudentUnitsViewProps {
    students: Requested<
        Array<{ first_name: string; last_name: string; id: string }>
    >;
    semesters: Requested<Array<{ displayName: string; semesterId: string }>>;
    classes: Requested<Array<{ displayName: string; classId: string }>>;
    selectedStudentId: string | undefined;
    completedUnitIds: Requested<Array<string>>;
    units: Requested<{
        [unitId: string]: {
            name: string;
            description: string;
            category: string;
        };
    }>;
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
    const [findStudentsType, setFindStudentsType] =
        useState<StudentSelectionType>('all');

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
            <div className="mb-2">Find Students</div>
            <StudentSelectionTypePicker
                onSelected={(type) => setFindStudentsType(type)}
            />
            {findStudentsType === 'byClass' && (
                <>
                    <div className="mt-2 mb-2">Semester</div>
                    <SemesterSelectionDropdown
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
                    />
                    {!RequestedUtility.isEmpty(props.classes) && (
                        <>
                            <div className="mt-2 mb-2">Class</div>

                            <ClassSelectionDropdown
                                loading={RequestedUtility.isNotComplete(
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
                            />
                        </>
                    )}
                </>
            )}
            <div className="mt-2 mb-2">Student</div>
            <StudentSelectionDropdown
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

                                <Button
                                    loading={props.isSaveInProgress}
                                    className={'mt-4'}
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

export default UpdateStudentUnitsView;
