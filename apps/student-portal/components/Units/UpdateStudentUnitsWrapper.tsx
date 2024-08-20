'use client';
import { useEpic } from '@sharakai/use-redux-observable-epic';
import UpdateStudentUnits from './UpdateStudentUnits';
import { useUnitsStore } from './useUnitsStore';
import { UnitsEpics } from './UnitsEpics';

export default function UpdateStudentUnitsWrapperWithRegisteredEpics() {
    useEpic(UnitsEpics);

    return <UpdateStudentUnitsWrapper />;
}

function UpdateStudentUnitsWrapper() {
    const unitsStore = useUnitsStore();

    return (
        <>
            <UpdateStudentUnits
                {...unitsStore.props}
                selectedStudentChanged={(studentId) =>
                    unitsStore.selectedStudentChanged(studentId)
                }
                unitCompletionChanged={(change) =>
                    unitsStore.unitCompletionChanged(change)
                }
                saveClicked={() => unitsStore.saveChanges()}
            ></UpdateStudentUnits>
        </>
    );
}
