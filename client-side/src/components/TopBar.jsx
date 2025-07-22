import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { api_url } from "@/api/Api";
import { User, Settings, LogOut, Building2 } from "lucide-react";


const sampleLogo = <img src="/vite.svg" alt="Logo" className="h-8 w-8" />;

const TopBar = () => {
  const navigate = useNavigate();
  const userDetails = JSON.parse(localStorage.getItem("user"));
  console.log(userDetails?.companyLogo, "user_Details===>");


  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setOpen(false);
    navigate("/Login");
  };

  const handleProfile = () => {
    setOpen(false);
    navigate("/profile");
  };

  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-8 fixed left-64 right-0 top-0 z-10">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/DashBoard")}
      >

        <Building2 className="text-blue-600" />
        <span className="font-bold text-lg">{userDetails?.companyName}</span>
      </div>
      <div className="flex items-center gap-4 relative">
        <button
          ref={triggerRef}
          className="flex items-center gap-2 rounded-full bg-gray-200 p-2 focus:outline-none hover:bg-gray-300 transition"
          onClick={() => setOpen((prev) => !prev)}
        >


          <img
            src={
              (userDetails.companyLogo
                ? api_url.base + userDetails.companyLogo
                : { sampleLogo })
            }
            alt="Company Logo"
            className="h-8 w-8 rounded-full border object-cover"
          />
          <ChevronDown
            className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""
              }`}
          />
        </button>

        <div
          ref={dropdownRef}
          className={`absolute right-0 mt-2 w-56 bg-white p-3 rounded-lg shadow-lg border z-50 overflow-hidden transition-all duration-200 ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
            }`}
          style={{ top: "48px" }}
        >
          <div className="mb-3">
            <h1 className="text-black text-base font-semibold">{userDetails?.companyName}</h1>
            <p className="text-sm text-gray-500">{userDetails?.email}</p>
          </div>

          <div
            onClick={handleProfile}
            className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-800 text-sm font-medium rounded-md transition"
          >
            <User className="w-4 h-4 text-gray-500" />
            View Profile
          </div>

          <div
            onClick={handleProfile}
            className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-800 text-sm font-medium rounded-md transition"
          >
            <Settings className="w-4 h-4 text-gray-500" />
            Settings
          </div>

          <div
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 hover:bg-red-50 cursor-pointer text-red-600 text-sm font-medium rounded-md transition border-t mt-2"
          >
            <LogOut className="w-4 h-4 text-red-500" />
            Logout
          </div>
        </div>

      </div>
    </header>
  );
};

export default TopBar;
