import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function BankTransfer() {
  const navigate = useNavigate();
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
    if (validate()) {
      makeTransfer();
    }
  };

  function makeTransfer() {
    setDisable(true);
    const myurl = 'http://localhost:3001/api/admin/bank-transfer';
    var bodyFormData = new URLSearchParams();
    bodyFormData.append('auth_code', 'TruliPay#Wallet$&$aPp#MD');
    bodyFormData.append('narration', narration);
    bodyFormData.append('code', bank);
    bodyFormData.append('amount', convertMoney);
    bodyFormData.append('currancy', sourceCurrency);
    bodyFormData.append('account', account);
    axios({
      method: 'POST',
      url: myurl,
      data: bodyFormData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
      .then((response) => {
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
        alert(error.response.data.data.data.complete_message);
        setDisable(false);
      });
  }
  function getAmount(value, sCurrancy, dCurrancy) {
    setDisable(true);
    setAmount(value);
    const myurl = 'http://localhost:3001/api/admin/get-ratedata';
    var bodyFormData = new URLSearchParams();
    bodyFormData.append('auth_code', 'TruliPay#Wallet$&$aPp#MD');
    bodyFormData.append('amount', value);
    bodyFormData.append('sCurrancy', sCurrancy);
    bodyFormData.append('dCurrancy', dCurrancy);
    axios({
      method: 'POST',
      url: myurl,
      data: bodyFormData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
      .then((response) => {
        if (response.data.success) {
          setConvertMoney(response?.data?.data?.data?.source?.amount);
          setRate(response?.data?.data?.data?.rate);
          setDisable(false);
        }
      })
      .catch((error) => {
        console.log('Error', error);
      });
  }
  useEffect(() => {
    setDisable(true);
    const myurl = 'http://localhost:3001/api/admin/get-banklist';
    var bodyFormData = new URLSearchParams();
    bodyFormData.append('auth_code', 'TruliPay#Wallet$&$aPp#MD');
    bodyFormData.append('bank', country);

    axios({
      method: 'POST',
      url: myurl,
      data: bodyFormData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
      .then((response) => {
        if (response.data.success) {
          setDisable(false);
          setbankList(response.data.data.data);
        }
      })

      .catch((error) => {
        alert(error.response.data.data.data.complete_message);
        setDisable(false);
      });
  }, [country]);
  //   function getName(id) {
  //     setMsg(null);
  //     setDisable(true);
  //     const myurl = "http://localhost:3001/api/admin/flutter-merchant-id";
  //     var bodyFormData = new URLSearchParams();
  //     bodyFormData.append("auth_code", "TruliPay#Wallet$&$aPp#MD");
  //     bodyFormData.append("account", id);

  //     axios({
  //       method: "POST",
  //       url: myurl,
  //       data: bodyFormData,
  //       headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //     })
  //       .then((response) => {
  //         if (response.data.success) {
  //           setNarration(response.data.data.account_name);
  //           setMsg(null);
  //           setDisable(false);
  //         }
  //       })
  //       .catch((error) => {
  //         setMsg(error.response.data.data.message);

  //         setNarration("");
  //       });
  //   }
  return (
    <>
      <h2 className="mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          onClick={() => navigate('/flutterwave')}
          fill="currentColor"
          className="bi bi-arrow-left"
          viewBox="0 0 16 16"
          style={{
            cursor: 'pointer',
            fontSize: '40px',
            marginTop: '0px',
            marginBottom: '5px',
            marginRight: '10px',
            fontWeight: '1000',
          }}
        >
          <path
            fill-rule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
          />
        </svg>
        Transfer a money from flutterwave to Bank
      </h2>
      <div className="transferForm w-25 p-2 formDiv">
        <form>
          <div className="form-group mb-2">
            <label for="exampleInputPassword2">Bank Account :</label>
            <input
              type="number"
              className="form-control"
              id="exampleInputPassword2"
              placeholder="Enter Bank Account"
              value={account}
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
            <label for="exampleInputPassword2">Narration :</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword2"
              placeholder="Enter narration"
              value={narration}
              onChange={(e) => {
                setNarration(e.target.value);
              }}
            />
            <div className="text-danger mt-1" style={{ fontSize: '12px' }}>
              {error.narration}
            </div>
          </div>
          <div class="form-group ">
            <label for="inputState">Country : </label>
            <select
              id="inputState"
              class="form-control"
              value={country}
              onChange={(e) => {
                e.preventDefault();
                setCountry(e.target.value);
              }}
            >
              <option selected>NG</option>
              {contryList.map((e, i) => (
                <option>{e}</option>
              ))}
            </select>
          </div>
          {bankList && (
            <div class="form-group ">
              <label for="inputState">Bank : </label>
              <select
                id="inputState"
                class="form-control"
                value={bank}
                onChange={(e) => {
                  e.preventDefault();
                  if (e.target.value == 'Select Bank') setBank('');
                  else setBank(e.target.value);
                }}
              >
                <option selected value="Select Bank">
                  Select Bank
                </option>
                {bankList.map((e, i) => (
                  <option value={e.code}>{e.name}</option>
                ))}
              </select>
              <div className="text-danger mt-1" style={{ fontSize: '12px' }}>
                {error.bank}
              </div>
            </div>
          )}
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
            <div className="text-danger mt-1" style={{ fontSize: '12px' }}>
              {error.amount}
            </div>
          </div>

          {amount != '' ? (
            <div className="rateDiv mt-3" style={{ fontSize: '14px' }}>
              {convertMoney != null
                ? `${sourceCurrency} ${convertMoney} = ${destinationCurrency} ${amount} at rate ${rate}`
                : 'fetching a data...'}
            </div>
          ) : null}
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
