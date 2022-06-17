import React, { useState } from "react";
import axios from "axios";

export default function FlutterAccountTransfer() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setMerchantId] = useState();
  const [amount, setAmount] = useState("");
  const [error, setError] = useState({});
  const [convertMoney, setConvertMoney] = useState();
  const [rate, setRate] = useState();
  const [disable, setDisable] = useState(false);
  const [sourceCurrency, setSourceCurrency] = useState("NGN");
  const [destinationCurrency, setDestinationCurrency] = useState("NGN");
  function validate() {
    let error = {};
    let isValide = true;

    if (phoneNumber == "") {
      error["merchant"] = "please enter a Merchant ID";
      isValide = false;
    }
    if (amount <= 0) {
      error["amount"] = "please enter valid amount";
      isValide = false;
    }
    setError(error);
    return isValide;
  }
  const submitEvent = (e) => {
    e.preventDefault();
    if (validate()) {
    }
  };

  function getAmount(value, sCurrancy, dCurrancy) {
    setDisable(true);
    setAmount(value);
    const myurl = "http://localhost:3001/api/admin/get-ratedata";
    var bodyFormData = new URLSearchParams();
    bodyFormData.append("auth_code", "TruliPay#Wallet$&$aPp#MD");
    bodyFormData.append("amount", value);
    bodyFormData.append("sCurrancy", sCurrancy);
    bodyFormData.append("dCurrancy", dCurrancy);
    axios({
      method: "POST",
      url: myurl,
      data: bodyFormData,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((response) => {
        if (response.data.success) {
          setConvertMoney(response?.data?.data?.data?.source?.amount);
          setRate(response?.data?.data?.data?.rate);
          setDisable(false);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }
  return (
    <>
      <h2 className="mb-2">Transfer a money from flutterwave to flutterwave</h2>
      <div className="transferForm w-25 p-2 formDiv">
        <form>
          <div className="form-group mb-2">
            <label for="exampleInputPassword1">Merchant ID :</label>
            <input
              type="number"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter merchant id"
              value={phoneNumber}
              required
              onChange={(e) => setMerchantId(e.target.value)}
            />
            <div className="text-danger mt-1" style={{ fontSize: "12px" }}>
              {error.merchant}
            </div>
          </div>
          <div class="form-group ">
            <label for="inputState">Source Currency</label>
            <select
              id="inputState"
              class="form-control"
              value={sourceCurrency}
              onChange={(e) => {
                e.preventDefault();
                setSourceCurrency(e.target.value);
                getAmount(amount, e.target.value, destinationCurrency);
              }}
            >
              <option selected>NGN</option>
              <option>GHS</option>
              <option>KES</option>
              <option>TZS</option>
              <option>UGX</option>
              <option>SLL</option>
              <option>ZAR</option>
            </select>
          </div>
          <div class="form-group ">
            <label for="inputState">Destination Currency</label>
            <select
              id="inputState"
              class="form-control"
              value={destinationCurrency}
              onChange={(e) => {
                e.preventDefault();
                setDestinationCurrency(e.target.value);
                getAmount(amount, sourceCurrency, e.target.value);
              }}
            >
              <option selected>NGN</option>
              <option>GHS</option>
              <option>KES</option>
              <option>TZS</option>
              <option>UGX</option>
              <option>SLL</option>
              <option>ZAR</option>
            </select>
          </div>
          <div className="form-group mb-2">
            <label for="exampleInputPassword1">Destination Amount</label>
            <div className="d-flex">
              <input
                type="text"
                className="form-control w-25"
                id="exampleInputPassword1"
                disabled
                value={destinationCurrency}
              />
              <input
                type="number"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter amount"
                value={amount}
                required
                onChange={(event) => {
                  event.preventDefault();
                  getAmount(
                    event.target.value,
                    sourceCurrency,
                    destinationCurrency
                  );
                }}
              />
            </div>
            <div className="text-danger mt-1" style={{ fontSize: "12px" }}>
              {error.amount}
            </div>
          </div>

          {amount != "" ? (
            <div className="rateDiv mt-3" style={{ fontSize: "14px" }}>
              {convertMoney != null
                ? `${sourceCurrency} ${convertMoney} = ${destinationCurrency} ${amount} at rate ${rate}`
                : "fetching a data..."}
            </div>
          ) : null}
          <button
            type="submit"
            className="btn btn-primary mt-3 w-100"
            onClick={submitEvent}
            disabled={disable}
          >
            {disable ? "Loading..." : "Submit"}
          </button>
        </form>
        <br />

        {/* <a
          href="https://ravesandbox.flutterwave.com/pay/1zrm46vp06az"
          className="text-decoration-none text-white"
        >
          <button className="btn btn-success w-100">Reva Payment</button>
        </a> */}
      </div>
    </>
  );
}
