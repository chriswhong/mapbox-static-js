import React, { useState, useCallback, useMemo } from 'react';
import type { StaticMapProps, StaticMapContextValue, LatLng, Bounds } from '../types';
import { generateStaticMapUrl } from '../utils/mapbox';
import { latLngToPixel, calculateBoundsFromCenterZoom } from '../utils/projection';
import { StaticMapContext } from './context';

export const StaticMap: React.FC<StaticMapProps> = ({
    accessToken,
    mapStyle,
    center,
    zoom,
    bounds,
    size,
    bearing = 0,
    pitch = 0,
    retina = true,
    attribution = true,
    logo = true,
    children,
    onLoad,
    onError,
    className,
    style,
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [imageError, setImageError] = useState<Error | null>(null);

    // Calculate bounds and position
    const { calculatedBounds, imageUrl } = useMemo(() => {
        let calculatedBounds: Bounds;

        if (bounds) {
            calculatedBounds = bounds;
        } else if (center && zoom !== undefined) {
            calculatedBounds = calculateBoundsFromCenterZoom(center, zoom, size);
        } else {
            throw new Error('Either bounds or center+zoom must be provided');
        }

        const imageUrl = generateStaticMapUrl({
            accessToken,
            mapStyle,
            center: center && zoom !== undefined ? center : undefined,
            zoom: center && zoom !== undefined ? zoom : undefined,
            bounds: bounds,
            size,
            bearing,
            pitch,
            retina,
            _attribution: attribution,
            logo,
        });

        return { calculatedBounds, imageUrl };
    }, [accessToken, mapStyle, center, zoom, bounds, size, bearing, pitch, retina, attribution, logo]);

    // Coordinate conversion function
    const latLngToPixelConverted = useCallback(
        (latLng: LatLng) => {
            if (!calculatedBounds) return { x: 0, y: 0 };
            return latLngToPixel(latLng, calculatedBounds, size);
        },
        [calculatedBounds, size]
    );

    // Context value
    const contextValue: StaticMapContextValue = useMemo(
        () => ({
            bounds: calculatedBounds,
            size,
            latLngToPixel: latLngToPixelConverted,
            accessToken,
            isLoaded,
        }),
        [calculatedBounds, size, latLngToPixelConverted, accessToken, isLoaded]
    );

    // Handle image load
    const handleImageLoad = useCallback(() => {
        setIsLoaded(true);
        setImageError(null);
        onLoad?.();
    }, [onLoad]);

    // Handle image error
    const handleImageError = useCallback(() => {
        const error = new Error('Failed to load static map image');
        setImageError(error);
        setIsLoaded(false);
        onError?.(error);
    }, [onError]);

    return (
        <StaticMapContext.Provider value={contextValue}>
            <div
                className={`mapbox-static-map ${className || ''}`}
                style={{
                    width: size.width,
                    height: size.height,
                    ...style,
                }}
            >
                <img
                    key={imageUrl} // Force re-render when URL changes
                    src={imageUrl}
                    alt="Static map"
                    className="mapbox-static-map-image"
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                />
                {isLoaded && !imageError && children}
                {imageError && (
                    <div className="mapbox-static-map-error">
                        Failed to load map
                    </div>
                )}
                <div className="mapboxgl-control-container">
                    <div className="mapboxgl-ctrl-bottom-right">
                        <div className="mapboxgl-ctrl mapboxgl-ctrl-attrib">
                            <div className="mapboxgl-ctrl-attrib-inner">
                                <a href="https://www.mapbox.com/about/maps" target="_blank" title="Mapbox" aria-label="Mapbox">© Mapbox</a>
                                &nbsp;
                                <a href="https://www.openstreetmap.org/copyright/" target="_blank" title="OpenStreetMap" aria-label="OpenStreetMap">© OpenStreetMap</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </StaticMapContext.Provider>
    );
};