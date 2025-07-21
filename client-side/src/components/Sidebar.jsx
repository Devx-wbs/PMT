import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/Dashboard", label: "Overview" },
  { to: "/MyTeam", label: "My Team" },
  { to: "/TeamMember", label: "Team Members" },
  { to: "/AllProject", label: "My Projects" },
  { to: "/WorkHistory", label: "Work History" },
  // Add more links as needed
];

const Sidebar = () => {
  const location = useLocation();
  return (
    <aside className="w-64 bg-white h-screen shadow-md fixed left-0 top-0 flex flex-col z-20">
      <div className="p-6 font-bold text-xl border-b">FocusFlow</div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`block px-4 py-2 rounded-md transition font-medium ${
                  location.pathname === link.to
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
