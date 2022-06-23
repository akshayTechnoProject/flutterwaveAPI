import React, { useState } from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function DoTransfer() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState({});
  const [convertMoney, setConvertMoney] = useState();
  const [rate, setRate] = useState();
  const [disable, setDisable] = useState(false);
  const [sourceCurrency, setSourceCurrency] = useState('NGN');
  const [destinationCurrency, setDestinationCurrency] = useState('NGN');
  const config = {
    public_key: process.env.REACT_APP_API_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: convertMoney,
    currency: sourceCurrency,
    //payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: email,
      phonenumber: phoneNumber,
      name: userName,
    },
    customizations: {
      title: 'TruliPay',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  function validate() {
    let error = {};
    let isValide = true;
    if (email == '') {
      isValide = false;
      error['email'] = 'please enter a email';
    }
    if (userName == '') {
      error['userName'] = 'please enter a user name';
      isValide = false;
    }
    if (phoneNumber == '') {
      error['phoneNumber'] = 'please enter a phone number';
      isValide = false;
    }
    if (amount <= 0) {
      error['amount'] = 'please enter valid amount';
      isValide = false;
    }
    setError(error);
    return isValide;
  }
  const handleFlutterPayment = useFlutterwave(config);
  const submitEvent = (e) => {
    e.preventDefault();
    if (validate()) {
      handleFlutterPayment({
        callback: (response) => {
          if (response.status === 'successful') {
            setAmount('');
            setUserName('');
            setEmail('');
            setPhoneNumber('');
            setSourceCurrency('NGN');
            setDestinationCurrency('NGN');
            alert('Payment successfull');
          } else {
            alert('Something went wrong');
          }
          closePaymentModal(); // this will close the modal programmatically
        },
        onClose: () => {},
      });
    }
  };

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
        Transfer a money with flutterwave
      </h2>
      <div className="transferForm w-25 p-2 formDiv">
        <form>
          <div className="form-group mb-2">
            <label for="exampleInputEmail1" className="ml-0">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="text-danger mt-1" style={{ fontSize: '12px' }}>
              {error.email}
            </div>
          </div>
          <div className="form-group mb-2">
            <label for="exampleInputPassword1">User Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter username"
              value={userName}
              required
              onChange={(e) => setUserName(e.target.value)}
            />
            <div className="text-danger mt-1" style={{ fontSize: '12px' }}>
              {error.userName}
            </div>
          </div>
          <div className="form-group mb-2">
            <label for="exampleInputPassword1">Phone Number</label>
            <input
              type="number"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter phonenumber"
              value={phoneNumber}
              required
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <div className="text-danger mt-1" style={{ fontSize: '12px' }}>
              {error.phoneNumber}
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
            {disable ? 'Loading...' : 'Submit'}
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
