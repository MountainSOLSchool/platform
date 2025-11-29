'use client';
import { useState, useEffect, useRef } from 'react';

const sidebarDefault = { header: 'Unit Name', description: 'Unit Description' };

const sidebarDimensions = {
    width: 400,
    paddingTop: '2rem',
    paddingHoriz: '1rem',
    fontSize: 15,
    headerFontSize: 25,
};

export interface UnitDetails {
    name: string;
    description: string;
}

interface UnitDetailsSidebarProps {
    onMountCallback: (updateFn: (details: UnitDetails) => void) => void;
}

export function UnitDetailsSidebar({ onMountCallback }: UnitDetailsSidebarProps) {
    const [unitName, setUnitName] = useState(sidebarDefault.header);
    const [unitDescription, setUnitDescription] = useState(sidebarDefault.description);

    // Register the callback with parent on mount only
    useEffect(() => {
        onMountCallback((details: UnitDetails) => {
            setUnitName(details.name);
            setUnitDescription(details.description);
        });
    }, [onMountCallback]);

    return (
        <div
            className="smart-tree-sidebar"
            style={{
                border: '2px solid black',
                paddingLeft: sidebarDimensions.paddingHoriz,
                paddingBottom: sidebarDimensions.paddingTop,
                paddingTop: sidebarDimensions.paddingTop,
                width: sidebarDimensions.width,
                fontSize: sidebarDimensions.fontSize,
            }}
        >
            <h2 className="sidebar-header">{unitName}</h2>
            <p className="sidebar-description">{unitDescription}</p>
        </div>
    );
}
