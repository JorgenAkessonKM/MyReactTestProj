export type RegionKey = "us" | "eu";

export interface FederationConfig {
  remoteName: string;
  remoteEntryUrl: string;
  regionModules: Record<RegionKey, string>;
}

const STORAGE_KEY = "federation-config";

const normalizeRemoteEntryUrl = (url: string) => {
  const trimmed = url.trim();
  if (!trimmed) {
    return trimmed;
  }
  return trimmed.replace("http://localhost:5174/", "http://localhost:5001/");
};

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
    const parsedRemoteEntryUrl = normalizeRemoteEntryUrl(
      parsed.remoteEntryUrl || defaultConfig.remoteEntryUrl,
    );

    if (
      parsed.remoteEntryUrl &&
      parsed.remoteEntryUrl !== parsedRemoteEntryUrl
    ) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          ...parsed,
          remoteEntryUrl: parsedRemoteEntryUrl,
        }),
      );
    }

    return {
      remoteName: parsed.remoteName || defaultConfig.remoteName,
      remoteEntryUrl: parsedRemoteEntryUrl,
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
