'use client';
import { useState } from 'react';
import { SmartTreeChart } from './TreeChart';
import { UnitDetailsSidebar, UnitDetails } from './UnitDetailsSidebar';

interface StudentUnitsPageProps {
    studentId: string;
}

export function StudentUnitsPage({ studentId }: StudentUnitsPageProps) {
    const [selectedUnit, setSelectedUnit] = useState<UnitDetails>({
        name: 'Unit Name',
        description: 'Unit Description',
    });

    return (
        <div className="smart-tree-wrapper">
            <div style={{ display: 'inline-flex' }}>
                <SmartTreeChart studentId={studentId} onUnitSelect={setSelectedUnit} />
                <UnitDetailsSidebar unitDetails={selectedUnit} />
            </div>
        </div>
    );
}
