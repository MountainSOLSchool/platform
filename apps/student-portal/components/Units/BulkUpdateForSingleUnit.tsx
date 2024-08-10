import UnitUpdateTool from './UpdateUnitsTool';
import StudentSelectionTool from './StudentSelectionTool';

export function BulkUpdateForSingleUnit() {
    return (
        <div>
            <div>
                Please select a unit:
                <UnitUpdateTool paths={[{name: 'Example path', unitIds: ['fake-one']}]}/>
            </div>
            <div>
                And select students that you want to give credit for this unit:
                <StudentSelectionTool studentsArray={[]} />
            </div>
        </div>
    );
}

export default BulkUpdateForSingleUnit;
