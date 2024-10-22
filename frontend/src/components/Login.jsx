// src/components/Login.jsx
import React, { useState, useContext } from "react";
import { login as loginService } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await loginService(formData);

    if (result.token) {
      login(result.token);
      navigate("/dashboard");
    } else {
      setMessage(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
      <div className="bg-white bg-opacity-20 p-8 rounded-2xl shadow-2xl backdrop-blur-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-6 text-center text-white">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white bg-opacity-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-gray-200 transition duration-300"
              required
            />
          </div>
          <div>
            <label className="block text-white">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white bg-opacity-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-gray-200 transition duration-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-white text-purple-600 py-3 rounded-lg font-semibold hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-600 transition duration-300"
          >
            Login
          </button>
        </form>
        {message && <p className="text-center mt-4 text-white">{message}</p>}
        <p className="mt-6 text-center text-white text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium hover:underline transition duration-300"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
