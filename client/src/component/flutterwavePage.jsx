import React, { useEffect } from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import axios from 'axios';
export default function FApp() {
  console.log('b', window.env?.API_PUBLIC_KEY);
  const config = {
    public_key: 'FLWPUBK_TEST-d77c0ba4c8c6b947731cb2dfd955afb3-X',
    tx_ref: Date.now(),
    amount: 150,
    currency: 'GHS',
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
  useEffect(() => {
    let URL = 'https://api.flutterwave.com/v3/transactions';
    const AuthString = 'Bearer '.concat(
      'FLWPUBK_TEST-b4b9e29ad77d0e0f23a26500a6bb9ba3-X'
    );
    axios
      .get(URL, { headers: { Authorization: AuthString } })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log('error ' + error);
      });
  }, []);

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <div className="App">
      <h1>Hello Test user</h1>

      <button
        onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
              console.log(response);
              closePaymentModal(); // this will close the modal programmatically
              if (response?.status == 'successful') {
                window.alert(
                  `Your transaction id is: ${response?.transaction_id}`
                );
              }
            },
            onClose: () => {},
          });
        }}
      >
        Payment with React hooks
      </button>
      <button>btn</button>
    </div>
  );
}
