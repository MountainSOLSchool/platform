import { Checkbox } from 'primereact/checkbox';
import { TabView, TabPanel } from 'primereact/tabview';

export function UpdateUnitsTool(props: {
    student: string;
    isCompletedByUnitId: { [unitId: string]: boolean };
    units: {
        [unitId: string]: {
            name: string;
            description: string;
            category: string;
        };
    };
    paths: Array<{ name: string; unitIds: Array<string> }>;
    onUnitsChanged: (changedUnit: {
        unitId: string;
        isCompleted: boolean;
    }) => void;
}) {
    const unitsByCategory = Object.values(props.units).reduce(
        (agg, unit) => ({
            ...agg,
            [unit.category]: [...(agg[unit.category] ?? []), unit],
        }),
        {} as Record<string, Array<{ name: string; description: string }>>
    );

    const unitsByCategoryJsx = (
        <>
            {Object.entries(unitsByCategory).map(([category, units]) => (
                <div key={category}>
                    <h2>Category: {category}</h2>
                    {units.map((unit, index) => (
                        <div key={index}>
                            <h3>{unit.name}</h3>
                            <p>{unit.description}</p>
                        </div>
                    ))}
                </div>
            ))}
        </>
    );

    const unitsByPathJsx = (
        <>
            <div>
                {props.paths.map((path) => (
                    <div className="col" key={path.name}>
                        <big>{path.name}</big>
                        {path.unitIds.map((unitId) => (
                            <>
                                <Checkbox
                                    key={unitId}
                                    style={
                                        props.student == ''
                                            ? { display: 'none' }
                                            : {}
                                    }
                                    checked={
                                        props.isCompletedByUnitId[unitId] ??
                                        false
                                    }
                                    onClick={(checkboxChange) =>
                                        props.onUnitsChanged({
                                            unitId,
                                            isCompleted: checkboxChange.checked,
                                        })
                                    }
                                />
                                {props.units[unitId]?.name ?? ''}
                            </>
                        ))}
                    </div>
                ))}
            </div>
        </>
    );

    return (
        <div>
            <big>Behold all of the Mountain SOL Units!</big>
            <div>Click on each unit to see the unit description.</div>;
            <TabView>
                <TabPanel header="View Units by Path">
                    {unitsByPathJsx}
                </TabPanel>
                <TabPanel header="Big Tree View">{unitsByCategoryJsx}</TabPanel>
            </TabView>
        </div>
    );
}

// return (
//     <div>
//         <div>
//             some units in a nice table
//             {/* /* <DataTable
//                 value={props.studentsArray}
//                 tableStyle={{ width: '30rem', maxHeight: '500' }}
//                 sortField="lastName"
//                 sortOrder={-1}
//                 selectionMode="single"
//                 onSelectionChange={selectStudent}
//             >
//                 <Column key={1} field={'firstName'} header={'First Name'} />
//                 <Column key={2} field={'lastName'} header={'Last Name'} />
//                 <Column
//                     key={4}
//                     field={'studentID'}
//                     header={'Student ID'}
//                     hidden={true}
//                 />
//                 <Column
//                     key={3}
//                     header={'Credit for Unit'}
//                     body={checkboxTemplate}
//                 />
//             </DataTable> */ */}
//         </div>
//     </div>
// );

export default UpdateUnitsTool;
