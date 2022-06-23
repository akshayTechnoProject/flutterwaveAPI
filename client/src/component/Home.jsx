import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h2 className="mb-5">Test Data Transaction</h2>
      <Link to={`/flutterwave`} className="link">
        <button type="submit" className="btn btn-info mb-4 w-100">
          Flutterwave
        </button>
      </Link>
      <br />
      <Link to={`/visa`} className="link">
        <button type="submit" className="btn btn-info mb-4 w-100">
          Visa
        </button>
      </Link>
    </div>
  );
}
