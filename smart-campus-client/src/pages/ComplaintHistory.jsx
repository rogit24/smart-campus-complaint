import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import ComplaintCard from "../components/ComplaintCard";
function ComplaintHistory() {

  const [complaints,
         setComplaints]
         = useState([]);

  useEffect(() => {

    fetchComplaints();

  }, []);

  const fetchComplaints =
    async () => {

      try {

        const token =
          localStorage.getItem("token");

        const res =
          await api.get(
            "/complaints/my",
            {
              headers: {
                Authorization:
                `Bearer ${token}`
              }
            }
          );

        setComplaints(
          res.data
        );

      } catch(error) {

        console.log(error);

      }

  };


  

  return (
    <div className="d-flex">

      <Sidebar />

      <div className="container-fluid p-4">

        <h2 className="mb-4">
          My Complaints
        </h2>

        {complaints.map((complaint) => (

          <div
            key={complaint.id}
            className="card shadow mb-3"
          >
            <div className="card-body">

              <h5>
                {complaint.title}
              </h5>

              <p>
                Category:
                {" "}
                {complaint.category}
              </p>

              <span
                className={`badge ${
                  complaint.status === "Resolved"
                    ? "bg-success"
                    : "bg-warning text-dark"
                }`}
              >
                {complaint.status}
              </span>

            </div>
          </div>

        ))}

      </div>

    </div>
  );
}

export default ComplaintHistory;