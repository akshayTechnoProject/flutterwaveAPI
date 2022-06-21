const express = require('express');
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require('cors');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config();

const fs = require('fs');
var https = require('https');
const request = require('request');
const app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const username = 'DHJJ46XXQKQTSY0N1WYO21nL2e9Q-6Oiltnzu0PxodtyyMtwE';
const password = '6pumAJNdBhTuMzNqTrI1K ';
const key = './key_21d8364b-de17-4ef0-851d-3bb105c037bb.pem';
const cert = './cert.pem';
const d_t = new Date();

let year = d_t.getFullYear();
let month = ('0' + (d_t.getMonth() + 1)).slice(-2);
let day = ('0' + d_t.getDate()).slice(-2);
let hour = d_t.getHours() < 10 ? '0' + d_t.getHours() : d_t.getHours();
let minute = d_t.getMinutes() < 10 ? '0' + d_t.getMinutes() : d_t.getMinutes();
let seconds = d_t.getSeconds() < 10 ? '0' + d_t.getSeconds() : d_t.getSeconds();
const transmissionDateTime =
  year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + seconds;
// prints date & time in YYYY-MM-DDTHH:MM:SS format
// console.log(transmissionDateTime);

async function helloworld() {
  var options = {
    hostname: 'sandbox.api.visa.com',
    port: 443,
    uri: 'https://sandbox.api.visa.com/vdp/helloworld',
    method: 'GET',
    key: fs.readFileSync(key),
    cert: fs.readFileSync(cert),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization:
        'Basic REhKSjQ2WFhRS1FUU1kwTjFXWU8yMW5MMmU5US02T2lsdG56dTBQeG9kdHl5TXR3RTo2cHVtQUpOZEJoVHVNek5xVHJJMUs=',
    },
    json: true,
  };
  options.agent = new https.Agent(options);
  request.get(options, (err, res, body) => {
    if (err) {
      return console.log(err);
    }
    console.log(`Status: ${res.statusCode}`);
    console.log(body);
  });
}
helloworld();

async function postPullFundTransferAPI() {
  var options = {
    hostname: 'sandbox.api.visa.com',
    port: 443,
    key: fs.readFileSync(key),
    cert: fs.readFileSync(cert),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization:
        'Basic REhKSjQ2WFhRS1FUU1kwTjFXWU8yMW5MMmU5US02T2lsdG56dTBQeG9kdHl5TXR3RTo2cHVtQUpOZEJoVHVNek5xVHJJMUs=',
    },
    json: true,
    method: 'POST',
    url: 'https://sandbox.api.visa.com/visadirect/fundstransfer/v1/pullfundstransactions',

    body: {
      surcharge: '11.99',
      amount: '124.02',
      localTransactionDateTime: transmissionDateTime,
      cpsAuthorizationCharacteristicsIndicator: 'Y',
      riskAssessmentData: {
        traExemptionIndicator: 'true',
        trustedMerchantExemptionIndicator: 'true',
        scpExemptionIndicator: 'true',
        delegatedAuthenticationIndicator: 'true',
        lowValueExemptionIndicator: 'true',
      },
      colombiaNationalServiceData: {
        addValueTaxReturn: '10.00',
        taxAmountConsumption: '10.00',
        nationalNetReimbursementFeeBaseAmount: '20.00',
        addValueTaxAmount: '10.00',
        nationalNetMiscAmount: '10.00',
        countryCodeNationalService: '170',
        nationalChargebackReason: '11',
        emvTransactionIndicator: '1',
        nationalNetMiscAmountType: 'A',
        costTransactionIndicator: '0',
        nationalReimbursementFee: '20.00',
      },
      cardAcceptor: {
        address: {
          country: 'USA',
          zipCode: '94404',
          county: '081',
          state: 'CA',
        },
        idCode: 'ABCD1234ABCD123',
        name: 'Acceptor 1',
        terminalId: 'ABCD1234',
      },
      acquirerCountryCode: '840',
      acquiringBin: '408999',
      senderCurrencyCode: 'USD',
      retrievalReferenceNumber: '330000550000',
      addressVerificationData: {
        street: 'XYZ St',
        postalCode: '12345',
      },
      cavv: '0700100038238906000013405823891061668252',
      systemsTraceAuditNumber: '451001',
      businessApplicationId: 'AA',
      senderPrimaryAccountNumber: '4957030005123304',
      settlementServiceIndicator: '9',
      visaMerchantIdentifier: '73625198',
      foreignExchangeFeeTransaction: '11.99',
      senderCardExpiryDate: '2020-03',
      nationalReimbursementFee: '11.22',
    },
  };
  options.agent = new https.Agent(options);
  request.post(options, (err, res, body) => {
    if (err) {
      return console.log(err);
    }
    console.log(`Status: ${res.statusCode}`);
    console.log(body);
  });
}

async function postPushFundTransferAPI() {
  var options = {
    hostname: 'sandbox.api.visa.com',
    port: 443,
    key: fs.readFileSync(key),
    cert: fs.readFileSync(cert),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization:
        'Basic REhKSjQ2WFhRS1FUU1kwTjFXWU8yMW5MMmU5US02T2lsdG56dTBQeG9kdHl5TXR3RTo2cHVtQUpOZEJoVHVNek5xVHJJMUs=',
    },
    json: true,
    method: 'POST',
    url: 'https://sandbox.api.visa.com/visadirect/fundstransfer/v1/pushfundstransactions',

    body: {
      amount: '1200',
      senderAddress: '901 Metro Center Blvd',
      localTransactionDateTime: transmissionDateTime,
      pointOfServiceData: {
        panEntryMode: '90',
        posConditionCode: '00',
        motoECIIndicator: '0',
      },
      recipientPrimaryAccountNumber: '4761360055652118',
      colombiaNationalServiceData: {
        addValueTaxReturn: '10.00',
        taxAmountConsumption: '10.00',
        nationalNetReimbursementFeeBaseAmount: '20.00',
        addValueTaxAmount: '10.00',
        nationalNetMiscAmount: '10.00',
        countryCodeNationalService: '170',
        nationalChargebackReason: '11',
        emvTransactionIndicator: '1',
        nationalNetMiscAmountType: 'A',
        costTransactionIndicator: '0',
        nationalReimbursementFee: '20.00',
      },
      cardAcceptor: {
        address: {
          country: 'USA',
          zipCode: '94404',
          county: 'San Mateo',
          state: 'CA',
        },
        idCode: 'VMT200911086070',
        name: 'Acceptor 1',
        terminalId: 'TID-9999',
      },
      senderReference: '',
      transactionIdentifier: '271011151518178',
      acquirerCountryCode: '840',
      acquiringBin: '408999',
      retrievalReferenceNumber: '330000550000',
      senderCity: 'Foster City',
      senderStateCode: 'CA',
      systemsTraceAuditNumber: '451018',
      senderName: 'Mohammed Qasim',
      businessApplicationId: 'AA',
      settlementServiceIndicator: '9',
      merchantCategoryCode: '6012',
      transactionCurrencyCode: 'USD',
      recipientName: 'rohan',
      senderCountryCode: '124',
      sourceOfFundsCode: '05',
      senderAccountNumber: '4957030420210496',
    },
  };
  options.agent = new https.Agent(options);
  request.post(options, (err, res, body) => {
    if (err) {
      return console.log(err);
    }
    console.log(`Status: ${res.statusCode}`);
    console.log(body);
  });
}

function readPullFundsTransaction() {
  var request = require('request');
  let statusIdentifier = 123456;
  var options = {
    hostname: 'sandbox.api.visa.com',
    port: 443,
    method: 'GET',
    key: fs.readFileSync(key),
    cert: fs.readFileSync(cert),
    url: `https://sandbox.api.visa.com/visadirect/fundstransfer/v1/pullfundstransactions/${statusIdentifier}`,
    headers: {
      Authorization:
        'Basic REhKSjQ2WFhRS1FUU1kwTjFXWU8yMW5MMmU5US02T2lsdG56dTBQeG9kdHl5TXR3RTo2cHVtQUpOZEJoVHVNek5xVHJJMUs=',
    },
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });
}

function readPushFundsTransaction() {
  var request = require('request');
  let statusIdentifier = 123456;
  var options = {
    hostname: 'sandbox.api.visa.com',
    port: 443,
    method: 'GET',
    key: fs.readFileSync(key),
    cert: fs.readFileSync(cert),
    url: `https://sandbox.api.visa.com/visadirect/fundstransfer/v1/pushfundstransactions/${statusIdentifier}`,
    headers: {
      Authorization:
        'Basic REhKSjQ2WFhRS1FUU1kwTjFXWU8yMW5MMmU5US02T2lsdG56dTBQeG9kdHl5TXR3RTo2cHVtQUpOZEJoVHVNek5xVHJJMUs=',
    },
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });
}

postPullFundTransferAPI();

postPushFundTransferAPI();

readPullFundsTransaction();

readPushFundsTransaction();

var corsOptions = {
  origin: process.env.MAIN_URL,
};

app.use(cors(corsOptions));
// var axios = require("axios");
// var data = JSON.stringify({
//   length: 7,
//   customer: {
//     name: "Flutterwave Developers",
//     email: "keyurgondaliya403@gmail.com",
//     phone: "9773019727",
//   },
//   sender: "Flutterwave Inc.",
//   send: true,
//   medium: ["email", "whatsapp", "sms"],
//   expiry: 5,
// });

// var config = {
//   method: "post",
//   url: "https://api.flutterwave.com/v3/otps",
//   headers: {
//     Authorization: `Bearer ${process.env.FLUTTERWAVE_PRIVATEKEY}`,
//     "Content-Type": "application/json",
//   },
//   data: data,
// };

// axios(config)
//   .then(function (response) {
//     console.log(JSON.stringify(response.data));
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

app.use(express.static('public'));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({ extended: true })
); /* bodyParser.urlencoded() is deprecated */

app.use(bodyParser.json());

// const db = require("./models");
// db.mongoose
//   .connect(db.url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to the database!");
//   })
//   .catch((err) => {
//     console.log("Cannot connect to the database!", err);
//     process.exit();
//   });

// simple route
app.get('/', (req, res) => {
  res.json('flutterwave is live');
});

require('./routes/admin.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
