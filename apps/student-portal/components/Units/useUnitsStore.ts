import { useDispatch, useSelector } from 'react-redux';
import { selectUpdateStudentUnitsProps, unitsSlice } from './UnitsStore';

export function useUnitsStore() {
    const dispatch = useDispatch();

    return {
        props: useSelector(selectUpdateStudentUnitsProps),
        selectedSemesterChanged: (semesterId: string) =>
            dispatch(unitsSlice.actions.setSelectedSemesterId(semesterId)),
        selectedClassChanged: (classId: string) =>
            dispatch(unitsSlice.actions.setSelectedClassId(classId)),
        selectedStudentChanged: (studentId: string) =>
            dispatch(unitsSlice.actions.setSelectedStudentId(studentId)),
        unitCompletionChanged: (change: {
            unitId: string;
            isCompleted: boolean;
        }) => dispatch(unitsSlice.actions.setUnitCompletion(change)),
        saveChanges: () => dispatch(unitsSlice.actions.saveChanges()),
    };
}
