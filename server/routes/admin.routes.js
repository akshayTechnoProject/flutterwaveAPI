module.exports = (app) => {
  const admin = require("../controllers/admin.controller.js");

  var router = require("express").Router();

  router.post("/login", admin.login);
  router.post("/otp-check", admin.otpCheck);
  router.post("/update-profile", admin.updateProfile);
  router.post("/change-password", admin.changePassword);
  router.post("/upload-img", admin.uploadImg);
  router.post("/get-ratedata", admin.rateData);

  app.use("/api/admin", router);
};
