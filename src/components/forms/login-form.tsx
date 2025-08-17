"use client";

import { useState, startTransition } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError(loginError.message);
      setLoading(false);
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user?.id)
      .single();

    if (profileError || !profile) {
      setError("Unable to fetch user role.");
      setLoading(false);
      return;
    }

    // Redirect based on role

    if (profile.role === "admin") {
      router.replace("/admin/dashboard"); // replace instead of push
    } else {
      router.replace("/user/dashboard");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleLogin} className="max-w-sm mx-auto space-y-4">
      <div>
        <Label>Email</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
      </div>

      <div>
        <Label>Password</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Logging in..." : "Log In"}
      </Button>

      <div>
        <a href="/auth/register" className="text-blue-600 hover:underline">
          Sign up
        </a>
      </div>
    </form>
  );
}
