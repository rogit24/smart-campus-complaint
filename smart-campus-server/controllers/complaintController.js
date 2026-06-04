const db = require("../config/db");

exports.createComplaint = (req, res) => {

    const {
        title,
        description,
        category
    } = req.body;

    const userId = req.user.id;

    const query =
    `INSERT INTO complaints
    (title,description,category,user_id)
    VALUES(?,?,?,?)`;

    db.query(
        query,
        [
            title,
            description,
            category,
            userId
        ],
        (err, result) => {

            if(err){
                return res.status(500).json(err);
            }

            res.status(201).json({
                message:"Complaint Submitted"
            });

        }
    );

};
exports.getMyComplaints = (req,res)=>{

    const userId = req.user.id;

    const query =
    "SELECT * FROM complaints WHERE user_id=?";

    db.query(
        query,
        [userId],
        (err,result)=>{

            if(err){
                return res.status(500).json(err);
            }

            res.status(200).json(result);

        }
    );

};
exports.getAllComplaints = (req,res)=>{

    const query =
    `SELECT complaints.*,
     users.name
     FROM complaints
     JOIN users
     ON complaints.user_id = users.id`;

    db.query(query,(err,result)=>{

        if(err){
            return res.status(500).json(err);
        }

        res.status(200).json(result);

    });
};
exports.updateComplaintStatus = (req, res) => {

    const { status } = req.body;

    const complaintId = req.params.id;

    const query =
    `UPDATE complaints
     SET status=?
     WHERE id=?`;

    db.query(
        query,
        [status, complaintId],
        (err, result) => {

            if(err){
                return res.status(500).json(err);
            }

            res.json({
                message:
                "Status Updated"
            });

        }
    );
    

};
exports.getComplaintStats =
(req,res)=>{

 const query=`
 SELECT
 COUNT(*) total,
 SUM(status='Pending') pending,
 SUM(status='Resolved') resolved,
 SUM(status='In Progress') inprogress
 FROM complaints
 `;

 db.query(
   query,
   (err,result)=>{

     if(err){
       return res.status(500).json(err);
     }

     res.json(result[0]);

   }
 );

};
