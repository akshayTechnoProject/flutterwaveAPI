const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
const bodyParser = require("body-parser");

const dotenv = require("dotenv");
dotenv.config();
const Flutterwave = require("flutterwave-node-v3");
var data;
async function getData() {
  const flw = new Flutterwave(
    "FLWPUBK_TEST-d49c3523fcc5e74b751c102027d18ba4-X",
    "FLWSECK_TEST-c3a1710c1476914ce9312a7d73397079-X"
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
    account_bank: "044",
    account_number: "0690000040",
    amount: 200,
    narration: "Payment for things",
    currency: "NGN",
    reference: "ghjkfghjjh",
    callback_url: "https://webhook.site/b3e505b0-fe02-430e-a538-22bbbce8ce0d",
    debit_currency: "NGN",
  };
  flw.Transfer.initiate(details).then(console.log).catch(console.log);
  flw.Misc.bvn({ bvn: "123456789010" }).then((response) =>
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
getData();

async function getData1() {}
getData1();
const app = express();

var corsOptions = {
  origin: process.env.MAIN_URL,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

app.use(express.static("public"));

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
app.get("/", (req, res) => {
  res.json("flutterwave is live");
});

require("./routes/admin.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
