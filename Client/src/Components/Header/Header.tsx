import { increment } from "../../app/counterSlice";
import Navbar from "../Navbar";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
//import {} from "../../App/counterSlice"

export default function Header() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <Navbar />
      {<p>{count}</p>}
      <button onClick={() => dispatch(increment("Kalle"))}>Increment</button>
    </>
  );
}
