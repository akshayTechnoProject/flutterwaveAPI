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
      sCountry: req.body.sCountry,
      dCountry: req.body.dCountry,
    };

    if (
      condition.senderAddress &&
      condition.amount &&
      condition.sAccount &&
      condition.rAccount &&
      condition.sCountry &&
      condition.dCountry &&
      condition.name
    ) {
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
            transactionIdentifier: "271011151518178",
            acquirerCountryCode: condition.dCountry,
            acquiringBin: "408999",
            retrievalReferenceNumber: "330000550000",
            // senderCity: "Foster City",
            // senderStateCode: "CA",
            systemsTraceAuditNumber: "451018",
            // senderName: "Mohammed Qasim",
            businessApplicationId: "AA",
            settlementServiceIndicator: "9",
            merchantCategoryCode: "6012",
            transactionCurrencyCode: "USD",
            recipientName: condition.name,
            senderCountryCode: condition.sCountry,
            sourceOfFundsCode: "05",
            senderAccountNumber: condition.sAccount,
          },
        };
        options.agent = new https.Agent(options);
        request.post(options, (err, resp, body) => {
          if (err) {
            res.status(400).send({
              success: false,
              data: err,
              // message: "something went wrong",
            });
          } else if (resp.statusCode == 200) {
            res.status(200).send({
              success: true,
              data: body,
              message: "Visa Transfer successfully",
            });
          } else {
            res.status(400).send({
              success: false,
              data: body,
              // message: "something went wrong",
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
