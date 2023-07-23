const { ctrlWrapper } = require("../../helpers");
const register = require("./register");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const patchSubscription = require("./patchSubscription");
const updateAvatar = require("./updateAvatar");

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  patchSubscription: ctrlWrapper(patchSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
