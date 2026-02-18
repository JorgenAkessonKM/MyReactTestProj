import type { ReactNode } from "react";
import "./Button.css";

interface Props {
  children: ReactNode;
}

function Button({ children }: Props) {
  return <button className="btn btn-primary">{children}</button>;
}

export default Button;
