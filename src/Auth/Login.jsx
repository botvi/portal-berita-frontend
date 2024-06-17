import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api-msib-6-portal-berita-04.educalab.id/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("username", data.username); // Simpan username ke sessionStorage
        sessionStorage.setItem("role", data.role); // Simpan role ke sessionStorage
        sessionStorage.setItem("id", data.id); // Simpan role ke sessionStorage


        // Check success message and redirect accordingly
        if (data.role === "superadmin" || data.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans text-gray-900 antialiased">
      <div className="flex items-center justify-center h-screen">
        <div className="max-w-md w-full p-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
          <form className="space-y-4">
            <div>
              <input
                type="text"
                value={email}
                onChange={handleChangeEmail}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
                placeholder="Email address"
                required
              />
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={handleChangePassword}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
                placeholder="Password"
                required
              />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button
              type="button"
              onClick={handleLogin}
              className="w-full py-2.5 px-4 bg-gray-600 text-white font-semibold rounded-md shadow-md hover:bg-gray-700 focus:outline-none"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="mt-4 text-sm text-center">
            <span>Don't have an account?</span>{" "}
            <Link to="/register" className="text-indigo-600 hover:underline">
              Register Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
