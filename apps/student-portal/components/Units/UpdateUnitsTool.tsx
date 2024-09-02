import React from 'react';
import { Checkbox } from 'primereact/checkbox';
import { TabView, TabPanel } from 'primereact/tabview';
import { PathElective } from 'apps/student-portal/models/path-elective.type';
import { Card } from 'primereact/card';

// TODO: the styling classes are haphazardly applied here
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
    paths: Array<{
        name: string;
        unitIds: Array<string>;
        electives: Array<PathElective>;
    }>;
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
            {Object.entries(unitsByCategory)
                // TODO: idk why undefined is a string here
                .filter(([category]) => category !== 'undefined')
                .concat()
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([category, units]) => (
                    <div key={category} className="mb-8">
                        <h2 className="text-xl font-bold mb-4">
                            Category:{' '}
                            {category.charAt(0).toUpperCase() +
                                category.slice(1)}
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

    const sortedPaths = props.paths.concat().sort((a, b) => {
        if (a.name === 'Ranger') return -1;
    });

    const unitsByPathJsx = (
        <div className="space-y-8">
            {sortedPaths.map((path) => (
                <Card className="mb-4" key={path.name} title={path.name}>
                    <div key={path.name} className="border rounded-lg">
                        <div>
                            {path.unitIds
                                .concat()
                                .sort((a, b) => {
                                    return props.units[a]?.name.localeCompare(
                                        props.units[b]?.name
                                    );
                                })
                                .map((unitId) => (
                                    <div
                                        key={unitId}
                                        className="flex items-center"
                                    >
                                        <div className="flex items-center mt-1">
                                            <Checkbox
                                                inputId={unitId}
                                                checked={
                                                    props.isCompletedByUnitId[
                                                        unitId
                                                    ] ?? false
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
                                                className="cursor-pointer ml-1 text-sm"
                                            >
                                                {props.units[unitId]?.name ??
                                                    ''}
                                            </label>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        {path.electives.map((elective) => (
                            <div key={elective.name}>
                                <h3 className="text-lg font-semibold">
                                    {elective.name}
                                </h3>
                                <div>
                                    {elective.unitIds.map((unitId) => (
                                        <div
                                            key={unitId}
                                            className="flex items-center"
                                        >
                                            <div className="flex items-center mt-1">
                                                <Checkbox
                                                    inputId={unitId}
                                                    checked={
                                                        props
                                                            .isCompletedByUnitId[
                                                            unitId
                                                        ] ?? false
                                                    }
                                                    onChange={(e) =>
                                                        props.onUnitsChanged({
                                                            unitId,
                                                            isCompleted:
                                                                e.checked,
                                                        })
                                                    }
                                                />
                                                <label
                                                    htmlFor={unitId}
                                                    className="cursor-pointer ml-1 text-sm"
                                                >
                                                    {props.units[unitId]
                                                        ?.name ?? ''}
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            ))}
        </div>
    );

    return (
        <div>
            <h2 className="text-3xl font-bold mb-3">Completed Units</h2>
            <TabView>
                <TabPanel header="Update Units by Path">
                    {unitsByPathJsx}
                </TabPanel>
                <TabPanel header="View Descriptions by Category">
                    {unitsByCategoryJsx}
                </TabPanel>
            </TabView>
        </div>
    );
}

export default UpdateUnitsTool;
