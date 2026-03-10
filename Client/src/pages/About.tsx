import { useAuth } from "../contexts/AuthProvider";
import "./About.css";
import RemoteComponentWrapper from "../Components/RemoteComponentWrapper";
import Dropdown from "react-bootstrap/Dropdown";
//import { DropdownMenu } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useState } from "react";
import { getConfig } from "../config";

function About() {
  const regions = getConfig();
  const auth = useAuth();
  const [selectedRegion, setSelectedRegion] = useState("ALL");

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
