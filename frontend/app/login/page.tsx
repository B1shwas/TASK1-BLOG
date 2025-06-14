"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";

export default function Login() {
  const router = useRouter();
  const { login } = useAuthStore();

  const [loading, setLoading] = useState(false);
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const success = await login(username, password);
    if (success) {
      router.push("/");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center text-black mb-6">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-black mb-1"
            >
              username
            </label>
            <input
              id="username"
              type="username"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              className="w-full px-3 py-2 border border-black rounded-md text-black"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-black mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-black rounded-md text-black"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 "
          >
            {loading ? "loginng in " : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
