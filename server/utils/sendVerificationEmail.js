// utils/sendVerificationEmail.js
const nodemailer = require('nodemailer');

const sendVerificationEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const verificationUrl = `http://localhost:5000/auth/verify?token=${token}`;

  const mailOptions = {
    from: `CryptoTrack <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify Your Email',
    html: `<h4>Confirm Your Email</h4><p><a href="${verificationUrl}">Click here to verify</a></p>`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Verification email sent:', info.response);
  } catch (error) {
    console.error('Error sending verification email:', error.message);
  }
};

module.exports = sendVerificationEmail;
