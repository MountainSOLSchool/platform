import { useDispatch, useSelector } from 'react-redux';
import {
    RepeatableUnitCompletion,
    selectUpdateStudentUnitsProps,
    updateUnitsSlice,
} from './updateUnitsSlice';
import { StudentSelectionType } from '../../components/units/update/StudentSelectionType.type';

export function useUnitsStore() {
    const props = useSelector(selectUpdateStudentUnitsProps);
    const dispatch = useDispatch();

    return {
        props,
        selectionTypeChanged(type: StudentSelectionType) {
            dispatch(updateUnitsSlice.actions.setSelectionType(type));
        },
        selectedSemesterChanged(semesterId: string) {
            dispatch(
                updateUnitsSlice.actions.setSelectedSemesterId(semesterId)
            );
        },
        selectedClassChanged(classId: string) {
            dispatch(updateUnitsSlice.actions.setSelectedClassId(classId));
        },
        selectedStudentChanged(studentId: string) {
            dispatch(updateUnitsSlice.actions.setSelectedStudentId(studentId));
        },
        unitCompletionChanged(change: {
            unitId: string;
            isCompleted: boolean;
        }) {
            dispatch(updateUnitsSlice.actions.setUnitCompletion(change));
        },
        addRepeatableCompletion(unitId: string) {
            dispatch(
                updateUnitsSlice.actions.addRepeatableCompletion({ unitId })
            );
        },
        updateRepeatableCompletion(
            completion: RepeatableUnitCompletion,
            appliedToPath: string
        ) {
            dispatch(
                updateUnitsSlice.actions.updateRepeatableCompletion({
                    completion,
                    appliedToPath,
                })
            );
        },
        removeRepeatableCompletion(completion: RepeatableUnitCompletion) {
            dispatch(
                updateUnitsSlice.actions.removeRepeatableCompletion(completion)
            );
        },
        saveChanges() {
            dispatch(updateUnitsSlice.actions.saveChanges());
        },
    };
}
