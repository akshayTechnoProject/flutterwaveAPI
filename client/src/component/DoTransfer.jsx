import React, { useState } from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

export default function DoTransfer() {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState();

  const config = {
    public_key: process.env.REACT_APP_API_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: 100,
    currency: 'NGN',
    //payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'user@gmail.com',
      phonenumber: '08102909304',
      name: 'yemi desola',
    },
    customizations: {
      title: 'my Payment Title',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };
  function validate() {
    let isValide = true;
    if (email?.trim?.length == 0) {
      isValide = false;
    }
    if (userName?.trim?.length == 0) {
      isValide = false;
    }
    if (phoneNumber?.trim?.length == 0) {
      isValide = false;
    }
    if (amount <= 0) {
      isValide = false;
    }
    return isValide;
  }
  const handleFlutterPayment = useFlutterwave(config);

  return (
    <>
      <h2>Transfer a money with flutterwave</h2>
      <div className="transferForm w-50 p-5 ">
        <form className="">
          <div className="form-group mb-3">
            <label for="exampleInputEmail1" className="ml-0">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label for="exampleInputPassword1">User Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter username"
              required
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label for="exampleInputPassword1">Phone Number</label>
            <input
              type="number"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter phonenumber"
              required
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label for="exampleInputPassword1">Amount</label>
            <input
              type="number"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter amount"
              required
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary mt-3"
            onClick={() => {
              if (validate()) {
                handleFlutterPayment({
                  callback: (response) => {
                    console.log(response);
                    closePaymentModal(); // this will close the modal programmatically
                  },
                  onClose: () => {},
                });
              }
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
