const db = require("../models");
const express = require("express");
var md5 = require("md5");
const multer = require("multer");
const mkdirp = require("mkdirp");
const path = require("path");
const fs = require("fs");
var mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const Flutterwave = require("flutterwave-node-v3");
const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY
);
const otpGenerator = require("otp-generator");
const Admins = db.admins;

exports.login = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  if (process.env.ADMIN_AUTH_CODE == req.body.auth_code) {
    var condition = { email: req.body.email, password: md5(req.body.password) };

    Admins.findOne(condition)
      .then((data) => {
        if (data == null) {
          res.status(200).send({
            message: "Your email or password is wrong",
            success: false,
            data: [],
          });
        }

        if (data["status"] == 0) {
          res.status(200).send({
            message: "Your account is not verified",
            success: false,
            data: [],
          });
        }

        if (data.id) {
          var newOtp = Math.floor(1000 + Math.random() * 9000);
          const update = { otp: newOtp };
          Admins.findByIdAndUpdate("62556961ae64206d2543e6cd", update, {
            useFindAndModify: false,
          }).then(async (data) => {
            // Mail Send
            let testAccount = await nodemailer.createTestAccount();

            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
              host: "smtp.gmail.com",
              port: 465,
              //secure: false, // true for 465, false for other ports
              auth: {
                user: "namanshah2104@gmail.com",
                pass: "nomaajqvqpqttzqi",
              },
            });

            var htm =
              '<html lang="en-US"><head><meta content="text/html; charset=utf-8" http-equiv="Content-Type" /><title>Elloro</title><meta name="description" content="Reset Password Email Template."><style type="text/css">a:hover {text-decoration: underline !important;}</style></head> <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0"><table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: sans-serif;"><tr><td><table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0"><tr><td style="height:80px;">&nbsp;</td></tr><tr><td style="text-align:center;"><a href="" title="logo" target="_blank"><img width="100" src="" title="logo" alt="logo"></a></td></tr><tr><td style="height:20px;">&nbsp;</td></tr><tr><td><table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);"><tr><td style="height:40px;">&nbsp;</td></tr><tr><td style="padding:0 35px;"><p style=" margin:0;font-size:18px;font-family:sans-serif;">Hi <b>' +
              req.body.email +
              '</b>, <br/></p><span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span><p style=" font-size:15px;line-height:24px; margin:0;">Your OTP is: <b>' +
              newOtp +
              '</b></p><br><br><br>The TruliPay Team </td></tr><tr><td style="height:40px;">&nbsp;</td></tr></table></td><tr><td style="height:20px;">&nbsp;</td></tr><tr><td style="height:80px;">&nbsp;</td></tr></table></td></tr></table></body></html>';

            // send mail with defined transport object
            let info = await transporter.sendMail({
              from: "namanshah2104@gmail.com", // sender address
              to: req.body.email, // list of receivers
              subject: "Verify OTP", // Subject line
              text: "Verify OTP", // plain text body
              html: htm, // html body
            });
            // =========

            const conditionss = { id: "62556961ae64206d2543e6cd" };
            const adminData = await Admins.find(conditionss, {
              id: 1,
              email: 1,
              otp: 1,
            });

            res.status(200).send({
              success: true,
              data: adminData,
              message: "OTP send successfully",
            });
          });
        } else {
          res.status(200).send({
            message: "Your email or password is wrong",
            success: false,
            data: [],
          });
        }
      })
      .catch((err) => {
        res.status(200).send({
          message:
            err.message || "Some error occurred while retrieving tutorials.",
        });
      });
  } else {
    res.status(200).send({
      success: false,
      data: [],
      message: "You are not authorized",
    });
  }
};

exports.otpCheck = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  if (process.env.ADMIN_AUTH_CODE == req.body.auth_code) {
    var condition = { email: req.body.email };

    Admins.findOne(condition)
      .then((data) => {
        if (data == null) {
          res.status(200).send({
            message: "Your email is wrong",
            success: false,
            data: [],
          });
        } else {
          if (data["otp"] == req.body.otp) {
            const update = { otp: "" };
            Admins.findByIdAndUpdate("62556961ae64206d2543e6cd", update, {
              useFindAndModify: false,
            }).then((data) => {
              res.status(200).send({
                success: true,
                data: data,
                message: "Login successfully",
              });
            });
          } else {
            res.status(200).send({
              message: "Your OTP is wrong",
              success: false,
              data: [],
            });
          }
        }
      })
      .catch((err) => {
        res.status(200).send({
          message:
            err.message || "Some error occurred while retrieving tutorials.",
        });
      });
  } else {
    res.status(200).send({
      success: false,
      data: [],
      message: "You are not authorized",
    });
  }
};

exports.updateProfile = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  if (process.env.ADMIN_AUTH_CODE == req.body.auth_code) {
    const update = {
      name: req.body.name,
      image: req.body.image,
    };

    Admins.findByIdAndUpdate("62556961ae64206d2543e6cd", update, {
      useFindAndModify: false,
    }).then((data) => {
      if (!data) {
        res.status(200).send({
          message: "Not found",
          success: false,
          data: [],
        });
      } else {
        var condition = { _id: "62556961ae64206d2543e6cd" };

        Admins.findOne(condition)
          .then((datas) => {
            datas["image"] = process.env.MAIN_URL + "uploads/" + datas["image"];

            res.status(200).send({
              success: true,
              data: datas,
              message: "Profile updated successfully",
            });
          })
          .catch((err) => {
            res.status(200).send({
              message:
                err.message ||
                "Some error occurred while retrieving tutorials.",
            });
          });
      }
    });
  } else {
    res.status(200).send({
      success: false,
      data: [],
      message: "You are not authorized",
    });
  }
};

exports.changePassword = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  if (process.env.ADMIN_AUTH_CODE == req.body.auth_code) {
    var conditions = { _id: "62556961ae64206d2543e6cd" };
    const getPassword = await Admins.findOne(conditions);

    if (getPassword["password"] == md5(req.body.old_password)) {
      if (req.body.new_password == req.body.confirm_password) {
        const update = { password: md5(req.body.new_password) };
        Admins.findByIdAndUpdate("62556961ae64206d2543e6cd", update, {
          useFindAndModify: false,
        })
          .then((data) => {
            if (!data) {
              res.status(200).send({
                message: "Your password is not reset",
                success: false,
                data: [],
              });
            } else {
              res.status(200).send({
                success: true,
                data: [],
                message: "Password is reset successfully",
              });
            }
          })
          .catch((err) => {
            res.status(200).send({
              success: false,
              data: [],
              message: "Admin is not exist",
            });
          });
      } else {
        res.status(200).send({
          success: false,
          data: [],
          message: "Confirm password is wrong",
        });
      }
    } else {
      res.status(200).send({
        success: false,
        data: [],
        message: "Old password is wrong",
      });
    }
  } else {
    res.status(200).send({
      success: false,
      data: [],
      message: "You are not authorized",
    });
  }
};

exports.uploadImg = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/uploads/");
    },
    filename: function (req, file, callback) {
      callback(null, md5(Date.now()) + path.extname(file.originalname));
    },
  });

  const uploaFile = multer({
    storage: storage,
  }).single("image");

  uploaFile(req, res, async (err) => {
    if (!req.file) {
      res.status(200).send({
        success: false,
        data: [],
        message: "Select Image",
      });
    } else if (err) {
      res.status(200).send({
        success: false,
        data: [],
        message: "not upload",
      });
    } else {
      res.status(200).send({
        success: true,
        data: {
          filepath_url: req.file.filename,
          url: process.env.MAIN_URL + "uploads/" + req.file.filename,
        },
        message: "",
      });
    }
  });
};

exports.rateData = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (process.env.ADMIN_AUTH_CODE == req.body.auth_code) {
    var condition = {
      amount: req.body.amount,
      sCurrancy: req.body.sCurrancy,
      dCurrancy: req.body.dCurrancy,
    };

    var request = require("request");
    var options = {
      method: "GET",
      url: `https://api.flutterwave.com/v3/transfers/rates?amount=${condition.amount}&destination_currency=${condition.dCurrancy}&source_currency=${condition.sCurrancy}`,
      headers: {
        Authorization: `Bearer ${process.env.FLUTTERWAVE_PRIVATEKEY}`,
      },
    };
    request(options, function (error, response) {
      if (error) {
        res.status(503).send({
          success: false,
          // data: JSON.parse(response.body),
          message: "something went wrong",
        });
      } else {
        res.status(200).send({
          success: true,
          data: JSON.parse(response.body),
          message: "rate fetch successfully",
        });
      }
    });
  } else {
    res.status(200).send({
      success: false,
      data: [],
      message: "You are not authorized",
    });
  }
};

exports.flutterTransfer = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (process.env.ADMIN_AUTH_CODE == req.body.auth_code) {
    var condition = {
      amount: Number(req.body.amount),
      currancy: req.body.currancy,
      account: req.body.account,
    };
    console.log(condition);

    try {
      const payload = {
        account_bank: "flutterwave",
        account_number: condition.account,
        amount: condition.amount,
        currency: condition.currancy,
        reference: "transfer-" + Date.now() + "_PMCKDU_1", //This is a merchant's unique reference for the transfer, it can be used to query for the status of the transfer
        // callback_url:
        //   "https://webhook.site/b3e505b0-fe02-430e-a538-22bbbce8ce0d",
        debit_currency: condition.currancy,
      };
      const response = await flw.Transfer.initiate(payload);
      if (response.status == "error") {
        console.log(response);

        res.status(503).send({
          success: false,
          data: response,
          // message: "something went wrong",
        });
      } else {
        console.log(response);
        res.status(200).send({
          success: true,
          data: response.data,
          message: "Transfer successfully",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(503).send({
        success: false,
        // data: JSON.parse(response.body),
        message: "something went wrong",
      });
    }
  } else {
    res.status(200).send({
      success: false,
      data: [],
      message: "You are not authorized",
    });
  }
};

exports.flutterMerchantId = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (process.env.ADMIN_AUTH_CODE == req.body.auth_code) {
    const details = {
      account_number: req.body.account,
      account_bank: "flutterwave",
    };
    flw.Misc.verify_Account(details)
      .then((response) => {
        console.log(response);
        if (response.status == "error") {
          res.status(400).send({
            success: false,
            data: response,
          });
        } else {
          res.status(200).send({
            success: true,
            data: response.data,
            message: "Got name successfully",
          });
        }
      })
      .catch((error) => {
        res.status(503).send({
          success: false,

          message: "something went wrong",
        });
      });
  } else {
    res.status(200).send({
      success: false,
      data: [],
      message: "You are not authorized",
    });
  }
};
