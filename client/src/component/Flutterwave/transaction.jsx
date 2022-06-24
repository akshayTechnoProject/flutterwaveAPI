import React from 'react';

export default function transaction() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_API_PUBLIC_KEY}`,
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Methods': 'GET',
    },
  };
  fetch(
    'https://api.flutterwave.com/v3/banks/NG?public_key=Bearer FLWPUBK_TEST-b4b9e29ad77d0e0f23a26500a6bb9ba3-X',
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log('error', error));

  /*
  const getData = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer FLWPUBK_TEST-b4b9e29ad77d0e0f23a26500a6bb9ba3-X'
    );
    myHeaders.append('Access-Control-Allow-Origin', '*');
*/
  //myHeaders.append('Content-Type', 'application/json');
  //myHeaders.append('Content-Type', 'application/json');

  /*var raw = JSON.stringify({
      account_bank: '044',
      account_number: '0690000040',
      amount: 5500,
      narration: 'Akhlm Pstmn Trnsfr xx007',
      currency: 'NGN',
      reference: 'akhlm-pstmnpyt-rfxx007_PMCKDU_1',
      callback_url: 'https://webhook.site/d35869f4-b63d-4d3f-8a8e-12a47a2381b2',
      debit_currency: 'NGN',
    });

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      //body: '',
      //redirect: 'follow',
    };

    fetch('https://api.flutterwave.com/v3/banks/NG', requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
    */
  /*
    const myurl = 'https://api.flutterwave.com/v3/banks/NG';
    var bodyFormData = new URLSearchParams();
    //bodyFormData.append('auth_code', 'TruliPay#Wallet$&$aPp#MD');
    axios({
      method: 'GET',
      url: myurl,
      headers: myHeaders,
      redirect: 'follow',
      //data: bodyFormData,
      // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
      .then((response) => {
        console.log('...', response.data);
        if (response.data.success) {
        } else {
        }
      })
      .catch((error) => {
        console.log('Errorsss', error);
      });
  };*/
  //getData();
  return <div>transaction</div>;
}
