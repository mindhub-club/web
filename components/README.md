# EuropeMap Component

A customizable React component that renders an interactive map of Europe with location markers and hover effects.

## Features

- **Interactive Locations**: Click and hover on location markers
- **Customizable Colors**: Change colors for active, potential, and inactive locations
- **Responsive Design**: Works on different screen sizes
- **TypeScript Support**: Fully typed with TypeScript interfaces
- **Customizable Data**: Pass your own location data or use defaults

## Usage

### Basic Usage

```tsx
import { EuropeMap } from './components/EuropeMap';

function MyComponent() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const locations = [
    {
      id: "munich",
      name: "Munich",
      country: "Germany",
      coordinates: { x: 107.5, y: 162.5 },
      status: "active",
      sessions: "Weekly Sessions",
      nextEvent: "Software Architecture"
    }
  ];

  return (
    <EuropeMap
      locations={locations}
      selectedLocation={selectedLocation}
      onLocationSelect={setSelectedLocation}
      onLocationHover={setSelectedLocation}
    />
  );
}
```

### Advanced Usage with Custom Styles

```tsx
<EuropeMap
  locations={locations}
  selectedLocation={selectedLocation}
  onLocationSelect={setSelectedLocation}
  onLocationHover={setSelectedLocation}
  showPotentialLocations={true}
  customStyles={{
    activeLocationColor: '#10b981',
    potentialLocationColor: '#f59e0b',
    inactiveLocationColor: '#6b7280',
    hoverColor: '#059669'
  }}
  className="w-full h-96"
/>
```

## Props

### EuropeMapProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `locations` | `Location[]` | `[]` | Array of location objects |
| `selectedLocation` | `string \| null` | `null` | Currently selected location ID |
| `onLocationSelect` | `(locationId: string \| null) => void` | `undefined` | Callback when location is clicked |
| `onLocationHover` | `(locationId: string \| null) => void` | `undefined` | Callback when location is hovered |
| `className` | `string` | `''` | Additional CSS classes |
| `showPotentialLocations` | `boolean` | `true` | Whether to show potential location dots |
| `customStyles` | `CustomStyles` | `{}` | Custom color overrides |

### Location Interface

```tsx
interface Location {
  id: string;
  name: string;
  country: string;
  coordinates: { x: number; y: number };
  status: 'active' | 'potential' | 'inactive';
  sessions?: string;
  nextEvent?: string;
}
```

### CustomStyles Interface

```tsx
interface CustomStyles {
  activeLocationColor?: string;
  potentialLocationColor?: string;
  inactiveLocationColor?: string;
  hoverColor?: string;
}
```

## Examples

### Example 1: Basic Map with Active Locations

```tsx
const activeLocations = [
  {
    id: "munich",
    name: "Munich",
    country: "Germany",
    coordinates: { x: 107.5, y: 162.5 },
    status: "active",
    sessions: "Weekly Sessions",
    nextEvent: "Software Architecture"
  }
];

<EuropeMap
  locations={activeLocations}
  selectedLocation={selectedLocation}
  onLocationSelect={setSelectedLocation}
/>
```

### Example 2: Map with Both Active and Potential Locations

```tsx
const allLocations = [
  // Active locations
  {
    id: "munich",
    name: "Munich",
    country: "Germany",
    coordinates: { x: 107.5, y: 162.5 },
    status: "active",
    sessions: "Weekly Sessions"
  },
  // Potential locations
  {
    id: "amsterdam",
    name: "Amsterdam",
    country: "Netherlands",
    coordinates: { x: 380, y: 240 },
    status: "potential"
  }
];

<EuropeMap
  locations={allLocations}
  selectedLocation={selectedLocation}
  onLocationSelect={setSelectedLocation}
  showPotentialLocations={true}
/>
```

### Example 3: Custom Styled Map

```tsx
<EuropeMap
  locations={locations}
  selectedLocation={selectedLocation}
  onLocationSelect={setSelectedLocation}
  customStyles={{
    activeLocationColor: '#10b981',    // Green
    potentialLocationColor: '#f59e0b',  // Amber
    inactiveLocationColor: '#6b7280',   // Gray
    hoverColor: '#059669'               // Dark green
  }}
/>
```

## Styling

The component uses CSS-in-JS for dynamic styling and Tailwind CSS classes for static styling. You can customize the appearance by:

1. **Passing custom colors** via the `customStyles` prop
2. **Adding CSS classes** via the `className` prop
3. **Overriding CSS variables** in your global styles

### CSS Variables Used

- `--primary`: Used for active locations and hover effects
- `--secondary`: Used for secondary elements
- `--muted`: Used for muted text and backgrounds

## Migration from Image-based Map

If you're migrating from the old image-based map:

1. **Replace the `<image>` tag** with the `<EuropeMap>` component
2. **Convert your location data** to the new `Location` interface format
3. **Update event handlers** to use the new callback props
4. **Remove custom CSS** that was targeting the old SVG elements

### Before (Image-based)

```tsx
<svg viewBox="0 0 100 80">
  <image href="/map.svg" />
  {/* Custom overlays and handlers */}
</svg>
```

### After (Component-based)

```tsx
<EuropeMap
  locations={locations}
  selectedLocation={selectedLocation}
  onLocationSelect={setSelectedLocation}
/>
```

## Performance

The component is optimized for performance:

- **Memoized rendering** of location markers
- **Efficient event handling** with proper cleanup
- **Minimal re-renders** using React best practices
- **Optimized SVG** with reduced complexity

## Browser Support

- Modern browsers with SVG support
- React 16.8+ (for hooks)
- TypeScript 4.0+ (for type definitions)


