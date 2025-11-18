import { StaticMap, CircleMarker } from '../lib';

/**
 * @title Data Visualization
 * @description Circle markers representing data points with size based on values
 * @category CircleMarker
 * @difficulty intermediate
 */
export function DataVisualizationExample({ accessToken }: { accessToken: string }) {
  const earthquakeData = [
    { lat: 36.7783, lng: -119.4179, magnitude: 6.2, depth: 15 },
    { lat: 35.3733, lng: -118.5794, magnitude: 4.8, depth: 8 },
    { lat: 37.4419, lng: -122.1430, magnitude: 3.2, depth: 12 },
    { lat: 34.0522, lng: -118.2437, magnitude: 5.1, depth: 6 },
    { lat: 36.1627, lng: -115.1627, magnitude: 2.9, depth: 18 },
    { lat: 38.5816, lng: -121.4944, magnitude: 4.3, depth: 10 }
  ];

  const getRadius = (magnitude: number) => Math.max(magnitude * 4, 5);
  
  const getColor = (magnitude: number) => {
    if (magnitude >= 6) return '#e74c3c'; // Red for strong
    if (magnitude >= 4) return '#f39c12'; // Orange for moderate  
    if (magnitude >= 3) return '#f1c40f'; // Yellow for light
    return '#2ecc71'; // Green for minor
  };
  
  const getOpacity = (depth: number) => Math.max(0.3, 1 - depth / 20);

  return (
    <StaticMap
      accessToken={accessToken}
      mapStyle="mapbox/satellite-streets-v12"
      center={{ lat: 36.7783, lng: -119.4179 }}
      zoom={6}
      size={{ width: 600, height: 400 }}
      attribution={true}
      style={{ border: '1px solid #ccc', borderRadius: '8px' }}
    >
      {earthquakeData.map((earthquake, index) => (
        <CircleMarker
          key={index}
          position={{ lat: earthquake.lat, lng: earthquake.lng }}
          radius={getRadius(earthquake.magnitude)}
          color={getColor(earthquake.magnitude)}
          strokeColor="#fff"
          strokeWidth={1}
          opacity={getOpacity(earthquake.depth)}
        />
      ))}
      
      {/* Legend */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '12px',
        borderRadius: '6px',
        fontSize: '12px',
        fontFamily: 'system-ui, sans-serif',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Earthquake Magnitude</div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
          <div style={{ 
            width: '12px', 
            height: '12px', 
            background: '#e74c3c', 
            borderRadius: '50%', 
            marginRight: '8px' 
          }} />
          6.0+ Strong
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
          <div style={{ 
            width: '12px', 
            height: '12px', 
            background: '#f39c12', 
            borderRadius: '50%', 
            marginRight: '8px' 
          }} />
          4.0-5.9 Moderate
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
          <div style={{ 
            width: '12px', 
            height: '12px', 
            background: '#f1c40f', 
            borderRadius: '50%', 
            marginRight: '8px' 
          }} />
          3.0-3.9 Light
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ 
            width: '12px', 
            height: '12px', 
            background: '#2ecc71', 
            borderRadius: '50%', 
            marginRight: '8px' 
          }} />
          &lt;3.0 Minor
        </div>
      </div>
    </StaticMap>
  );
}