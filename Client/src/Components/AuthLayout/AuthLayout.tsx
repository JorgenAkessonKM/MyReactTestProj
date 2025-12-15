import type { ReactNode } from "react";
import "./AuthLayout.css";

interface Props {
  children: ReactNode;
  title?: string;
}

const AuthLayout: React.FC<Props> = ({ children, title }) => {
  return (
    <div className="auth-layout">
      <main className="auth-body">
        <div className="auth-card">
          {title && <h2 className="auth-title">{title}</h2>}
          {children}
        </div>
      </main>

      <footer className="auth-footer" />
    </div>
  );
};

export default AuthLayout;
