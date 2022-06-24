module.exports = (app) => {
  const admin = require('../controllers/admin.controller.js');
  const flutterwave = require('../controllers/flutterwave.js');
  const visa = require('../controllers/visa.js');

  var router = require('express').Router();

  router.post('/login', admin.login);
  router.post('/otp-check', admin.otpCheck);
  router.post('/update-profile', admin.updateProfile);
  router.post('/change-password', admin.changePassword);
  router.post('/upload-img', admin.uploadImg);

  router.post('/get-ratedata', flutterwave.rateData);
  router.post('/flutter-merchant-id', flutterwave.flutterMerchantId);
  router.post('/flutter-transfer', flutterwave.flutterTransfer);
  router.post('/bank-transfer', flutterwave.bankTransfer);
  router.post('/mobile-transfer', flutterwave.mobileTransfer);
  router.post('/get-banklist', flutterwave.getBankList);
  router.post('/visa-transfer', visa.visaBankTransfer);
  router.post('/account-validation', visa.accountValidation);

  app.use('/api/admin', router);
};
