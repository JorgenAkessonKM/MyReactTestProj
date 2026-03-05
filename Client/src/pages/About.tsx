import { useAuth } from "../contexts/AuthProvider";
import "./About.css";
import RemoteComponentWrapper from "../Components/RemoteComponentWrapper";
import Dropdown from "react-bootstrap/Dropdown";
//import { DropdownMenu } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useState } from "react";

function About() {
  const auth = useAuth();
  const [selectedRegion, setSelectedRegion] = useState("test");

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
        <DropdownButton id="dropdown-basic-button" title="Region">
          <Dropdown.Item id="ALL" onClick={clickedHandler}>
            ALL
          </Dropdown.Item>
          <Dropdown.Item id="EU" onClick={clickedHandler}>
            EU
          </Dropdown.Item>
          <Dropdown.Item id="US" onClick={clickedHandler}>
            US
          </Dropdown.Item>
        </DropdownButton>
        <p>Selected region: {selectedRegion}</p>

        <RemoteComponentWrapper regionName={selectedRegion} />
      </div>
    </>
  );
}

export default About;
