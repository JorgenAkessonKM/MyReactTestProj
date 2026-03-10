import { useAuth } from "../contexts/AuthProvider";
import "./About.css";
import RemoteComponentWrapper from "../Components/RemoteComponentWrapper";
import Dropdown from "react-bootstrap/Dropdown";
//import { DropdownMenu } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { getConfig } from "../config";

function About() {
  const regions = getConfig();
  const auth = useAuth();
  const [selectedRegion, setSelectedRegion] = useState("ALL");
  const [showToken, setShowToken] = useState(false);

  const clickedHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const region =
      event.currentTarget.id || event.currentTarget.textContent?.trim() || "";
    console.log("Region selected:", region);
    setSelectedRegion(region);
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
          </>
        ) : (
          <></>
        )}

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
