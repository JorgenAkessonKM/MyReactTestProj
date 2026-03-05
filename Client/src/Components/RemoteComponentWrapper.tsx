//https://www.freecodecamp.org/news/how-to-build-micro-frontends-in-react-with-vite-and-module-federation/

import React, { Suspense } from "react";

const RemoteRegionUS = React.lazy(() => import("remote_app/regionUS" as any));
const RemoteRegionEU = React.lazy(() => import("remote_app/regionEU" as any));

const LoadingSpinner = () => (
  <div className="flex justify-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
  </div>
);

interface Props {
  regionName: string;
}

function RemoteComponentWrapper({ regionName }: Props) {
  const normalizedRegion = regionName.toLowerCase();

  return (
    <div className="p-4">
      <Suspense fallback={<LoadingSpinner />}>
        {(normalizedRegion === "us" || normalizedRegion === "all") && (
          <RemoteRegionUS />
        )}
        {(normalizedRegion === "eu" || normalizedRegion === "all") && (
          <RemoteRegionEU />
        )}
      </Suspense>
    </div>
  );
}

export default RemoteComponentWrapper;
