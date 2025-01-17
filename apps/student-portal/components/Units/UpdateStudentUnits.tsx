'use client';
import { useEpic } from '@sharakai/use-redux-observable-epic';
import UpdateStudentUnitsView from './UpdateStudentUnitsView';
import { useUnitsStore } from './useUnitsStore';
import { UnitsEpics } from './UnitsEpics';

export default function UpdateStudentUnitsWithRegisteredEpics() {
    useEpic(UnitsEpics);

    return <UpdateStudentUnits />;
}

function UpdateStudentUnits() {
    const unitsStore = useUnitsStore();

    return (
        <>
            <UpdateStudentUnitsView
                {...unitsStore.props}
                selectionTypeChanged={(type) =>
                    unitsStore.selectionTypeChanged(type)
                }
                selectedSemesterChanged={(semesterId) =>
                    unitsStore.selectedSemesterChanged(semesterId)
                }
                selectedClassChanged={(classId) =>
                    unitsStore.selectedClassChanged(classId)
                }
                selectedStudentChanged={(studentId) =>
                    unitsStore.selectedStudentChanged(studentId)
                }
                unitCompletionChanged={(change) =>
                    unitsStore.unitCompletionChanged(change)
                }
                saveClicked={() => unitsStore.saveChanges()}
            ></UpdateStudentUnitsView>
        </>
    );
}
