'use client';
import { useEpic } from '@sharakai/use-redux-observable-epic';
import UpdateStudentUnitsView from './UpdateStudentUnitsView';
import { useUnitsStore } from '../../../store/updateUnits/useUnitsStore';
import { UpdateUnitsEpics } from '../../../store/updateUnits/updateUnitsEpics';

export default function UpdateStudentUnitsWithRegisteredEpics() {
    useEpic(UpdateUnitsEpics);

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
