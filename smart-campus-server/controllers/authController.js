const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const checkUser =
      "SELECT * FROM users WHERE email = ?";

    db.query(checkUser, [email], async (err, result) => {

      if (result.length > 0) {
        return res.status(400).json({
          message: "User already exists"
        });
      }

      const hashedPassword =
        await bcrypt.hash(password, 10);

      const insertQuery =
        "INSERT INTO users(name,email,password) VALUES(?,?,?)";

      db.query(
        insertQuery,
        [name, email, hashedPassword],
        (err, data) => {

          if (err) {
            return res.status(500).json(err);
          }

          res.status(201).json({
            message: "Registration Successful"
          });
        }
      );
    });

  } catch (error) {
    res.status(500).json(error);
  }
};
exports.loginUser = (req, res) => {

  const { email, password } = req.body;

  const query =
    "SELECT * FROM users WHERE email = ?";

  db.query(query, [email], async (err, result) => {

    if (result.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const user = result[0];

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Password"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.status(200).json({
      token,
      role: user.role,
      name: user.name
    });

  });

};