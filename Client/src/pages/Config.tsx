import { type FormEvent, useState } from "react";
import {
  getDefaultFederationConfig,
  getFederationConfig,
  saveFederationConfig,
} from "../config/federationConfig";

function Config() {
  const initialConfig = getFederationConfig();
  const [remoteName, setRemoteName] = useState(initialConfig.remoteName);
  const [remoteEntryUrl, setRemoteEntryUrl] = useState(
    initialConfig.remoteEntryUrl,
  );
  const [regionUSModule, setRegionUSModule] = useState(
    initialConfig.regionModules.us,
  );
  const [regionEUModule, setRegionEUModule] = useState(
    initialConfig.regionModules.eu,
  );
  const [savedMessage, setSavedMessage] = useState("");

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveFederationConfig({
      remoteName,
      remoteEntryUrl,
      regionModules: {
        us: regionUSModule,
        eu: regionEUModule,
      },
    });
    setSavedMessage("Config saved. Refresh About page to reload remotes.");
  };

  const handleResetDefaults = () => {
    const defaults = getDefaultFederationConfig();
    setRemoteName(defaults.remoteName);
    setRemoteEntryUrl(defaults.remoteEntryUrl);
    setRegionUSModule(defaults.regionModules.us);
    setRegionEUModule(defaults.regionModules.eu);
    saveFederationConfig(defaults);
    setSavedMessage("Config reset to defaults.");
  };

  return (
    <div className="container mt-3">
      <h1>Federation Config</h1>
      <form onSubmit={handleSave}>
        <div className="mb-3">
          <label className="form-label" htmlFor="remoteName">
            Remote Name
          </label>
          <input
            id="remoteName"
            className="form-control"
            value={remoteName}
            onChange={(event) => setRemoteName(event.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="remoteEntryUrl">
            Remote Entry URL
          </label>
          <input
            id="remoteEntryUrl"
            className="form-control"
            value={remoteEntryUrl}
            onChange={(event) => setRemoteEntryUrl(event.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="regionUSModule">
            US Module
          </label>
          <input
            id="regionUSModule"
            className="form-control"
            value={regionUSModule}
            onChange={(event) => setRegionUSModule(event.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="regionEUModule">
            EU Module
          </label>
          <input
            id="regionEUModule"
            className="form-control"
            value={regionEUModule}
            onChange={(event) => setRegionEUModule(event.target.value)}
          />
        </div>

        <button className="btn btn-primary" type="submit">
          Save Config
        </button>
        <button
          className="btn btn-secondary ms-2"
          type="button"
          onClick={handleResetDefaults}
        >
          Reset Defaults
        </button>
      </form>
      {savedMessage && <p className="mt-3">{savedMessage}</p>}
    </div>
  );
}

export default Config;
