export type RegionKey = "us" | "eu";

export interface FederationConfig {
  remoteName: string;
  remoteEntryUrl: string;
  regionModules: Record<RegionKey, string>;
}

const STORAGE_KEY = "federation-config";

const defaultConfig: FederationConfig = {
  remoteName: "remote_app",
  remoteEntryUrl: "http://localhost:5001/assets/remoteEntry.js",
  regionModules: {
    us: "./regionUS",
    eu: "./regionEU",
  },
};

export function getFederationConfig(): FederationConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaultConfig;
    }

    const parsed = JSON.parse(raw) as Partial<FederationConfig>;
    return {
      remoteName: parsed.remoteName || defaultConfig.remoteName,
      remoteEntryUrl: parsed.remoteEntryUrl || defaultConfig.remoteEntryUrl,
      regionModules: {
        us: parsed.regionModules?.us || defaultConfig.regionModules.us,
        eu: parsed.regionModules?.eu || defaultConfig.regionModules.eu,
      },
    };
  } catch {
    return defaultConfig;
  }
}

export function saveFederationConfig(config: FederationConfig): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export function getDefaultFederationConfig(): FederationConfig {
  return {
    ...defaultConfig,
    regionModules: { ...defaultConfig.regionModules },
  };
}
