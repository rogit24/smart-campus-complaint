import { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

function RaiseComplaint() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const submitComplaint = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/complaints",
        {
          title,
          description,
          category
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Complaint Submitted");

      // Reset fields
      setTitle("");
      setDescription("");
      setCategory("");

    } catch (error) {
      console.log(error);
      alert("Failed to submit complaint");
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="container-fluid p-4">
        {/* Optional: Add your Navbar here if needed, e.g., <Navbar /> */}
        <h2 className="mb-4">Raise Complaint</h2>

        <div className="card shadow">
          <div className="card-body">

            {/* FIX 1: Point to your actual function name 'submitComplaint' */}
            <form onSubmit={submitComplaint}>

              <div className="mb-3">
                <label className="form-label">Complaint Title</label>
                {/* FIX 2: Used the state variable 'title' and 'setTitle' directly */}
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter complaint title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                {/* FIX 3: Used 'description' and 'setDescription' directly */}
                <textarea
                  className="form-control"
                  rows="5"
                  placeholder="Describe your issue..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Category</label>
                {/* FIX 4: Used 'category' and 'setCategory' directly */}
                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Internet">Internet</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Hostel">Hostel</option>
                  <option value="Plumbing">Plumbing</option>
                </select>
              </div>

              <button className="btn btn-primary" type="submit">
                Submit Complaint
              </button>

            </form>

          </div>
        </div>

      </div>
    </div>
  );
}

export default RaiseComplaint;