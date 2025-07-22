import React, { useState } from "react";
import { api_url } from "@/api/Api";
import { apiHandler } from "@/api/ApiHandler";

function Toast({ message, type, onClose }) {
  if (!message) return null;
  return (
    <div className={`fixed`} style={{ top: "8%", right: "1%" }}>
      <div
        className={`px-6 py-3 rounded shadow-lg text-white font-medium transition-all ${
          type === "success" ? "bg-green-600" : "bg-red-600"
        }`}
        role="alert"
      >
        {message}
        <button className="ml-4 text-white font-bold" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
}

const Profile = () => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : {};
  });
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    companyName: user.companyName || "",
    companyDomain: user.companyDomain || "",
    companyAddress: user.companyAddress || "",
    founded_year: user.founded_year || "",
    website: user.website || "",
    industry: user.industry || "",
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    department: user.department || "",
    accountType: user.accountType || "Standard",
  });
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [logoPreview, setLogoPreview] = useState(
    user.companyLogo ? api_url.base + user.companyLogo : null
  );
  const [logoFile, setLogoFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setToast({ message: "", type: "success" });
    const token = localStorage.getItem("token");
    console.log("Profile update token:", token);
    if (!token) {
      setToast({
        message: "No token found. Please log in again.",
        type: "error",
      });
      return;
    }
    // Use FormData for file upload
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (logoFile) {
      formData.append("companyLogo", logoFile);
    }
    // Use PATCH for update
    const response = await apiHandler.UpdateApi(
      api_url.register.replace("/register", "/update"),
      formData,
      token,
      true // isFormData
    );
    if (response && response.user) {
      setUser(response.user);
      localStorage.setItem("user", JSON.stringify(response.user));
      setEditMode(false);
      setToast({ message: "Profile updated successfully!", type: "success" });
      setLogoFile(null);
    } else {
      setToast({
        message: response?.message || "Update failed.",
        type: "error",
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-16 p-4 sm:p-8 bg-white rounded-xl shadow">
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: toast.type })}
      />
      <div className="flex items-center gap-4 mb-8">
        <img
          src={
            logoPreview ||
            (user.companyLogo ? api_url.base + user.companyLogo : "/vite.svg")
          }
          alt="Company Logo"
          className="h-16 w-16 rounded-full border object-cover"
        />
        <div>
          <h2 className="text-3xl font-bold">Company Profile</h2>
        </div>
        <button
          className="ml-auto px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
          onClick={() => setEditMode((prev) => !prev)}
        >
          {editMode ? "Cancel" : "Edit Profile"}
        </button>
      </div>
      <div className="space-y-8">
        {/* Company Details */}
        <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl font-semibold">🏢 Company Details</span>
            <span className="text-gray-500 text-sm">
              Basic information about your company
            </span>
          </div>
          {editMode ? (
            <form
              onSubmit={handleUpdate}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              encType="multipart/form-data"
            >
              <div className="col-span-2">
                <label className="block text-sm font-medium">
                  Company Logo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                />
                {logoPreview && (
                  <img
                    src={logoPreview}
                    alt="Logo Preview"
                    className="h-16 mt-2 rounded border object-cover"
                  />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Company Name
                </label>
                <input
                  name="companyName"
                  value={form.companyName}
                  className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Company ID</label>
                <input
                  value={user.companyID || ""}
                  className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Company Address
                </label>
                <input
                  name="companyAddress"
                  value={form.companyAddress}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Founded Year
                </label>
                <input
                  value={user.founded_year || ""}
                  className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Website</label>
                <input
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Industry</label>
                <input
                  name="industry"
                  value={form.industry}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="col-span-2">
                <button
                  type="submit"
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="font-semibold">Company Name</div>
                <div>{user.companyName || "Not specified"}</div>
              </div>
              <div>
                <div className="font-semibold">Company ID</div>
                <div>{user.companyID || "Not specified"}</div>
              </div>
              <div>
                <div className="font-semibold">Address</div>
                <div>{user.companyAddress || "Not specified"}</div>
              </div>
              <div>
                <div className="font-semibold">Website</div>
                <div>{user.website || "Not specified"}</div>
              </div>
              <div>
                <div className="font-semibold">Industry</div>
                <div>{user.industry || "Not specified"}</div>
              </div>
              <div>
                <div className="font-semibold">Founded Year</div>
                <div>{user.founded_year || "Not specified"}</div>
              </div>
            </div>
          )}
        </div>
        {/* User Information */}
        <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl font-semibold">👤 User Information</span>
            <span className="text-gray-500 text-sm">
              Your personal and professional details
            </span>
          </div>
          {editMode ? (
            <form
              onSubmit={handleUpdate}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div>
                <label className="block text-sm font-medium">First Name</label>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Last Name</label>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Department</label>
                <input
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Account Type
                </label>
                <input
                  name="accountType"
                  value={form.accountType}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="col-span-2">
                <button
                  type="submit"
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="font-semibold">Full Name</div>
                <div>
                  {user.firstName || ""} {user.lastName || ""}
                </div>
              </div>
              <div>
                <div className="font-semibold">Employee ID</div>
                <div>{user.employeeID || "Not specified"}</div>
              </div>
              <div>
                <div className="font-semibold">Email</div>
                <div>{user.email || "Not specified"}</div>
              </div>
              <div>
                <div className="font-semibold">Department</div>
                <div>{user.department || "Not specified"}</div>
              </div>
              <div>
                <div className="font-semibold">Role</div>
                <div>{user.role || "Not specified"}</div>
              </div>
              <div>
                <div className="font-semibold">Join Date</div>
                <div>
                  {user.joinDate
                    ? new Date(user.joinDate).toLocaleDateString()
                    : "Not specified"}
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Account Settings (view only) */}
        <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl font-semibold">⚙️ Account Settings</span>
            <span className="text-gray-500 text-sm">
              Your account preferences and settings
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="font-semibold">Account Status</div>
              <div className="text-green-600 font-medium">
                {user.accountStatus || "Active"}
              </div>
            </div>
            <div>
              <div className="font-semibold">Email Verification</div>
              <div className="text-green-600 font-medium">
                {user.emailVerified ? "Verified" : "Not Verified"}
              </div>
            </div>
            <div>
              <div className="font-semibold">Last Login</div>
              <div>
                {user.lastLogin
                  ? new Date(user.lastLogin).toLocaleString()
                  : "Not specified"}
              </div>
            </div>
            <div>
              <div className="font-semibold">Account Type</div>
              <div>{user.accountType || "Standard"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
