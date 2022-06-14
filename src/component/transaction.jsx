import React, { useEffect } from 'react';

export default function transaction() {
  const getData = () => {
    fetch('https://api.flutterwave.com/v3/transfers', {
      //mode: 'no-cors',
      method: 'GET',
      headers: {
        Authorization: 'Bearer FLWSECK_TEST-f76c049ba3f5791f1f47f734ece7d305-X',
        'Access-Control-Allow-Origin': 'https://localhost:3000',

        //'content-type': 'application/json',
        //accept: 'application/json',
      },
      //body: JSON.stringify({
      //name: this.state.name,
      //notes: this.state.notes,
      //}),
    })
      .then((response) => response.text())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    /*
        const myurl = 'https://trulipay.herokuapp.com/api/admin/login';
        var bodyFormData = new URLSearchParams();
        bodyFormData.append('auth_code', 'TruliPay#Wallet$&$aPp#MD');
        axios({
          method: 'post',
          url: myurl,
          data: bodyFormData,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
          .then((response) => {
            console.log('Errors', response.data);
            if (response.data.success) {
              //navigate(`/otp-check`, { state: email });
            } else {
              //setDisable(false);
              //toast.error('!...Your email or password is wrong');
            }
          })
          .catch((error) => {
            console.log('Errors', error);
            //toast.error('!...Something went wrong');
            //setDisable(false);
          });
        */
  };
  getData();
  return <div>transaction</div>;
}
