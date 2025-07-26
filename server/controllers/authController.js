const crypto = require('crypto');
const sendVerificationEmail = require('../utils/sendVerificationEmail'); // this must exist

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ error: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpires = new Date(Date.now() + 3600000); // 1 hour

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      isVerified: false,
      verificationToken,
      verificationTokenExpires,
    });

    await sendVerificationEmail(newUser.email, verificationToken);

    return res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    return res.status(500).json({ error: 'Registration failed', details: error.message });
  }
};
