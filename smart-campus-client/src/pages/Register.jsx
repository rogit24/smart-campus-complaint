import { useState } from "react";
import api from "../services/api";
// 1. Import useNavigate alongside Link
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 2. Initialize the navigate function
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration Successful");
      
      // 3. Redirect the user to the login page
      // (Change "/" to your actual login route path if it's different, e.g., "/login")
      navigate("/"); 

    } catch (error) {
      alert("Registration Failed");
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow p-4" style={{ width: "450px" }}>
        <h2 className="text-center mb-4">Student Registration</h2>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-success w-100" type="submit">
            Register
          </button>
        </form>

        <div className="text-center mt-3">
          <Link to="/">Already have an account?</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;