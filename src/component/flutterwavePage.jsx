import React from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

export default function App() {
  console.log('b', window.env?.API_PUBLIC_KEY);
  const config = {
    public_key: 'FLWPUBK_TEST-b4b9e29ad77d0e0f23a26500a6bb9ba3-X',
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
