const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

const router = express.Router();

// In-memory database (for demonstration purposes)
const users = [
  { email: 'user@example.com', password: 'hashed_password' }
];
const passwordResetTokens = [];

// Route to handle password reset request
router.post('/request', (req, res) => {
  const { email } = req.body;
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.json({ message: 'If an account with that email exists, we have sent a password reset link.' });
  }

  // Generate a secure token. [6]
  const token = crypto.randomBytes(20).toString('hex');
  const expiration = Date.now() + 3600000; // 1 hour from now

  passwordResetTokens.push({ email, token, expiration });

  // Send the password reset email
  const resetLink = `http://localhost:3000/reset-password.html?token=${token}`;
  
  // Configure Nodemailer to send the email. [1, 9]
  const transporter = nodemailer.createTransport({
      // Your email service configuration
      service: 'gmail',
      auth: {
          user: 'your-email@gmail.com',
          pass: 'your-password'
      }
  });

  const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Password Reset',
      text: `Click the following link to reset your password: ${resetLink}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error);
          return res.status(500).json({ message: 'Error sending email' });
      }
      res.json({ message: 'If an account with that email exists, we have sent a password reset link.' });
  });
});

// Route to handle the actual password reset
router.post('/reset', async (req, res) => {
  const { token, password } = req.body;

  const tokenData = passwordResetTokens.find(t => t.token === token);

  if (!tokenData || tokenData.expiration < Date.now()) {
    return res.status(400).json({ message: 'Invalid or expired token.' });
  }

  const user = users.find(u => u.email === tokenData.email);

  if (!user) {
    return res.status(400).json({ message: 'User not found.' });
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;

  // Invalidate the token
  const tokenIndex = passwordResetTokens.findIndex(t => t.token === token);
  passwordResetTokens.splice(tokenIndex, 1);
  
  res.json({ message: 'Password has been reset successfully.' });
});

module.exports = router;
