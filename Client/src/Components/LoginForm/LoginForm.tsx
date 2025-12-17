import type { FormEvent } from "react";
import { useState } from "react";
import Button from "../Button";
import Alert from "../Alert";
import "./LoginForm.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { increment } from "../../app/counterSlice";

interface Props {
  onSubmit?: (payload: { email: string; password: string }) => void;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginForm({ onSubmit }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  function validate() {
    const e: { email?: string; password?: string } = {};
    if (!email) e.email = "Email is required.";
    else if (!emailRegex.test(email)) e.email = "Enter a valid email.";
    if (!password) e.password = "Password is required.";
    else if (password.length < 6)
      e.password = "Password must be at least 6 characters.";
    return e;
  }

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    setSubmitError(null);
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;
    setLoading(true);
    try {
      const username = email.split("@")[0];
      await fetch("http://localhost:8080/api/auth/login", {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
        .then((response) => {
          if (!response.ok) {
            throw "Failed login!" + response.status;
          }
          const data = response.json();
          return data;
        })
        .then((data) => {
          dispatch(increment(data.name));
          console.log(data);
        });
      onSubmit?.({ email, password });
    } catch (err: any) {
      setSubmitError(err?.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="login-form card p-4" onSubmit={handleSubmit} noValidate>
      <h3 className="mb-3 text-center">Sign in</h3>

      {submitError && (
        <div className="mb-3">
          <Alert text={submitError} />
        </div>
      )}

      <div className="mb-3">
        <label className="form-label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          className={`form-control ${errors?.email ? "is-invalid" : ""}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!errors?.email}
        />
        {errors?.email && (
          <div className="invalid-feedback">{errors.email}</div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          className={`form-control ${errors?.password ? "is-invalid" : ""}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={!!errors?.password}
        />
        {errors?.password && (
          <div className="invalid-feedback">{errors.password}</div>
        )}
      </div>

      <div className="d-grid">
        <Button>{loading ? "Signing in..." : "Sign in"}</Button>
      </div>
      <p>Dont have an account? Sign up.</p>
      <Link to="/signup">Signup</Link>
    </form>
  );
}
