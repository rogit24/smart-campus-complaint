// Make sure you are importing BrowserRouter (often aliased as Router)
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ManageComplaints from "./pages/ManageComplaints";
import RaiseComplaint from "./pages/RaiseComplaint";
import ComplaintHistory from "./pages/ComplaintHistory";

function App() {
  return (
    <Router> {/* This should be the ONLY Router wrapper in your app */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/manage-complaints" element={<ManageComplaints />} />
        <Route path="/raise-complaint" element={<RaiseComplaint />} />
        <Route path="/complaints" element={<ComplaintHistory />} />
      </Routes>
    </Router>
  );
}

export default App;