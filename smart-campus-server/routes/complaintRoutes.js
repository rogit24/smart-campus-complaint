const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const adminMiddleware =
require("../middleware/adminMiddleware");

const {
    createComplaint,
    getMyComplaints,
    getAllComplaints,
    updateComplaintStatus,
    getComplaintStats
} = require("../controllers/complaintController");

router.post(
    "/",
    authMiddleware,
    createComplaint
);

router.get(
    "/my",
    authMiddleware,
    getMyComplaints
);

router.get(
    "/all",
    authMiddleware,
    adminMiddleware,
    getAllComplaints
);
router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    updateComplaintStatus
);
router.get(
 "/stats",
 authMiddleware,
 adminMiddleware,
 getComplaintStats
);

router.get("/test", (req, res) => {
    res.send("Complaint Route Working");
});

module.exports = router;