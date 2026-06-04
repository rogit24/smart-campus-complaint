import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
// NEW: Import Link to navigate to the manage page
import { Link } from "react-router-dom";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchStatsData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/complaints/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setComplaints(res.data);

        const hasPending = res.data.some((item) => item.status === "Pending" || !item.status);
        if (hasPending) {
          setShowAlert(true);
        }
      } catch (error) {
        console.log("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatsData();
  }, []);

  const total = complaints.length;
  const pending = complaints.filter((c) => c.status === "Pending").length;
  const inProgress = complaints.filter((c) => c.status === "In Progress").length;
  const resolved = complaints.filter((c) => c.status === "Resolved").length;

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="container-fluid p-4">
        <h2 className="mb-4">Admin Dashboard</h2>

        {showAlert && (
          <div className="alert alert-danger alert-dismissible fade show shadow-sm mb-4" role="alert">
            <strong>New Updates:</strong> There are pending complaints awaiting administrative review in the system queue!
            <button type="button" className="btn-close" onClick={() => setShowAlert(false)}></button>
          </div>
        )}

        <div className="row">
          <div className="col-md-3 mb-3">
            <div className="card shadow text-center border-start border-primary border-4">
              <div className="card-body">
                <h5>Total</h5>
                <h2>{loading ? "..." : total}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card shadow text-center border-start border-warning border-4">
              <div className="card-body">
                <h5>Pending</h5>
                <h2>{loading ? "..." : pending}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card shadow text-center border-start border-info border-4">
              <div className="card-body">
                <h5>In Progress</h5>
                <h2>{loading ? "..." : inProgress}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card shadow text-center border-start border-success border-4">
              <div className="card-body">
                <h5>Resolved</h5>
                <h2>{loading ? "..." : resolved}</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow mt-4">
          <div className="card-body">
            <h5 className="card-title mb-3">Recent Overview Logging</h5>
            <div className="table-responsive">
              <table className="table align-middle">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Student Name</th>
                    <th>Current Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan="4" className="text-center">Syncing live server states...</td></tr>
                  ) : complaints.length === 0 ? (
                    <tr><td colSpan="4" className="text-center text-muted">No campus actions logged.</td></tr>
                  ) : (
                    complaints.slice(-5).reverse().map((item) => {
                      const isResolved = item.status === "Resolved";
                      
                      return (
                        <tr key={item.id}>
                          <td>#{item.id}</td>
                          <td>
                            {/* NEW: If NOT resolved, make it a clickable link that passes the complaint ID in routing state */}
                            {!isResolved ? (
                              <Link 
                                to="/manage-complaints" 
                                state={{ highlightId: item.id }}
                                className="text-primary fw-bold text-decoration-none"
                                style={{ cursor: "pointer" }}
                                title="Click to manage this complaint"
                              >
                                {item.title} <i className="bi bi-arrow-right-short"></i>
                              </Link>
                            ) : (
                              <span className="text-muted text-decoration-line-through">{item.title}</span>
                            )}
                          </td>
                          <td>{item.name || "Student"}</td>
                          <td>
                            <span className={`badge ${isResolved ? "bg-success" : item.status === "In Progress" ? "bg-info text-dark" : "bg-warning text-dark"}`}>
                              {item.status || "Pending"}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;