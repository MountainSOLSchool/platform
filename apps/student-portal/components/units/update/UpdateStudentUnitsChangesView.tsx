'use client';

import { Card } from 'primereact/card';

export interface UpdateStudentUnitsChangesViewProps {
    changedUnitCompletions: Array<{ name: string; added: boolean }>;
}

export function UpdateStudentUnitsChangesView(
    props: UpdateStudentUnitsChangesViewProps
) {
    const additions = props.changedUnitCompletions.filter((unit) => unit.added);
    const removals = props.changedUnitCompletions.filter((unit) => !unit.added);

    return (
        <Card title="Your Changes">
            {additions.length === 0 && removals.length === 0 && (
                <p>{"You haven't made any changes yet."}</p>
            )}
            {additions.length > 0 && (
                <>
                    <h3>Added Units</h3>
                    <ul>
                        {additions.map((unit) => {
                            return <li key={unit.name}>{unit.name}</li>;
                        })}
                    </ul>
                </>
            )}
            {removals.length > 0 && (
                <>
                    <h3>Removed Units</h3>
                    <ul>
                        {removals.map((unit) => {
                            return <li key={unit.name}>{unit.name}</li>;
                        })}
                    </ul>
                </>
            )}
        </Card>
    );
}

export default UpdateStudentUnitsChangesView;
