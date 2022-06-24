import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Flutterwave() {
  const navigate = useNavigate();
  return (
    <div>
      <h3>
        <i
          className="fa fa-arrow-left"
          style={{
            color: 'white',
            cursor: 'pointer',
            fontSize: '20px',
          }}
        ></i>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          onClick={() => navigate('/')}
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
        Choose transaction type
      </h3>
      <Link to={`/flutterwave-to-bank`} className="link">
        <button type="submit" className="btn btn-info m-3 w-50">
          Flutterwave to Bank Transfer
        </button>
      </Link>
      <Link to={`/flutterwave-to-flutterwave`} className="link">
        <button type="submit" className="btn btn-info m-3 w-50">
          Flutterwave to Flutterwave
        </button>
      </Link>
      <Link to={`/bank-to-flutterwave`} className="link">
        <button type="submit" className="btn btn-info m-3 w-50">
          Bank to Flutterwave
        </button>
      </Link>
    </div>
  );
}
