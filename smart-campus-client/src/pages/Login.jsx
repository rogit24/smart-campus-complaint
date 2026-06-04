import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Combined imports at the top
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      // Storing auth data in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("name", res.data.name);

      alert("Login Successful");

      // Role-based routing
      if (res.data.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      alert("Login Failed");
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Smart Campus Complaint System</h2>

        {/* 1. Added onSubmit here to trigger the function */}
        <form onSubmit={handleLogin}> 
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              value={email} // 2. Connected to state
              onChange={(e) => setEmail(e.target.value)} // 3. Updates state on type
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              value={password} // 2. Connected to state
              onChange={(e) => setPassword(e.target.value)} // 3. Updates state on type
              required
            />
          </div>

          <button className="btn btn-primary w-100" type="submit">
            Login
          </button>
        </form>

        <div className="text-center mt-3">
          <Link to="/register">New User? Register Here</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;