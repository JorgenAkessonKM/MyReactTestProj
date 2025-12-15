import React from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../Components/AuthLayout/AuthLayout";
import LoginForm from "../Components/LoginForm/LoginForm";
import { useAuth } from "../contexts/AuthContext";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  async function handleSubmit(payload: { email: string; password: string }) {
    try {
      await auth.login(payload.email, payload.password);
      navigate("/");
    } catch (err) {
      // if login fails, the form shows errors; keep simple here
      console.error(err);
    }
  }

  return (
    <AuthLayout title="Sign in">
      <LoginForm onSubmit={handleSubmit} />
    </AuthLayout>
  );
};

export default Login;
