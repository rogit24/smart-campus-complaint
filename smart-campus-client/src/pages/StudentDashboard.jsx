import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function StudentDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  // NEW: State to hold active notification messages
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchMyComplaints = async () => {
      try {
        const token = localStorage.getItem("token");
        
        const response = await api.get("/complaints/my", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setComplaints(response.data);

        // NEW: Generate notifications based on updated complaint statuses
        const statusAlerts = [];
        response.data.forEach(complaint => {
          if (complaint.status === "In Progress") {
            statusAlerts.push(`Your complaint "${complaint.title}" is now being processed!`);
          } else if (complaint.status === "Resolved") {
            statusAlerts.push(`Great news! Your complaint "${complaint.title}" has been resolved.`);
          }
        });
        setNotifications(statusAlerts);

      } catch (error) {
        console.error("Error fetching complaints:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyComplaints();
  }, []);

  const totalComplaints = complaints.length;
  const pendingComplaints = complaints.filter(c => c.status === "Pending").length;
  const resolvedComplaints = complaints.filter(c => c.status === "Resolved").length;

  // NEW: Function to dismiss an individual notification alert
  const dismissNotification = (indexToDismiss) => {
    setNotifications(prev => prev.filter((_, index) => index !== indexToDismiss));
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="container-fluid p-4">
        <h2 className="mb-4">Welcome, Student</h2>

        {/* NEW: Notification Banners Section */}
        {notifications.length > 0 && (
          <div className="mb-4">
            {notifications.map((note, index) => (
              <div 
                key={index} 
                className={`alert alert-dismissible fade show shadow-sm border-0 border-start border-4 ${
                  note.includes("resolved") ? "alert-success border-success" : "alert-info border-info"
                }`} 
                role="alert"
              >
                <i className={`bi me-2 ${note.includes("resolved") ? "bi-check-circle-fill" : "bi-info-circle-fill"}`}></i>
                {note}
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => dismissNotification(index)}
                  aria-label="Close"
                ></button>
              </div>
            ))}
          </div>
        )}

        {/* Dynamic Counter Cards */}
        <div className="row">
          <div className="col-md-4 mb-3">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <h5 className="text-muted">Total Complaints</h5>
                <h2>{totalComplaints}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <h5 className="text-muted">Pending</h5>
                <h2>{pendingComplaints}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <h5 className="text-muted">Resolved</h5>
                <h2>{resolvedComplaints}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Complaint History List */}
        <div className="card shadow mt-4 border-0">
          <div className="card-body">
            <h4>Recent Complaints</h4>
            <hr />

            {loading ? (
              <p>Loading complaints...</p>
            ) : complaints.length === 0 ? (
              <p className="text-muted">You haven't raised any complaints yet.</p>
            ) : (
              complaints.map((complaint) => (
                <div key={complaint.id || complaint._id}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="mb-1">{complaint.title}</h5>
                      <p className="text-muted mb-1 small">{complaint.description}</p>
                      <span className="text-secondary tracking-wide text-uppercase small">
                        Category: {complaint.category}
                      </span>
                    </div>
                    <div>
                      <span 
                        className={`badge ${
                          complaint.status === "Resolved" 
                            ? "bg-success" 
                            : complaint.status === "In Progress" 
                            ? "bg-info text-dark" 
                            : "bg-warning text-dark"
                        }`}
                      >
                        {complaint.status || "Pending"}
                      </span>
                    </div>
                  </div>
                  <hr />
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default StudentDashboard;