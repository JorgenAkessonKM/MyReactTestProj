export type Region = "ALL" | "EU" | "US" | "East Asia";

export type RuntimeConfig = {
  regions: Region[];
  apiBaseUrl: string;
};

let runtimeConfig: RuntimeConfig | null = null;

export async function loadConfig() {
  if (runtimeConfig) return runtimeConfig;

  const res = await fetch("/config.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load config.json");

  runtimeConfig = (await res.json()) as RuntimeConfig;
  return runtimeConfig;
}

export function getConfig(): RuntimeConfig {
  if (!runtimeConfig) {
    throw new Error("Config not loaded yet");
  }
  return runtimeConfig;
}
