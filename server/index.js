const express = require('express');
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require('cors');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config();
const Flutterwave = require('flutterwave-node-v3');
var data;
async function getData() {
  const flw = new Flutterwave(
    'FLWPUBK_TEST-d49c3523fcc5e74b751c102027d18ba4-X',
    'FLWSECK_TEST-c3a1710c1476914ce9312a7d73397079-X'
  );

  //   const payload = {
  //     from: "2020-01-01",
  //     to: "2020-05-05",
  //   };

  //   const response = await flw.Transaction.fetch(payload);
  //   console.log(response);
  //   // Install with: npm i flutterwave-node-v3

  // const Flutterwave = require('flutterwave-node-v3');
  // const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);
  const details = {
    account_bank: '044',
    account_number: '0690000040',
    amount: 200,
    narration: 'Payment for things',
    currency: 'NGN',
    reference: 'ghjkfghjjh',
    callback_url: 'https://webhook.site/b3e505b0-fe02-430e-a538-22bbbce8ce0d',
    debit_currency: 'NGN',
  };
  flw.Transfer.initiate(details).then(console.log).catch(console.log);
  flw.Misc.bvn({ bvn: '123456789010' }).then((response) =>
    console.log(response)
  );
  // const detail = {
  //   card_number: "5531886652142950",
  //   cvv: "564",
  //   expiry_month: "09",
  //   expiry_year: "32",
  //   currency: "NGN",
  //   amount: "100",
  //   fullname: "Flutterwave Developers",
  //   email: "developers@flutterwavego.com",
  //   tx_ref: "MC-3243e",
  //   redirect_url: "https://www,flutterwave.ng",
  // };
  // console.log(await flw.Charge.card(detail));
  // console.log("hi");
}
//getData();
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
console.log(transmissionDateTime);

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
async function getData1() {
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
      transactionIdentifier: '381228649430011',
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
getData1();

var corsOptions = {
  origin: process.env.MAIN_URL,
};

app.use(cors(corsOptions));

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
