const username = "DHJJ46XXQKQTSY0N1WYO21nL2e9Q-6Oiltnzu0PxodtyyMtwE";
const password = "6pumAJNdBhTuMzNqTrI1K ";
const key = "../key_21d8364b-de17-4ef0-851d-3bb105c037bb.pem";
const cert = "../cert.pem";
const d_t = new Date();
const fs = require("fs");
const request = require("request");

var https = require("https");
let year = d_t.getFullYear();
let month = ("0" + (d_t.getMonth() + 1)).slice(-2);
let day = ("0" + d_t.getDate()).slice(-2);
let hour = d_t.getHours() < 10 ? "0" + d_t.getHours() : d_t.getHours();
let minute = d_t.getMinutes() < 10 ? "0" + d_t.getMinutes() : d_t.getMinutes();
let seconds = d_t.getSeconds() < 10 ? "0" + d_t.getSeconds() : d_t.getSeconds();
const transmissionDateTime =
  year + "-" + month + "-" + day + "T" + hour + ":" + minute + ":" + seconds;
exports.visaBankTransfer = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (process.env.ADMIN_AUTH_CODE == req.body.auth_code) {
    var condition = {
      amount: Number(req.body.amount),
      senderAddress: req.body.senderAddress,
      name: req.body.name,
      sAccount: req.body.sAccount,
      rAccount: req.body.rAccount,
      senderCountrycode: req.body.senderCountrycode,
      acquirerCountryCode: req.body.acquirerCountryCode,
      expiry: req.body.expiry,
      acquiringBin: req.body.acquiringBin,
      senderCurrencyCode: req.body.senderCurrencyCode,
      transactionCurrencyCode: req.body.transactionCurrencyCode,
    };
    if (
      condition.senderAddress &&
      condition.amount &&
      condition.sAccount &&
      condition.rAccount &&
      condition.senderCountrycode &&
      condition.acquirerCountryCode &&
      condition.name &&
      condition.expiry &&
      condition.acquiringBin &&
      condition.senderCurrencyCode &&
      condition.transactionCurrencyCode
    ) {
      var now = new Date();
      var start = new Date(now.getFullYear(), 0, 0);
      var diff = now - start;
      var oneDay = 1000 * 60 * 60 * 24;
      var day = Math.floor(diff / oneDay);

      let retrievalReferenceNumber =
        String(now.getFullYear()).slice(-1) +
        "" +
        day +
        "" +
        String(now.getHours()).padStart(2, "0") +
        "" +
        String(now.getTime()).slice(-6);
      try {
        var options = {
          hostname: "sandbox.api.visa.com",
          port: 443,
          key: fs.readFileSync(require("path").resolve(__dirname, key)),
          cert: fs.readFileSync(require("path").resolve(__dirname, cert)),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization:
              "Basic REhKSjQ2WFhRS1FUU1kwTjFXWU8yMW5MMmU5US02T2lsdG56dTBQeG9kdHl5TXR3RTo2cHVtQUpOZEJoVHVNek5xVHJJMUs=",
          },
          json: true,
          method: "POST",
          url: "https://sandbox.api.visa.com/visadirect/fundstransfer/v1/pullfundstransactions",

          body: {
            // surcharge: "11.99",
            amount: condition.amount,
            localTransactionDateTime: transmissionDateTime,
            riskAssessmentData: {
              traExemptionIndicator: "true",
              trustedMerchantExemptionIndicator: "true",
              scpExemptionIndicator: "true",
              delegatedAuthenticationIndicator: "true",
              lowValueExemptionIndicator: "true",
            },
            colombiaNationalServiceData: {
              addValueTaxReturn: "10.00",
              taxAmountConsumption: "10.00",
              nationalNetReimbursementFeeBaseAmount: "20.00",
              addValueTaxAmount: "10.00",
              nationalNetMiscAmount: "10.00",
              countryCodeNationalService: "170",
              nationalChargebackReason: "11",
              emvTransactionIndicator: "1",
              nationalNetMiscAmountType: "A",
              costTransactionIndicator: "0",
              nationalReimbursementFee: "20.00",
            },
            cardAcceptor: {
              address: {
                country: "USA",
                zipCode: "94404",
                county: "081",
                state: "CA",
              },
              idCode: "ABCD1234ABCD123",
              name: "Acceptor 1",
              terminalId: "ABCD1234",
            },
            acquirerCountryCode: condition.acquirerCountryCode,
            acquiringBin: condition.acquiringBin,
            senderCurrencyCode: condition.senderCurrencyCode,
            retrievalReferenceNumber: retrievalReferenceNumber,

            // cavv: "0700100038238906000013405823891061668252",
            systemsTraceAuditNumber: "451001",
            businessApplicationId: "AA",
            senderPrimaryAccountNumber: condition.sAccount,
            settlementServiceIndicator: "9",
            visaMerchantIdentifier: "73625198",
            foreignExchangeFeeTransaction: "11.99",
            senderCardExpiryDate: "2020-03",
            nationalReimbursementFee: "11.22",
          },
        };
        var pushOptions = {
          hostname: "sandbox.api.visa.com",
          port: 443,
          key: fs.readFileSync(require("path").resolve(__dirname, key)),
          cert: fs.readFileSync(require("path").resolve(__dirname, cert)),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization:
              "Basic REhKSjQ2WFhRS1FUU1kwTjFXWU8yMW5MMmU5US02T2lsdG56dTBQeG9kdHl5TXR3RTo2cHVtQUpOZEJoVHVNek5xVHJJMUs=",
          },
          json: true,
          method: "POST",
          url: "https://sandbox.api.visa.com/visadirect/fundstransfer/v1/pushfundstransactions",

          body: {
            amount: condition.amount,
            senderAddress: condition.senderAddress,
            localTransactionDateTime: transmissionDateTime,
            // pointOfServiceData: {
            //   panEntryMode: "90",
            //   posConditionCode: "00",
            //   motoECIIndicator: "0",
            // },
            recipientPrimaryAccountNumber: condition.rAccount,
            colombiaNationalServiceData: {
              // addValueTaxReturn: "10.00",
              // taxAmountConsumption: "10.00",
              nationalNetReimbursementFeeBaseAmount: "20.00",
              // addValueTaxAmount: "10.00",
              // nationalNetMiscAmount: "10.00",
              countryCodeNationalService: "170",
              // nationalChargebackReason: "11",
              // emvTransactionIndicator: "1",
              // nationalNetMiscAmountType: "A",
              // costTransactionIndicator: "0",
              // nationalReimbursementFee: "20.00",
            },
            cardAcceptor: {
              address: {
                country: "USA",
                zipCode: "94404",
                // county: "San Mateo",
                state: "CA",
              },
              idCode: "VMT200911086070",
              name: "Acceptor 1",
              terminalId: "TID-9999",
            },
            // senderReference: "",
            // transactionIdentifier: retrievalReferenceNumber,
            acquirerCountryCode: condition.acquirerCountryCode,
            acquiringBin: "408999",
            retrievalReferenceNumber: "330000550000",
            // senderCity: "Foster City",
            // senderStateCode: "CA",
            systemsTraceAuditNumber: "451018",
            // senderName: "Mohammed Qasim",
            businessApplicationId: "AA",
            settlementServiceIndicator: "9",
            merchantCategoryCode: "6012",
            transactionCurrencyCode: condition.transactionCurrencyCode,
            recipientName: condition.name,
            senderCountryCode: condition.senderCountrycode,
            sourceOfFundsCode: "05",
            senderAccountNumber: condition.sAccount,
          },
        };
        options.agent = new https.Agent(options);
        request.post(options, (err, resq, bodyq) => {
          if (err) {
            res.status(400).send({
              success: false,
              data: err,
              message: "Error in pull request",
            });
          } else if (resq.statusCode == 200) {
            pushOptions.agent = new https.Agent(pushOptions);
            request.post(pushOptions, (errp, resp, bodyp) => {
              if (errp) {
                res.status(400).send({
                  success: false,
                  data: errp,
                  message: "Error in push request",
                });
              } else if (resp.statusCode == 200) {
                res.status(200).send({
                  success: true,
                  data: {
                    pull: {
                      body: bodyq,
                      response: {
                        statusCode: resq.statusCode,
                        body: resq.body,
                      },
                    },
                    push: {
                      body: bodyp,
                      response: {
                        statusCode: resp.statusCode,
                        body: resp.body,
                      },
                    },
                  },
                  message: "Visa Transfer successfully",
                });
              } else {
                res.status(400).send({
                  success: false,
                  data: bodyp,
                  message: "Error in push request",
                });
              }
            });
          } else {
            res.status(400).send({
              success: false,
              data: bodyq,
              message: "Error in pull request",
            });
          }
        });
      } catch (error) {
        console.log(error);
        res.status(400).send({
          success: false,
          data: error,
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

exports.accountValidation = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (process.env.ADMIN_AUTH_CODE == req.body.auth_code) {
    var condition = {
      cvv: req.body.cvv,
      account: req.body.account,
      expiry: req.body.expiry,
      postalCode: req.body.postalCode,
    };
    if (req.body.account) {
      var options = {
        hostname: "sandbox.api.visa.com",
        port: 443,
        key: fs.readFileSync(require("path").resolve(__dirname, key)),
        cert: fs.readFileSync(require("path").resolve(__dirname, cert)),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization:
            "Basic REhKSjQ2WFhRS1FUU1kwTjFXWU8yMW5MMmU5US02T2lsdG56dTBQeG9kdHl5TXR3RTo2cHVtQUpOZEJoVHVNek5xVHJJMUs=",
        },
        json: true,
        method: "POST",
        url: "https://sandbox.api.visa.com/pav/v1/cardvalidation",

        body: {
          cardCvv2Value: condition.cvv,
          primaryAccountNumber: condition.account,
          cardExpiryDate: condition.expiry,
          addressVerificationResults: {
            postalCode: condition.postalCode,
          },
        },
      };

      options.agent = new https.Agent(options);
      request.post(options, (err, resq, bodyq) => {
        if (err) {
          res.status(400).send({
            success: false,
            data: err,
          });
        } else if (resq.statusCode == 200) {
          res.status(200).send({
            success: true,
            data: {
              statusCode: resq.statusCode,
              body: resq.body,
            },
            message: "Validation successfully",
          });
        } else {
          res.status(400).send({
            success: false,
            data: bodyq,
          });
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
