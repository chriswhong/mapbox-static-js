import { StaticMap, Marker, Popup } from '../lib';

/**
 * @title Multiple Popups
 * @description Multiple markers each with their own popup content
 * @category Popup
 */
export function MultiplePopupsExample({ accessToken }: { accessToken: string }) {
  const restaurants = [
    {
      id: 1,
      name: "Luigi's Italian",
      position: { lat: 40.7505, lng: -73.9934 },
      cuisine: "Italian",
      rating: "4.8",
      price: "$$",
      color: "#e74c3c"
    },
    {
      id: 2,
      name: "Sakura Sushi",
      position: { lat: 40.7518, lng: -73.9876 },
      cuisine: "Japanese",
      rating: "4.6",
      price: "$$$",
      color: "#9b59b6"
    },
    {
      id: 3,
      name: "Taco Libre",
      position: { lat: 40.7489, lng: -73.9903 },
      cuisine: "Mexican",
      rating: "4.4",
      price: "$",
      color: "#f39c12"
    }
  ];

  return (
    <StaticMap
      accessToken={accessToken}
      mapStyle="mapbox/streets-v12"
      center={{ lat: 40.7505, lng: -73.9903 }}
      zoom={16}
      size={{ width: 600, height: 400 }}
      attribution={true}
      style={{ border: '1px solid #ccc', borderRadius: '8px' }}
    >
      {restaurants.map((restaurant) => (
        <Marker 
          key={restaurant.id}
          position={restaurant.position}
          color={restaurant.color}
        >
          <Popup>
            <div style={{ 
              padding: '12px', 
              minWidth: '180px',
              fontFamily: 'system-ui, sans-serif'
            }}>
              <h3 style={{ 
                margin: '0 0 8px 0', 
                fontSize: '16px',
                color: '#2c3e50'
              }}>
                {restaurant.name}
              </h3>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <span style={{ 
                  background: '#ecf0f1', 
                  color: '#34495e', 
                  padding: '2px 6px', 
                  borderRadius: '4px', 
                  fontSize: '12px'
                }}>
                  {restaurant.cuisine}
                </span>
                <span style={{ 
                  color: '#27ae60', 
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}>
                  ⭐ {restaurant.rating}
                </span>
              </div>
              
              <div style={{ 
                color: '#7f8c8d', 
                fontSize: '14px',
                fontWeight: '500'
              }}>
                Price: {restaurant.price}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </StaticMap>
  );
}