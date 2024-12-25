"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        throw new Error("Invalid password");
      }

      // Redirect or handle successful login
      router.push("/demo/protected");
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <main className="flex flex-col items-center h-screen w-full">
      <div className="w-96 md:w-1/2 px-4 py-20 space-y-4">
        <header>
          <h1>bohoauth</h1>
        </header>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="password is bohoauth"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-describedby={error ? "password-error" : undefined}
              className="border-b"
            />
            {error && (
              <p id="password-error" className="text-sm text-destructive">
                {error}
              </p>
            )}
          </div>
          <button type="submit" className="underline text-blue-500">
            sign in
          </button>
        </form>
      </div>
    </main>
  );
}
