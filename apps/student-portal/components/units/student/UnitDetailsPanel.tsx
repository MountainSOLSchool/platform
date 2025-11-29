'use client';
import { useState, useRef, useEffect } from 'react';
import { UnitDetails } from './UnitDetailsSidebar';
import './UnitDetailsPanel.css';

interface UnitDetailsPanelProps {
    unitDetails: UnitDetails;
    isSelected: boolean;
}

export function UnitDetailsPanel({ unitDetails, isSelected }: UnitDetailsPanelProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [dragStartY, setDragStartY] = useState<number | null>(null);
    const [currentTranslateY, setCurrentTranslateY] = useState(0);
    const panelRef = useRef<HTMLDivElement>(null);

    // Auto-expand when a unit is selected
    useEffect(() => {
        if (isSelected && !isExpanded) {
            setIsExpanded(true);
            setIsMinimized(false);
        }
    }, [isSelected]);

    const handleDragStart = (clientY: number) => {
        setDragStartY(clientY);
    };

    const handleDragMove = (clientY: number) => {
        if (dragStartY === null) return;
        const delta = clientY - dragStartY;
        // Only allow dragging down (positive delta)
        if (delta > 0) {
            setCurrentTranslateY(delta);
        }
    };

    const handleDragEnd = () => {
        if (dragStartY === null) return;

        // If dragged down more than 100px, collapse
        if (currentTranslateY > 100) {
            setIsExpanded(false);
        }

        setDragStartY(null);
        setCurrentTranslateY(0);
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
        setIsMinimized(false);
    };

    const toggleMinimize = () => {
        setIsMinimized(!isMinimized);
    };

    return (
        <>
            {/* Mobile Bottom Sheet */}
            <div
                ref={panelRef}
                className="unit-details-panel mobile"
                style={{
                    transform: `translateY(${isExpanded ? currentTranslateY : 0}px)`,
                    bottom: isExpanded ? 0 : '-100%',
                }}
                onTouchStart={(e) => handleDragStart(e.touches[0].clientY)}
                onTouchMove={(e) => handleDragMove(e.touches[0].clientY)}
                onTouchEnd={handleDragEnd}
                onMouseDown={(e) => handleDragStart(e.clientY)}
                onMouseMove={(e) => {
                    if (dragStartY !== null) handleDragMove(e.clientY);
                }}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
            >
                {/* Drag Handle */}
                <div className="drag-handle-container">
                    <div className="drag-handle" />
                </div>

                <div className="panel-content">
                    <h2>{unitDetails.name}</h2>
                    <p>{unitDetails.description}</p>
                </div>
            </div>

            {/* Desktop Floating Panel */}
            <div
                className={`unit-details-panel desktop ${isMinimized ? 'minimized' : ''}`}
                style={{
                    display: isSelected || !isMinimized ? 'block' : 'none',
                }}
            >
                <div className="panel-header">
                    <h3>{unitDetails.name}</h3>
                    <button
                        onClick={toggleMinimize}
                        className="minimize-button"
                        aria-label={isMinimized ? 'Expand' : 'Minimize'}
                    >
                        {isMinimized ? '▲' : '▼'}
                    </button>
                </div>

                {!isMinimized && (
                    <div className="panel-content">
                        <p>{unitDetails.description}</p>
                    </div>
                )}
            </div>

            {/* Mobile Expand Button (when collapsed) */}
            {!isExpanded && isSelected && (
                <button className="expand-button mobile" onClick={toggleExpand}>
                    <span>View Details</span>
                </button>
            )}
        </>
    );
}
