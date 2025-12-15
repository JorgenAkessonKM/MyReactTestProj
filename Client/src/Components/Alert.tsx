import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  text: string;
}

const Alert = ({ children, text }: Props) => {
  return (
    <div className="alert alert-primary" role="alert">
      {children}
      {text}
    </div>
  );
};

export default Alert;
