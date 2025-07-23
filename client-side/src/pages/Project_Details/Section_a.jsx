import React from "react";
import { CheckCircle, Edit, Trash2, User, CalendarDays } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Section_a = () => {
    const { state } = useLocation();
    const project = state?.project;
  const navigate = useNavigate();

    if (!project) {
        return (
            <div className="p-6 text-center text-red-500">
                No project data found. Please go back and select a project.
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="mb-6 flex items-center gap-2">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-gray-500 hover:text-black text-xl font-semibold"
                    >
                        &larr;
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Project Details
                    </h1>
                </div>

                <div className="flex justify-between mb-4">
                    <div>
                        <h3 className="text-lg font-semibold">
                            {project.project_name || project.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <CalendarDays className="w-4 h-4" />
                            <p className="text-sm text-gray-500">
                                {project.start_date
                                    ? `${new Date(project.start_date).toLocaleDateString("en-GB")} - Ongoing`
                                    : "No start date - Ongoing"}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-center">
                        <button className="flex items-center gap-1 bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
                            <CheckCircle className="w-4 h-4" /> Mark as Completed
                        </button>
                        <Edit className="text-gray-500 w-4 h-4 cursor-pointer" />
                        <Trash2 className="text-red-500 w-4 h-4 cursor-pointer" />
                    </div>
                </div>

                {/* Project Meta Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <h4 className="font-semibold">Status</h4>
                        <span className="bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full capitalize">
                            {project.project_status || project.status || "Not set"}
                        </span>
                    </div>
                    <div>
                        <h4 className="font-semibold">Description</h4>
                        <p className="text-sm text-gray-700">
                            {project.project_description || project.description || "No description provided."}
                        </p>
                    </div>
                </div>

                {/* Project Lead */}
                <div className="mb-4">
                    <h4 className="font-semibold mb-2">Project Lead</h4>
                    <div className="flex items-center gap-2 border px-3 py-2 rounded bg-gray-50">
                        <User className="w-4 h-4 text-gray-500" />
                        <span>{project.lead || "Not Assigned"}</span>
                    </div>
                </div>

                {/* Members */}
                <div className="mb-4">
                    <h4 className="font-semibold mb-2">Team Members</h4>
                    <p className="text-xs text-gray-500 mt-1">
                        Total Members: {project.members || project.totalMembers || 0}
                    </p>
                </div>

                {/* Timeline */}
                <div>
                    <h4 className="font-semibold mb-2">Project Timeline</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="border px-3 py-2 rounded bg-gray-50">
                            <p className="text-xs text-gray-500">Start Date</p>
                            <p className="text-sm text-gray-500">
                                {project.start_date
                                    ? new Date(project.start_date).toLocaleDateString("en-GB")
                                    : "Not set"}
                            </p>
                        </div>
                        <div className="border px-3 py-2 rounded bg-gray-50">
                            <p className="text-xs text-gray-500">End Date</p>
                              <p className="text-sm text-gray-500">
                                {project.end_date
                                    ? new Date(project.end_date).toLocaleDateString("en-GB")
                                    : "Not set"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Section_a;
