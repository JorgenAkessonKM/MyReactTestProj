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
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirm?: string;
  }>();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function validate() {
    const e: { email?: string; password?: string; confirm?: string } = {};
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
      // Replace with real signup call
      await new Promise((r) => setTimeout(r, 500));
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
