# CSS Styling Documentation

## Library Styles

The Mapbox Static JS library includes a CSS stylesheet (`src/lib/styles.css`) that provides:

### 1. **Hover Effects**
- **Close button hover**: Subtle background color change and opacity effects
- **Marker hover**: Scale animation (1.05x for regular markers, 1.1x for custom/circle markers)
- **Interactive elements**: Pointer cursor and scale effects for clickable components

### 2. **Transitions**
- Smooth 0.2s ease transitions for all interactive elements
- Popup fade-in animation on appearance
- Reduced motion support for accessibility

### 3. **Accessibility Features**
- Focus outlines for keyboard navigation
- High contrast mode support
- Responsive adjustments for mobile devices
- ARIA-compliant interactive elements

### 4. **CSS Classes**

#### Popup Classes
```css
.mapboxgl-popup-close-button        /* Close button with hover effects */
.mapboxgl-popup-close-button:hover  /* Hover state */
.mapboxgl-popup-tip                 /* Popup arrow/tip with drop shadow */
```

#### Marker Classes
```css
.static-map-marker                  /* Regular markers */
.static-map-custom-marker           /* Custom image markers */
.static-map-circle-marker           /* Circle markers */
.static-map-interactive             /* Applied to clickable elements */
```

### 5. **Usage**

The CSS is automatically imported when you import from the library:

```javascript
import { StaticMap, Marker, Popup } from 'mapbox-static-js';
// CSS is automatically included
```

### 6. **Customization**

You can override library styles by:

1. **CSS Specificity**: Use more specific selectors
2. **CSS Custom Properties**: Define your own color scheme
3. **CSS-in-JS**: Override individual component styles via the `style` prop

### 7. **Why CSS + Inline Styles?**

This hybrid approach provides:
- ✅ **Pseudo-selectors** (`:hover`, `:focus`) via CSS
- ✅ **Dynamic positioning** via inline styles
- ✅ **Type safety** for style props
- ✅ **Zero configuration** for consumers

The library handles complex positioning calculations in JavaScript while using CSS for visual enhancements that inline styles cannot provide.