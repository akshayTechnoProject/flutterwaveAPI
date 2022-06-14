import './App.css';
import Flutterwave from './component/flutterwavePage';
import Transaction from './component/transaction';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Transaction />
        {/* <Flutterwave /> */}
      </header>
    </div>
  );
}

export default App;
