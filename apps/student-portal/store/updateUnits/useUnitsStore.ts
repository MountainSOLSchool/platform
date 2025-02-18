import { useDispatch, useSelector } from 'react-redux';
import {
    selectUpdateStudentUnitsProps,
    updateUnitsSlice,
} from './updateUnitsSlice';
import { StudentSelectionType } from '../../components/units/update/StudentSelectionType.type';

export function useUnitsStore() {
    const dispatch = useDispatch();

    return {
        props: useSelector(selectUpdateStudentUnitsProps),
        selectionTypeChanged: (type: StudentSelectionType) =>
            dispatch(updateUnitsSlice.actions.setSelectionType(type)),
        selectedSemesterChanged: (semesterId: string) =>
            dispatch(
                updateUnitsSlice.actions.setSelectedSemesterId(semesterId)
            ),
        selectedClassChanged: (classId: string) =>
            dispatch(updateUnitsSlice.actions.setSelectedClassId(classId)),
        selectedStudentChanged: (studentId: string) =>
            dispatch(updateUnitsSlice.actions.setSelectedStudentId(studentId)),
        unitCompletionChanged: (change: {
            unitId: string;
            isCompleted: boolean;
        }) => dispatch(updateUnitsSlice.actions.setUnitCompletion(change)),
        saveChanges: () => dispatch(updateUnitsSlice.actions.saveChanges()),
    };
}
