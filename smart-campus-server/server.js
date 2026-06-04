const express = require("express");
const cors = require("cors");
const sql= require("./config/db");
const app = express();
const authRoutes = require("./routes/authRoutes");
const complaintRoutes =require("./routes/complaintRoutes");


app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});