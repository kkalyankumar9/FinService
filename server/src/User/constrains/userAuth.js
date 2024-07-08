const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const UserModel = require("../../Models/userAuthModel");
const UserBlackListModule = require("../../Models/userBlackList");





const userRegistration = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await UserModel.find({ email });
    console.log(user);
    if (user.length) {
      return res.status(400).send({ msg: "User is Already exists" });
    } else {
      if (validatePassword(password)) {
        // console.log(password);
        bcrypt.hash(password, 2, async (err, hash) => {
          // Store hash in your password DB.
          if (err) {
            res.status(400).send({ err: err });
          } else {
            const data = new UserModel({ username, email, password: hash });
            await data.save();
            res.status(200).send({ msg: "User Registration successfully" });
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
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
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
            { userId: user._id, username: user.username },
            secretkey
          );

          res.status(200).send({
            msg: "Login Successfull",
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
const userLogout = async (req, res) => {
  try {
    // Extract token from request headers
    const token = req.headers.authorization;
    console.log(token);
    // Verify the token
    jwt.verify(token, process.env.SECRETKEY, async (error, decode) => {
      if (error) {
        return res.status(400).json({ msg: "Invalid token" });
      }

      // Check if the token is blacklisted
      const isBlacklisted = await UserBlackListModule.findOne({ token });

      if (isBlacklisted) {
        return res
          .status(400)
          .json({ msg: "Token blacklisted, please log in again" });
      } else {
        // Blacklist the token
        await UserBlackListModule.create({ token });

        // Respond with a successful logout message
        return res.status(200).json({ msg: "Logged out Successfull" });
      }
    });
  } catch (error) {
    // Handle unexpected errors
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

function validatePassword(password) {
  const pattern =
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~])(?=.{8,})/;

  return pattern.test(password);
}

module.exports = { userRegistration, userLogin, userLogout };
