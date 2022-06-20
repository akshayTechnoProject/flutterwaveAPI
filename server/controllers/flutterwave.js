const Flutterwave = require("flutterwave-node-v3");
const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY
);
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
    if (condition.amount && condition.sCurrancy && condition.dCurrancy) {
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
          if (JSON.parse(response.body).status == "success") {
            res.status(200).send({
              success: true,
              data: JSON.parse(response.body),
              message: "rate fetch successfully",
            });
          } else {
            res.status(400).send({
              success: false,
              data: JSON.parse(response.body).message,
            });
          }
        }
      });
    } else {
      res.status(400).send({
        success: false,
        // data: JSON.parse(response.body),
        message: "pass all the necessary data",
      });
    }
  } else {
    res.status(400).send({
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
    if (req.body.account) {
      const details = {
        account_number: req.body.account,
        account_bank: "flutterwave",
      };
      flw.Misc.verify_Account(details)
        .then((response) => {
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
      res.status(400).send({
        success: false,
        // data: JSON.parse(response.body),
        message: "pass all the necessary data",
      });
    }
  } else {
    res.status(400).send({
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
    if (condition.account && condition.amount && condition.currancy) {
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

          res.status(400).send({
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
      res.status(400).send({
        success: false,
        // data: JSON.parse(response.body),
        message: "pass all the necessary data",
      });
    }
  } else {
    res.status(400).send({
      success: false,
      data: [],
      message: "You are not authorized",
    });
  }
};
exports.bankTransfer = async (req, res) => {
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
      code: req.body.code,
      narration: req.body.narration,
    };
    if (
      condition.account &&
      condition.amount &&
      condition.currancy &&
      condition.narration &&
      condition.code
    ) {
      try {
        const details = {
          account_bank: condition.code,
          account_number: condition.account,
          amount: condition.amount,
          narration: condition.narration,
          currency: condition.currancy,
          reference: "transfer-" + Date.now() + "_PMCKDU_1", //This is a merchant's unique reference for the transfer, it can be used to query for the status of the transfer
          //   callback_url:
          //     "https://webhook.site/b3e505b0-fe02-430e-a538-22bbbce8ce0d",
          debit_currency: condition.currancy,
        };
        flw.Transfer.initiate(details)
          .then((response) => {
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
          })
          .catch((error) => {
            res.status(400).send({
              success: false,
              message: error.message,
            });
          });
      } catch (error) {
        res.status(503).send({
          success: false,
          // data: JSON.parse(response.body),
          message: "something went wrong",
        });
      }
    } else {
      res.status(400).send({
        success: false,
        // data: JSON.parse(response.body),
        message: "pass all the necessary data",
      });
    }
  } else {
    res.status(400).send({
      success: false,
      data: [],
      message: "You are not authorized",
    });
  }
};
exports.mobileTransfer = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (process.env.ADMIN_AUTH_CODE == req.body.auth_code) {
    var condition = {
      amount: Number(req.body.amount),
      scurrancy: req.body.scurrancy,
      beneficiary_name: req.body.beneficiary_name,
      account: req.body.account,
      sender_country: req.body.sender_country,
      mobile_number: req.body.mobile_number,
    };
    if (
      condition.amount &&
      condition.scurrancy &&
      condition.beneficiary_name &&
      condition.account &&
      condition.sender_country &&
      condition.mobile_number
    ) {
      try {
        const details = {
          account_bank: "MPS",
          account_number: condition.account,
          amount: condition.amount,
          currency: condition.scurrancy,
          beneficiary_name: condition.beneficiary_name,
          meta: {
            sender: "Flutterwave Developers",
            sender_country: condition.sender_country,
            mobile_number: condition.mobile_number,
          },
        };
        const response = await flw.Transfer.initiate(details);

        if (response.status == "error") {
          res.status(400).send({
            success: false,
            message: response.data.complete_message,
            // message: "something went wrong",
          });
        } else {
          res.status(200).send({
            success: true,
            data: response.data,
            message: "Transfer to mobile successfully",
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
      res.status(400).send({
        success: false,
        // data: JSON.parse(response.body),
        message: "pass all the necessary data",
      });
    }
  } else {
    res.status(400).send({
      success: false,
      data: [],
      message: "You are not authorized",
    });
  }
};
exports.getBankList = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (process.env.ADMIN_AUTH_CODE == req.body.auth_code) {
    var condition = {
      bank: req.body.bank,
    };
    if (condition.bank) {
      try {
        var request = require("request");
        var options = {
          method: "GET",
          url: `https://api.flutterwave.com/v3/banks/${condition.bank}`,
          headers: {
            Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
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
            if (JSON.parse(response.body).status == "success") {
              res.status(200).send({
                success: true,
                data: JSON.parse(response.body),
                message: "banks fetch successfully",
              });
            } else {
              res.status(400).send({
                success: false,
                data: JSON.parse(response.body).message,
              });
            }
          }
        });
      } catch (error) {
        console.log(error);
        res.status(503).send({
          success: false,
          // data: JSON.parse(response.body),
          message: "something went wrong",
        });
      }
    } else {
      res.status(400).send({
        success: false,
        // data: JSON.parse(response.body),
        message: "pass all the necessary data",
      });
    }
  } else {
    res.status(400).send({
      success: false,
      data: [],
      message: "You are not authorized",
    });
  }
};
