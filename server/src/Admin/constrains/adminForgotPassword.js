const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const AdminModel = require('../../Models/adminAuthModel');




// Initialize nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.NODEMAILER_PORT,
  secure: false,
  auth: {
    user: 'kkalyan2312@gmail.com',
    pass: process.env.PASSWORD, // Use the generated app password here
  },
});

// Route to request a password reset
const adminForgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await AdminModel.findOne({ email });

    if (!user) {
      return res.status(404).send({ msg: 'User not found' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    // Set expiration time for the token (e.g., 1 hour)
    const resetTokenExpiration = Date.now() + 3600000;

    // Store reset token and email in HTTP-only cookies
    res.cookie('resetToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(resetTokenExpiration),
    });
  
    // Include token in the email body
    const mailOptions = {
      from: 'kkalyan2312@gmail.com',
      to: user.email,
      subject: 'Password Reset',
      text: `Reset your password using this token: ${token}`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).send({ msg: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: 'Internal server error' });
  }
};

// Route to handle password reset
const adminPasswordReset = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Retrieve reset token and email from cookies
    const resetToken = req.cookies.resetToken;
    const resetEmail = req.cookies.resetEmail;

    if (!resetToken || resetToken !== token || !resetEmail) {
      return res.status(404).send({ msg: 'Invalid or expired token' });
    }

    // Clear the reset token from cookies
    res.clearCookie('resetToken');
    res.clearCookie('resetEmail');

    // Now you can proceed to update the user password
    const user = await AdminModel.findOne({ email: resetEmail });

    if (!user) {
      return res.status(404).send({ msg: 'User not found' });
    }

    // Ensure newPassword is defined before hashing
    if (!newPassword) {
      return res.status(400).send({ msg: 'New password is required' });
    }

    if (validatePassword(newPassword)) {
      // Hash the new password before saving it
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;

      await user.save(); // Save the updated user password

      return res.status(200).send({ msg: 'Password reset successfully' });
    } else {
      return res.status(400).send({
        msg: "Password must meet the following criteria:",
        requirements: {
          length: "At least 8 characters",
          uppercase: "At least one uppercase letter (A-Z)",
          digit: "At least one digit (0-9)",
          specialCharacter: "At least one special character (!@#$%^&*()_+{}[]:;<>,.?~)",
        },
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: 'Internal server error' });
  }
};

function validatePassword(password) {
  const pattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~])(?=.{8,})/;
  return pattern.test(password);
}

module.exports = { adminForgotPassword, adminPasswordReset };
