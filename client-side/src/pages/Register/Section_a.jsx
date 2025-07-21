import { useState } from "react";
import { Link } from "react-router-dom";

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
        setForm((prev) => ({ ...prev, [name]: value }));
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
            registerHandler(form);
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
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(obj),
            });

            const res = await response.json();
            if (response.ok) alert("Registration successful!");
            else alert(`Registration failed: ${res.message || res.error}`);
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6 sm:p-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">
                    Register Your Company
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Company Name */}
                    <InputField
                        label="Company Name"
                        name="company_Name"
                        value={form.company_Name}
                        onChange={handleChange}
                        error={errors.company_Name}
                    />

                    {/* Company Domain */}
                    <InputField
                        label="Company Domain"
                        name="companyDomain"
                        placeholder="example.com"
                        value={form.companyDomain}
                        onChange={handleChange}
                        error={errors.companyDomain}
                    />

                    {/* First and Last Name */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <InputField
                            label="First Name"
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            error={errors.firstName}
                        />
                        <InputField
                            label="Last Name"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            error={errors.lastName}
                        />
                    </div>

                    {/* Email */}
                    <InputField
                        label="Email Address"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        error={errors.email}
                    />

                    {/* Company ID */}
                    <InputField
                        label="Company ID"
                        name="companyID"
                        value={form.companyID}
                        onChange={handleChange}
                        error={errors.companyID}
                    />

                    {/* Company Address */}
                    <InputField
                        label="Company Address"
                        name="companyAddress"
                        value={form.companyAddress}
                        onChange={handleChange}
                        error={errors.companyAddress}
                    />

                    {/* Founded Year */}
                    <InputField
                        label="Founded Year"
                        name="founded_year"
                        type="number"
                        value={form.founded_year}
                        onChange={handleChange}
                        error={errors.founded_year}
                    />

                    {/* Passwords */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <InputField
                            label="Password"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            error={errors.password}
                        />
                        <InputField
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            error={errors.confirmPassword}
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-[#0C1125] text-white py-3 rounded-lg hover:bg-[#1a1f3b] transition"
                    >
                        Register
                    </button>

                    {/* Login Redirect */}
                    <p className="text-center text-sm text-blue-600 mt-4">
                        Already have an account?{" "}
                        <Link to="/Login" className="font-medium underline">
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

const InputField = ({
    label,
    name,
    value,
    onChange,
    type = "text",
    error,
    placeholder,
}) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
            {label}
        </label>
        <input
            type={type}
            name={name}
            id={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`mt-1 block w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                error ? "border-red-400" : "border-gray-300"
            }`}
        />
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
);

export default Section_a;
