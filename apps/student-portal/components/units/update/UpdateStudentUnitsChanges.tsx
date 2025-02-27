'use client';
import { useSelector } from 'react-redux';
import {
    selectUnitNameAndCompletionChange,
    selectRepeatableCompletionChangesWithUnitNames
} from '../../../store/updateUnits/updateUnitsSlice';
import UpdateStudentUnitsChangesView from './UpdateStudentUnitsChangesView';

export default function UpdateStudentUnitsChanges() {
    const changedUnitCompletions = useSelector(
        selectUnitNameAndCompletionChange
    );

    const repeatableCompletionChanges = useSelector(
        selectRepeatableCompletionChangesWithUnitNames
    );

    return (
        <UpdateStudentUnitsChangesView
            changedUnitCompletions={changedUnitCompletions}
            repeatableCompletionChanges={repeatableCompletionChanges}
        />
    );
}