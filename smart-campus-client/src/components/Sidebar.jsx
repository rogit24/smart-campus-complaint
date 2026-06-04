import { Link, useNavigate } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();

  const role =
    localStorage.getItem("role") || "student";

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div
      className="bg-dark text-white p-3"
      style={{
        width: "250px",
        minHeight: "100vh",
      }}
    >
      <h3 className="text-center mb-4">
        Smart Campus
      </h3>

      <ul className="nav flex-column">

        {role === "student" && (
          <>
            <li className="nav-item">
              <Link
                to="/dashboard"
                className="nav-link text-white"
              >
                Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/raise-complaint"
                className="nav-link text-white"
              >
                Raise Complaint
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/complaints"
                className="nav-link text-white"
              >
                My Complaints
              </Link>
            </li>
          </>
        )}

        {role === "admin" && (
          <>
            <li className="nav-item">
              <Link
                to="/admin-dashboard"
                className="nav-link text-white"
              >
                Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/manage-complaints"
                className="nav-link text-white"
              >
                Manage Complaints
              </Link>
            </li>
          </>
        )}

        <li className="nav-item mt-4">
          <button
            onClick={logout}
            className="btn btn-danger w-100"
          >
            Logout
          </button>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;