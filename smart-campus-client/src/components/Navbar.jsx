import { Link, useNavigate } from "react-router-dom";
const role =
localStorage.getItem("role");
function Navbar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>

      <Link to="/dashboard">
        Dashboard
      </Link>

      {" | "}

      <Link to="/raise-complaint">
        Raise Complaint
      </Link>

      {" | "}

      <Link to="/complaints">
        My Complaints
      </Link>

      {" | "}

      <button onClick={logout}>
        Logout
      </button>

      <hr />

    </div>
  );
}

export default Navbar;