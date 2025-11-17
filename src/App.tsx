import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { StaticMap, Marker, Popup, CircleMarker } from './lib';

// Replace this with your actual Mapbox access token
const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || 'your_mapbox_access_token_here';

// Component for section headers
interface SectionHeaderProps {
  title: string;
  description: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description }) => (
  <div style={{ marginTop: '48px', marginBottom: '32px' }}>
    <h2 style={{ 
      margin: '0 0 8px 0', 
      fontSize: '2rem', 
      fontWeight: 700,
      color: '#212529'
    }}>
      {title}
    </h2>
    <p style={{ 
      margin: 0, 
      fontSize: '1.1rem', 
      color: '#6c757d',
      lineHeight: 1.5
    }}>
      {description}
    </p>
  </div>
);

// Component for individual examples
interface ExampleProps {
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  code: string;
  children: React.ReactNode;
}

const Example: React.FC<ExampleProps> = ({ 
  title, 
  description, 
  category, 
  difficulty, 
  code, 
  children 
}) => {
  const difficultyColors = {
    beginner: '#28a745',
    intermediate: '#ffc107',
    advanced: '#dc3545'
  };

  return (
    <div style={{
      marginBottom: '32px',
      border: '1px solid #e9ecef',
      borderRadius: '8px',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #e9ecef'
      }}>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '1.25rem', fontWeight: 600 }}>
              {title}
            </h3>
            <p style={{ margin: '0 0 8px 0', fontSize: '0.95rem', color: '#6c757d' }}>
              {description}
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span style={{
                backgroundColor: difficultyColors[difficulty],
                color: 'white',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: 500
              }}>
                {difficulty}
              </span>
              <span style={{
                backgroundColor: '#6c757d',
                color: 'white',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: 500
              }}>
                {category}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 50/50 layout: Implementation left, Code right */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '300px' }}>
        {/* Implementation */}
        <div style={{ padding: '20px', borderRight: '1px solid #e9ecef' }}>
          {children}
        </div>
        
        {/* Code */}
        <div style={{ backgroundColor: '#2d3748' }}>
          <CodeMirror
            value={code}
            theme={oneDark}
            extensions={[javascript({ jsx: true })]}
            editable={false}
            basicSetup={{
              lineNumbers: true,
              foldGutter: false,
              dropCursor: false,
              allowMultipleSelections: false,
              indentOnInput: false
            }}
            style={{
              fontSize: '0.875rem',
              fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default function App() {

  return (
    <div style={{ 
      padding: '40px 20px', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <div>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: 700, 
            margin: '0 0 16px 0',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Mapbox Static React
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            color: '#6c757d', 
            margin: '0 0 24px 0',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: 1.6
          }}>
            A comprehensive React library for creating beautiful static maps with markers, popups, and automatic interaction management.
          </p>
          <div style={{
            display: 'inline-flex',
            gap: '16px',
            backgroundColor: '#e3f2fd',
            padding: '16px 24px',
            borderRadius: '8px',
            borderLeft: '4px solid #2196f3'
          }}>
            <span style={{ fontSize: '1.5rem' }}>✨</span>
            <div>
              <strong style={{ color: '#1976d2' }}>New in v2.0:</strong> Automatic popup management! 
              Simply add a Popup as a child of any Marker - no state management required.
            </div>
          </div>
        </div>

        {/* StaticMap Examples */}
        <SectionHeader 
          title="StaticMap Examples" 
          description="Learn the basics of creating static maps with different configurations"
        />
        
        <Example
          title="Basic Usage"
          description="Simple map with center coordinates and zoom level"
          category="StaticMap"
          difficulty="beginner"
          code={`<StaticMap
  accessToken="YOUR_MAPBOX_TOKEN"
  mapStyle="mapbox/streets-v12"
  center={{ lat: 40.7128, lng: -74.0060 }}
  zoom={12}
  size={{ width: 400, height: 300 }}
  attribution={true}
  style={{ border: '1px solid #ccc', borderRadius: '8px' }}
/>`}
        >
          <StaticMap
            accessToken={MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox/standard"
            center={{ lat: 40.7128, lng: -74.0060 }}
            zoom={12}
            size={{ width: 400, height: 300 }}
            attribution={true}
            style={{ border: '1px solid #ccc', borderRadius: '8px' }}
          />
        </Example>

        <Example
          title="Satellite View"
          description="High-resolution satellite imagery perfect for geographical analysis"
          category="StaticMap"
          difficulty="beginner"
          code={`<StaticMap
  accessToken="YOUR_MAPBOX_TOKEN"
  mapStyle="mapbox/satellite-streets-v12"
  center={{ lat: 37.7749, lng: -122.4194 }}
  zoom={14}
  size={{ width: 500, height: 400 }}
  attribution={true}
  style={{ border: '1px solid #ccc', borderRadius: '8px' }}
/>`}
        >
          <StaticMap
            accessToken={MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox/satellite-streets-v12"
            center={{ lat: 37.7749, lng: -122.4194 }}
            zoom={14}
            size={{ width: 500, height: 400 }}
            attribution={true}
            style={{ border: '1px solid #ccc', borderRadius: '8px' }}
          />
        </Example>
        
        <Example
          title="Different Map Styles"
          description="Showcase different Mapbox map styles in a grid layout"
          category="StaticMap"
          difficulty="beginner"
          code={`<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
  <div>
    <h5>Streets</h5>
    <StaticMap
      accessToken={MAPBOX_ACCESS_TOKEN}
      mapStyle="mapbox/streets-v12"
      center={{ lat: 40.7128, lng: -74.0060 }}
      zoom={12}
      size={{ width: 250, height: 180 }}
      attribution={true}
      style={{ border: '1px solid #ccc', borderRadius: '6px' }}
    />
  </div>
  <div>
    <h5>Satellite</h5>
    <StaticMap
      accessToken={MAPBOX_ACCESS_TOKEN}
      mapStyle="mapbox/satellite-v9"
      center={{ lat: 40.7128, lng: -74.0060 }}
      zoom={12}
      size={{ width: 250, height: 180 }}
      attribution={true}
      style={{ border: '1px solid #ccc', borderRadius: '6px' }}
    />
  </div>
  <div>
    <h5>Dark</h5>
    <StaticMap
      accessToken={MAPBOX_ACCESS_TOKEN}
      mapStyle="mapbox/dark-v11"
      center={{ lat: 40.7128, lng: -74.0060 }}
      zoom={12}
      size={{ width: 250, height: 180 }}
      attribution={true}
      style={{ border: '1px solid #ccc', borderRadius: '6px' }}
    />
  </div>
</div>`}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            <div>
              <h5 style={{ margin: '0 0 8px 0', fontSize: '0.9rem', fontWeight: 600 }}>Streets</h5>
              <StaticMap
                accessToken={MAPBOX_ACCESS_TOKEN}
                mapStyle="mapbox/streets-v12"
                center={{ lat: 40.7128, lng: -74.0060 }}
                zoom={12}
                size={{ width: 250, height: 180 }}
                attribution={true}
                style={{ border: '1px solid #ccc', borderRadius: '6px' }}
              />
            </div>
            <div>
              <h5 style={{ margin: '0 0 8px 0', fontSize: '0.9rem', fontWeight: 600 }}>Satellite</h5>
              <StaticMap
                accessToken={MAPBOX_ACCESS_TOKEN}
                mapStyle="mapbox/satellite-v9"
                center={{ lat: 40.7128, lng: -74.0060 }}
                zoom={12}
                size={{ width: 250, height: 180 }}
                attribution={true}
                style={{ border: '1px solid #ccc', borderRadius: '6px' }}
              />
            </div>
            <div>
              <h5 style={{ margin: '0 0 8px 0', fontSize: '0.9rem', fontWeight: 600 }}>Dark</h5>
              <StaticMap
                accessToken={MAPBOX_ACCESS_TOKEN}
                mapStyle="mapbox/dark-v11"
                center={{ lat: 40.7128, lng: -74.0060 }}
                zoom={12}
                size={{ width: 250, height: 180 }}
                attribution={true}
                style={{ border: '1px solid #ccc', borderRadius: '6px' }}
              />
            </div>
          </div>
        </Example>

        <Example
          title="Advanced Map with Pitch and Rotation"
          description="3D perspective map with custom pitch, rotation, and high zoom for dramatic effect"
          category="StaticMap"
          difficulty="advanced"
          code={`<StaticMap
  accessToken={MAPBOX_ACCESS_TOKEN}
  mapStyle="mapbox/streets-v12"
  center={{ lat: 40.7589, lng: -73.9851 }}
  zoom={16}
  pitch={45}
  bearing={-17.6}
  size={{ width: 600, height: 400 }}
  attribution={true}
  style={{ border: '1px solid #ccc', borderRadius: '8px' }}
/>`}
        >
          <StaticMap
            accessToken={MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox/streets-v12"
            center={{ lat: 40.7589, lng: -73.9851 }}
            zoom={16}
            pitch={45}
            bearing={-17.6}
            size={{ width: 600, height: 400 }}
            attribution={true}
            style={{ border: '1px solid #ccc', borderRadius: '8px' }}
          />
        </Example>

        {/* Marker Examples */}
        <SectionHeader 
          title="Marker Examples" 
          description="Learn how to add and customize markers with automatic popup management"
        />

        <Example
          title="Automatic Popup Management (NEW!)"
          description="The new pattern: simply add a Popup as a child of a Marker - no state management required!"
          category="Marker"
          difficulty="beginner"
          code={`<StaticMap
  accessToken={MAPBOX_ACCESS_TOKEN}
  mapStyle="mapbox/streets-v12"
  center={{ lat: 40.7428, lng: -74.0060 }}
  zoom={11}
  size={{ width: 600, height: 400 }}
  attribution={true}
>
  <Marker 
    position={{ lat: 40.7589, lng: -73.9851 }}
    color="#ff6b6b"
    symbol="🏢"
    scale={1.5}
  >
    <Popup anchor="bottom-left">
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
</StaticMap>`}
        >
          <StaticMap
            accessToken={MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox/streets-v12"
            center={{ lat: 40.7428, lng: -74.0060 }}
            zoom={11}
            size={{ width: 600, height: 400 }}
            attribution={true}
            style={{ border: '1px solid #ccc', borderRadius: '8px' }}
          >
            <Marker 
              position={{ lat: 40.7589, lng: -73.9851 }}
              color="#ff6b6b"
              symbol="🏢"
              scale={1.5}
            >
              <Popup anchor="bottom-left">
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
        </Example>

        <Example
          title="Custom Styled Markers"
          description="Various marker customizations with colors, symbols, and scales"
          category="Marker"
          difficulty="intermediate"
          code={`<StaticMap
  accessToken={MAPBOX_ACCESS_TOKEN}
  mapStyle="mapbox/light-v11"
  center={{ lat: 40.7528, lng: -74.0060 }}
  zoom={12}
  size={{ width: 600, height: 400 }}
  attribution={true}
>
  {/* Large marker with custom symbol */}
  <Marker 
    position={{ lat: 40.7728, lng: -74.0160 }}
    color="#e74c3c"
    symbol="🎯"
    scale={2.0}
  />
  
  {/* Medium marker with text symbol */}
  <Marker
    position={{ lat: 40.7528, lng: -73.9960 }}
    color="#2ecc71"
    symbol="A"
    scale={1.2}
  />
  
  {/* Small marker cluster */}
  <Marker position={{ lat: 40.7328, lng: -74.0260 }} color="#3498db" scale={0.8} />
  <Marker position={{ lat: 40.7308, lng: -74.0240 }} color="#9b59b6" scale={0.8} />
  <Marker position={{ lat: 40.7348, lng: -74.0240 }} color="#f39c12" scale={0.8} />
</StaticMap>`}
        >
          <StaticMap
            accessToken={MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox/light-v11"
            center={{ lat: 40.7528, lng: -74.0060 }}
            zoom={12}
            size={{ width: 600, height: 400 }}
            attribution={true}
            style={{ border: '1px solid #ccc', borderRadius: '8px' }}
          >
            <Marker 
              position={{ lat: 40.7728, lng: -74.0160 }}
              color="#e74c3c"
              symbol="🎯"
              scale={2.0}
            />
            
            <Marker
              position={{ lat: 40.7528, lng: -73.9960 }}
              color="#2ecc71"
              symbol="A"
              scale={1.2}
            />
            
            <Marker position={{ lat: 40.7328, lng: -74.0260 }} color="#3498db" scale={0.8} />
            <Marker position={{ lat: 40.7308, lng: -74.0240 }} color="#9b59b6" scale={0.8} />
            <Marker position={{ lat: 40.7348, lng: -74.0240 }} color="#f39c12" scale={0.8} />
          </StaticMap>
        </Example>

        <Example
          title="Zillow-Style Price Markers"
          description="Real estate inspired pill-shaped markers with shadow effects and price displays"
          category="Marker"
          difficulty="advanced"
          code={`// Custom pill-shaped price marker component
const PriceMarker = ({ position, price, color = '#ffffff', textColor = '#333' }) => (
  <Marker 
    position={position}
    color="transparent"
    symbol=""
    scale={1}
  >
    <div style={{
      position: 'absolute',
      top: '-20px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: color,
      color: textColor,
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '14px',
      fontWeight: 'bold',
      border: '1px solid #e0e0e0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      whiteSpace: 'nowrap',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      {price}
    </div>
  </Marker>
);

<StaticMap
  accessToken={MAPBOX_ACCESS_TOKEN}
  mapStyle="mapbox/streets-v12"
  center={{ lat: 40.7628, lng: -73.9678 }}
  zoom={14}
  size={{ width: 600, height: 400 }}
  attribution={true}
>
  <PriceMarker 
    position={{ lat: 40.7728, lng: -73.9778 }}
    price="$3.2M"
    color="#ffffff"
    textColor="#333"
  />
  
  <PriceMarker 
    position={{ lat: 40.7628, lng: -73.9578 }}
    price="$2.8M"
    color="#e8f5e8"
    textColor="#2d7d2d"
  />
  
  <PriceMarker 
    position={{ lat: 40.7528, lng: -73.9678 }}
    price="$4.1M"
    color="#fff3e0"
    textColor="#bf6900"
  />
  
  <PriceMarker 
    position={{ lat: 40.7728, lng: -73.9578 }}
    price="$1.9M"
    color="#f3e5f5"
    textColor="#7b1fa2"
  />
  
  <PriceMarker 
    position={{ lat: 40.7628, lng: -73.9778 }}
    price="$5.5M"
    color="#e3f2fd"
    textColor="#1976d2"
  />
</StaticMap>`}
        >
          <StaticMap
            accessToken={MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox/streets-v12"
            center={{ lat: 40.7628, lng: -73.9678 }}
            zoom={14}
            size={{ width: 600, height: 400 }}
            attribution={true}
            style={{ border: '1px solid #ccc', borderRadius: '8px' }}
          >
            <Marker 
              position={{ lat: 40.7728, lng: -73.9778 }}
              color="transparent"
              symbol=""
              scale={1}
            >
              <div style={{
                position: 'absolute',
                top: '-20px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#ffffff',
                color: '#333',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 'bold',
                border: '1px solid #e0e0e0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                whiteSpace: 'nowrap',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
              }}>
                $3.2M
              </div>
            </Marker>
            
            <Marker 
              position={{ lat: 40.7628, lng: -73.9578 }}
              color="transparent"
              symbol=""
              scale={1}
            >
              <div style={{
                position: 'absolute',
                top: '-20px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#e8f5e8',
                color: '#2d7d2d',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 'bold',
                border: '1px solid #e0e0e0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                whiteSpace: 'nowrap',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
              }}>
                $2.8M
              </div>
            </Marker>
            
            <Marker 
              position={{ lat: 40.7528, lng: -73.9678 }}
              color="transparent"
              symbol=""
              scale={1}
            >
              <div style={{
                position: 'absolute',
                top: '-20px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#fff3e0',
                color: '#bf6900',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 'bold',
                border: '1px solid #e0e0e0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                whiteSpace: 'nowrap',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
              }}>
                $4.1M
              </div>
            </Marker>
            
            <Marker 
              position={{ lat: 40.7728, lng: -73.9578 }}
              color="transparent"
              symbol=""
              scale={1}
            >
              <div style={{
                position: 'absolute',
                top: '-20px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#f3e5f5',
                color: '#7b1fa2',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 'bold',
                border: '1px solid #e0e0e0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                whiteSpace: 'nowrap',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
              }}>
                $1.9M
              </div>
            </Marker>
            
            <Marker 
              position={{ lat: 40.7628, lng: -73.9778 }}
              color="transparent"
              symbol=""
              scale={1}
            >
              <div style={{
                position: 'absolute',
                top: '-20px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#e3f2fd',
                color: '#1976d2',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 'bold',
                border: '1px solid #e0e0e0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                whiteSpace: 'nowrap',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
              }}>
                $5.5M
              </div>
            </Marker>
          </StaticMap>
        </Example>

        <Example
          title="Transportation & Delivery Tracking"
          description="Track vehicles, deliveries, or public transportation with specialized markers"
          category="Marker"
          difficulty="intermediate"
          code={`<StaticMap
  accessToken={MAPBOX_ACCESS_TOKEN}
  mapStyle="mapbox/streets-v12"
  center={{ lat: 40.7428, lng: -74.0060 }}
  zoom={13}
  size={{ width: 600, height: 400 }}
  attribution={true}
>
  {/* Delivery truck */}
  <Marker 
    position={{ lat: 40.7528, lng: -74.0160 }}
    color="#ff6b35"
    symbol="🚚"
    scale={1.2}
  >
    <Popup anchor="bottom-left">
      <strong>🚚 Delivery Truck #1247</strong><br/>
      Status: En Route<br/>
      ETA: 15 minutes<br/>
      Driver: Mike Johnson
    </Popup>
  </Marker>

  {/* Bus stop */}
  <Marker
    position={{ lat: 40.7328, lng: -73.9960 }}
    color="#4a90e2"
    symbol="🚌"
    scale={1.0}
  >
    <Popup anchor="top">
      <strong>🚌 Bus Stop - 42nd & Broadway</strong><br/>
      Next Bus: 3 minutes<br/>
      Route: M42
    </Popup>
  </Marker>

  {/* Taxi/Uber */}
  <Marker
    position={{ lat: 40.7628, lng: -74.0260 }}
    color="#f7b731"
    symbol="🚖"
    scale={0.9}
  />

  {/* Bike share */}
  <Marker
    position={{ lat: 40.7228, lng: -73.9860 }}
    color="#5f27cd"
    symbol="🚲"
    scale={0.8}
  />
</StaticMap>`}
        >
          <StaticMap
            accessToken={MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox/streets-v12"
            center={{ lat: 40.7428, lng: -74.0060 }}
            zoom={13}
            size={{ width: 600, height: 400 }}
            attribution={true}
            style={{ border: '1px solid #ccc', borderRadius: '8px' }}
          >
            <Marker 
              position={{ lat: 40.7528, lng: -74.0160 }}
              color="#ff6b35"
              symbol="🚚"
              scale={1.2}
            >
              <Popup anchor="bottom-left">
                <strong>🚚 Delivery Truck #1247</strong><br/>
                Status: En Route<br/>
                ETA: 15 minutes<br/>
                Driver: Mike Johnson
              </Popup>
            </Marker>

            <Marker
              position={{ lat: 40.7328, lng: -73.9960 }}
              color="#4a90e2"
              symbol="🚌"
              scale={1.0}
            >
              <Popup anchor="top">
                <strong>🚌 Bus Stop - 42nd & Broadway</strong><br/>
                Next Bus: 3 minutes<br/>
                Route: M42
              </Popup>
            </Marker>

            <Marker
              position={{ lat: 40.7628, lng: -74.0260 }}
              color="#f7b731"
              symbol="🚖"
              scale={0.9}
            />

            <Marker
              position={{ lat: 40.7228, lng: -73.9860 }}
              color="#5f27cd"
              symbol="🚲"
              scale={0.8}
            />
          </StaticMap>
        </Example>

        <Example
          title="Business & POI Directory"
          description="Showcase local businesses, restaurants, and points of interest with rich information"
          category="Marker"
          difficulty="advanced"
          code={`<StaticMap
  accessToken={MAPBOX_ACCESS_TOKEN}
  mapStyle="mapbox/light-v11"
  center={{ lat: 40.7528, lng: -73.9778 }}
  zoom={15}
  size={{ width: 600, height: 400 }}
  attribution={true}
>
  {/* Restaurant */}
  <Marker 
    position={{ lat: 40.7628, lng: -73.9778 }}
    color="#e74c3c"
    symbol="🍕"
    scale={1.3}
  >
    <Popup anchor="bottom" maxWidth="280px">
      <div style={{ padding: '4px' }}>
        <h4 style={{ margin: '0 0 8px', color: '#2c3e50' }}>🍕 Mario's Pizza</h4>
        <div style={{ display: 'flex', gap: '4px', marginBottom: '6px' }}>
          <span style={{ color: '#f39c12' }}>★★★★☆</span>
          <span style={{ fontSize: '12px', color: '#7f8c8d' }}>4.2 (234 reviews)</span>
        </div>
        <p style={{ margin: '0 0 8px', fontSize: '13px', color: '#34495e' }}>
          Authentic Italian pizza • $$ • Open until 11pm
        </p>
        <a href="#" style={{ color: '#3498db', fontSize: '12px', textDecoration: 'none' }}>View Menu →</a>
      </div>
    </Popup>
  </Marker>

  {/* Coffee shop */}
  <Marker
    position={{ lat: 40.7428, lng: -73.9678 }}
    color="#8b4513"
    symbol="☕"
    scale={1.1}
  >
    <Popup anchor="left" offset={{ x: 10, y: 0 }}>
      <strong>☕ Central Perk Café</strong><br/>
      ★★★★★ 4.8/5<br/>
      Fresh roasted • WiFi • Open 6am
    </Popup>
  </Marker>

  {/* Bank/ATM */}
  <Marker
    position={{ lat: 40.7528, lng: -73.9878 }}
    color="#2ecc71"
    symbol="🏦"
    scale={1.0}
  >
    <Popup anchor="top">
      <strong>🏦 Chase Bank</strong><br/>
      24/7 ATM Available<br/>
      Full service branch
    </Popup>
  </Marker>

  {/* Gas station */}
  <Marker
    position={{ lat: 40.7328, lng: -73.9778 }}
    color="#f39c12"
    symbol="⛽"
    scale={0.9}
  />
</StaticMap>`}
        >
          <StaticMap
            accessToken={MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox/light-v11"
            center={{ lat: 40.7528, lng: -73.9778 }}
            zoom={15}
            size={{ width: 600, height: 400 }}
            attribution={true}
            style={{ border: '1px solid #ccc', borderRadius: '8px' }}
          >
            <Marker 
              position={{ lat: 40.7628, lng: -73.9778 }}
              color="#e74c3c"
              symbol="🍕"
              scale={1.3}
            >
              <Popup anchor="bottom" maxWidth="280px">
                <div style={{ padding: '4px' }}>
                  <h4 style={{ margin: '0 0 8px', color: '#2c3e50' }}>🍕 Mario's Pizza</h4>
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '6px' }}>
                    <span style={{ color: '#f39c12' }}>★★★★☆</span>
                    <span style={{ fontSize: '12px', color: '#7f8c8d' }}>4.2 (234 reviews)</span>
                  </div>
                  <p style={{ margin: '0 0 8px', fontSize: '13px', color: '#34495e' }}>
                    Authentic Italian pizza • $$ • Open until 11pm
                  </p>
                  <a href="#" style={{ color: '#3498db', fontSize: '12px', textDecoration: 'none' }}>View Menu →</a>
                </div>
              </Popup>
            </Marker>

            <Marker
              position={{ lat: 40.7428, lng: -73.9678 }}
              color="#8b4513"
              symbol="☕"
              scale={1.1}
            >
              <Popup anchor="left" offset={{ x: 10, y: 0 }}>
                <strong>☕ Central Perk Café</strong><br/>
                ★★★★★ 4.8/5<br/>
                Fresh roasted • WiFi • Open 6am
              </Popup>
            </Marker>

            <Marker
              position={{ lat: 40.7528, lng: -73.9878 }}
              color="#2ecc71"
              symbol="🏦"
              scale={1.0}
            >
              <Popup anchor="top">
                <strong>🏦 Chase Bank</strong><br/>
                24/7 ATM Available<br/>
                Full service branch
              </Popup>
            </Marker>

            <Marker
              position={{ lat: 40.7328, lng: -73.9778 }}
              color="#f39c12"
              symbol="⛽"
              scale={0.9}
            />
          </StaticMap>
        </Example>

        {/* CircleMarker Examples */}
        <SectionHeader 
          title="CircleMarker Examples" 
          description="Circular markers with customizable radius, colors, and strokes"
        />

        <Example
          title="Basic Circle Markers"
          description="Simple circular markers with different sizes and colors"
          category="CircleMarker"
          difficulty="beginner"
          code={`<StaticMap
  accessToken={MAPBOX_ACCESS_TOKEN}
  mapStyle="mapbox/light-v11"
  center={{ lat: 40.7128, lng: -74.0060 }}
  zoom={11}
  size={{ width: 500, height: 350 }}
  attribution={true}
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
</StaticMap>`}
        >
          <StaticMap
            accessToken={MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox/light-v11"
            center={{ lat: 40.7128, lng: -74.0060 }}
            zoom={11}
            size={{ width: 500, height: 350 }}
            attribution={true}
            style={{ border: '1px solid #ccc', borderRadius: '8px' }}
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
        </Example>

        <Example
          title="Circle Markers with Opacity and Effects"
          description="Advanced circle styling with opacity, gradients, and shadow effects"
          category="CircleMarker"
          difficulty="intermediate"
          code={`<StaticMap
  accessToken={MAPBOX_ACCESS_TOKEN}
  mapStyle="mapbox/dark-v11"
  center={{ lat: 40.7428, lng: -74.0060 }}
  zoom={12}
  size={{ width: 500, height: 350 }}
  attribution={true}
>
  {/* Large semi-transparent circles */}
  <CircleMarker 
    position={{ lat: 40.7528, lng: -74.0160 }} 
    radius={25} 
    color="rgba(231, 76, 60, 0.6)" 
    strokeColor="#e74c3c" 
    strokeWidth={3}
  />
  <CircleMarker 
    position={{ lat: 40.7328, lng: -73.9960 }} 
    radius={20} 
    color="rgba(52, 152, 219, 0.7)" 
    strokeColor="#3498db" 
    strokeWidth={2}
  />
  
  {/* Overlapping effect */}
  <CircleMarker 
    position={{ lat: 40.7428, lng: -74.0060 }} 
    radius={18} 
    color="rgba(46, 204, 113, 0.5)" 
    strokeColor="#2ecc71" 
    strokeWidth={4}
  />
  <CircleMarker 
    position={{ lat: 40.7408, lng: -74.0040 }} 
    radius={15} 
    color="rgba(155, 89, 182, 0.8)" 
    strokeColor="#9b59b6" 
    strokeWidth={2}
  />
</StaticMap>`}
        >
          <StaticMap
            accessToken={MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox/dark-v11"
            center={{ lat: 40.7428, lng: -74.0060 }}
            zoom={12}
            size={{ width: 500, height: 350 }}
            attribution={true}
            style={{ border: '1px solid #ccc', borderRadius: '8px' }}
          >
            <CircleMarker 
              position={{ lat: 40.7528, lng: -74.0160 }} 
              radius={25} 
              color="rgba(231, 76, 60, 0.6)" 
              strokeColor="#e74c3c" 
              strokeWidth={3}
            />
            <CircleMarker 
              position={{ lat: 40.7328, lng: -73.9960 }} 
              radius={20} 
              color="rgba(52, 152, 219, 0.7)" 
              strokeColor="#3498db" 
              strokeWidth={2}
            />
            
            <CircleMarker 
              position={{ lat: 40.7428, lng: -74.0060 }} 
              radius={18} 
              color="rgba(46, 204, 113, 0.5)" 
              strokeColor="#2ecc71" 
              strokeWidth={4}
            />
            <CircleMarker 
              position={{ lat: 40.7408, lng: -74.0040 }} 
              radius={15} 
              color="rgba(155, 89, 182, 0.8)" 
              strokeColor="#9b59b6" 
              strokeWidth={2}
            />
          </StaticMap>
        </Example>

        <Example
          title="Circle Markers with Automatic Popups"
          description="Circle markers that show popups when clicked - no state management needed"
          category="CircleMarker"
          difficulty="intermediate"
          code={`<StaticMap
  accessToken={MAPBOX_ACCESS_TOKEN}
  mapStyle="mapbox/streets-v12"
  center={{ lat: 40.7428, lng: -74.0060 }}
  zoom={12}
  size={{ width: 500, height: 350 }}
  attribution={true}
>
  <CircleMarker 
    position={{ lat: 40.7528, lng: -74.0060 }} 
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
    position={{ lat: 40.7328, lng: -74.0060 }} 
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
</StaticMap>`}
        >
          <StaticMap
            accessToken={MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox/streets-v12"
            center={{ lat: 40.7428, lng: -74.0060 }}
            zoom={12}
            size={{ width: 500, height: 350 }}
            attribution={true}
            style={{ border: '1px solid #ccc', borderRadius: '8px' }}
          >
            <CircleMarker 
              position={{ lat: 40.7528, lng: -74.0060 }} 
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
              position={{ lat: 40.7328, lng: -74.0060 }} 
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
        </Example>

        <Example
          title="Data Visualization - Population Density"
          description="Use circle size and color to represent data values like population, sales, or activity levels"
          category="CircleMarker"
          difficulty="advanced"
          code={`<StaticMap
  accessToken={MAPBOX_ACCESS_TOKEN}
  mapStyle="mapbox/light-v11"
  center={{ lat: 40.7328, lng: -74.0060 }}
  zoom={11}
  size={{ width: 600, height: 400 }}
  attribution={true}
>
  {/* High density area - Large, intense color */}
  <CircleMarker 
    position={{ lat: 40.7528, lng: -74.0060 }} 
    radius={35} 
    color="rgba(220, 53, 69, 0.7)" 
    strokeColor="#dc3545" 
    strokeWidth={3}
  >
    <Popup anchor="bottom">
      <strong>📊 Manhattan Core</strong><br />
      Population Density: 74,781/km²<br />
      Data Type: High Density
    </Popup>
  </CircleMarker>
  
  {/* Medium-high density */}
  <CircleMarker 
    position={{ lat: 40.7128, lng: -73.9960 }} 
    radius={25} 
    color="rgba(255, 193, 7, 0.6)" 
    strokeColor="#ffc107" 
    strokeWidth={2}
  >
    <Popup anchor="left">
      <strong>📊 Midtown</strong><br />
      Population Density: 45,123/km²<br />
      Data Type: Medium-High
    </Popup>
  </CircleMarker>
  
  {/* Medium density */}
  <CircleMarker 
    position={{ lat: 40.6928, lng: -74.0160 }} 
    radius={18} 
    color="rgba(40, 167, 69, 0.5)" 
    strokeColor="#28a745" 
    strokeWidth={2}
  />
  
  {/* Low-medium density */}
  <CircleMarker 
    position={{ lat: 40.7328, lng: -73.9760 }} 
    radius={12} 
    color="rgba(52, 152, 219, 0.4)" 
    strokeColor="#3498db" 
    strokeWidth={1}
  />
  
  {/* Low density areas */}
  <CircleMarker 
    position={{ lat: 40.6828, lng: -73.9960 }} 
    radius={8} 
    color="rgba(108, 117, 125, 0.3)" 
    strokeColor="#6c757d" 
    strokeWidth={1}
  />
  <CircleMarker 
    position={{ lat: 40.7228, lng: -74.0260 }} 
    radius={6} 
    color="rgba(108, 117, 125, 0.3)" 
    strokeColor="#6c757d" 
    strokeWidth={1}
  />
</StaticMap>`}
        >
          <StaticMap
            accessToken={MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox/light-v11"
            center={{ lat: 40.7328, lng: -74.0060 }}
            zoom={11}
            size={{ width: 600, height: 400 }}
            attribution={true}
            style={{ border: '1px solid #ccc', borderRadius: '8px' }}
          >
            <CircleMarker 
              position={{ lat: 40.7528, lng: -74.0060 }} 
              radius={35} 
              color="rgba(220, 53, 69, 0.7)" 
              strokeColor="#dc3545" 
              strokeWidth={3}
            >
              <Popup anchor="bottom">
                <strong>📊 Manhattan Core</strong><br />
                Population Density: 74,781/km²<br />
                Data Type: High Density
              </Popup>
            </CircleMarker>
            
            <CircleMarker 
              position={{ lat: 40.7128, lng: -73.9960 }} 
              radius={25} 
              color="rgba(255, 193, 7, 0.6)" 
              strokeColor="#ffc107" 
              strokeWidth={2}
            >
              <Popup anchor="left">
                <strong>📊 Midtown</strong><br />
                Population Density: 45,123/km²<br />
                Data Type: Medium-High
              </Popup>
            </CircleMarker>
            
            <CircleMarker 
              position={{ lat: 40.6928, lng: -74.0160 }} 
              radius={18} 
              color="rgba(40, 167, 69, 0.5)" 
              strokeColor="#28a745" 
              strokeWidth={2}
            />
            
            <CircleMarker 
              position={{ lat: 40.7328, lng: -73.9760 }} 
              radius={12} 
              color="rgba(52, 152, 219, 0.4)" 
              strokeColor="#3498db" 
              strokeWidth={1}
            />
            
            <CircleMarker 
              position={{ lat: 40.6828, lng: -73.9960 }} 
              radius={8} 
              color="rgba(108, 117, 125, 0.3)" 
              strokeColor="#6c757d" 
              strokeWidth={1}
            />
            <CircleMarker 
              position={{ lat: 40.7228, lng: -74.0260 }} 
              radius={6} 
              color="rgba(108, 117, 125, 0.3)" 
              strokeColor="#6c757d" 
              strokeWidth={1}
            />
          </StaticMap>
        </Example>

        {/* Popup Examples */}
        <SectionHeader 
          title="Popup Examples" 
          description="Flexible popup components with various anchoring and styling options"
        />

        <Example
          title="Standalone Popups"
          description="Popups positioned independently with their own coordinates"
          category="Popup"
          difficulty="intermediate"
          code={`<StaticMap
  accessToken={MAPBOX_ACCESS_TOKEN}
  mapStyle="mapbox/outdoors-v12"
  center={{ lat: 37.8049, lng: -122.4194 }}
  zoom={12}
  size={{ width: 600, height: 400 }}
  attribution={true}
>
  <Popup 
    position={{ lat: 37.8149, lng: -122.4094 }} 
    anchor="bottom"
    closeButton
  >
    <strong>Financial District</strong><br />
    Downtown San Francisco<br />
    <em>Standalone popup with bottom anchor</em>
  </Popup>

  <Popup 
    position={{ lat: 37.7949, lng: -122.4294 }} 
    anchor="top-right"
    closeButton
  >
    <strong>Golden Gate Bridge Area</strong><br />
    Famous suspension bridge<br />
    <em>Top-right anchor positioning</em>
  </Popup>
</StaticMap>`}
        >
          <StaticMap
            accessToken={MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox/outdoors-v12"
            center={{ lat: 37.8049, lng: -122.4194 }}
            zoom={12}
            size={{ width: 600, height: 400 }}
            attribution={true}
            style={{ border: '1px solid #ccc', borderRadius: '8px' }}
          >
            <Popup 
              position={{ lat: 37.8149, lng: -122.4094 }} 
              anchor="bottom"
              closeButton
            >
              <strong>Financial District</strong><br />
              Downtown San Francisco<br />
              <em>Standalone popup with bottom anchor</em>
            </Popup>

            <Popup 
              position={{ lat: 37.7949, lng: -122.4294 }} 
              anchor="top-right"
              closeButton
            >
              <strong>Golden Gate Bridge Area</strong><br />
              Famous suspension bridge<br />
              <em>Top-right anchor positioning</em>
            </Popup>
          </StaticMap>
        </Example>

        <Example
          title="Advanced Popup Configurations"
          description="Custom popup styling, offsets, and rich content examples"
          category="Popup"
          difficulty="advanced"
          code={`<StaticMap
  accessToken={MAPBOX_ACCESS_TOKEN}
  mapStyle="mapbox/dark-v11"
  center={{ lat: 40.7628, lng: -73.9678 }}
  zoom={13}
  size={{ width: 600, height: 400 }}
  attribution={true}
>
  {/* Custom styled popup with offset */}
  <Popup 
    position={{ lat: 40.7728, lng: -73.9778 }} 
    anchor="left"
    offset={{ x: 20, y: 0 }}
    maxWidth="300px"
  >
    <div style={{ padding: '8px' }}>
      <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>🎨 Custom Styled</h4>
      <p style={{ margin: 0, fontSize: '14px' }}>Rich HTML content with custom styling</p>
    </div>
  </Popup>

  {/* Large popup with close button */}
  <Popup 
    position={{ lat: 40.7528, lng: -73.9578 }} 
    anchor="bottom"
    closeButton
    maxWidth="250px"
  >
    <div>
      <strong>📍 Location Details</strong><br/>
      <img src="https://picsum.photos/200/100" 
           alt="Sample" style={{ width: '100%', marginTop: '8px' }} />
      <p style={{ margin: '8px 0 0', fontSize: '12px' }}>Sample image content</p>
    </div>
  </Popup>
</StaticMap>`}
        >
          <StaticMap
            accessToken={MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox/dark-v11"
            center={{ lat: 40.7628, lng: -73.9678 }}
            zoom={13}
            size={{ width: 600, height: 400 }}
            attribution={true}
            style={{ border: '1px solid #ccc', borderRadius: '8px' }}
          >
            <Popup 
              position={{ lat: 40.7728, lng: -73.9778 }} 
              anchor="left"
              offset={{ x: 20, y: 0 }}
              maxWidth="300px"
            >
              <div style={{ padding: '8px' }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>🎨 Custom Styled</h4>
                <p style={{ margin: 0, fontSize: '14px' }}>Rich HTML content with custom styling</p>
              </div>
            </Popup>

            <Popup 
              position={{ lat: 40.7528, lng: -73.9578 }} 
              anchor="bottom"
              closeButton
              maxWidth="250px"
            >
              <div>
                <strong>📍 Location Details</strong><br/>
                <img src="https://picsum.photos/200/100" 
                     alt="Sample" style={{ width: '100%', marginTop: '8px' }} />
                <p style={{ margin: '8px 0 0', fontSize: '12px' }}>Sample image content</p>
              </div>
            </Popup>
          </StaticMap>
        </Example>

        <Example
          title="Weather & Environmental Monitoring"
          description="Display weather stations, air quality sensors, and environmental data with rich information"
          category="Popup"
          difficulty="advanced"
          code={`<StaticMap
  accessToken={MAPBOX_ACCESS_TOKEN}
  mapStyle="mapbox/outdoors-v12"
  center={{ lat: 40.7628, lng: -73.9678 }}
  zoom={12}
  size={{ width: 600, height: 400 }}
  attribution={true}
>
  {/* Weather station with detailed info */}
  <Popup 
    position={{ lat: 40.7728, lng: -73.9578 }} 
    anchor="bottom"
    maxWidth="320px"
  >
    <div style={{ padding: '8px', fontFamily: 'system-ui' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ fontSize: '24px', marginRight: '8px' }}>🌤️</span>
        <div>
          <h4 style={{ margin: 0, color: '#2c3e50' }}>Central Park Weather Station</h4>
          <small style={{ color: '#7f8c8d' }}>Updated 5 minutes ago</small>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '13px' }}>
        <div><strong>🌡️ Temperature:</strong> 72°F</div>
        <div><strong>💧 Humidity:</strong> 65%</div>
        <div><strong>💨 Wind:</strong> 8 mph NW</div>
        <div><strong>👁️ Visibility:</strong> 10 mi</div>
        <div><strong>🌊 Pressure:</strong> 30.12 in</div>
        <div><strong>☔ Precipitation:</strong> 0.0 in</div>
      </div>
      
      <div style={{ marginTop: '8px', padding: '6px', backgroundColor: '#e8f5e8', borderRadius: '4px' }}>
        <small style={{ color: '#2d7d2d' }}><strong>Air Quality:</strong> Good (AQI: 42)</small>
      </div>
    </div>
  </Popup>

  {/* Air quality sensor */}
  <Popup 
    position={{ lat: 40.7428, lng: -73.9878 }} 
    anchor="left"
    offset={{ x: 15, y: 0 }}
  >
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '20px' }}>🏭</div>
      <strong>Air Quality Monitor</strong><br/>
      <span style={{ color: '#28a745', fontWeight: 'bold' }}>AQI: 38 - Good</span><br/>
      <small>PM2.5: 12 µg/m³</small>
    </div>
  </Popup>

  {/* UV Index station */}
  <Popup 
    position={{ lat: 40.7628, lng: -73.9478 }} 
    anchor="top-right"
  >
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '20px' }}>☀️</div>
      <strong>UV Index Station</strong><br/>
      <span style={{ color: '#ff6b35', fontWeight: 'bold' }}>UV Index: 6</span><br/>
      <small style={{ color: '#e67e22' }}>High - Use protection</small>
    </div>
  </Popup>
</StaticMap>`}
        >
          <StaticMap
            accessToken={MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox/outdoors-v12"
            center={{ lat: 40.7628, lng: -73.9678 }}
            zoom={12}
            size={{ width: 600, height: 400 }}
            attribution={true}
            style={{ border: '1px solid #ccc', borderRadius: '8px' }}
          >
            <Popup 
              position={{ lat: 40.7728, lng: -73.9578 }} 
              anchor="bottom"
              maxWidth="320px"
            >
              <div style={{ padding: '8px', fontFamily: 'system-ui' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '24px', marginRight: '8px' }}>🌤️</span>
                  <div>
                    <h4 style={{ margin: 0, color: '#2c3e50' }}>Central Park Weather Station</h4>
                    <small style={{ color: '#7f8c8d' }}>Updated 5 minutes ago</small>
                  </div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '13px' }}>
                  <div><strong>🌡️ Temperature:</strong> 72°F</div>
                  <div><strong>💧 Humidity:</strong> 65%</div>
                  <div><strong>💨 Wind:</strong> 8 mph NW</div>
                  <div><strong>👁️ Visibility:</strong> 10 mi</div>
                  <div><strong>🌊 Pressure:</strong> 30.12 in</div>
                  <div><strong>☔ Precipitation:</strong> 0.0 in</div>
                </div>
                
                <div style={{ marginTop: '8px', padding: '6px', backgroundColor: '#e8f5e8', borderRadius: '4px' }}>
                  <small style={{ color: '#2d7d2d' }}><strong>Air Quality:</strong> Good (AQI: 42)</small>
                </div>
              </div>
            </Popup>

            <Popup 
              position={{ lat: 40.7428, lng: -73.9878 }} 
              anchor="left"
              offset={{ x: 15, y: 0 }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '20px' }}>🏭</div>
                <strong>Air Quality Monitor</strong><br/>
                <span style={{ color: '#28a745', fontWeight: 'bold' }}>AQI: 38 - Good</span><br/>
                <small>PM2.5: 12 µg/m³</small>
              </div>
            </Popup>

            <Popup 
              position={{ lat: 40.7628, lng: -73.9478 }} 
              anchor="top-right"
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '20px' }}>☀️</div>
                <strong>UV Index Station</strong><br/>
                <span style={{ color: '#ff6b35', fontWeight: 'bold' }}>UV Index: 6</span><br/>
                <small style={{ color: '#e67e22' }}>High - Use protection</small>
              </div>
            </Popup>
          </StaticMap>
        </Example>

        <Example
          title="Event & Activity Mapping"
          description="Map events, concerts, festivals, and activities with time-sensitive information"
          category="Popup"
          difficulty="intermediate"
          code={`<StaticMap
  accessToken={MAPBOX_ACCESS_TOKEN}
  mapStyle="mapbox/streets-v12"
  center={{ lat: 40.7628, lng: -73.9778 }}
  zoom={13}
  size={{ width: 600, height: 400 }}
  attribution={true}
>
  {/* Concert venue */}
  <Popup 
    position={{ lat: 40.7728, lng: -73.9678 }} 
    anchor="bottom-left"
    maxWidth="280px"
  >
    <div style={{ padding: '6px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ fontSize: '20px', marginRight: '8px' }}>🎵</span>
        <div>
          <h4 style={{ margin: 0, color: '#2c3e50' }}>Madison Square Garden</h4>
          <small style={{ color: '#e74c3c', fontWeight: 'bold' }}>TONIGHT 8:00 PM</small>
        </div>
      </div>
      
      <p style={{ margin: '0 0 8px', fontSize: '14px', fontWeight: 'bold', color: '#2980b9' }}>
        Taylor Swift - Eras Tour
      </p>
      <div style={{ fontSize: '12px', color: '#7f8c8d' }}>
        <div>🎫 Tickets from $89</div>
        <div>📍 4 Pennsylvania Plaza</div>
        <div>🚇 Accessible via A,C,E trains</div>
      </div>
    </div>
  </Popup>

  {/* Festival */}
  <Popup 
    position={{ lat: 40.7528, lng: -73.9878 }} 
    anchor="top"
  >
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '18px' }}>🎪</div>
      <strong>Summer Street Festival</strong><br/>
      <span style={{ color: '#27ae60' }}>📅 Sat-Sun, All Day</span><br/>
      <small>Food trucks • Live music • Art</small>
    </div>
  </Popup>

  {/* Popup cinema */}
  <Popup 
    position={{ lat: 40.7428, lng: -73.9578 }} 
    anchor="right"
    offset={{ x: -10, y: 0 }}
  >
    <div>
      <span style={{ fontSize: '16px' }}>🎬</span> <strong>Bryant Park Movie Night</strong><br/>
      <span style={{ color: '#8e44ad' }}>FREE</span> • Starts at sunset<br/>
      <small>Bring blankets & snacks</small>
    </div>
  </Popup>
</StaticMap>`}
        >
          <StaticMap
            accessToken={MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox/streets-v12"
            center={{ lat: 40.7628, lng: -73.9778 }}
            zoom={13}
            size={{ width: 600, height: 400 }}
            attribution={true}
            style={{ border: '1px solid #ccc', borderRadius: '8px' }}
          >
            <Popup 
              position={{ lat: 40.7728, lng: -73.9678 }} 
              anchor="bottom-left"
              maxWidth="280px"
            >
              <div style={{ padding: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '20px', marginRight: '8px' }}>🎵</span>
                  <div>
                    <h4 style={{ margin: 0, color: '#2c3e50' }}>Madison Square Garden</h4>
                    <small style={{ color: '#e74c3c', fontWeight: 'bold' }}>TONIGHT 8:00 PM</small>
                  </div>
                </div>
                
                <p style={{ margin: '0 0 8px', fontSize: '14px', fontWeight: 'bold', color: '#2980b9' }}>
                  Taylor Swift - Eras Tour
                </p>
                <div style={{ fontSize: '12px', color: '#7f8c8d' }}>
                  <div>🎫 Tickets from $89</div>
                  <div>📍 4 Pennsylvania Plaza</div>
                  <div>🚇 Accessible via A,C,E trains</div>
                </div>
              </div>
            </Popup>

            <Popup 
              position={{ lat: 40.7528, lng: -73.9878 }} 
              anchor="top"
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '18px' }}>🎪</div>
                <strong>Summer Street Festival</strong><br/>
                <span style={{ color: '#27ae60' }}>📅 Sat-Sun, All Day</span><br/>
                <small>Food trucks • Live music • Art</small>
              </div>
            </Popup>

            <Popup 
              position={{ lat: 40.7428, lng: -73.9578 }} 
              anchor="right"
              offset={{ x: -10, y: 0 }}
            >
              <div>
                <span style={{ fontSize: '16px' }}>🎬</span> <strong>Bryant Park Movie Night</strong><br/>
                <span style={{ color: '#8e44ad' }}>FREE</span> • Starts at sunset<br/>
                <small>Bring blankets & snacks</small>
              </div>
            </Popup>
          </StaticMap>
        </Example>



        {/* Getting Started Section */}
        <div style={{ 
          marginTop: '64px', 
          padding: '32px', 
          backgroundColor: '#f8f9fa',
          borderRadius: '12px',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '1.5rem', fontWeight: 700, color: '#212529' }}>
            🚀 Getting Started
          </h3>
          <p style={{ fontSize: '1.1rem', color: '#495057', marginBottom: '20px' }}>
            To use this library with your own maps:
          </p>
          <ol style={{ fontSize: '1rem', color: '#495057', lineHeight: 1.6 }}>
            <li>Sign up for a free Mapbox account at <a href="https://account.mapbox.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#007bff' }}>https://account.mapbox.com/</a></li>
            <li>Get your access token from the Mapbox dashboard</li>
            <li>Replace <code style={{ backgroundColor: '#e9ecef', padding: '2px 4px', borderRadius: '3px' }}>MAPBOX_ACCESS_TOKEN</code> in this demo with your token</li>
            <li>Start building amazing static map experiences!</li>
          </ol>
        </div>

      </div>
    </div>
  );
}