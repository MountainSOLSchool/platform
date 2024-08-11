import { useSelector } from 'react-redux';
import { selectUpdateStudentUnitsProps } from './UnitsStore';
import UpdateStudentUnits, { UpdateStudentUnitsProps } from './UpdateStudentUnits';

export function useUnitsStore(): {props: UpdateStudentUnitsProps} {
    return {
        props: useSelector(selectUpdateStudentUnitsProps)
    };
}
