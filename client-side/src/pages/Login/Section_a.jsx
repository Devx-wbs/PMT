import React, { useState, setTimeout } from 'react';
import { api_url } from '@/api/Api';
import { apiHandler } from '@/api/ApiHandler';
import { Link, useNavigate } from 'react-router-dom';

const Section_a = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Please enter a valid email.";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else if (password.length < 5) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const payload = {
          email: email,
          password: password,
        };

        console.log("Sending login request:", payload);

        const response = await apiHandler.PostApi(api_url.login, payload);

        console.log("Login response:", response);

        if (response?.success) {
          setTimeout(() => {
            navigate("/Dashboard");
          }, 100);
        }
         else {
          alert(response?.message || "Login failed. Please check your credentials.");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("Something went wrong during login.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign In To Your Account
        </h3>

        <form onSubmit={submitForm} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 block w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${errors.email ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
                }`}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 block w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${errors.password ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
                }`}
            />
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-[#0C1125] text-white py-2 rounded-md hover:bg-[#1a1f3b] transition"
          >
            Sign In
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-center text-sm text-blue-600 mt-4">
            Don't have an account?{" "}
            <Link to="/Register" className="font-medium underline">
              Register your company
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section_a;
