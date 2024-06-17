import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const defaultRole = "user"; // Default role is user
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use useNavigate hook instead of useHistory

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api-msib-6-portal-berita-04.educalab.id/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
          role: defaultRole, // Set role to defaultRole (user)
        }),
      });
      const data = await response.json();
      if (response.ok) {
        navigate("/login"); // Redirect to login page on successful registration
      } else {
        setError(data.message); // Display error message if registration fails
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Registration failed. Please try again."); // Generic error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans text-gray-900 antialiased">
      <div className="flex items-center justify-center h-screen">
        <div className="max-w-md w-full p-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>
          <form className="space-y-4">
            <div>
              <input
                type="text"
                value={name}
                onChange={handleChangeName}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
                placeholder="Name"
                required
              />
            </div>
            <div>
              <input
                type="text"
                value={username}
                onChange={handleChangeUsername}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
                placeholder="Username"
                required
              />
            </div>
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
            {/* Role field is not shown in the form */}
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button
              type="button"
              onClick={handleRegister}
              className="w-full py-2.5 px-4 bg-gray-600 text-white font-semibold rounded-md shadow-md hover:bg-gray-700 focus:outline-none"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
          <div className="mt-4 text-sm text-center">
            <span>Already have an account?</span>{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Login Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
