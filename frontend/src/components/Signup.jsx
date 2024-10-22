import React, { useState } from "react";
import { signup } from "../services/authService";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    const result = await signup(formData);
    if (result.message === "Signup successful") {
      setMessage("Signup successful! Redirecting to login...");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } else {
      setMessage(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
      <div className="bg-white bg-opacity-20 p-8 rounded-2xl shadow-2xl backdrop-blur-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-6 text-center text-white">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white bg-opacity-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-gray-200 transition duration-300"
              required
            />
          </div>
          <div>
            <label className="block text-white">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white bg-opacity-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-gray-200 transition duration-300"
              required
              minLength={10}
            />
          </div>
          <div>
            <label className="block text-white">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white bg-opacity-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-gray-200 transition duration-300"
              required
              minLength={8}
            />
          </div>
          <div>
            <label className="block text-white">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white bg-opacity-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-gray-200 transition duration-300"
              required
              minLength={8}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-white text-purple-600 py-3 rounded-lg font-semibold hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        {message && <p className="text-center mt-4 text-white">{message}</p>}
        <p className="mt-6 text-center text-white text-sm">
          Already have an account?{" "}
          <Link
            to="/"
            className="font-medium hover:underline transition duration-300"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
