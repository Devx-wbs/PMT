import { useState, useRef } from "react";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { api_url } from "@/api/Api";
import { toast } from "react-toastify";
import { apiHandler } from "@/api/ApiHandler";

const Section_a = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [form, setForm] = useState({
    projectName: "",
    description: "",
    clientName: "",
    projectLead: "",
    status: "",
    startDate: "",
    endDate: "",
  });

  const [errors, setErrors] = useState({});

  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.projectName.trim())
      newErrors.projectName = "Project name is required.";
    if (!form.description.trim())
      newErrors.description = "Description is required.";
    if (!form.clientName.trim())
      newErrors.clientName = "Client name is required.";
    if (!form.projectLead.trim())
      newErrors.projectLead = "Project lead is required.";
    if (!form.status.trim()) newErrors.status = "Status is required.";
    if (!form.startDate.trim()) newErrors.startDate = "Start date is required.";
    if (!form.endDate.trim()) newErrors.endDate = "End date is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const obj = {
      project_name: form.projectName,
      client_name: form.clientName,
      project_description: form.description,
      project_status: form.status,
      start_date: form.startDate,
      end_date: form.endDate,
    };

    console.log(api_url, obj, token, "---------->>>");

    try {
      const response = await apiHandler.postApiWithToken(
        api_url.createProject,
        obj,
        token
      );
      alert(response?.message);
      if (response.success) {
        toast.success("Project created successfully!");
        navigate("/DashBoard");
      } else {
        toast.error(response.message || "Failed to save data");
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8">
        <div className="mb-6 flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-500 hover:text-black text-xl font-semibold"
          >
            &larr;
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            Create New Project
          </h1>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Project Name
            </label>
            <input
              type="text"
              name="projectName"
              value={form.projectName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-2 focus:ring-blue-500"
            />
            {errors.projectName && (
              <p className="text-red-500 text-sm mt-1">{errors.projectName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              rows="3"
              value={form.description}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-2 focus:ring-blue-500"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Client Name
            </label>
            <input
              type="text"
              name="clientName"
              value={form.clientName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-2 focus:ring-blue-500"
            />
            {errors.clientName && (
              <p className="text-red-500 text-sm mt-1">{errors.clientName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Project Lead
            </label>
            <select
              name="projectLead"
              value={form.projectLead}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Project Lead</option>
              <option value="John Doe">John Doe</option>
              <option value="Jane Smith">Jane Smith</option>
              <option value="Mike Johnson">Mike Johnson</option>
            </select>
            {errors.projectLead && (
              <p className="text-red-500 text-sm mt-1">{errors.projectLead}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Status</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="on hold">On Hold</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm mt-1">{errors.status}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <div className="relative">
                <input
                  ref={startDateRef}
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 pr-10 focus:ring-2 focus:ring-blue-500 [&::-webkit-calendar-picker-indicator]:opacity-0"
                />
                <Calendar
                  className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={() => startDateRef.current?.showPicker()}
                />
              </div>
              {errors.startDate && (
                <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <div className="relative">
                <input
                  ref={endDateRef}
                  type="date"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 pr-10 focus:ring-2 focus:ring-blue-500 [&::-webkit-calendar-picker-indicator]:opacity-0"
                />
                <Calendar
                  className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={() => endDateRef.current?.showPicker()}
                />
              </div>
              {errors.endDate && (
                <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold flex items-center gap-2"
            >
              <span>＋</span> Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Section_a;
