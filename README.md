# Mapbox Static Images React Library

A React library that provides components for overlaying client-side elements on Mapbox Static Images API basemaps. Perfect for creating interactive static maps with markers, popups, and other overlays without needing a full map SDK.

## Features

- 🗺️ **StaticMap**: Display Mapbox static images with precise coordinate-to-pixel positioning
- 📍 **Marker**: Add customizable markers with built-in or custom styling
- 💬 **Popup**: Display contextual information with various anchor positions
- 🎯 **Precise Positioning**: Accurate coordinate calculations for overlay placement
- 🎨 **Flexible Styling**: Full control over appearance with CSS and React props
- 📱 **Retina Support**: High-DPI display compatibility (enabled by default)
- ⚡ **Performance**: Lightweight with no external map dependencies

## Quick Start

```tsx
import { StaticMap, Marker, Popup } from './lib';

function MyMap() {
  const [showPopup, setShowPopup] = useState(false);
  
  return (
    <StaticMap
      accessToken="your-mapbox-access-token"
      mapStyle="mapbox/streets-v11"
      center={{ lat: 40.7128, lng: -74.0060 }}
      zoom={12}
      size={{ width: 600, height: 400 }}
    >
      <Marker
        position={{ lat: 40.7128, lng: -74.0060 }}
        color="#ff6b6b"
        symbol="🏢"
        onClick={() => setShowPopup(!showPopup)}
      >
        {/* Popup as child - inherits marker position automatically */}
        {showPopup && (
          <Popup anchor="bottom">
            <h3>New York City</h3>
            <p>The Big Apple!</p>
          </Popup>
        )}
      </Marker>
    </StaticMap>
  );
}
```

## Components

### StaticMap
The main container component that renders a Mapbox static image and provides coordinate context for child components.

### Marker
Display markers at specific coordinates with customizable appearance. **Can contain Popup children that automatically inherit the marker's position.**

**Key Features:**
- Default styling with customizable colors, symbols, and sizes
- Fully custom children support
- **Popup children automatically inherit position** (recommended pattern)
- Click handlers and custom styling

### CustomMarker  
Display markers with custom images from URLs. Also supports Popup children with automatic position inheritance.

### Popup
Display contextual information with various anchor positions. **Can be used independently OR as a child of Marker/CustomMarker.**

**Two Usage Patterns:**
1. **As Marker Child (Recommended)** - Position inherited automatically, cleaner code
2. **Independent** - Full control over position, more flexible for complex layouts

**Anchor Positions:** top, bottom, left, right, center with custom pixel offsets

## Getting a Mapbox Access Token

1. Sign up for a free account at [mapbox.com](https://account.mapbox.com/)
2. Navigate to your [Access Tokens page](https://account.mapbox.com/access-tokens/)
3. Copy your default public token or create a new one
4. Replace `MAPBOX_ACCESS_TOKEN` in the demo with your token

## Demo

Run the development server to see comprehensive examples:

```bash
npm run dev
```

The demo showcases:
- **Popup as Marker children** with automatic position inheritance
- Multiple marker styles and sizes
- Custom marker images  
- Various popup anchor positions
- Mixed usage patterns (child vs independent popups)
- Different map styles (streets, satellite, dark)
- Responsive layouts
- Interactive elements

## License

MIT
