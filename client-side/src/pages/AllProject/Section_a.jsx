import { Plus, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const projects = [
  { name: "sdfg", description: "adfg", members: 5, status: "Active" },
  { name: "Graph_test", description: "asdf", members: 1, status: "Active" },
];

const Section_a = () => {
  const navigate =useNavigate()
  return (
    <div className="min-h-screen bg-gray-100 flex  justify-center px-4 py-10">
      <div className=" w-full max-w-6xl rounded-xl  p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">All Projects</h2>
          <button 
          onClick={()=>navigate("/CreateProject")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium">
            <Plus size={16} /> Add Project
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-5 border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {project.description}
                  </p>
                </div>
                <span className="bg-blue-500 text-white text-xs font-medium px-3   py-1 rounded-full">
                  {project.status}
                </span>
              </div>
              <div className="flex items-center mt-6 text-sm text-gray-600 gap-1">
                <Users size={16} />
                <span>{project.members} members</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Section_a;

