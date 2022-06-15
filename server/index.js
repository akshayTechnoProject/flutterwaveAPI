const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
const bodyParser = require("body-parser");

// const dotenv = require("dotenv");
// dotenv.config();
const Flutterwave = require("flutterwave-node-v3");
var data;
async function getData() {
  const flw = new Flutterwave(
    "FLWPUBK_TEST-e0e565ef7d07a71de3ce1478ac88a3ea-X",
    "FLWSECK_TEST-04b54174dc008a082522de1e0b05f888-X"
  );

  const payload = {
    from: "2020-01-01",
    to: "2020-05-05",
  };

  const response = await flw.Transaction.fetch(payload);
  console.log(response);
  data = response;
}
getData();
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
  res.json(data);
});

require("./routes/admin.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
