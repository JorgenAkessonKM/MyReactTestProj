import { useAuth } from "../contexts/AuthProvider";
import "./About.css";
import RemoteComponentWrapper from "../Components/RemoteComponentWrapper";
import Dropdown from "react-bootstrap/Dropdown";
//import { DropdownMenu } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { getConfig } from "../config";
import { getDbUserByName, upsertDbUser } from "../Services/userDbApi";

function About() {
  const regions = getConfig();
  const auth = useAuth();
  const [selectedRegion, setSelectedRegion] = useState("ALL");
  const [showToken, setShowToken] = useState(false);
  const [lookupName, setLookupName] = useState("");
  const [dbRegion, setDbRegion] = useState("");
  const [dbStatus, setDbStatus] = useState("");

  const clickedHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const region =
      event.currentTarget.id || event.currentTarget.textContent?.trim() || "";
    console.log("Region selected:", region);
    setSelectedRegion(region);
  };

  const saveCurrentUserToDb = async () => {
    const name = auth.user?.name?.trim();
    const token = auth.token?.trim();

    if (!name || !token) {
      setDbStatus("Missing authenticated user name or token.");
      return;
    }

    try {
      await upsertDbUser({ name, token, region: selectedRegion });
      setDbStatus(`Saved user '${name}' to SQLite DB.`);
    } catch (error) {
      setDbStatus(
        `Save failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  };

  const getUserRegionByName = async () => {
    const name = lookupName.trim();
    if (!name) {
      setDbStatus("Enter a user name first.");
      return;
    }

    try {
      const user = await getDbUserByName(name);
      setDbRegion(user.region);
      setDbStatus(`Loaded region for '${user.name}'.`);
      setSelectedRegion(user.region);
    } catch (error) {
      setDbRegion("");
      setDbStatus(
        `Lookup failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  };

  return (
    <>
      <div className="about-container">
        <h1>About Page</h1>
        {auth.isAuthenticated ? (
          <>
            <p>{auth.user?.name}</p>
            <p>{auth.user?.email}</p>
            <p>{auth.user?.locale}</p>
            <p>{auth.user?.zoneinfo}</p>
            <Button
              variant="primary"
              type="button"
              style={{ margin: 5 }}
              onClick={() => setShowToken((prev) => !prev)}
            >
              {showToken ? "Hide Okta Token" : "Show Okta Token"}
            </Button>
            {showToken ? (
              <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
                {auth.token || "No token found"}
              </pre>
            ) : null}
            <Button
              variant="success"
              type="button"
              style={{ margin: 5 }}
              onClick={saveCurrentUserToDb}
            >
              Save Current User To DB
            </Button>
          </>
        ) : (
          <></>
        )}

        <div style={{ marginTop: 12 }}>
          <label htmlFor="db-name-input">Find user by name</label>
          <input
            id="db-name-input"
            type="text"
            value={lookupName}
            onChange={(event) => setLookupName(event.target.value)}
            placeholder="Enter name"
            style={{ marginLeft: 8, marginRight: 8 }}
          />
          <Button
            variant="secondary"
            type="button"
            onClick={getUserRegionByName}
          >
            Get User Data
          </Button>
        </div>

        <div style={{ marginTop: 12 }}>
          <label htmlFor="db-region-output">Region from SQLite DB</label>
          <textarea
            id="db-region-output"
            readOnly
            value={dbRegion}
            rows={4}
            style={{ width: "100%", marginTop: 8 }}
          />
          {dbStatus ? <p>{dbStatus}</p> : null}
        </div>

        <DropdownButton id="dropdown-basic-button" title="Dynamic Regions">
          {regions.regions.map((region) => (
            <>
              <Dropdown.Item key={region} id={region} onClick={clickedHandler}>
                {region}
              </Dropdown.Item>
            </>
          ))}
        </DropdownButton>

        <p>Selected region: {selectedRegion}</p>

        <RemoteComponentWrapper regionName={selectedRegion} />
      </div>
    </>
  );
}

export default About;
