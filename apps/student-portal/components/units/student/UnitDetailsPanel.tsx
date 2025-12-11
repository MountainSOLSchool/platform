'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { UnitDetails } from './UnitDetailsSidebar';
import './UnitDetailsPanel.css';

interface UnitDetailsPanelProps {
    unitDetails: UnitDetails;
    isSelected: boolean;
}

export function UnitDetailsPanel({
    unitDetails,
    isSelected,
}: UnitDetailsPanelProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [currentTranslateY, setCurrentTranslateY] = useState(0);
    const dragStartY = useRef<number | null>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    // Auto-expand when a unit is selected
    useEffect(() => {
        if (isSelected && !isExpanded) {
            setIsExpanded(true);
            setIsMinimized(false);
        }
    }, [isSelected, isExpanded]);

    const handleDragStart = useCallback((clientY: number) => {
        dragStartY.current = clientY;
        setIsDragging(true);
    }, []);

    const handleDragMove = useCallback((clientY: number) => {
        if (dragStartY.current === null) return;
        const delta = clientY - dragStartY.current;
        // Allow dragging down (positive) and slightly up (negative, capped)
        setCurrentTranslateY(Math.max(-20, delta));
    }, []);

    const handleDragEnd = useCallback(() => {
        if (dragStartY.current === null) {
            setIsDragging(false);
            return;
        }

        // If dragged down more than 100px, collapse
        if (currentTranslateY > 100) {
            setIsExpanded(false);
        }

        dragStartY.current = null;
        setIsDragging(false);
        setCurrentTranslateY(0);
    }, [currentTranslateY]);

    // Global mouse event handlers for drag (so dragging works even when mouse leaves element)
    useEffect(() => {
        if (!isDragging) return;

        const handleMouseMove = (e: MouseEvent) => {
            e.preventDefault();
            handleDragMove(e.clientY);
        };

        const handleMouseUp = () => {
            handleDragEnd();
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, handleDragMove, handleDragEnd]);

    const handleTouchStart = useCallback(
        (e: React.TouchEvent) => {
            handleDragStart(e.touches[0].clientY);
        },
        [handleDragStart]
    );

    const handleTouchMove = useCallback(
        (e: React.TouchEvent) => {
            if (dragStartY.current !== null) {
                e.preventDefault();
                handleDragMove(e.touches[0].clientY);
            }
        },
        [handleDragMove]
    );

    const handleTouchEnd = useCallback(() => {
        handleDragEnd();
    }, [handleDragEnd]);

    const handleMouseDown = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            handleDragStart(e.clientY);
        },
        [handleDragStart]
    );

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
        setIsMinimized(false);
    };

    const toggleMinimize = () => {
        setIsMinimized(!isMinimized);
    };

    const handleClick = useCallback(() => {
        // Only toggle if not dragging and not expanded
        if (!isDragging && !isExpanded) {
            toggleExpand();
        }
    }, [isDragging, isExpanded]);

    return (
        <>
            {/* Mobile Bottom Sheet */}
            {isSelected && (
                <div
                    ref={panelRef}
                    className={`unit-details-panel mobile ${isExpanded ? 'expanded' : 'collapsed'} ${isDragging ? 'dragging' : ''}`}
                    style={{
                        transform: `translateY(${isExpanded ? currentTranslateY : 0}px)`,
                    }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onMouseDown={handleMouseDown}
                    onClick={handleClick}
                >
                    {/* Drag Handle */}
                    <div className="drag-handle-container">
                        <div className="drag-handle" />
                    </div>

                    {/* Title - always visible */}
                    <div className="panel-title">{unitDetails.name}</div>

                    {/* Content - only visible when expanded */}
                    <div className="panel-content">
                        <p>{unitDetails.description}</p>
                    </div>
                </div>
            )}

            {/* Desktop Floating Panel */}
            {isSelected && (
                <div
                    className={`unit-details-panel desktop ${isMinimized ? 'minimized' : ''}`}
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
            )}
        </>
    );
}
