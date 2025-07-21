import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

const MainLayout = ({ children }) => (
  <div>
    <Sidebar />
    <TopBar />
    <main className="ml-64 mt-16 p-8 bg-gray-50 min-h-screen">{children}</main>
  </div>
);

export default MainLayout;
