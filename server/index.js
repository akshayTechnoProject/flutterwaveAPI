const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
const bodyParser = require("body-parser");

const dotenv = require("dotenv");
dotenv.config();
var data;
// async function getData() {
//   const flw = new Flutterwave(
//     process.env.FLW_PUBLIC_KEY,
//     process.env.FLW_SECRET_KEY
//   );

//   const details = {
//     account_bank: "flutterwave",
//     account_number: "100769559",
//     amount: 5500,
//     narration: "Akhlm Pstmn Trnsfr xx007",
//     currency: "NGN",
//     reference: "akhlm-pstmnpyt-rfx0x007_PMCKDU_1",
//     callback_url: "https://www.flutterwave.com/ng/",
//     debit_currency: "NGN",
//   };
//   console.log(await flw.Transfer.initiate(details));
// }
// getData();

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
