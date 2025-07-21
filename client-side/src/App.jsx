import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import TeamMember from "./pages/TeamMember";
import MyTeam from "./pages/MyTeam";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/TeamMember" element={<TeamMember />} />
        <Route path="/MyTeam" element={<MyTeam />} />



      </Routes>
    </BrowserRouter>
  );
}
