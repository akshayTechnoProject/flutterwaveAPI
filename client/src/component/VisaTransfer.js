import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function VisaTransfer() {
  const [msg, setMsg] = useState();
  const [bankList, setbankList] = useState([]);
  const [bank, setBank] = useState('');
  const [country, setCountry] = useState('NG');
  const contryList = [
    'GH',
    'KE',
    'UG',
    'TZ',
    'ZA',
    'ZM',
    'CM',
    'CI',
    'SL',
    'ML',
    'SN',
    'RW',
  ];
  const [narration, setNarration] = useState('');
  const [account, setAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState({});
  const [convertMoney, setConvertMoney] = useState();
  const [rate, setRate] = useState();
  const [disable, setDisable] = useState(false);
  const [sourceCurrency, setSourceCurrency] = useState('NGN');
  const [destinationCurrency, setDestinationCurrency] = useState('NGN');
  function validate() {
    let error = {};
    let isValide = true;
    if (account == '') {
      error['account'] = 'please enter a bank account';
      isValide = false;
    }
    if (narration == '') {
      error['narration'] = 'please enter a narration';

      isValide = false;
    }
    if (!bank) {
      error['bank'] = 'please select bank';

      isValide = false;
    }
    if (amount <= 0) {
      error['amount'] = 'please enter valid amount';
      isValide = false;
    }
    setError(error);
    return isValide;
  }
  const submitEvent = (e) => {
    e.preventDefault();
    makeTransfer();
  };

  function makeTransfer() {
    setDisable(true);

    const myurl = 'http://localhost:3001/api/admin/visa-transfer';
    var bodyFormData = new URLSearchParams();
    bodyFormData.append('auth_code', 'TruliPay#Wallet$&$aPp#MD');
    bodyFormData.append('senderAddress', '102,block banglet,USA');
    bodyFormData.append('name', 'Vijay');
    bodyFormData.append('amount', 120);
    bodyFormData.append('sCountry', 124);
    bodyFormData.append('dCountry', 849);

    bodyFormData.append('rAccount', 4957030420210496);
    bodyFormData.append('sAccount', 4653459515756154);

    axios({
      method: 'POST',
      url: myurl,
      data: bodyFormData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          setDisable(false);
          alert('payment successfull');
          setAmount('');
          setAccount('');
          setNarration('');
          setMsg(null);
          setSourceCurrency('NGN');
          setDestinationCurrency('NGN');
          setCountry('NG');
          setBank('');
        }
      })

      .catch((error) => {
        alert(error?.response?.data?.data?.data?.complete_message);
        setDisable(false);
      });
  }

  return (
    <>
      <h2 className="mb-2">Transfer a money using visa from bank to Bank</h2>
      <div className="transferForm w-25 p-2 formDiv">
        <form>
          <div className="form-group mb-2">
            <label for="exampleInputPassword2">From Account :</label>
            <input
              type="number"
              className="form-control"
              id="exampleInputPassword2"
              placeholder="Enter Bank Account"
              value="4653459515756154"
              onChange={(e) => {
                setAccount(e.target.value);
                // getName(e.target.value);
              }}
            />
            <div className="text-danger mt-1" style={{ fontSize: '12px' }}>
              {error.account}
            </div>
          </div>
          <div className="form-group mb-2">
            <label for="exampleInputPassword2">To Account :</label>
            <input
              type="number"
              className="form-control"
              id="exampleInputPassword2"
              placeholder="Enter Bank Account"
              value="4957030420210496"
              onChange={(e) => {
                setAccount(e.target.value);
                // getName(e.target.value);
              }}
            />
            <div className="text-danger mt-1" style={{ fontSize: '12px' }}>
              {error.account}
            </div>
          </div>
          <div className="form-group mb-2">
            <label for="exampleInputPassword2">Source country :</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword2"
              placeholder="Enter narration"
              value="124"
              onChange={(e) => {
                setNarration(e.target.value);
              }}
            />
            <div className="text-danger mt-1" style={{ fontSize: '12px' }}>
              {error.narration}
            </div>
          </div>
          <div className="form-group mb-2">
            <label for="exampleInputPassword2">Destination Country :</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword2"
              placeholder="Enter narration"
              value="840"
              onChange={(e) => {
                setNarration(e.target.value);
              }}
            />
            <div className="text-danger mt-1" style={{ fontSize: '12px' }}>
              {error.narration}
            </div>
          </div>
          <div className="form-group mb-2">
            <label for="exampleInputPassword2">Sender name :</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword2"
              placeholder="Enter narration"
              value="Vijay"
            />
            <div className="text-danger mt-1" style={{ fontSize: '12px' }}>
              {error.narration}
            </div>
          </div>
          <div className="form-group mb-2">
            <label for="exampleInputPassword2">Amount :</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword2"
              placeholder="Enter narration"
              value="120"
            />
            <div className="text-danger mt-1" style={{ fontSize: '12px' }}>
              {error.narration}
            </div>
          </div>
          <div className="form-group mb-2">
            <label for="exampleInputPassword2">Address :</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword2"
              placeholder="Enter narration"
              value="102,block banglet,USA"
            />
            <div className="text-danger mt-1" style={{ fontSize: '12px' }}>
              {error.narration}
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary mt-3 w-100"
            onClick={submitEvent}
            disabled={disable}
          >
            {disable ? 'Loading...' : 'Pay now'}
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
