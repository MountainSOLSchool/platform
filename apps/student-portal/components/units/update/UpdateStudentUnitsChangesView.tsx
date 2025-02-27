'use client';

import { Card } from 'primereact/card';

export interface UpdateStudentUnitsChangesViewProps {
    changedUnitCompletions: Array<{ name: string; added: boolean }>;
    repeatableCompletionChanges: Array<{
        type: 'added' | 'updated' | 'removed';
        unitName: string;
        completion: {
            unitId: string;
            recordedDate: string;
            appliedToPath?: string;
        };
        previousPath?: string;
    }>;
}

export function UpdateStudentUnitsChangesView(
    props: UpdateStudentUnitsChangesViewProps
) {
    const additions = props.changedUnitCompletions.filter((unit) => unit.added);
    const removals = props.changedUnitCompletions.filter((unit) => !unit.added);

    // Group repeatable completion changes by type
    const addedRepeatableCompletions = props.repeatableCompletionChanges.filter(c => c.type === 'added');
    const updatedRepeatableCompletions = props.repeatableCompletionChanges.filter(c => c.type === 'updated');
    const removedRepeatableCompletions = props.repeatableCompletionChanges.filter(c => c.type === 'removed');

    const hasRegularChanges = additions.length > 0 || removals.length > 0;
    const hasRepeatableChanges = props.repeatableCompletionChanges.length > 0;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    if (!hasRegularChanges && !hasRepeatableChanges) {
        return (
            <Card title="Your Changes">
                <p>{"You haven't made any changes yet."}</p>
            </Card>
        );
    }

    return (
        <Card title="Your Changes">
            {hasRegularChanges && (
                <div className="mb-4">
                    {additions.length > 0 && (
                        <div className="mb-3">
                            <h3 className="text-lg font-semibold mb-2">Added Units <i className="pi pi-plus-circle text-green-600"></i></h3>
                            <ul className="list-disc pl-5">
                                {additions.map((unit) => (
                                    <li key={unit.name}>{unit.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {removals.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Removed Units <i className="pi pi-minus-circle text-red-600"></i></h3>
                            <ul className="list-disc pl-5">
                                {removals.map((unit) => (
                                    <li key={unit.name}>{unit.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}

            {hasRepeatableChanges && (
                <div>
                    <h3 className="text-lg font-semibold mb-3">Give-Back Elective Changes</h3>

                    {addedRepeatableCompletions.length > 0 && (
                        <div className="mb-3">
                            <h4 className="text-md font-medium mb-2">
                                Added Completions <i className="pi pi-plus-circle text-green-600"></i>
                            </h4>
                            <ul className="list-disc pl-5">
                                {addedRepeatableCompletions.map((change) => (
                                    <li key={`${change.completion.unitId}-${change.completion.recordedDate}`}>
                                        {change.unitName} (recorded on {formatDate(change.completion.recordedDate)})
                                        {change.completion.appliedToPath &&
                                            ` - applied to ${change.completion.appliedToPath}`}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {updatedRepeatableCompletions.length > 0 && (
                        <div className="mb-3">
                            <h4 className="text-md font-medium mb-2">
                                Updated Assignments <i className="pi pi-pencil text-blue-600"></i>
                            </h4>
                            <ul className="list-disc pl-5">
                                {updatedRepeatableCompletions.map((change) => (
                                    <li key={`${change.completion.unitId}-${change.completion.recordedDate}`}>
                                        {change.unitName} (recorded on {formatDate(change.completion.recordedDate)}):
                                        {' '}
                                        {!change.previousPath ?
                                            `Assigned to ${change.completion.appliedToPath}` :
                                            `Reassigned from ${change.previousPath} to ${change.completion.appliedToPath}`
                                        }
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {removedRepeatableCompletions.length > 0 && (
                        <div>
                            <h4 className="text-md font-medium mb-2">
                                Removed Completions <i className="pi pi-minus-circle text-red-600"></i>
                            </h4>
                            <ul className="list-disc pl-5">
                                {removedRepeatableCompletions.map((change) => (
                                    <li key={`${change.completion.unitId}-${change.completion.recordedDate}`}>
                                        {change.unitName} (recorded on {formatDate(change.completion.recordedDate)})
                                        {change.completion.appliedToPath &&
                                            ` - was applied to ${change.completion.appliedToPath}`}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </Card>
    );
}

export default UpdateStudentUnitsChangesView;