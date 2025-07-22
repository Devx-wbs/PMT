import {
  BookText,
  CheckCircle,
  Trash2,
  Clock4,
  Users,
  Calendar,
} from "lucide-react";
import { useState } from "react";
const projectData = [
  {
    id: 1,
    title: "test",
    description: "test",
    author: "test",
    members: "2",
    dateRange: "No start date - No end date",
    status: "completed",
    completedOn: "5/30/2025",
    lastUpdated: "5/30/2025",
  },
  {
    id: 2,
    title: "Test",
    description: "Lorem Test",
    author: "test",
    members: "1",
    dateRange: "No start date - No end date",
    status: "deleted",
    lastUpdated: "5/27/2025",
  },
  {
    id: 3,
    title: "Webflow + 3Comma",
    description:
      "Developer to integrate 3Comma, Binance, and Memberstack into our Webflow-based platforms, DriveBots",
    author: "Mark",
    members: "1",
    dateRange: "5/15/2025 - 5/30/2025",
    status: "completed",
    completedOn: "5/26/2025",
    lastUpdated: "5/26/2025",
  },
  {
    id: 4,
    title: "ewr",
    description: "asdf",
    author: "q4",
    members: "1",
    dateRange: "No start date - No end date",
    status: "completed",
    completedOn: "5/17/2025",
    lastUpdated: "5/17/2025",
  },
  {
    id: 5,
    title: "af",
    description: "fasdf",
    author: "fasdf",
    members: "1",
    dateRange: "No start date - No end date",
    status: "deleted",
    lastUpdated: "5/17/2025",
  },
  {
    id: 6,
    title: "rta",
    description: "te",
    author: "te",
    members: "1",
    dateRange: "No start date - No end date",
    status: "deleted",
    lastUpdated: "5/16/2025",
  },
];
const Section_a = () => {
  const [activeState, setActiveState] = useState("active");
  const getButtonClasses = (state) => {
    const base =
      "flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-md text-xs sm:text-sm hover:opacity-90";
    if (activeState === state) {
      switch (state) {
        case "completed":
          return `${base} text-green-800 bg-green-100`;
        case "deleted":
          return `${base} text-red-800 bg-red-100`;
        default:
          return `${base} text-blue-800 bg-blue-100`;
      }
    }
    return `${base} text-gray-600 hover:bg-gray-100`;
  };
  const filteredProjects =
    activeState === "active"
      ? projectData
      : projectData.filter((p) => p.status === activeState);
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Project History</h2>
      <div className="flex gap-4 mb-6">
        <button
          className={getButtonClasses("active")}
          onClick={() => setActiveState("active")}
        >
          <BookText size={16} />
          All Projects
        </button>
        <button
          className={getButtonClasses("completed")}
          onClick={() => setActiveState("completed")}
        >
          <CheckCircle size={16} />
          Completed
        </button>
        <button
          className={getButtonClasses("deleted")}
          onClick={() => setActiveState("deleted")}
        >
          <Trash2 size={16} />
          Deleted
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-xl border p-4 shadow-sm"
          >
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-bold text-gray-800 text-lg">{project.title}</h3>
              {project.status === "completed" ? (
                <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                  <CheckCircle size={14} /> Completed
                </span>
              ) : (
                <span className="text-red-500 text-sm font-medium flex items-center gap-1">
                  <Trash2 size={14} /> Deleted
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-3">{project.description}</p>
            <div className="space-y-1 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <BookText size={14} className="text-gray-400" />
                <span>{project.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={14} className="text-gray-400" />
                <span>{project.members} members</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-gray-400" />
                <span>{project.dateRange}</span>
              </div>
              {project.status === "completed" && (
                <div className="flex items-center gap-2 text-green-600 font-medium">
                  <CheckCircle size={14} />
                  Completed on {project.completedOn}
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock4 size={14} className="text-gray-400" />
                Last updated: {project.lastUpdated}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Section_a;
