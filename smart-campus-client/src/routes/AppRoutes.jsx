import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage"; 
import Login from "../pages/Login";
import Register from "../pages/Register";
import StudentDashboard from "../pages/StudentDashboard";
import RaiseComplaint from "../pages/RaiseComplaint";
import ComplaintHistory from "../pages/ComplaintHistory";
import AdminDashboard from "../pages/AdminDashboard";
import ManageComplaints from "../pages/ManageComplaints";

function AppRoutes() {
  return (
    <Routes>
      
      <Route path="/" element={<LandingPage />} />

      
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
      
      
      <Route path="/dashboard" element={<StudentDashboard />} />
      
      <Route path="/raise-complaint" element={<RaiseComplaint />} />
      <Route path="/complaints" element={<ComplaintHistory />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/manage-complaints" element={<ManageComplaints />} />
    </Routes>
  );
}

export default AppRoutes;