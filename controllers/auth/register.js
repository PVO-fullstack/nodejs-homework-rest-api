const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
require("dotenv").config();
const { nanoid } = require("nanoid");
const { User } = require("../../models/user");
const { HttpError, sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarUrl = gravatar.url(email);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarUrl,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify Email",
    html: `<a href="${BASE_URL}/api/auth/users/verify/${verificationToken}" target="_blank">Click verify Email</a>`,
  };

  await sendEmail(verifyEmail)

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = register;
