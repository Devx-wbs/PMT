import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import TeamMember from "./pages/TeamMember";
import MyTeam from "./pages/MyTeam";
import DashBoard from "./pages/DashBoard";
import WorkHistory from "./pages/WorkHistory";
import AllProject from "./pages/AllProject";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/TeamMember" element={<TeamMember />} />
        <Route path="/MyTeam" element={<MyTeam />} />
        <Route path="/DashBoard" element={<DashBoard />} />
        <Route path="/WorkHistory" element={<WorkHistory />} />
        <Route path="/AllProject" element={<AllProject />} />




      </Routes>
    </BrowserRouter>
  );
}
