import type { ExampleDefinition } from './types';
import { parseJSDocFromCode, extractComponentCode } from './jsDocParser';

// Import all example components (no more manual code strings!)
import { BasicUsageExample } from './BasicUsage';
import { SatelliteViewExample } from './SatelliteView';
import { MapStylesGridExample } from './MapStylesGrid';
import { Advanced3DMapExample } from './Advanced3DMap';
import { AutomaticPopupsExample } from './AutomaticPopups';
import { ZillowStyleMarkersExample } from './ZillowStyleMarkers';

// Raw source code for JSDoc parsing (in a real app, this could be done at build time)
import BasicUsageSource from './BasicUsage.tsx?raw';
import SatelliteViewSource from './SatelliteView.tsx?raw';
import MapStylesGridSource from './MapStylesGrid.tsx?raw';
import Advanced3DMapSource from './Advanced3DMap.tsx?raw';
import AutomaticPopupsSource from './AutomaticPopups.tsx?raw';
import ZillowStyleMarkersSource from './ZillowStyleMarkers.tsx?raw';

/**
 * Helper function to create an example with metadata and code extracted from JSDoc comments
 */
function createExampleFromSource(
  id: string,
  component: React.ComponentType<{ accessToken: string }>,
  sourceCode: string
): ExampleDefinition {
  const metadata = parseJSDocFromCode(sourceCode);
  const code = extractComponentCode(sourceCode);
  
  if (!metadata) {
    throw new Error(`Failed to parse JSDoc metadata for example: ${id}`);
  }

  return {
    id,
    component,
    code,
    ...metadata
  };
}

// Define all examples with metadata and code automatically extracted from source files
export const examples: ExampleDefinition[] = [
  // StaticMap Examples
  createExampleFromSource('basic-usage', BasicUsageExample, BasicUsageSource),
  createExampleFromSource('satellite-view', SatelliteViewExample, SatelliteViewSource),
  createExampleFromSource('map-styles-grid', MapStylesGridExample, MapStylesGridSource),
  createExampleFromSource('advanced-3d-map', Advanced3DMapExample, Advanced3DMapSource),

  // Marker Examples
  createExampleFromSource('automatic-popups', AutomaticPopupsExample, AutomaticPopupsSource),
  createExampleFromSource('zillow-style-markers', ZillowStyleMarkersExample, ZillowStyleMarkersSource),
];

// Group examples by category
export const examplesByCategory = examples.reduce((acc, example) => {
  if (!acc[example.category]) {
    acc[example.category] = [];
  }
  acc[example.category].push(example);
  return acc;
}, {} as Record<string, ExampleDefinition[]>);