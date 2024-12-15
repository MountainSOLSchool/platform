import React from 'react';
import { Checkbox } from 'primereact/checkbox';
import { TabView, TabPanel } from 'primereact/tabview';
import { PathElective } from 'apps/student-portal/models/path-elective.type';
import { Card } from 'primereact/card';
import { Tooltip } from 'primereact/tooltip';
import UpdateStudentUnitsChanges from './UpdateStudentUnitsChanges';

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
    selectedClassUnitIds?: Array<string>;
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

    const getFilteredUnits = (classOnly: boolean) => {
        if (!classOnly || !props.selectedClassUnitIds) {
            return props.units;
        }
        return Object.fromEntries(
            Object.entries(props.units).filter(([unitId]) =>
                props.selectedClassUnitIds?.includes(unitId)
            )
        );
    };

    const renderPathContent = (units: typeof props.units) => {
        const sortedPaths = props.paths.concat().sort((a, b) => {
            if (a.name === 'Ranger') return -1;
            return 0;
        });

        return (
            <div className="space-y-8">
                {sortedPaths
                    .filter((path) =>
                        path.unitIds.some((unitId) => !!units[unitId])
                    )
                    .map((path) => (
                        <Card
                            className="mb-4"
                            key={path.name}
                            title={path.name}
                        >
                            <div className="border rounded-lg">
                                <div>
                                    {path.unitIds
                                        .concat()
                                        .filter((unitId) => !!units[unitId])
                                        .sort((a, b) => {
                                            return units[a]?.name.localeCompare(
                                                units[b]?.name
                                            );
                                        })
                                        .map((unitId) => (
                                            <_UnitCheckboxWithTooltip
                                                key={`${path.name}-${unitId}`}
                                                unitId={unitId}
                                                name={units[unitId]?.name ?? ''}
                                                description={
                                                    units[unitId]
                                                        ?.description ?? ''
                                                }
                                                isCompleted={
                                                    props.isCompletedByUnitId[
                                                        unitId
                                                    ] ?? false
                                                }
                                                onToggle={(
                                                    unitId,
                                                    isCompleted
                                                ) =>
                                                    props.onUnitsChanged({
                                                        unitId,
                                                        isCompleted,
                                                    })
                                                }
                                            />
                                        ))}
                                </div>
                                {path.electives
                                    .filter((elective) =>
                                        elective.unitIds.some(
                                            (unitId) => !!units[unitId]
                                        )
                                    )
                                    .map((elective) => (
                                        <div key={elective.name}>
                                            <h3 className="text-lg font-semibold">
                                                {elective.name}
                                            </h3>
                                            <div>
                                                {elective.unitIds
                                                    .filter(
                                                        (unitId) =>
                                                            !!units[unitId]
                                                    )
                                                    .map((unitId) => (
                                                        <_UnitCheckboxWithTooltip
                                                            key={`${path.name}-${elective.name}-${unitId}`}
                                                            unitId={unitId}
                                                            name={
                                                                units[unitId]
                                                                    ?.name ?? ''
                                                            }
                                                            description={
                                                                units[unitId]
                                                                    ?.description ??
                                                                ''
                                                            }
                                                            isCompleted={
                                                                props
                                                                    .isCompletedByUnitId[
                                                                    unitId
                                                                ] ?? false
                                                            }
                                                            onToggle={(
                                                                unitId,
                                                                isCompleted
                                                            ) =>
                                                                props.onUnitsChanged(
                                                                    {
                                                                        unitId,
                                                                        isCompleted,
                                                                    }
                                                                )
                                                            }
                                                        />
                                                    ))}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </Card>
                    ))}
            </div>
        );
    };

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

    const tabVisibilityByIndex = [
        props.selectedClassUnitIds?.length > 0,
        true,
        true,
    ];

    const activeTabIndex = tabVisibilityByIndex.findIndex((visible) => visible);

    return (
        <div>
            <h2 className="text-3xl font-bold mb-3">Completed Units</h2>
            <TabView activeIndex={activeTabIndex}>
                <TabPanel
                    header="Class Units"
                    visible={tabVisibilityByIndex[0]}
                >
                    {renderPathContent(getFilteredUnits(true))}
                    <UpdateStudentUnitsChanges />
                </TabPanel>
                <TabPanel header="All Units" visible={tabVisibilityByIndex[1]}>
                    {renderPathContent(getFilteredUnits(false))}
                    <UpdateStudentUnitsChanges />
                </TabPanel>
                <TabPanel
                    header="Unit Descriptions"
                    visible={tabVisibilityByIndex[2]}
                >
                    {unitsByCategoryJsx}
                </TabPanel>
            </TabView>
        </div>
    );
}

function _UnitCheckboxWithTooltip(props: {
    unitId: string;
    name: string;
    description: string;
    isCompleted: boolean;
    onToggle: (unitId: string, isCompleted: boolean) => void;
}) {
    return (
        <div key={props.unitId} className="flex items-center">
            <Tooltip
                target={`.checkbox-${props.unitId}`}
                position="right"
                event="both"
            >
                {props.description.split(' -').map((line, index) => (
                    <div key={index} className="text-sm">
                        {line.startsWith('-') ? line : `- ${line}`}
                    </div>
                ))}
            </Tooltip>
            <div
                className={`checkbox-${props.unitId} flex items-center mt-1 pr-2`}
            >
                <Checkbox
                    inputId={props.unitId}
                    checked={props.isCompleted ?? false}
                    onChange={(e) =>
                        props.onToggle(props.unitId, e.checked ?? false)
                    }
                />
                <label
                    htmlFor={props.unitId}
                    className="cursor-pointer ml-1 text-sm"
                >
                    {props.name ?? ''}
                </label>
            </div>
        </div>
    );
}

export default UpdateUnitsTool;
