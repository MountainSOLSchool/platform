import React from 'react';
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
    const unitsByCategory = Object.entries(props.units).reduce(
        (agg, [unitId, unit]) => ({
            ...agg,
            [unit.category]: [
                ...(agg[unit.category] ?? []),
                { ...unit, id: unitId },
            ],
        }),
        {} as Record<
            string,
            Array<{ id: string; name: string; description: string }>
        >
    );

    const unitsByCategoryJsx = (
        <>
            {Object.entries(unitsByCategory).map(([category, units]) => (
                <div key={category} className="mb-8">
                    <h2 className="text-xl font-bold mb-4">
                        Category: {category}
                    </h2>
                    {units.map((unit) => (
                        <div key={unit.id} className="mb-4">
                            <h3 className="text-lg font-semibold">
                                {unit.name}
                            </h3>
                            <p>{unit.description}</p>
                        </div>
                    ))}
                </div>
            ))}
        </>
    );

    const unitsByPathJsx = (
        <div className="space-y-8">
            {props.paths.map((path) => (
                <div key={path.name} className="border rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-6">{path.name}</h2>
                    <div className="grid grid-cols-3 gap-6">
                        {path.unitIds.map((unitId) => (
                            // TODO: Primereact class names are not working
                            <div
                                key={unitId}
                                className="flex items-center space-x-3"
                            >
                                <Checkbox
                                    inputId={unitId}
                                    className={
                                        props.student === '' ? 'hidden' : ''
                                    }
                                    checked={
                                        props.isCompletedByUnitId[unitId] ??
                                        false
                                    }
                                    onChange={(e) =>
                                        props.onUnitsChanged({
                                            unitId,
                                            isCompleted: e.checked,
                                        })
                                    }
                                />
                                <label
                                    htmlFor={unitId}
                                    className="cursor-pointer text-lg"
                                >
                                    {props.units[unitId]?.name ?? ''}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">Completed Units</h2>
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
