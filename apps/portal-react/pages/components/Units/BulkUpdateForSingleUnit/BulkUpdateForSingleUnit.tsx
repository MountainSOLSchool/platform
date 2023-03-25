import UnitSelectionTool from '../UnitSelectionTool';
import StudentSelectionTool from './StudentSelectionTool';

export function BulkUpdateForSingleUnit(props) {
    return (
        <div>
            <div>
                Please select a unit:
                <UnitSelectionTool />
            </div>
            <div>
                And select students that you want to give credit for this unit:
                <StudentSelectionTool />
            </div>
        </div>
    );
}

export default BulkUpdateForSingleUnit;