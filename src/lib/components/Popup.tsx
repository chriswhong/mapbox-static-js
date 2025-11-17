import React, { useMemo, useState } from 'react';
import type { PopupProps } from '../types';
import { useStaticMapContext, useMarkerPositionContext } from './context';

export const Popup: React.FC<PopupProps> = ({
    position,
    children,
    anchor = 'bottom',
    offset = 0,
    visible = true,
    closeButton = false,
    closeOnClick = false,
    focusAfterOpen = false,
    maxWidth = '240px',
    onClick,
    onClose,
    className,
    style,
}) => {
    const { latLngToPixel, isLoaded } = useStaticMapContext();
    const markerPositionContext = useMarkerPositionContext();
    
    // Internal state for visibility when no onClose handler is provided
    const [internalVisible, setInternalVisible] = useState(true);
    const isVisible = visible && internalVisible;

    // Use position from props, or inherit from marker context if available
    const effectivePosition = position || markerPositionContext?.position;
    const isMarkerChild = !position && !!markerPositionContext;

    if (!effectivePosition) {
        throw new Error('Popup must have a position prop or be a child of a Marker component');
    }

    // Calculate offset based on the offset prop type
    const calculatedOffset = useMemo(() => {
        if (typeof offset === 'number') {
            // Single number - apply to all directions
            return { x: offset, y: offset };
        } else if (offset && typeof offset === 'object') {
            if ('x' in offset && 'y' in offset) {
                // PointLike object
                return offset;
            } else {
                // Anchor-specific offsets
                const anchorOffset = (offset as Record<string, { x: number; y: number }>)[anchor];
                return anchorOffset || { x: 0, y: 0 };
            }
        }
        return { x: 0, y: 0 };
    }, [offset, anchor]);

    const { x, y } = useMemo(() => {
        if (!isLoaded) return { x: 0, y: 0 };
        const basePixels = latLngToPixel(effectivePosition);

        // If this popup is a child of a marker, we need to account for the marker's visual offset
        if (isMarkerChild && markerPositionContext?.dimensions) {
            const { width, height } = markerPositionContext.dimensions;
            
            // Markers use transform: translate(-50%, -100%), so they're positioned with their bottom-center at the coordinates
            // Calculate marker bounds relative to the coordinate point
            const markerLeft = -width / 2;
            const markerRight = width / 2;
            const markerTop = -height;
            const markerBottom = 0;
            
            // Position popup so its anchor point aligns with the appropriate marker edge/corner
            let xOffset = 0;
            let yOffset = 0;
            
            switch (anchor) {
                case 'bottom':
                    // Bottom of popup touches top of marker
                    xOffset = 0; // Center horizontally
                    yOffset = markerTop;
                    break;
                case 'bottom-left':
                    // Bottom-left of popup touches top-right of marker
                    xOffset = markerRight;
                    yOffset = markerTop;
                    break;
                case 'bottom-right':
                    // Bottom-right of popup touches top-left of marker
                    xOffset = markerLeft;
                    yOffset = markerTop;
                    break;
                case 'top':
                    // Top of popup touches bottom of marker
                    xOffset = 0; // Center horizontally
                    yOffset = markerBottom;
                    break;
                case 'top-left':
                    // Top-left of popup touches bottom-right of marker
                    xOffset = markerRight;
                    yOffset = markerBottom;
                    break;
                case 'top-right':
                    // Top-right of popup touches bottom-left of marker
                    xOffset = markerLeft;
                    yOffset = markerBottom;
                    break;
                case 'left':
                    // Left of popup touches right of marker
                    xOffset = markerRight;
                    yOffset = (markerTop + markerBottom) / 2; // Center vertically
                    break;
                case 'right':
                    // Right of popup touches left of marker
                    xOffset = markerLeft;
                    yOffset = (markerTop + markerBottom) / 2; // Center vertically
                    break;
                case 'center':
                default:
                    // Center popup on marker
                    xOffset = 0;
                    yOffset = (markerTop + markerBottom) / 2;
                    break;
            }
            
            return {
                x: basePixels.x + xOffset,
                y: basePixels.y + yOffset,
            };
        } else if (isMarkerChild) {
            // Fallback for markers without dimensions (custom markers)
            return {
                x: basePixels.x,
                y: basePixels.y - 30, // Approximate marker height offset - markers are bottom-aligned
            };
        }

        return basePixels;
    }, [effectivePosition, latLngToPixel, isLoaded, isMarkerChild, markerPositionContext, anchor]);

    // Calculate the flex direction and tip alignment based on anchor
    const { flexDirection, tipClassName } = useMemo(() => {
        switch (anchor) {
            case 'top':
            case 'top-left':
            case 'top-right':
                return {
                    flexDirection: 'column' as const,
                    tipClassName: `mapboxgl-popup-anchor-${anchor}`
                };
            case 'bottom':
            case 'bottom-left':
            case 'bottom-right':
                return {
                    flexDirection: 'column-reverse' as const,
                    tipClassName: `mapboxgl-popup-anchor-${anchor}`
                };
            case 'left':
                return {
                    flexDirection: 'row' as const,
                    tipClassName: 'mapboxgl-popup-anchor-left'
                };
            case 'right':
                return {
                    flexDirection: 'row-reverse' as const,
                    tipClassName: 'mapboxgl-popup-anchor-right'
                };
            case 'center':
            default:
                return {
                    flexDirection: 'column' as const,
                    tipClassName: 'mapboxgl-popup-anchor-center'
                };
        }
    }, [anchor]);

    const transformStyle = useMemo(() => {
        switch (anchor) {
            case 'top':
                return 'translate(-50%, 0%)';
            case 'top-left':
                return 'translate(0%, 0%)';
            case 'top-right':
                return 'translate(-100%, 0%)';
            case 'bottom':
                return 'translate(-50%, -100%)';
            case 'bottom-left':
                return 'translate(0%, -100%)';
            case 'bottom-right':
                return 'translate(-100%, -100%)';
            case 'left':
                return 'translate(0%, -50%)';
            case 'right':
                return 'translate(-100%, -50%)';
            case 'center':
            default:
                return 'translate(-50%, -50%)';
        }
    }, [anchor]);

    if (!isLoaded || !visible) return null;

    const handleClick = (e: React.MouseEvent) => {
        if (closeOnClick && onClose) {
            onClose();
        }
        if (onClick) {
            onClick(e);
        }
    };

    const handleCloseClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onClose) {
            onClose();
        } else {
            // If no onClose handler, use internal state to hide popup
            setInternalVisible(false);
        }
    };

    const popupStyle: React.CSSProperties = {
        left: x + calculatedOffset.x,
        top: y + calculatedOffset.y,
        transform: transformStyle,
        flexDirection,
        ...style,
    };

    // Mapbox GL popup content styles
    const contentStyle: React.CSSProperties = {
        cursor: onClick || closeOnClick ? 'pointer' : 'default',
        maxWidth: maxWidth === 'none' ? 'none' : maxWidth,
        ...(anchor.includes('top-left') && { borderTopLeftRadius: 0 }),
        ...(anchor.includes('top-right') && { borderTopRightRadius: 0 }),
        ...(anchor.includes('bottom-left') && { borderBottomLeftRadius: 0 }),
        ...(anchor.includes('bottom-right') && { borderBottomRightRadius: 0 }),
    };

    // Mapbox GL popup tip styles  
    const tipStyle: React.CSSProperties = {};

    // Tip color and position based on anchor
    let tipSpecificStyle: React.CSSProperties = {};
    let tipAlignment: React.CSSProperties = {};

    switch (anchor) {
        case 'top':
            tipAlignment = { alignSelf: 'center' };
            tipSpecificStyle = {
                borderBottomColor: '#fff',
                borderTop: 'none',
            };
            break;
        case 'top-left':
            tipAlignment = { alignSelf: 'flex-start' };
            tipSpecificStyle = {
                borderBottomColor: '#fff',
                borderLeft: 'none',
                borderTop: 'none',
            };
            break;
        case 'top-right':
            tipAlignment = { alignSelf: 'flex-end' };
            tipSpecificStyle = {
                borderBottomColor: '#fff',
                borderRight: 'none',
                borderTop: 'none',
            };
            break;
        case 'bottom':
            tipAlignment = { alignSelf: 'center' };
            tipSpecificStyle = {
                borderBottom: 'none',
                borderTopColor: '#fff',
            };
            break;
        case 'bottom-left':
            tipAlignment = { alignSelf: 'flex-start' };
            tipSpecificStyle = {
                borderBottom: 'none',
                borderLeft: 'none',
                borderTopColor: '#fff',
            };
            break;
        case 'bottom-right':
            tipAlignment = { alignSelf: 'flex-end' };
            tipSpecificStyle = {
                borderBottom: 'none',
                borderRight: 'none',
                borderTopColor: '#fff',
            };
            break;
        case 'left':
            tipAlignment = { alignSelf: 'center' };
            tipSpecificStyle = {
                borderLeft: 'none',
                borderRightColor: '#fff',
            };
            break;
        case 'right':
            tipAlignment = { alignSelf: 'center' };
            tipSpecificStyle = {
                borderLeftColor: '#fff',
                borderRight: 'none',
            };
            break;
    }

    const finalTipStyle = {
        ...tipStyle,
        ...tipSpecificStyle,
        ...tipAlignment,
    };

    // Return null if popup should not be visible
    if (!isVisible) {
        return null;
    }

    return (
        <div
            className={`mapboxgl-popup ${tipClassName} ${className || ''}`}
            style={popupStyle}
            onClick={handleClick}
        >
            {/* Render tip only if not center anchor */}
            {anchor !== 'center' && (
                <div className="mapboxgl-popup-tip" style={finalTipStyle} />
            )}

            {/* Popup content */}
            <div
                className="mapboxgl-popup-content"
                style={contentStyle}
                {...(focusAfterOpen && { autoFocus: true })}
            >
                {children}
                {closeButton && (
                    <button
                        className="mapboxgl-popup-close-button"
                        onClick={handleCloseClick}
                        aria-label="Close popup"
                    >
                        ×
                    </button>
                )}
            </div>
        </div>
    );
};

// Add displayName for component identification
Popup.displayName = 'Popup';