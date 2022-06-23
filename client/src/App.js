import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import FlutterAccountTransfer from './component/Flutterwave/FlutterAccountTransfer';
import BankTransfer from './component/Flutterwave/BankTransfer';
import VisaTransfer from './component/Visa/VisaTransfer';
import { Navigate, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import Flutterwave from './component/Flutterwave/Flutterwave';
import DoTransfer from './component/Flutterwave/DoTransfer';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" exact element={<Home />} />

          <Route path="*" exact element={<Home />} />

          <Route path="/flutterwave" exact element={<Flutterwave />} />

          <Route
            path="/flutterwave-to-flutterwave"
            exact
            element={<FlutterAccountTransfer />}
          />
          <Route path="/flutterwave-to-bank" exact element={<BankTransfer />} />

          <Route path="/bank-to-flutterwave" exact element={<DoTransfer />} />

          <Route path="/visa" exact element={<VisaTransfer />} />

          <Route path="/" element={<Navigate to="/" />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
