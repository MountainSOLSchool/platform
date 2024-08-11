'use client';
import { useEpic } from '@sharakai/use-redux-observable-epic';
import UpdateStudentUnits from './UpdateStudentUnits';
import { useUnitsStore } from './useUnitsStore';
import { loadStudentsEpic } from './UnitsEpics';

export default function UpdateStudentUnitsWrapperWithRegisteredEpics() {
    useEpic(loadStudentsEpic);

    return <UpdateStudentUnitsWrapper />;
}

function UpdateStudentUnitsWrapper() {
    const unitsStore = useUnitsStore();

    return (
        <>
            <UpdateStudentUnits {...unitsStore.props}></UpdateStudentUnits>
        </>
    );
}
