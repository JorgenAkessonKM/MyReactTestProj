import Navbar from "../Navbar";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import { setName } from "../../app/loggedInNameSlice";
import { useAuth } from "../../contexts/AuthProvider";

export default function Header() {
  const name = useSelector((state: any) => state.loggedInName.name);
  const dispatch = useDispatch();
  const auth = useAuth() as any;

  return (
    <>
      <div className="top bg-light center">
        <Navbar />
        <div style={{ display: "flex", width: "300px" }}>
          <p className="myClass center" style={{ margin: 0 }}>
            {name}
          </p>
          <button
            style={{ display: "flex", justifyContent: "flex-end" }}
            onClick={() => {
              auth.logOut();
              dispatch(setName("Logged out!"));
            }}
            className="btn btn-info"
          >
            Logout
          </button>
        </div>{" "}
      </div>
    </>
  );
}
