import { useSelector } from 'react-redux';
import { selectUnitsViewModel } from './units.slice';
import UpdateStudentUnits from './UpdateStudentUnits';

export function useUnitsStore(): {
    viewModel: Parameters<typeof UpdateStudentUnits>[0]['viewModel'];
} {
    const viewModel = useSelector(selectUnitsViewModel);

    return {
        viewModel,
    };
}
