import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "@tanstack/react-router";
import { Calendar, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const set = (k: string, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email) e.email = "Email is required";
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
      e.email = "Invalid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Minimum 6 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    return e;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setLoading(true);
    const result = await register(form.name, form.email, form.password);
    setLoading(false);
    if (result.success) {
      toast.success("Account created! Welcome to EventHub!");
      navigate({ to: "/dashboard/profile" });
    } else {
      setErrors({ form: result.error ?? "Registration failed" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary-foreground" />
              </div>
            </Link>
            <h1 className="text-2xl font-display font-bold">
              Create your account
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Join EventHub and start discovering amazing events
            </p>
          </div>

          {errors.form && (
            <div
              className="bg-destructive/10 text-destructive text-sm rounded-xl p-3 mb-4"
              data-ocid="register.error_state"
            >
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                className="mt-1 rounded-xl"
                autoComplete="name"
                data-ocid="register.name_input"
              />
              {errors.name && (
                <p
                  className="text-destructive text-xs mt-1"
                  data-ocid="register.name_error"
                >
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="reg-email">Email</Label>
              <Input
                id="reg-email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                className="mt-1 rounded-xl"
                autoComplete="email"
                data-ocid="register.email_input"
              />
              {errors.email && (
                <p
                  className="text-destructive text-xs mt-1"
                  data-ocid="register.email_error"
                >
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="reg-password">Password</Label>
              <div className="relative mt-1">
                <Input
                  id="reg-password"
                  type={showPwd ? "text" : "password"}
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={(e) => set("password", e.target.value)}
                  className="pr-10 rounded-xl"
                  autoComplete="new-password"
                  data-ocid="register.password_input"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowPwd(!showPwd)}
                >
                  {showPwd ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p
                  className="text-destructive text-xs mt-1"
                  data-ocid="register.password_error"
                >
                  {errors.password}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="confirm">Confirm Password</Label>
              <Input
                id="confirm"
                type="password"
                placeholder="Repeat your password"
                value={form.confirm}
                onChange={(e) => set("confirm", e.target.value)}
                className="mt-1 rounded-xl"
                autoComplete="new-password"
                data-ocid="register.confirm_input"
              />
              {errors.confirm && (
                <p
                  className="text-destructive text-xs mt-1"
                  data-ocid="register.confirm_error"
                >
                  {errors.confirm}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground rounded-xl"
              disabled={loading}
              data-ocid="register.submit_button"
            >
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
