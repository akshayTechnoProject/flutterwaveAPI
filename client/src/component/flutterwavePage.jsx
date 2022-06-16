import React, { useEffect } from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import axios from 'axios';
export default function FApp() {
  const config = {
    public_key: 'FLWPUBK_TEST-d49c3523fcc5e74b751c102027d18ba4-X',
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
  useEffect(() => {
    let URL = 'https://api.flutterwave.com/v3/transactions';
    const AuthString = 'Bearer '.concat(
      'FLWPUBK_TEST-d49c3523fcc5e74b751c102027d18ba4-X'
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
    <div className="App m-5">
      {/* <h1>Hello Test user</h1> */}

      {/* <button
        onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
              console.log(response);
              closePaymentModal(); // this will close the modal programmatically
            },
            onClose: () => {},
          });
        }}
      >
        Payment with React hooks
      </button> */}
    </div>
  );
}
