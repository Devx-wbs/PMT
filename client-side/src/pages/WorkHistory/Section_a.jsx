import { BookText, CheckCircle, Trash2, Clock4, Users, Calendar } from "lucide-react";
import { useState } from "react";
const Section_a = () => {
  const [activeState, setActiveState] = useState("active");
  const getButtonClasses = (state) =>
    `flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-md text-xs sm:text-sm
     ${activeState === state ? "text-blue-800 bg-blue-100" : "text-gray-600"}
     hover:text-blue-800 hover:bg-blue-100`;
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Project History</h2>
      <div className="flex gap-4 mb-6">
        <button className={getButtonClasses("active")} onClick={() => setActiveState("active")}>
          <BookText size={16} />
          All Projects
        </button>
        <button className={getButtonClasses("completed")} onClick={() => setActiveState("completed")}>
          <CheckCircle size={16} />
          Completed
        </button>
        <button className={getButtonClasses("deleted")} onClick={() => setActiveState("deleted")}>
          <Trash2 size={16} />
          Deleted
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border  p-4 shadow-sm">
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-bold text-gray-800 text-lg">test</h3>
            <span className="text-green-600 text-sm font-medium flex items-center gap-1 hover:text-green-800">
              <CheckCircle size={14} /> Completed
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3">test</p>
          <div className="space-y-1 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <BookText size={14} className="text-gray-400" />
              <span>test</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={14} className="text-gray-400" />
              <span>2 members</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-gray-400" />
              <span>No start date - No end date</span>
            </div>
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <CheckCircle size={14} /> Completed on 5/30/2025
            </div>
            <div className="flex items-center gap-2">
              < Clock4 size={14} className="text-gray-400" />
              Last updated: 5/30/2025
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4 shadow-sm">
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-bold text-gray-800 text-lg ">Test</h3>
            <span className="text-red-500 text-sm font-medium flex items-center gap-1">
              <Trash2 size={14} /> Deleted
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3">Lorem Test</p>
          <div className="space-y-1 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <BookText size={14} className="text-gray-400" />
              <span>Test</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={14} className="text-gray-400" />
              <span>1 members</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-gray-400" />
              <span>No start date - No end date</span>
            </div>
            <div className="flex items-center gap-2">
              < Clock4 size={14} className="text-gray-400" />
              Last updated: 5/27/2025
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4 shadow-sm">
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-bold text-gray-800 text-lg">Webflow + 3Comma</h3>
            <span className="text-green-500 text-sm font-medium flex items-center gap-1">
              <Trash2 size={14} /> Completed
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3">Developer to integrate 3Comma, Binance, and Memberstack into our Webflow-based platforms, DriveBots.</p>
          <div className="space-y-1 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <BookText size={14} className="text-gray-400" />
              <span>Mark</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={14} className="text-gray-400" />
              <span>1 members</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-gray-400" />
              <span>5/15/2025 - 5/30/2025</span>
            </div>
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <CheckCircle size={14} /> Completed on 5/26/2025
            </div>
            <div className="flex items-center gap-2">
              < Clock4 size={14} className="text-gray-400" />
              <span>Last update:5/26/2025</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4 shadow-sm">
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-bold text-gray-800 text-lg">ewr</h3>
            <span className="text-green-500 text-sm font-medium flex items-center gap-1">
              <Trash2 size={14} /> Completed
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3">asdf</p>
          <div className="space-y-1 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <BookText size={14} className="text-gray-400" />
              <span>q4</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={14} className="text-gray-400" />
              <span>1 members</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-gray-400" />
              <span>No start date - No end date</span>
            </div>
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <CheckCircle size={14} /> Completed on 5/17/2025
            </div>
            <div className="flex items-center gap-2">
              < Clock4 size={14} className="text-gray-400" />
              <span>Last update:5/26/2025</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4 shadow-sm">
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-bold text-gray-800 text-lg">af</h3>
            <span className="text-red-500 text-sm font-medium flex items-center gap-1">
              <Trash2 size={14} /> Deleted
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3">fasdf</p>
          <div className="space-y-1 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <BookText size={14} className="text-gray-400" />
              <span>fasdf</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={14} className="text-gray-400" />
              <span>1 members</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-gray-400" />
              <span>No start date - No end date</span>
            </div>
            <div className="flex items-center gap-2">
              < Clock4 size={14} className="text-gray-400" />
              Last updated: 5/17/2025
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4 shadow-sm">
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-semibold text-gray-800 text-lg">rta</h3>
            <span className="text-red-500 text-sm font-medium flex items-center gap-1">
              <Trash2 size={14} /> Deleted
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3">te</p>
          <div className="space-y-1 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <BookText size={14} className="text-gray-400" />
              <span>te</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={14} className="text-gray-400" />
              <span>1 members</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-gray-400" />
              <span>No start date - No end date</span>
            </div>
            <div className="flex items-center gap-2">
              < Clock4 size={14} className="text-gray-400" />
              Last updated: 5/26/2025
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Section_a