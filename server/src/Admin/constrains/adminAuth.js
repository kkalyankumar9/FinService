const bcrypt = require("bcrypt");
const  jwt = require("jsonwebtoken");
const AdminModel = require("../../Models/adminAuthModel");
const AdminBlackListModule = require("../../Models/adminBlacklist");


const adminRegistration= async(req, res)=> {
  const { userName, email, password } = req.body;

  try {
  
    const user = await AdminModel.find({ email });
    console.log(user);

    if (user.length) {
      return res.status(400).send({ msg: "User is Already exists" });
    } else {
      if (validatePassword(password)) {
        bcrypt.hash(password, 2, async (err, hash) => {
          if (err) {
            res.status(400).send({ err: err });
          } else {
            const data = new AdminModel({ userName, email, password: hash });
            await data.save();
            res.status(200).send({ msg: "Admin Registration Successfully" });
          }
        });
      } else {
        res.status(400).send({
          msg: "Password must meet the following criteria:",
          requirements: {
            length: "At least 8 characters",
            uppercase: "At least one uppercase letter (A-Z)",
            digit: "At least one digit (0-9)",
            specialCharacter:
              "At least one special character (!@#$%^&*()_+{}[]:;<>,.?~)",
          },
        });
      }
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
}

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await AdminModel.findOne({ email });
    console.log(user);
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        // result == true
        if (result) {
          const secretkey = process.env.SECRETKEY;
          if (!secretkey) {
            return res.status(500).send({ msg: "Secret key not defined" });
          }
          const token = jwt.sign(
            { userId: user._id, userName: user.userName },
            secretkey,
            { expiresIn: "1h" }
          );

          res.status(200).send({
            msg: "Admin Login successfull",
            token: token,
          });
        } else {
          res.status(400).send({ err: "password does not match" });
        }
      });
    } else {
      res.status(400).send({ err: "email not match" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};
const adminLogout = async (req, res) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    // Verify the token
    jwt.verify(token, process.env.SECRETKEY, async (error, decode) => {
      if (error) {
        return res.status(400).json({ msg: "Invalid token" });
      }
      // Check if the token is blacklisted
      const isBlacklisted = await AdminBlackListModule.findOne({ token });

      if (isBlacklisted) {
        return res
          .status(400)
          .json({ msg: "Token blacklisted, please log in again" });
      } else {
        await AdminBlackListModule.create({ token });

        return res.status(200).json({ msg: "Admin Logout Successfull." });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

function validatePassword(password) {
  const pattern =
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~])(?=.{8,})/;

  return pattern.test(password);
}

module.exports = { adminRegistration, adminLogin, adminLogout };
