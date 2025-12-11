'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { UnitDetails } from './UnitDetailsSidebar';
import './UnitDetailsPanel.css';

interface UnitDetailsPanelProps {
    unitDetails: UnitDetails;
    isSelected: boolean;
}

// Height of the collapsed panel (handle + title)
const COLLAPSED_HEIGHT = 80;
// Threshold for snap behavior
const SNAP_THRESHOLD = 100;

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

    const handleDragMove = useCallback(
        (clientY: number) => {
            if (dragStartY.current === null) return;
            const delta = clientY - dragStartY.current;

            if (isExpanded) {
                // When expanded: allow dragging down freely, cap upward drag
                setCurrentTranslateY(Math.max(-30, delta));
            } else {
                // When collapsed: allow dragging up freely, cap downward drag
                setCurrentTranslateY(Math.min(30, delta));
            }
        },
        [isExpanded]
    );

    const handleDragEnd = useCallback(() => {
        if (dragStartY.current === null) {
            setIsDragging(false);
            return;
        }

        if (isExpanded) {
            // If expanded and dragged down past threshold, collapse
            if (currentTranslateY > SNAP_THRESHOLD) {
                setIsExpanded(false);
            }
        } else {
            // If collapsed and dragged up past threshold, expand
            if (currentTranslateY < -SNAP_THRESHOLD) {
                setIsExpanded(true);
            }
        }

        dragStartY.current = null;
        setIsDragging(false);
        setCurrentTranslateY(0);
    }, [currentTranslateY, isExpanded]);

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

    const toggleExpand = useCallback(() => {
        setIsExpanded((prev) => !prev);
        setIsMinimized(false);
    }, []);

    const toggleMinimize = () => {
        setIsMinimized(!isMinimized);
    };

    const handleClick = useCallback(() => {
        // Only toggle if not dragging and not expanded
        if (!isDragging && !isExpanded) {
            toggleExpand();
        }
    }, [isDragging, isExpanded, toggleExpand]);

    // Calculate the transform based on state
    const getTransform = () => {
        if (isExpanded) {
            // Expanded: at bottom, translate by drag amount
            return `translateY(${currentTranslateY}px)`;
        } else {
            // Collapsed: slide down to show only handle/title, plus drag amount
            return `translateY(calc(100% - ${COLLAPSED_HEIGHT}px + ${currentTranslateY}px))`;
        }
    };

    return (
        <>
            {/* Mobile Bottom Sheet */}
            {isSelected && (
                <div
                    ref={panelRef}
                    className={`unit-details-panel mobile ${isExpanded ? 'expanded' : 'collapsed'} ${isDragging ? 'dragging' : ''}`}
                    style={{
                        transform: getTransform(),
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
