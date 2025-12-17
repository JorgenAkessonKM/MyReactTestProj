import { setName } from "../../app/loggedInNameSlice";
import Navbar from "../Navbar";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";

export default function Header() {
  const name = useSelector((a) => a.loggedInName.name);
  const dispatch = useDispatch();

  return (
    <>
      <Navbar />
      {<p>{name}</p>}
    </>
  );
}
