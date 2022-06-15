import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import DoTransfer from "./component/DoTransfer";
import FApp from "./component/flutterwavePage";
import Transaction from "./component/transaction";
function App() {
  const abc = process.env.REACT_APP_API_PUBLIC_KEY;
  console.log("@", abc);
  return (
    <div className="App">
      <header className="App-header">
        <DoTransfer />
        <FApp />
      </header>
    </div>
  );
}

export default App;
