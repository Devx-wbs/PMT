import { useState } from "react";
import { Link } from "react-router-dom";
import { apiHandler } from "../../api/ApiHandler";
import { api_url } from "../../api/Api";

const Section_a = () => {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        company_Name: "",
        companyDomain: "",
        email: "",
        companyID: "",
        companyAddress: "",
        founded_year: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validate = () => {
        const newErrors = {};
        if (!form.firstName.trim()) newErrors.firstName = "Required";
        if (!form.lastName.trim()) newErrors.lastName = "Required";
        if (!form.company_Name.trim()) newErrors.company_Name = "Required";
        if (!form.companyDomain.trim()) newErrors.companyDomain = "Required";
        if (!form.email.trim()) newErrors.email = "Required";
        else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid Email";
        if (!form.companyID.trim()) newErrors.companyID = "Required";
        if (!form.companyAddress.trim()) newErrors.companyAddress = "Required";
        if (!form.founded_year.trim()) newErrors.founded_year = "Required";
        if (!form.password.trim()) newErrors.password = "Required";
        if (!form.confirmPassword.trim()) newErrors.confirmPassword = "Required";
        else if (form.password !== form.confirmPassword)
            newErrors.confirmPassword = "Passwords do not match";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            registerHandler(form)
            console.log("Form submitted:", form);
        } else {
            console.log("Validation failed.");
        }
    };

   const registerHandler = async (form) => {
    try {
      const obj = {
        companyName: form.company_Name,
        companyDomain: form.companyDomain,
        email: form.email,
        companyID: form.companyID,
        companyAddress: form.companyAddress,
        founded_year: form.founded_year,
        firstName: form.firstName,
        lastName: form.lastName,
        password: form.password,
        confirmPassword: form.confirmPassword,
      };

      const response = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });

      const res = await response.json();

      console.log(res, "response from API");

      if (response.ok) {
        alert("Registration successful!");
      } else {
        alert(`Registration failed: ${res.message || res.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-3xl bg-white rounded-lg shadow-xl p-8">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                    Register your company
                </h2>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Company Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Company Name</label>
                        <input
                            type="text"
                            name="company_Name"
                            value={form.company_Name}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border px-4 py-2 focus:ring-blue-500"
                        />
                        {errors.company_Name && <p className="text-sm text-red-500 mt-1">{errors.company_Name}</p>}
                    </div>

                    {/* Company Domain */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Company Domain</label>
                        <input
                            type="text"
                            name="companyDomain"
                            placeholder="example.com"
                            value={form.companyDomain}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border px-4 py-2 focus:ring-blue-500"
                        />
                        {errors.companyDomain && <p className="text-sm text-red-500 mt-1">{errors.companyDomain}</p>}
                    </div>

                    {/* Name Fields */}
                    <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={form.firstName}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border px-4 py-2 focus:ring-blue-500"
                            />
                            {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>}
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={form.lastName}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border px-4 py-2 focus:ring-blue-500"
                            />
                            {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>}
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border px-4 py-2 focus:ring-blue-500"
                        />
                        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    {/* Company ID */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Company ID</label>
                        <input
                            type="text"
                            name="companyID"
                            value={form.companyID}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border px-4 py-2 focus:ring-blue-500"
                        />
                        {errors.companyID && <p className="text-sm text-red-500 mt-1">{errors.companyID}</p>}
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Company Address</label>
                        <input
                            type="text"
                            name="companyAddress"
                            value={form.companyAddress}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border px-4 py-2 focus:ring-blue-500"
                        />
                        {errors.companyAddress && <p className="text-sm text-red-500 mt-1">{errors.companyAddress}</p>}
                    </div>

                    {/* Founded Year */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Founded Year</label>
                        <input
                            type="number"
                            name="founded_year"
                            value={form.founded_year}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border px-4 py-2 focus:ring-blue-500"
                        />
                        {errors.founded_year && <p className="text-sm text-red-500 mt-1">{errors.founded_year}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border px-4 py-2 focus:ring-blue-500"
                        />
                        {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border px-4 py-2 focus:ring-blue-500"
                        />
                        {errors.confirmPassword && (
                            <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#0C1125] text-white py-2 rounded-md hover:bg-[#1a1f3b] transition"
                    >
                        Register
                    </button>

                    {/* Link to Login */}
                    <p className="text-center text-sm text-blue-600 mt-4">
                        Already have an account?{" "}
                        <Link to="/login" className="hover:underline font-medium">
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Section_a;
