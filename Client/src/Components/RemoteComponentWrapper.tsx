//https://www.freecodecamp.org/news/how-to-build-micro-frontends-in-react-with-vite-and-module-federation/

import React, { Suspense, useMemo } from "react";
import {
  __federation_method_getRemote,
  __federation_method_setRemote,
  __federation_method_unwrapDefault,
} from "virtual:__federation__";
import { getFederationConfig } from "../config/federationConfig";
import type { RegionKey } from "../config/federationConfig";

type RemoteComponentType = React.ComponentType<Record<string, never>>;

const normalizeExposedModule = (moduleName: string) => {
  const trimmed = moduleName.trim();
  if (!trimmed) {
    return trimmed;
  }
  return trimmed.startsWith("./") ? trimmed : `./${trimmed}`;
};

const getRegionComponent = (region: RegionKey) => {
  const config = getFederationConfig();
  const moduleName = normalizeExposedModule(config.regionModules[region]);

  return React.lazy(async () => {
    __federation_method_setRemote(config.remoteName, {
      url: config.remoteEntryUrl,
      format: "esm",
      from: "vite",
    });

    const remoteModule = await __federation_method_getRemote(
      config.remoteName,
      moduleName,
    );
    const unwrapped = await __federation_method_unwrapDefault(remoteModule);

    return {
      default: unwrapped as RemoteComponentType,
    };
  });
};

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
  const RemoteRegionUS = useMemo(() => getRegionComponent("us"), []);
  const RemoteRegionEU = useMemo(() => getRegionComponent("eu"), []);

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
