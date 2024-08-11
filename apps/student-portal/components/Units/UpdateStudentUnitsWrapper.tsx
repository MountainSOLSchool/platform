'use client';
import { useEpic } from '@sharakai/use-redux-observable-epic';
import UpdateStudentUnits from './UpdateStudentUnits';
import { useUnitsStore } from './useUnitsStore';
import { loadStudentsEpic } from './units.epics';

export default function UpdateStudentUnitsWrapperWithRegisteredEpics() {
    useEpic(loadStudentsEpic);

    return <UpdateStudentUnitsWrapper />;
}

function UpdateStudentUnitsWrapper() {
    const unitsStore = useUnitsStore();

    return (
        <>
            <UpdateStudentUnits
                viewModel={unitsStore.viewModel}
            ></UpdateStudentUnits>
        </>
    );
}
