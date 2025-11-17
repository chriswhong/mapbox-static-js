import React, { useState } from 'react';
import './App.css';
import { StaticMap, Marker, CustomMarker, CircleMarker, Popup } from './lib';

// Replace with your Mapbox access token
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiY2hyaXN3aG9uZ21hcGJveCIsImEiOiJjbDl6bzJ6N3EwMGczM3BudjZmbm5yOXFnIn0.lPhc5Z5H3byF_gf_Jz48Ug';

function App() {
  const [popupVisible, setPopupVisible] = useState<string | null>(null);

  const togglePopup = (id: string) => {
    console.log('Marker clicked:', id);
    setPopupVisible(popupVisible === id ? null : id);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Mapbox Static Images React Library Demo</h1>
      <p>
        This demo showcases the StaticMap, Marker, and Popup components.
        <br />
        <strong>Note:</strong> You'll need to add your Mapbox access token to see the maps.
      </p>

      <div style={{ display: 'grid', gap: '40px', marginTop: '40px' }}>

        {/* Example 1: Center + Zoom with Default Markers */}
        <div>
          <h2>Example 1: Automatic Popup Management (NEW!)</h2>
          <p>NYC area with popups as children of markers - no state management required!</p>
          <div style={{ position: 'relative' }}>
            <StaticMap
              accessToken={MAPBOX_ACCESS_TOKEN}
              mapStyle="mapbox/streets-v11"
              center={{ lat: 40.7128, lng: -74.0060 }}
              zoom={11}
              size={{ width: 800, height: 500 }}
              attribution={true}
              style={{ border: '2px solid #ddd' }}
            >
              {/* Automatic popup management - just click the marker! */}
              <Marker 
                position={{ lat: 40.7589, lng: -73.9851 }}
                color="#ff6b6b"
                symbol="🏢"
                scale={2}
              >
                <Popup
                  offset={{ x: 0, y: 0 }}
                  closeButton
                  anchor="bottom-left"
                >
                  <strong>New York City</strong><br/>
                  The Big Apple<br/>
                  <em>Click marker to toggle - no state management needed!</em>
                </Popup>
              </Marker>

              <Marker
                position={{ lat: 40.6892, lng: -74.0445 }}
                color="#4ecdc4"
                symbol="🗽"
                scale={1}
              >
                <Popup anchor="top" offset={{ x: 0, y: -15 }}>
                  <strong>Statue of Liberty</strong><br />
                  Liberty Island<br />
                  <em>Automatically shows/hides on click!</em>
                </Popup>
              </Marker>

              <Marker
                position={{ lat: 40.7061, lng: -74.0089 }}
                color="#ffa726"
                symbol="⭐"
                scale={0.7}
              />
            </StaticMap>
            
            
          </div>
        </div>

        {/* Example 2: Bounds with Custom Markers */}
        <div>
          <h2>Example 2: Mixed Pattern - Automatic and Manual Popups</h2>
          <p>San Francisco Bay Area showing both automatic and manual popup patterns</p>
          <StaticMap
            accessToken={MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox/satellite-v9"
            bounds={{
              north: 37.8324,
              south: 37.7076,
              east: -122.3482,
              west: -122.5200
            }}
            size={{ width: 600, height: 400 }}
            attribution={true}
            style={{ border: '2px solid #ddd' }}
          >
            {/* Automatic popup management - no onClick needed */}
            <Marker position={{ lat: 37.7749, lng: -122.4194 }}>
              <div style={{
                backgroundColor: '#9c27b0',
                color: 'white',
                padding: '4px 8px',
                fontSize: '12px',
                fontWeight: 'bold',
                whiteSpace: 'nowrap'
              }}>
                San Francisco
              </div>
              <Popup anchor="bottom" offset={{ x: 0, y: -25 }}>
                <strong>San Francisco</strong><br />
                Custom styled marker<br />
                with automatic popup
              </Popup>
            </Marker>

            <Marker position={{ lat: 37.7849, lng: -122.4094 }}>
              <div style={{
                width: 20,
                height: 20,
                backgroundColor: '#f44336',
                border: '3px solid white'
              }} />
            </Marker>

            {/* Custom marker with automatic popup */}
            <CustomMarker
              position={{ lat: 37.8199, lng: -122.4783 }}
              imageUrl="https://docs.mapbox.com/help/demos/custom-markers-gl-js/mapbox-icon.png"
            >
              <Popup anchor="bottom" offset={{ x: 0, y: -45 }}>
                <strong>Golden Gate Bridge</strong><br />
                Custom marker with<br />
                automatic popup management
              </Popup>
            </CustomMarker>

            {/* Manual popup example (still works) */}
            {popupVisible === 'independent' && (
              <Popup
                position={{ lat: 37.7849, lng: -122.4094 }}
                anchor="left"
                offset={{ x: 15, y: 0 }}
              >
                <strong>Manual Popup</strong><br />
                Still supports manual state management
              </Popup>
            )}

            <Marker
              position={{ lat: 37.7849, lng: -122.4094 }}
              scale={0.7}
              color="#ffffff"
              onClick={() => togglePopup('independent')}
            />
          </StaticMap>
        </div>

        {/* Example 3: World View with Multiple Popups */}
        <div>
          <h2>Example 3: World Cities</h2>
          <p>Global view with major cities and popup variations</p>
          <StaticMap
            accessToken={MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox/dark-v11"
            center={{ lat: 20, lng: 0 }}
            zoom={1.5}
            size={{ width: 800, height: 400 }}
            attribution={true}
            style={{ border: '2px solid #ddd' }}
          >
            <Marker
              position={{ lat: 51.5074, lng: -0.1278 }}
              color="#e74c3c"
              symbol="🇬🇧"
              onClick={() => togglePopup('london')}
            />
            {popupVisible === 'london' && (
              <Popup position={{ lat: 51.5074, lng: -0.1278 }} anchor="center">
                <strong>London</strong><br />
                United Kingdom<br />
                Population: 9M
              </Popup>
            )}

            <Marker
              position={{ lat: 48.8566, lng: 2.3522 }}
              color="#3498db"
              symbol="🇫🇷"
              onClick={() => togglePopup('paris')}
            />
            {popupVisible === 'paris' && (
              <Popup position={{ lat: 48.8566, lng: 2.3522 }} anchor="left">
                <strong>Paris</strong><br />
                France<br />
                The City of Light
              </Popup>
            )}

            <Marker
              position={{ lat: 35.6762, lng: 139.6503 }}
              color="#f39c12"
              symbol="🇯🇵"
              onClick={() => togglePopup('tokyo')}
            />
            {popupVisible === 'tokyo' && (
              <Popup position={{ lat: 35.6762, lng: 139.6503 }} anchor="right">
                <strong>Tokyo</strong><br />
                Japan<br />
                Population: 14M
              </Popup>
            )}

            <Marker
              position={{ lat: -33.8688, lng: 151.2093 }}
              color="#1abc9c"
              symbol="🇦🇺"
              onClick={() => togglePopup('sydney')}
            />
            {popupVisible === 'sydney' && (
              <Popup position={{ lat: -33.8688, lng: 151.2093 }} anchor="top">
                <strong>Sydney</strong><br />
                Australia<br />
                Harbour City
              </Popup>
            )}
          </StaticMap>
        </div>

        {/* Example 4: Standalone Popups */}
        <div>
          <h2>Example 4: Standalone Popups</h2>
          <p>Popups positioned independently with their own coordinates</p>
          <StaticMap
            accessToken={MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox/outdoors-v12"
            center={{ lat: 37.7749, lng: -122.4194 }}
            zoom={12}
            size={{ width: 800, height: 500 }}
            attribution={true}
            style={{ border: '2px solid #ddd' }}
          >
            {/* Standalone popups with close buttons - dismissable without state */}
            <Popup 
              position={{ lat: 37.7849, lng: -122.4094 }} 
              anchor="bottom"
              closeButton
            >
              <strong>Financial District</strong><br />
              Downtown San Francisco<br />
              <em>Standalone popup with bottom anchor</em>
            </Popup>

            <Popup 
              position={{ lat: 37.7649, lng: -122.4294 }} 
              anchor="top-right"
              closeButton
            >
              <strong>Golden Gate Bridge Area</strong><br />
              Famous suspension bridge<br />
              <em>Top-right anchor positioning</em>
            </Popup>

            <Popup 
              position={{ lat: 37.7549, lng: -122.4094 }} 
              anchor="left"
            >
              <strong>City Hall</strong><br />
              Government building<br />
              <em>Left anchor with custom positioning</em>
            </Popup>
          </StaticMap>
        </div>

        {/* Example 5: New vs Old Popup Pattern Comparison */}
        <div>
          <h2>Example 5: New vs Old Popup Pattern Comparison</h2>
          <p>Side-by-side comparison of new automatic popup management vs old manual state management</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <h4>✨ NEW: Automatic Popup Management</h4>
              <p style={{ fontSize: '14px', color: '#666' }}>
                Simply add a Popup as a child - no onClick or state management needed!
              </p>
              <StaticMap
                accessToken={MAPBOX_ACCESS_TOKEN}
                mapStyle="mapbox/streets-v11"
                center={{ lat: 40.7128, lng: -74.0060 }}
                zoom={13}
                size={{ width: 300, height: 200 }}
                attribution={true}
                style={{ border: '1px solid #ccc' }}
              >
                <Marker
                  position={{ lat: 40.7128, lng: -74.0060 }}
                  color="#e74c3c"
                  symbol="📍"
                >
                  <Popup anchor="bottom" offset={{ x: 0, y: -30 }}>
                    <strong>Auto Popup</strong><br />
                    Click marker to toggle!<br />
                    <em>No code required</em>
                  </Popup>
                </Marker>
              </StaticMap>
              <div style={{ 
                background: '#e8f5e8', 
                padding: '10px', 
                margin: '10px 0',
                fontSize: '12px',
                fontFamily: 'monospace'
              }}>
                <strong>Code:</strong><br />
                &lt;Marker position=&#123;pos&#125;&gt;<br />
                &nbsp;&nbsp;&lt;Popup&gt;Content&lt;/Popup&gt;<br />
                &lt;/Marker&gt;
              </div>
            </div>

            <div>
              <h4>🔧 OLD: Manual State Management</h4>
              <p style={{ fontSize: '14px', color: '#666' }}>
                Requires onClick handlers and state management (still supported)
              </p>
              <StaticMap
                accessToken={MAPBOX_ACCESS_TOKEN}
                mapStyle="mapbox/streets-v11"
                center={{ lat: 40.7128, lng: -74.0060 }}
                zoom={13}
                size={{ width: 300, height: 200 }}
                attribution={true}
                style={{ border: '1px solid #ccc' }}
              >
                <Marker
                  position={{ lat: 40.7128, lng: -74.0060 }}
                  color="#3498db"
                  symbol="📍"
                  onClick={() => togglePopup('manual-popup')}
                />
                {popupVisible === 'manual-popup' && (
                  <Popup
                    position={{ lat: 40.7128, lng: -74.0060 }}
                    anchor="bottom"
                    offset={{ x: 0, y: -30 }}
                  >
                    <strong>Manual Popup</strong><br />
                    Requires state management<br />
                    <em>More flexible positioning</em>
                  </Popup>
                )}
              </StaticMap>
              <div style={{ 
                background: '#fff5e6', 
                padding: '10px', 
                margin: '10px 0',
                fontSize: '12px',
                fontFamily: 'monospace'
              }}>
                <strong>Code:</strong><br />
                &lt;Marker onClick=&#123;toggle&#125; /&gt;<br />
                &#123;visible && &lt;Popup position=&#123;pos&#125;&gt;...&lt;/Popup&gt;&#125;
              </div>
            </div>
          </div>
        </div>

        {/* Example 7: CircleMarker Examples */}
        <div>
          <h2>Example 7: CircleMarker Components</h2>
          <p>Circular markers with customizable stroke and fill</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>            
            {/* Basic Circle Markers */}
            <div>
              <h4>Basic Circle Markers</h4>
              <StaticMap
                accessToken={MAPBOX_ACCESS_TOKEN}
                mapStyle="mapbox/light-v11"
                center={{ lat: 40.7128, lng: -74.0060 }}
                zoom={11}
                size={{ width: 400, height: 300 }}
                attribution={true}
                style={{ border: '1px solid #ccc' }}
              >
                <CircleMarker 
                  position={{ lat: 40.7328, lng: -74.0160 }} 
                  radius={8} 
                  color="#e74c3c" 
                  strokeColor="#ffffff" 
                  strokeWidth={2}
                />
                <CircleMarker 
                  position={{ lat: 40.7128, lng: -73.9960 }} 
                  radius={12} 
                  color="#3498db" 
                  strokeColor="#2c3e50" 
                  strokeWidth={3}
                />
                <CircleMarker 
                  position={{ lat: 40.6928, lng: -74.0260 }} 
                  radius={6} 
                  color="#2ecc71" 
                  strokeColor="#ffffff" 
                  strokeWidth={1}
                />
                <CircleMarker 
                  position={{ lat: 40.7228, lng: -73.9860 }} 
                  radius={15} 
                  color="#f39c12" 
                  strokeColor="#e67e22" 
                  strokeWidth={4}
                />
              </StaticMap>
            </div>
            
            {/* Circle Markers with Opacity */}
            <div>
              <h4>Circle Markers with Opacity</h4>
              <StaticMap
                accessToken={MAPBOX_ACCESS_TOKEN}
                mapStyle="mapbox/dark-v11"
                center={{ lat: 40.7128, lng: -74.0060 }}
                zoom={11}
                size={{ width: 400, height: 300 }}
                attribution={true}
                style={{ border: '1px solid #ccc' }}
              >
                <CircleMarker 
                  position={{ lat: 40.7328, lng: -74.0160 }} 
                  radius={20} 
                  color="#e74c3c" 
                  strokeColor="#ffffff" 
                  strokeWidth={3}
                  opacity={0.7}
                  strokeOpacity={0.9}
                />
                <CircleMarker 
                  position={{ lat: 40.7128, lng: -73.9960 }} 
                  radius={16} 
                  color="#3498db" 
                  strokeColor="#ecf0f1" 
                  strokeWidth={2}
                  opacity={0.5}
                  strokeOpacity={0.8}
                />
                <CircleMarker 
                  position={{ lat: 40.6928, lng: -74.0260 }} 
                  radius={12} 
                  color="#2ecc71" 
                  strokeColor="#ffffff" 
                  strokeWidth={1}
                  opacity={0.8}
                />
              </StaticMap>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>            
            {/* Circle Markers with Popups */}
            <div>
              <h4>Circle Markers with Automatic Popups</h4>
              <StaticMap
                accessToken={MAPBOX_ACCESS_TOKEN}
                mapStyle="mapbox/streets-v11"
                center={{ lat: 40.7128, lng: -74.0060 }}
                zoom={12}
                size={{ width: 400, height: 300 }}
                attribution={true}
                style={{ border: '1px solid #ccc' }}
              >
                <CircleMarker 
                  position={{ lat: 40.7228, lng: -74.0060 }} 
                  radius={10} 
                  color="#9b59b6" 
                  strokeColor="#ffffff" 
                  strokeWidth={2}
                >
                  <Popup anchor="bottom">
                    <strong>Circle Marker 1</strong><br />
                    Radius: 10px<br />
                    Color: Purple
                  </Popup>
                </CircleMarker>
                
                <CircleMarker 
                  position={{ lat: 40.7028, lng: -74.0060 }} 
                  radius={15} 
                  color="#1abc9c" 
                  strokeColor="#16a085" 
                  strokeWidth={3}
                >
                  <Popup anchor="top">
                    <strong>Circle Marker 2</strong><br />
                    Radius: 15px<br />
                    Color: Teal
                  </Popup>
                </CircleMarker>
              </StaticMap>
            </div>
            
            {/* No Stroke Circle Markers */}
            <div>
              <h4>No Stroke & Custom Styling</h4>
              <StaticMap
                accessToken={MAPBOX_ACCESS_TOKEN}
                mapStyle="mapbox/satellite-v9"
                center={{ lat: 40.7128, lng: -74.0060 }}
                zoom={11}
                size={{ width: 400, height: 300 }}
                attribution={true}
                style={{ border: '1px solid #ccc' }}
              >
                <CircleMarker 
                  position={{ lat: 40.7328, lng: -74.0160 }} 
                  radius={8} 
                  color="#ff6b6b" 
                  strokeWidth={0}
                />
                <CircleMarker 
                  position={{ lat: 40.7128, lng: -73.9960 }} 
                  radius={12} 
                  color="#4ecdc4" 
                  strokeWidth={0}
                />
                <CircleMarker 
                  position={{ lat: 40.6928, lng: -74.0260 }} 
                  radius={6} 
                  color="#45b7d1" 
                  strokeWidth={0}
                />
                <CircleMarker 
                  position={{ lat: 40.7228, lng: -73.9860 }} 
                  radius={18} 
                  color="#f9ca24" 
                  strokeColor="#f0932b" 
                  strokeWidth={6}
                  style={{
                    boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
                  }}
                />
              </StaticMap>
            </div>
          </div>
        </div>

        {/* Example 6: Small Maps Grid */}
        <div>
          <h2>Example 6: Small Maps Grid</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            <div>
              <h4>Standard Quality (retina=false)</h4>
              <StaticMap
                accessToken={MAPBOX_ACCESS_TOKEN}
                mapStyle="mapbox/streets-v11"
                center={{ lat: 40.7128, lng: -74.0060 }}
                zoom={12}
                size={{ width: 200, height: 150 }}
                retina={false}
                attribution={true}
                style={{ border: '1px solid #ccc' }}
              >
                <Marker
                  position={{ lat: 40.7128, lng: -74.0060 }}
                  scale={0.7}
                  color="#e74c3c"
                />
              </StaticMap>
            </div>

            <div>
              <h4>Satellite View</h4>
              <StaticMap
                accessToken={MAPBOX_ACCESS_TOKEN}
                mapStyle="mapbox/satellite-v9"
                center={{ lat: 37.7749, lng: -122.4194 }}
                zoom={12}
                size={{ width: 200, height: 150 }}
                attribution={true}
                style={{ border: '1px solid #ccc' }}
              >
                <Marker
                  position={{ lat: 37.7749, lng: -122.4194 }}
                  scale={0.7}
                  color="#ffffff"
                  symbol="📍"
                />
              </StaticMap>
            </div>

            <div>
              <h4>Dark Theme</h4>
              <StaticMap
                accessToken={MAPBOX_ACCESS_TOKEN}
                mapStyle="mapbox/dark-v10"
                center={{ lat: 51.5074, lng: -0.1278 }}
                zoom={12}
                size={{ width: 200, height: 150 }}
                attribution={true}
                style={{ border: '1px solid #ccc' }}
              >
                <Marker
                  position={{ lat: 51.5074, lng: -0.1278 }}
                  scale={0.7}
                  color="#00ff00"
                />
              </StaticMap>
            </div>

            {/* Example 8: Comprehensive Popup Examples */}
            <div>
              <h2>Example 8: Comprehensive Popup Examples</h2>
              <p>Showcasing all popup features and anchor positions</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                {/* All Anchor Positions */}
                <div>
                  <h4>All Anchor Positions</h4>
                  <StaticMap
                    accessToken={MAPBOX_ACCESS_TOKEN}
                    mapStyle="mapbox/light-v11"
                    center={{ lat: 40.7128, lng: -74.0060 }}
                    zoom={10}
                    size={{ width: 400, height: 300 }}
                    attribution={true}
                    style={{ border: '1px solid #ccc' }}
                  >
                    {/* Center anchor */}
                    <Marker position={{ lat: 40.7128, lng: -74.0060 }} onClick={() => togglePopup('center-anchor')}>
                      {popupVisible === 'center-anchor' && (
                        <Popup anchor="center">
                          <strong>Center Anchor</strong><br />
                          No arrow, centered positioning
                        </Popup>
                      )}
                    </Marker>

                    {/* Top anchors */}
                    <Marker position={{ lat: 40.7328, lng: -74.0260 }} color="#e74c3c" onClick={() => togglePopup('top-anchor')}>
                      {popupVisible === 'top-anchor' && (
                        <Popup anchor="top">
                          <strong>Top Anchor</strong><br />
                          Arrow points up
                        </Popup>
                      )}
                    </Marker>

                    <Marker position={{ lat: 40.7328, lng: -73.9860 }} color="#3498db" onClick={() => togglePopup('top-left-anchor')}>
                      {popupVisible === 'top-left-anchor' && (
                        <Popup anchor="top-left">
                          <strong>Top-Left Anchor</strong><br />
                          Arrow at top-left
                        </Popup>
                      )}
                    </Marker>

                    <Marker position={{ lat: 40.7328, lng: -73.9660 }} color="#f39c12" onClick={() => togglePopup('top-right-anchor')}>
                      {popupVisible === 'top-right-anchor' && (
                        <Popup anchor="top-right">
                          <strong>Top-Right Anchor</strong><br />
                          Arrow at top-right
                        </Popup>
                      )}
                    </Marker>

                    {/* Bottom anchors */}
                    <Marker position={{ lat: 40.6928, lng: -74.0260 }} color="#9b59b6" onClick={() => togglePopup('bottom-anchor')}>
                      {popupVisible === 'bottom-anchor' && (
                        <Popup anchor="bottom">
                          <strong>Bottom Anchor</strong><br />
                          Arrow points down
                        </Popup>
                      )}
                    </Marker>

                    <Marker position={{ lat: 40.6928, lng: -73.9860 }} color="#1abc9c" onClick={() => togglePopup('bottom-left-anchor')}>
                      {popupVisible === 'bottom-left-anchor' && (
                        <Popup anchor="bottom-left">
                          <strong>Bottom-Left</strong><br />
                          Arrow at bottom-left
                        </Popup>
                      )}
                    </Marker>

                    <Marker position={{ lat: 40.6928, lng: -73.9660 }} color="#e67e22" onClick={() => togglePopup('bottom-right-anchor')}>
                      {popupVisible === 'bottom-right-anchor' && (
                        <Popup anchor="bottom-right">
                          <strong>Bottom-Right</strong><br />
                          Arrow at bottom-right
                        </Popup>
                      )}
                    </Marker>

                    {/* Left and right anchors */}
                    <Marker position={{ lat: 40.7128, lng: -74.0460 }} color="#34495e" onClick={() => togglePopup('left-anchor')}>
                      {popupVisible === 'left-anchor' && (
                        <Popup anchor="left">
                          <strong>Left Anchor</strong><br />
                          Arrow points left
                        </Popup>
                      )}
                    </Marker>

                    <Marker position={{ lat: 40.7128, lng: -73.9460 }} color="#95a5a6" onClick={() => togglePopup('right-anchor')}>
                      {popupVisible === 'right-anchor' && (
                        <Popup anchor="right">
                          <strong>Right Anchor</strong><br />
                          Arrow points right
                        </Popup>
                      )}
                    </Marker>
                  </StaticMap>
                </div>

                {/* Different Offset Types */}
                <div>
                  <h4>Different Offset Types</h4>
                  <StaticMap
                    accessToken={MAPBOX_ACCESS_TOKEN}
                    mapStyle="mapbox/light-v11"
                    center={{ lat: 40.7128, lng: -74.0060 }}
                    zoom={11}
                    size={{ width: 400, height: 300 }}
                    attribution={true}
                    style={{ border: '1px solid #ccc' }}
                  >
                    {/* Single number offset */}
                    <Marker position={{ lat: 40.7228, lng: -74.0160 }} color="#e74c3c" onClick={() => togglePopup('single-offset')}>
                      {popupVisible === 'single-offset' && (
                        <Popup anchor="bottom" offset={20}>
                          <strong>Single Number Offset</strong><br />
                          offset=20 (applies to all directions)
                        </Popup>
                      )}
                    </Marker>

                    {/* PointLike offset */}
                    <Marker position={{ lat: 40.7028, lng: -74.0160 }} color="#3498db" onClick={() => togglePopup('point-offset')}>
                      {popupVisible === 'point-offset' && (
                        <Popup anchor="bottom" offset={{ x: 30, y: -10 }}>
                          <strong>PointLike Offset</strong><br />
                          offset=&#123;&#123;x: 30, y: -10&#125;&#125;
                        </Popup>
                      )}
                    </Marker>

                    {/* Anchor-specific offsets */}
                    <Marker position={{ lat: 40.7128, lng: -73.9960 }} color="#f39c12" onClick={() => togglePopup('anchor-specific-offset')}>
                      {popupVisible === 'anchor-specific-offset' && (
                        <Popup
                          anchor="left"
                          offset={{
                            left: { x: 15, y: 0 },
                            right: { x: -15, y: 0 },
                            top: { x: 0, y: 15 },
                            bottom: { x: 0, y: -15 }
                          }}
                        >
                          <strong>Anchor-Specific Offset</strong><br />
                          Different offsets per anchor
                        </Popup>
                      )}
                    </Marker>
                  </StaticMap>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {/* Close Button Example */}
                <div>
                  <h4>Close Button & Max Width</h4>
                  <StaticMap
                    accessToken={MAPBOX_ACCESS_TOKEN}
                    mapStyle="mapbox/light-v11"
                    center={{ lat: 40.7128, lng: -74.0060 }}
                    zoom={12}
                    size={{ width: 400, height: 800 }}
                    attribution={true}
                    style={{ border: '1px solid #ccc' }}
                  >
                    <Marker position={{ lat: 40.7128, lng: -74.0060 }} onClick={() => togglePopup('close-button')}>
                      {popupVisible === 'close-button' && (
                        <Popup
                          anchor="bottom"
                          closeButton={true}
                          maxWidth="300px"
                          onClose={() => setPopupVisible(null)}
                        >
                          <strong>Popup with Close Button</strong><br />
                          This popup has a close button in the top-right corner and a max width of 300px.
                          You can also set maxWidth to 'none' for unlimited width.
                        </Popup>
                      )}
                    </Marker>
                  </StaticMap>
                </div>

                {/* Custom Styling */}
                <div>
                  <h4>Custom Styling</h4>
                  <StaticMap
                    accessToken={MAPBOX_ACCESS_TOKEN}
                    mapStyle="mapbox/dark-v11"
                    center={{ lat: 40.7128, lng: -74.0060 }}
                    zoom={12}
                    size={{ width: 400, height: 300 }}
                    attribution={true}
                    style={{ border: '1px solid #ccc' }}
                  >
                    <Marker position={{ lat: 40.7128, lng: -74.0060 }} color="#00ff00" onClick={() => togglePopup('custom-style')}>
                      {popupVisible === 'custom-style' && (
                        <Popup
                          anchor="bottom"
                          className="custom-popup"
                          style={{
                            filter: 'drop-shadow(0 4px 8px rgba(0,255,0,0.3))',
                          }}
                        >
                          <div style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            padding: '15px',
                            textAlign: 'center',
                            margin: '-10px -10px -15px',
                          }}>
                            <strong>🎨 Custom Styled Popup</strong><br />
                            <small>With gradient background and custom CSS</small>
                          </div>
                        </Popup>
                      )}
                    </Marker>
                  </StaticMap>
                </div>
              </div>

              <div style={{ marginTop: '20px' }}>
                <h4>Rich Content Example</h4>
                <StaticMap
                  accessToken={MAPBOX_ACCESS_TOKEN}
                  mapStyle="mapbox/outdoors-v12"
                  center={{ lat: 40.7389, lng: -73.9857 }}
                  zoom={13}
                  size={{ width: 600, height: 500 }}
                  attribution={true}
                  style={{ border: '1px solid #ccc' }}
                >
                  <Marker position={{ lat: 40.7289, lng: -73.9857 }} color="#ff4757" onClick={() => togglePopup('rich-content')}>
                    {popupVisible === 'rich-content' && (
                      <Popup
                        anchor="bottom"
                        closeButton={true}
                        maxWidth="350px"
                        onClose={() => setPopupVisible(null)}
                      >
                        <div style={{ fontSize: '14px', lineHeight: '1.4' }}>
                          <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>Times Square</h3>
                          <img
                            src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=300&h=150&fit=crop&crop=entropy&cs=tinysrgb"
                            alt="Times Square"
                            style={{ width: '100%', height: '120px', objectFit: 'cover', marginBottom: '10px' }}
                          />
                          <p style={{ margin: '0 0 10px 0', color: '#555' }}>
                            The bustling heart of Manhattan, known for its bright lights, Broadway theaters, and endless energy.
                          </p>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '12px', color: '#888' }}>📍 Manhattan, NY</span>
                            <button style={{
                              background: '#3498db',
                              color: 'white',
                              border: 'none',
                              padding: '5px 10px',
                              fontSize: '12px',
                              cursor: 'pointer'
                            }}>
                              Learn More
                            </button>
                          </div>
                        </div>
                      </Popup>
                    )}
                  </Marker>
                </StaticMap>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f8f9fa' }}>
            <h3>Getting Started</h3>
            <p>To use this library with your own maps:</p>
            <ol>
              <li>Sign up for a free Mapbox account at <a href="https://account.mapbox.com/" target="_blank">https://account.mapbox.com/</a></li>
              <li>Get your access token from the Mapbox dashboard</li>
              <li>Replace <code>MAPBOX_ACCESS_TOKEN</code> in this demo with your token</li>
              <li>Start building amazing static map experiences!</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;     
