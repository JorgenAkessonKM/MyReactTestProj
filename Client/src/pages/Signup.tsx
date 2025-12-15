import React from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../Components/AuthLayout/AuthLayout";
import SignupForm from "../Components/SignupForm/SignupForm";
import { useAuth } from "../contexts/AuthContext";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  async function handleSubmit(payload: { email: string; password: string }) {
    try {
      await auth.signup(payload.email, payload.password);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <AuthLayout title="Create account">
      <SignupForm onSubmit={handleSubmit} />
    </AuthLayout>
  );
};

export default Signup;
