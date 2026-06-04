import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
// NEW: Import useLocation to read passed state data
import { useLocation } from "react-router-dom";

function ManageComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [statusUpdates, setStatusUpdates] = useState({});
  
  // NEW: Grab location state info passed from Admin Dashboard
  const location = useLocation();
  const highlightId = location.state?.highlightId || null;

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/complaints/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const activeComplaints = res.data.filter((item) => item.status !== "Resolved");
      setComplaints(activeComplaints);
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectChange = (id, value) => {
    setStatusUpdates((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleUpdateStatus = async (id) => {
    const nextStatus = statusUpdates[id];
    
    if (!nextStatus) {
      alert("Please select a status variation to perform updates.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await api.put(
        `/complaints/${id}`,
        { status: nextStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(`Complaint #${id} updated to ${nextStatus}!`);

      setComplaints((prevComplaints) => {
        if (nextStatus === "Resolved") {
          return prevComplaints.filter((item) => item.id !== id);
        } else {
          return prevComplaints.map((item) =>
            item.id === id ? { ...item, status: nextStatus } : item
          );
        }
      });

    } catch (error) {
      console.log(error);
      alert("Failed updating complaint status.");
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="container-fluid p-4">
        <h2 className="mb-4">Manage Complaints</h2>

        <div className="card shadow">
          <div className="card-body">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Student</th>
                  <th>Current Status</th>
                  <th>Update Actions</th>
                </tr>
              </thead>

              <tbody>
                {complaints.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center text-muted p-4">
                      No active complaints found in this view.
                    </td>
                  </tr>
                ) : (
                  complaints.map((item) => {
                    // NEW: Check if this row was targeted by the admin dashboard click
                    const isHighlighted = item.id === highlightId;

                    return (
                      <tr 
                        key={item.id}
                        // NEW: Give it an active flashing background class if it's the highlighted one
                        className={isHighlighted ? "table-warning border border-warning" : ""}
                        style={isHighlighted ? { boxShadow: "0 0 10px rgba(255, 193, 7, 0.5)" } : {}}
                      >
                        <td>
                          {item.id} {isHighlighted && <span className="badge bg-dark text-warning ms-1">Selected</span>}
                        </td>
                        <td>{item.title}</td>
                        <td>{item.name || "Student"}</td>
                        <td>
                          <span className={`badge ${item.status === "Resolved" ? "bg-success" : item.status === "In Progress" ? "bg-info text-dark" : "bg-warning text-dark"}`}>
                            {item.status || "Pending"}
                          </span>
                        </td>

                        <td>
                          <div className="d-flex gap-2">
                            <select
                              className="form-select form-select-sm"
                              style={{ width: "140px" }}
                              value={statusUpdates[item.id] || item.status || "Pending"}
                              onChange={(e) => handleSelectChange(item.id, e.target.value)}
                            >
                              <option value="Pending">Pending</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Resolved">Resolved</option>
                            </select>

                            <button
                              className="btn btn-sm btn-success"
                              onClick={() => handleUpdateStatus(item.id)}
                            >
                              Update Status
                            </button>
                          </div>
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
  );
}

export default ManageComplaints;