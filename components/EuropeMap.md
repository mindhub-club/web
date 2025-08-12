# EuropeMap Component

A customizable React component that renders an interactive map of Europe.

## Basic Usage

```tsx
import { EuropeMap } from './components/EuropeMap';

const locations = [
  {
    id: "munich",
    name: "Munich",
    country: "Germany",
    coordinates: { x: 107.5, y: 162.5 },
    status: "active",
    sessions: "Bi-weekly Sessions"
  }
];

<EuropeMap
  locations={locations}
  selectedLocation={selectedLocation}
  onLocationSelect={setSelectedLocation}
  onLocationHover={setSelectedLocation}
/>
```

## Props

- `locations`: Array of location objects
- `selectedLocation`: Currently selected location ID
- `onLocationSelect`: Callback when location is clicked
- `onLocationHover`: Callback when location is hovered
- `showPotentialLocations`: Whether to show potential locations (default: true)
- `customStyles`: Custom colors for different location types
- `className`: Additional CSS classes

## Location Interface

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

## Custom Styles

```tsx
<EuropeMap
  customStyles={{
    activeLocationColor: '#10b981',
    potentialLocationColor: '#f59e0b',
    hoverColor: '#059669'
  }}
/>
```
