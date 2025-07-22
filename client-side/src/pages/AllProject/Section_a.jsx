import { Plus, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api_url } from "@/api/Api";
import { apiHandler } from "@/api/ApiHandler";

const Section_a = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("token");
      try {
        const response = await apiHandler.GetApi(api_url.getAllProjects, token);
        console.log(response, "---------->>>");
        if (Array.isArray(response.projects)) {
          setProjects(response.projects);
        } else {
          setError(response?.message || "Failed to fetch projects");
        }
      } catch (err) {
        setError("Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex  justify-center px-4 py-10">
      <div className=" w-full max-w-6xl rounded-xl  p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">All Projects</h2>
          <button
            onClick={() => navigate("/CreateProject")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium"
          >
            <Plus size={16} /> Add Project
          </button>
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Loading projects...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={project._id || index}
                className="bg-white rounded-lg shadow-md p-5 border border-gray-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {project.project_name || project.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {project.project_description || project.description}
                    </p>
                  </div>
                  <span className="bg-blue-500 text-white text-xs font-medium px-3   py-1 rounded-full">
                    {project.project_status || project.status}
                  </span>
                </div>
                <div className="flex items-center mt-6 text-sm text-gray-600 gap-1">
                  <Users size={16} />
                  {/* If you have a members field, show it, else fallback to 0 */}
                  <span>{project.members || 0} members</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Section_a;
