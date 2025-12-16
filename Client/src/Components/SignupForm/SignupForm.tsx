import type { FormEvent } from "react";
import { useState } from "react";
import Button from "../Button";
import Alert from "../Alert";
import "./SignupForm.css";

interface Props {
  onSubmit?: (payload: { email: string; password: string }) => void;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignupForm({ onSubmit }: Props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirm?: string;
  }>();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function validate() {
    const e: { email?: string; password?: string; confirm?: string } = {};
    if (!name) e.name = "Name is required.";
    if (!email) e.email = "Email is required.";
    else if (!emailRegex.test(email)) e.email = "Enter a valid email.";
    if (!password) e.password = "Password is required.";
    else if (password.length < 6)
      e.password = "Password must be at least 6 characters.";
    if (!confirm) e.confirm = "Please confirm your password.";
    else if (confirm !== password) e.confirm = "Passwords do not match.";
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
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Signup failed");
      onSubmit?.({ email, password });
    } catch (err: any) {
      setSubmitError(err?.message ?? "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="login-form card p-4" onSubmit={handleSubmit} noValidate>
      <h3 className="mb-3 text-center">Create account</h3>

      {submitError && (
        <div className="mb-3">
          <Alert text={submitError} />
        </div>
      )}

      <div className="mb-3">
        <label className="form-label" htmlFor="email">
          Name
        </label>
        <input
          id="name"
          type="text"
          className={`form-control ${errors?.name ? "is-invalid" : ""}`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={!!errors?.name}
          placeholder="Full name"
        />
        {errors?.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>

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

      <div className="mb-3">
        <label className="form-label" htmlFor="confirm">
          Confirm Password
        </label>
        <input
          id="confirm"
          type="password"
          className={`form-control ${errors?.confirm ? "is-invalid" : ""}`}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          aria-invalid={!!errors?.confirm}
        />
        {errors?.confirm && (
          <div className="invalid-feedback">{errors.confirm}</div>
        )}
      </div>

      <div className="d-grid">
        <Button>{loading ? "Creating account..." : "Create account"}</Button>
      </div>
    </form>
  );
}
