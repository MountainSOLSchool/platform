'use client';
import { useSelector } from 'react-redux';
import { selectUnitNameAndCompletionChange } from '../../../store/updateUnits/updateUnitsSlice';
import UpdateStudentUnitsChangesView from './UpdateStudentUnitsChangesView';

export default function UpdateStudentUnitsChanges() {
    const changedUnitCompletions = useSelector(
        selectUnitNameAndCompletionChange
    );

    return (
        <UpdateStudentUnitsChangesView
            changedUnitCompletions={changedUnitCompletions}
        />
    );
}
