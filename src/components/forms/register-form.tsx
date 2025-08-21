"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function RegisterForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postal, setPostal] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    const user = data.user;
    if (!user) {
      setError("User not created. Please try again.");
      setLoading(false);
      return;
    }

    const { error: profileError } = await supabase.from("profiles").insert([
      {
        id: user.id, 
        username: name,
        role: "user",
        street,
        city,
        province,
        postal,
        phone,
      },
    ]);

    if (profileError) {
      setError(profileError.message);
      setLoading(false);
      return;
    }

    alert("Registration successful! Please log in.");
    router.replace("/auth/login");
    setLoading(false);
  };

  return (
    <form onSubmit={handleRegister} className="max-w-sm mx-auto space-y-4">
      <div>
        <Label>Full Name</Label>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          required
        />
      </div>
      <div>
        <Label>Street</Label>
        <Input
          type="text"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          placeholder="123 Street Name"
          required
        />
      </div>
      <div>
        <Label>City</Label>
        <Input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          required
        />
      </div>
      <div>
        <Label>Province</Label>
        <Input
          type="text"
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          placeholder="Province"
          required
        />
      </div>
      <div>
        <Label>Postal Code</Label>
        <Input
          type="text"
          value={postal}
          onChange={(e) => setPostal(e.target.value)}
          placeholder="Postal Code"
          required
        />
      </div>
      <div>
        <Label>Phone Number</Label>
        <Input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="09XXXXXXXXX"
          required
        />
      </div>
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
        {loading ? "Registering..." : "Register"}
      </Button>

      <div className="text-center">
        <a
          href="/auth/login"
          className=" hover:underline text-sm"
        >
          Already have an account? Log in
        </a>
      </div>
    </form>
  );
}
