import { useAuth } from "../contexts/AuthProvider";
import "./About.css";
import { RemoteComponentWrapper } from "../Components/RemoteComponentWrapper";

function About() {
  const auth = useAuth();
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
        <RemoteComponentWrapper />
      </div>
    </>
  );
}

export default About;
