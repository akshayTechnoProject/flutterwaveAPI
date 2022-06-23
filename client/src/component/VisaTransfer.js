import React, { useState, useEffect } from 'react';
import axios from 'axios';
import country from '../includes/country.json';
import countryData from '../includes/CountryData.json';
export default function VisaTransfer() {
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [sCountry, setsCountry] = useState('');
  const [dCountry, setdCountry] = useState('');
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [bin, setBIN] = useState('');
  const [senderCurrencyCode, setSenderCurrencyCode] = useState('');
  const [transactionCurrencyCode, setTransactionCurrencyCode] = useState('');

  const [countryList, setCountryList] = useState(country);
  const [countryDataList, setCountryDataList] = useState(countryData);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState({});
  const [convertMoney, setConvertMoney] = useState();
  const [rate, setRate] = useState();
  const [disable, setDisable] = useState(false);
  function validate() {
    let error = {};
    let isValide = true;
    if (fromAccount == '') {
      error['fromAccount'] = 'please enter a source bank account';
      isValide = false;
    }
    if (toAccount == '') {
      error['toAccount'] = 'please enter a destination bank account';
      isValide = false;
    }
    if (sCountry == '') {
      error['sCountry'] = 'please enter a Source Country';

      isValide = false;
    }
    if (dCountry == '') {
      error['dCountry'] = 'please enter a destination Country';

      isValide = false;
    }
    if (address == '') {
      error['address'] = 'please enter address';

      isValide = false;
    }
    if (name == '') {
      error['name'] = 'please enter name';

      isValide = false;
    }
    if (amount <= 0 || amount == '') {
      error['amount'] = 'please enter valid amount';
      isValide = false;
    }
    if (expiry == '') {
      error['expiry'] = 'please enter valid date';
      isValide = false;
    }
    if (bin == '') {
      error['bin'] = 'please enter bank identification number';
      isValide = false;
    }
    if (senderCurrencyCode == '') {
      error['senderCurrencyCode'] = 'please enter sender currency code';
      isValide = false;
    }
    if (transactionCurrencyCode == '') {
      error['transactionCurrencyCode'] =
        'please enter transaction currency code';
      isValide = false;
    }
    setError(error);
    return isValide;
  }
  const submitEvent = (e) => {
    e.preventDefault();
    if (validate()) makeTransfer();
  };

  function makeTransfer() {
    setDisable(true);

    const myurl = 'http://localhost:3001/api/admin/visa-transfer';
    var bodyFormData = new URLSearchParams();
    bodyFormData.append('auth_code', 'TruliPay#Wallet$&$aPp#MD');
    bodyFormData.append('senderAddress', address);
    bodyFormData.append('name', name);
    bodyFormData.append('amount', amount);
    bodyFormData.append('sCountry', sCountry);
    bodyFormData.append('dCountry', dCountry);
    bodyFormData.append('rAccount', fromAccount);
    bodyFormData.append('sAccount', toAccount);
    bodyFormData.append('acquiringBin', bin);
    bodyFormData.append('expiry', expiry);
    bodyFormData.append('senderCurrencyCode', senderCurrencyCode);
    bodyFormData.append('transactionCurrencyCode', transactionCurrencyCode);

    axios({
      method: 'POST',
      url: myurl,
      data: bodyFormData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
      .then((response) => {
        console.log(response);
        if (response?.data?.success) {
          console.log('#', response?.data?.data);
          setDisable(false);
          alert(
            `payment successful, Here is your transactionIdentifier code: ${response?.data?.data?.transactionIdentifier} and approvalCode: ${response?.data?.data?.approvalCode}`
          );
        }
        setDisable(false);
      })

      .catch((error) => {
        if (
          error?.response?.data?.data?.errorMessage.includes(
            'Invalid PAN or TOKEN.'
          )
        )
          alert('Invalid PAN or TOKEN.');
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
              value={fromAccount}
              onChange={(e) => {
                setFromAccount(e.target.value);
              }}
            />
            <div className="text-danger mt-1" style={{ fontSize: '12px' }}>
              {error.fromAccount}
            </div>
          </div>
          <div className="form-group mb-2">
            <label for="exampleInputPassword2">To Account :</label>
            <input
              type="number"
              className="form-control"
              id="exampleInputPassword2"
              placeholder="Enter Bank Account"
              value={toAccount}
              onChange={(e) => {
                setToAccount(e.target.value);
              }}
            />
            <div className="text-danger mt-1" style={{ fontSize: '12px' }}>
              {error.toAccount}
            </div>
          </div>
          <div className="form-group mb-2">
            <label for="exampleInputPassword2">Source country :</label>
            <select
              id="exampleInputPassword2"
              class="form-control"
              value={sCountry}
              onChange={(e) => {
                e.preventDefault();

                if (e.target.value == 'Select Bank') {
                  setsCountry('');
                  setSenderCurrencyCode('');
                } else {
                  setsCountry(e.target.value);
                  countryDataList.map((event, i) =>
                    event?.isoNumeric == e.target.value
                      ? setSenderCurrencyCode(event?.currency?.code)
                      : null
                  );
                }
              }}
            >
              <option selected value="Select Bank">
                Select Bank
              </option>
              {countryDataList.map((e, i) => (
                <option value={e?.isoNumeric}>
                  {e?.name + ' (' + e?.isoAlpha2 + ')'}
                </option>
              ))}
            </select>
            <div className="text-danger mt-1" style={{ fontSize: '12px' }}>
              {error.sCountry}
            </div>
          </div>
          <div className="form-group mb-2">
            <label for="exampleInputPassword2">Destination Country :</label>

            <select
              id="exampleInputPassword2"
              class="form-control"
              value={dCountry}
              onChange={(e) => {
                e.preventDefault();

                if (e.target.value == 'Select Bank') {
                  setdCountry('');
                  setTransactionCurrencyCode('');
                } else {
                  setdCountry(e.target.value);
                  countryDataList.map((event, i) =>
                    event?.isoNumeric == e.target.value
                      ? setTransactionCurrencyCode(event?.currency?.code)
                      : null
                  );
                }
              }}
            >
              <option selected value="Select Bank">
                Select Bank
              </option>
              {countryDataList.map((e, i) => (
                <option value={e?.isoNumeric}>
                  {e?.name + ' (' + e?.isoAlpha2 + ')'}
                </option>
              ))}
            </select>
            <div className="text-danger mt-1" style={{ fontSize: '12px' }}>
              {error.dCountry}
            </div>
          </div>
          <div className="form-group mb-2">
            <label for="exampleInputPassword2">
              Bank Identification Number:
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword2"
              placeholder="Enter bank identification number"
              value={bin}
              onChange={(e) => {
                setBIN(e.target.value);
              }}
            />
            <div className="text-danger mt-1" style={{ fontSize: '12px' }}>
              {error.bin}
            </div>
          </div>
          <div className="form-group mb-2">
            <label for="exampleInputPassword2">Sender name:</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword2"
              placeholder="Enter name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <div className="text-danger mt-1" style={{ fontSize: '12px' }}>
              {error.name}
            </div>
          </div>
          <div className="form-group mb-2">
            <label for="exampleInputPassword2">Amount :</label>
            <input
              type="number"
              className="form-control"
              id="exampleInputPassword2"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
            <div className="text-danger mt-1" style={{ fontSize: '12px' }}>
              {error.amount}
            </div>
          </div>
          <div className="form-group mb-2">
            <label for="exampleInputPassword2">Address :</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword2"
              placeholder="Enter address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
            <div className="text-danger mt-1" style={{ fontSize: '12px' }}>
              {error.address}
            </div>
          </div>
          <div className="form-group mb-2">
            <label for="exampleInputPassword2">Card Expiry Date:</label>
            <input
              type="month"
              id="expiry"
              className="form-control"
              name="expiry"
              value={expiry}
              onChange={(e) => {
                setExpiry(e.target.value);
                //console.log(e.target.value);
              }}
            />
            <div className="text-danger mt-1" style={{ fontSize: '12px' }}>
              {error.expiry}
            </div>
          </div>
          <div className="form-group mb-2">
            <label for="exampleInputPassword2">Sender Currency Code :</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword2"
              placeholder="Enter sender currency code"
              disabled
              value={senderCurrencyCode}
              onChange={(e) => {
                setSenderCurrencyCode(e.target.value);
              }}
            />
            <div className="text-danger mt-1" style={{ fontSize: '12px' }}>
              {error.senderCurrencyCode}
            </div>
          </div>
          <div className="form-group mb-2">
            <label for="exampleInputPassword2">
              Transaction Currency Code :
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword2"
              placeholder="Enter transaction currency code"
              value={transactionCurrencyCode}
              disabled
              onChange={(e) => {
                setTransactionCurrencyCode(e.target.value);
              }}
            />
            <div className="text-danger mt-1" style={{ fontSize: '12px' }}>
              {error.transactionCurrencyCode}
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

//TEST-DATA

//4957030420210496
//4761360055652118
//US
//IN
//408999
//Acceptor 1
//100
//CA,USA
//03-2020
