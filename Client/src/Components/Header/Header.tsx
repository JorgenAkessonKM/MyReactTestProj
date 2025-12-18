import Navbar from "../Navbar";
import styles from "./Header.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setName } from "../../app/loggedInNameSlice";
import { useAuth } from "../../contexts/AuthProvider";

export default function Header() {
  const name = useSelector((abc) => abc.loggedInName.name);
  const dispatch = useDispatch();
  const auth = useAuth();

  const myStyle = {
    color: "blue",
    maxWidth: "100px",
  };

  return (
    <>
      <Navbar style={{ minWidth: "100px" }} />
      {<p style={{ color: "red", maxWidth: "100px" }}>{name}</p>}
      {<p style={myStyle}>{name}</p>}
      {<p className={styles.myclass}>{name}</p>}
      <button
        onClick={() => {
          auth.logOut();
          dispatch(setName("Logged out!"));
        }}
        className="btn btn-info"
      >
        Logout
      </button>
    </>
  );
}
