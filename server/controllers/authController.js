import jwt from "jsonwebtoken";
import User from "../models/User.js";
import sendVerificationEmail from "../utils/sendEmail.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

const registerUser = async (req, res) => {
  const user = req.body;

  try {
    const userExists = await User.findOne({ email: user.email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const newUser = new User(user);
    await newUser.save();

    const token = generateToken(newUser.id);
    sendVerificationEmail(
      newUser.name,
      newUser.email,
      `http://localhost:5000/api/auth/verify/${token}`
    );

    res.status(201).json({
      _id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user.verified) {
      return res.status(403).json({ message: "Please verify your email first." });
    }
    
    if (user && password === user.password) {
      res.json({
        _id: user.id,
        email: user.email,
        name: user.name,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).send("User not found");

    if (user.verified) return res.send("Email already verified");

    user.verified = true;
    await user.save();

    return res.send(`
      <html>
        <body>
          <script>
            alert("✅ Email verified successfully!");
            window.close();
          </script>
        </body>
      </html>
    `);
  } catch (err) {
    console.error(err);
    return res.status(400).send(`
      <html>
        <body>
          <script>
            alert("❌ Invalid or expired verification link");
            window.close();
          </script>
        </body>
      </html>
    `);
  }
};

export { registerUser, loginUser, verifyEmail };
