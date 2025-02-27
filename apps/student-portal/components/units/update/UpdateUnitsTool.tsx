import React from 'react';
import { Checkbox } from 'primereact/checkbox';
import { TabView, TabPanel } from 'primereact/tabview';
import { PathElective } from 'apps/student-portal/models/path-elective.type';
import { Card } from 'primereact/card';
import { Tooltip } from 'primereact/tooltip';
import UpdateStudentUnitsChanges from './UpdateStudentUnitsChanges';
import { useSelector } from 'react-redux';
import { selectUnitNameAndCompletionChange } from '../../../store/updateUnits/updateUnitsSlice';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';
import { Dropdown } from 'primereact/dropdown';

// Add a new type for the repeatable unit completions
export type RepeatableUnitCompletion = {
    id: string; // Unique ID for this completion
    unitId: string;
    recordedDate: Date;
    appliedToPath: string | null;
};

// TODO: the styling classes are haphazardly applied here
export function UpdateUnitsTool(props: {
    student: string;
    isCompletedByUnitId: { [unitId: string]: boolean };
    units: {
        [unitId: string]: {
            name: string;
            description: string;
            category: string;
            isRepeatable: boolean;
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
    // Add new props for repeatable unit completions
    repeatableCompletions: RepeatableUnitCompletion[];
    onRepeatableCompletionAdded?: (unitId: string) => void;
    onRepeatableCompletionApplied?: (
        completionId: string,
        pathName: string | null
    ) => void;
}) {
    const router = useRouter();

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

    const repeatableUnits = Object.entries(props.units).filter(
        ([, unit]) => !!unit.isRepeatable
    );

    // Function to add a new completion for a repeatable unit
    const handleAddCompletion = (unitId: string) => {
        // Call the callback if provided
        if (props.onRepeatableCompletionAdded) {
            props.onRepeatableCompletionAdded(unitId);
        }
    };

    // Function to apply a completion to a path
    const handleApplyToPath = (
        completionId: string,
        pathName: string | null
    ) => {
        // Call the callback if provided
        if (props.onRepeatableCompletionApplied) {
            props.onRepeatableCompletionApplied(completionId, pathName);
        }
    };

    // Function to check if a repeatable unit has been applied to a specific path
    const isRepeatableUnitAppliedToPath = (
        unitId: string,
        pathName: string
    ) => {
        return props.repeatableCompletions.some(
            (completion) =>
                completion.unitId === unitId &&
                completion.appliedToPath === pathName
        );
    };

    const renderRepeatableUnitsCard = () => {
        return (
            <Card className="mb-4" key="repeatable-units" title="">
                <div className="border rounded-lg">
                    {repeatableUnits.map(([unitId, unit]) => {
                        // Get completions for this unit
                        const unitCompletions =
                            props.repeatableCompletions.filter(
                                (completion) => completion.unitId === unitId
                            );

                        return (
                            <div
                                key={`repeatable-unit-${unitId}`}
                                className="mb-6 border-b pb-4 last:border-b-0"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-lg font-semibold">
                                        {unit.name}
                                    </h3>
                                    <Button
                                        label="Add Completion"
                                        icon="pi pi-plus"
                                        className="p-button-sm"
                                        onClick={() =>
                                            handleAddCompletion(unitId)
                                        }
                                    />
                                </div>
                                <p className="text-sm text-gray-600 mb-3">
                                    {unit.description}
                                </p>

                                {/* List of completions */}
                                {unitCompletions.length > 0 ? (
                                    <div className="ml-4">
                                        <h4 className="text-md font-medium mb-2">
                                            Completions:
                                        </h4>
                                        <ul className="list-disc space-y-3 ml-4">
                                            {unitCompletions.map(
                                                (completion) => (
                                                    <li
                                                        key={completion.id}
                                                        className="flex items-center gap-3"
                                                    >
                                                        <span>
                                                            Completed on{' '}
                                                            {completion.recordedDate.toLocaleDateString()}
                                                        </span>
                                                        <Dropdown
                                                            value={
                                                                completion.appliedToPath
                                                            }
                                                            options={[
                                                                {
                                                                    label: '-- Not Applied --',
                                                                    value: null,
                                                                },
                                                                ...props.paths.map(
                                                                    (path) => ({
                                                                        label: path.name,
                                                                        value: path.name,
                                                                    })
                                                                ),
                                                            ]}
                                                            onChange={(e) =>
                                                                handleApplyToPath(
                                                                    completion.id,
                                                                    e.value
                                                                )
                                                            }
                                                            placeholder="Apply to Path"
                                                            className="p-inputtext-sm"
                                                        />
                                                        {completion.appliedToPath && (
                                                            <span className="text-green-600 text-sm">
                                                                Applied to{' '}
                                                                {
                                                                    completion.appliedToPath
                                                                }
                                                            </span>
                                                        )}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                ) : (
                                    <div className="text-sm text-gray-500 italic ml-4">
                                        No completions recorded yet
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </Card>
        );
    };

    const renderPathContent = (units: typeof props.units) => {
        const sortedPaths = props.paths.concat().sort((a, b) => {
            if (a.name === 'Ranger') return -1;
            return 0;
        });

        return (
            <div className="space-y-8">
                {/** Render the repeatable units card */}
                {renderRepeatableUnitsCard()}

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
                                        .map((unitId) => {
                                            const isRepeatable =
                                                units[unitId]?.isRepeatable;

                                            // For repeatable units, check if any completion has been applied to this path
                                            const isCompleted = isRepeatable
                                                ? isRepeatableUnitAppliedToPath(
                                                      unitId,
                                                      path.name
                                                  )
                                                : props.isCompletedByUnitId[
                                                      unitId
                                                  ] ?? false;

                                            return (
                                                <UnitCheckboxWithTooltip
                                                    key={`${path.name}-${unitId}`}
                                                    unitId={unitId}
                                                    name={
                                                        units[unitId]?.name ??
                                                        ''
                                                    }
                                                    description={
                                                        units[unitId]
                                                            ?.description ?? ''
                                                    }
                                                    isCompleted={isCompleted}
                                                    // Don't disable repeatable units anymore, but make them read-only
                                                    disabled={false}
                                                    readOnly={isRepeatable}
                                                    isRepeatable={isRepeatable}
                                                    pathName={path.name}
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
                                            );
                                        })}
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
                                                    .map((unitId) => {
                                                        const isRepeatable =
                                                            units[unitId]
                                                                ?.isRepeatable;

                                                        // For repeatable units, check if any completion has been applied to this path
                                                        const isCompleted =
                                                            isRepeatable
                                                                ? isRepeatableUnitAppliedToPath(
                                                                      unitId,
                                                                      path.name
                                                                  )
                                                                : props
                                                                      .isCompletedByUnitId[
                                                                      unitId
                                                                  ] ?? false;

                                                        return (
                                                            <UnitCheckboxWithTooltip
                                                                key={`${path.name}-${elective.name}-${unitId}`}
                                                                unitId={unitId}
                                                                name={
                                                                    units[
                                                                        unitId
                                                                    ]?.name ??
                                                                    ''
                                                                }
                                                                description={
                                                                    units[
                                                                        unitId
                                                                    ]
                                                                        ?.description ??
                                                                    ''
                                                                }
                                                                isCompleted={
                                                                    isCompleted
                                                                }
                                                                // Don't disable repeatable units anymore, but make them read-only
                                                                disabled={false}
                                                                readOnly={
                                                                    isRepeatable
                                                                }
                                                                isRepeatable={
                                                                    isRepeatable
                                                                }
                                                                pathName={
                                                                    path.name
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
                                                        );
                                                    })}
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
            <Button
                label="View Student's Paths Tree"
                icon="pi pi-window-maximize"
                onClick={() => router.push(`/units/student/${props.student}`)}
            ></Button>
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

function UnitCheckboxWithTooltip(props: {
    unitId: string;
    name: string;
    description: string;
    isCompleted: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    isRepeatable?: boolean;
    pathName?: string;
    onToggle: (unitId: string, isCompleted: boolean) => void;
}) {
    const changedUnits = useSelector(selectUnitNameAndCompletionChange);
    const change = changedUnits.find((unit) => unit.name === props.name);

    return (
        <div key={props.unitId} className="flex items-center group">
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
                    disabled={props.disabled ?? false}
                    inputId={props.unitId}
                    checked={props.isCompleted ?? false}
                    onChange={(e) => {
                        // Only call onToggle if the unit is not read-only
                        if (!props.readOnly) {
                            props.onToggle(props.unitId, e.checked ?? false);
                        }
                    }}
                />
                <label
                    htmlFor={props.unitId}
                    className="cursor-pointer ml-1 text-sm flex items-center gap-2"
                >
                    <span>{props.name ?? ''}</span>
                    {change && (
                        <i
                            className={`pi ${change.added ? 'pi-plus-circle text-green-600' : 'pi-minus-circle text-red-600'}`}
                            style={{ fontSize: '0.875rem' }}
                        />
                    )}
                    {/* Show a badge if this is a repeatable unit being applied to a path */}
                    {props.isRepeatable &&
                        props.isCompleted &&
                        props.pathName && (
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                Applied
                            </span>
                        )}
                </label>
            </div>
        </div>
    );
}

export default UpdateUnitsTool;
