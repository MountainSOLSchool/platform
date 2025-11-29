'use client';
import { useState, useCallback } from 'react';
import { SmartTreeChart } from './TreeChart';
import { UnitDetails } from './UnitDetailsSidebar';
import { UnitDetailsPanel } from './UnitDetailsPanel';

const DEFAULT_UNIT: UnitDetails = {
    name: 'Unit Name',
    description: 'Unit Description',
};

interface StudentUnitsPageProps {
    studentId: string;
}

export function StudentUnitsPage({ studentId }: StudentUnitsPageProps) {
    const [selectedUnit, setSelectedUnit] = useState<UnitDetails>(DEFAULT_UNIT);
    const [isUnitSelected, setIsUnitSelected] = useState(false);

    const handleUnitSelect = useCallback((details: UnitDetails) => {
        setSelectedUnit(details);
        setIsUnitSelected(true);
    }, []);

    return (
        <div className="student-units-page">
            <div className="tree-container">
                <SmartTreeChart studentId={studentId} onUnitSelect={handleUnitSelect} />
            </div>
            <UnitDetailsPanel unitDetails={selectedUnit} isSelected={isUnitSelected} />
        </div>
    );
}
