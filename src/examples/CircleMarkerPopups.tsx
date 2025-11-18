import { StaticMap, CircleMarker, Popup } from '../lib';

/**
 * @title Circle Markers with Popups
 * @description Interactive circle markers that show detailed information on click
 * @category CircleMarker
 * @difficulty intermediate
 */
export function CircleMarkerPopupsExample({ accessToken }: { accessToken: string }) {
  const weatherStations = [
    {
      id: 1,
      name: "Downtown Station",
      position: { lat: 40.7589, lng: -73.9851 },
      temperature: 72,
      humidity: 65,
      windSpeed: 8,
      condition: "Sunny"
    },
    {
      id: 2,
      name: "Central Park",
      position: { lat: 40.7829, lng: -73.9654 },
      temperature: 70,
      humidity: 72,
      windSpeed: 6,
      condition: "Partly Cloudy"
    },
    {
      id: 3,
      name: "Brooklyn Bridge",
      position: { lat: 40.7061, lng: -73.9969 },
      temperature: 74,
      humidity: 58,
      windSpeed: 12,
      condition: "Clear"
    }
  ];

  const getTemperatureColor = (temp: number) => {
    if (temp >= 75) return '#e74c3c'; // Hot - Red
    if (temp >= 65) return '#f39c12'; // Warm - Orange
    if (temp >= 55) return '#f1c40f'; // Mild - Yellow
    return '#3498db'; // Cool - Blue
  };

  return (
    <StaticMap
      accessToken={accessToken}
      mapStyle="mapbox/streets-v12"
      center={{ lat: 40.7505, lng: -73.9760 }}
      zoom={13}
      size={{ width: 600, height: 400 }}
      attribution={true}
      style={{ border: '1px solid #ccc', borderRadius: '8px' }}
    >
      {weatherStations.map((station) => (
        <CircleMarker
          key={station.id}
          position={station.position}
          radius={18}
          color={getTemperatureColor(station.temperature)}
          strokeColor="#fff"
          strokeWidth={3}
          opacity={0.8}
        >
          <Popup>
            <div style={{ 
              padding: '16px', 
              minWidth: '200px',
              fontFamily: 'system-ui, sans-serif'
            }}>
              <h3 style={{ 
                margin: '0 0 12px 0', 
                fontSize: '16px',
                color: '#2c3e50',
                display: 'flex',
                alignItems: 'center'
              }}>
                🌡️ {station.name}
              </h3>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
                marginBottom: '12px'
              }}>
                <div style={{ 
                  background: '#ecf0f1', 
                  padding: '8px', 
                  borderRadius: '6px',
                  textAlign: 'center'
                }}>
                  <div style={{ 
                    fontSize: '20px', 
                    fontWeight: 'bold',
                    color: getTemperatureColor(station.temperature)
                  }}>
                    {station.temperature}°F
                  </div>
                  <div style={{ fontSize: '12px', color: '#7f8c8d' }}>
                    Temperature
                  </div>
                </div>
                
                <div style={{ 
                  background: '#ecf0f1', 
                  padding: '8px', 
                  borderRadius: '6px',
                  textAlign: 'center'
                }}>
                  <div style={{ 
                    fontSize: '20px', 
                    fontWeight: 'bold',
                    color: '#3498db'
                  }}>
                    {station.humidity}%
                  </div>
                  <div style={{ fontSize: '12px', color: '#7f8c8d' }}>
                    Humidity
                  </div>
                </div>
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <span style={{ color: '#34495e', fontSize: '14px' }}>
                  Wind: {station.windSpeed} mph
                </span>
                <span style={{ 
                  background: '#e8f5e8', 
                  color: '#27ae60', 
                  padding: '4px 8px', 
                  borderRadius: '12px', 
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  {station.condition}
                </span>
              </div>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </StaticMap>
  );
}