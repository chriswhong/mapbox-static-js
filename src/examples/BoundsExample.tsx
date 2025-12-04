import { StaticMap } from '../lib';
import { Example } from '../components/Example';

/**
 * @title Bounds Example
 * @description Use bounds to define the map area instead of center and zoom. This example shows Montgomery County, Maryland using southwest/northeast coordinate pairs.
 * @category StaticMap
 */
export function BoundsExampleExample({ accessToken }: { accessToken: string }) {
  return (
    <StaticMap
      accessToken={accessToken}
      mapStyle="streets-v12"
      bounds={[
        { lng: -77.469482, lat: 38.930499 }, // Southwest corner
        { lng: -76.889038, lat: 39.367943 }  // Northeast corner
      ]}
      size={{ width: 600, height: 400 }}
      retina={true}
    />
  );
}

export const BoundsExample = () => (
  <Example
    title="Bounds Example"
    description="Use bounds to define the map area instead of center and zoom. This example shows Montgomery County, Maryland using southwest/northeast coordinate pairs."
    code={`<StaticMap
  accessToken="YOUR_ACCESS_TOKEN"
  mapStyle="outdoors-v12"
  bounds={[
    { lng: -77.469482, lat: 38.930499 }, // Southwest corner
    { lng: -76.889038, lat: 39.367943 }  // Northeast corner
  ]}
  size={{ width: 600, height: 400 }}
  retina={true}
/>`}
    component={BoundsExampleExample}
  />
);