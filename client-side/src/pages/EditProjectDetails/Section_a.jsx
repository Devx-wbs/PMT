import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { apiHandler } from "@/api/ApiHandler";
import { api_url } from "@/api/Api";

const Section_a = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const project = state?.project;
    const projectMemberList = state?.projectMemberList || [];


    const [form, setForm] = useState({
        project_name: project?.project_name || "",
        description: project?.project_description || "",
        status: project?.project_status || "Ongoing",
        lead: project?.project_lead || "",
        teamMembers: project?.team_members || [],
        startDate: project?.start_date || "",
        endDate: project?.end_date || "",
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleTeamChange = (e) => {
        const selected = Array.from(e.target.selectedOptions).map((opt) => opt.value);
        setForm((prev) => ({ ...prev, teamMembers: selected }));
    };


    const handleEditProjectDetails = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            const url = `http://localhost:8000/api/projects/${project.project_id}`;
            console.log("PUT URL=====>:", url);
            console.log("Payload=====>:", form);
            const response = await apiHandler.PutApi(url, form, token);
            if (response?.message === "Project updated") {
                alert("Project updated successfully");
                
                 navigate("/ProjectDetails", { state: { project } });

            } else {
                alert(response?.message || "Failed to update project");
            }
        } catch (err) {
            console.error("API Error:", err);
            alert("Failed to update project");
        }
    };



    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
            {/* Back Button */}
            <div
                className="flex items-center mb-6 cursor-pointer"
                onClick={() => navigate(-1)}
            >
                <ArrowLeft className="w-5 h-5 mr-2 text-gray-600" />
                <span className="text-gray-700 font-medium">Back</span>
            </div>

            <h2 className="text-2xl font-semibold mb-6">Edit Project</h2>

            <form onSubmit={handleEditProjectDetails} className="space-y-6">
                {/* Project Name & Description */}
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                        <label className="block font-semibold mb-1">Project Name</label>
                        <input
                            name="project_name"
                            value={form.project_name}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block font-semibold mb-1">Description</label>
                        <input
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                        <label className="block font-semibold mb-1">Status</label>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="">Select Status</option>
                            <option value="ongoing">Ongoing</option>
                            <option value="completed">Completed</option>
                            <option value="on hold">On Hold</option>
                        </select>
                    </div>
                    <div className="flex-1">
                        <label className="block font-semibold mb-1">Project Lead</label>
                        <input
                            name="lead"
                            value={form.lead}
                            onChange={handleChange}
                            placeholder="Not Assigned"
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                </div>

                {/* Team Members */}
                <div>
                    <label className="block font-semibold mb-1">Project Members</label>
                    <select
                        multiple
                        name="teamMembers"
                        value={form.teamMembers}
                        onChange={handleTeamChange}
                        className="w-full border rounded px-3 py-2 h-32"
                    >
                        {projectMemberList.map((member) => (
                            <option key={member.id} value={member.id}>
                                {member.name} ({member.id})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Dates */}
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                        <label className="block font-semibold mb-1">Start Date</label>
                        <input
                            type="date"
                            name="startDate"
                            value={form.startDate}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block font-semibold mb-1">End Date</label>
                        <input
                            type="date"
                            name="endDate"
                            value={form.endDate}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                </div>

                {/* Submit */}
                <div className="pt-4">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Section_a;
