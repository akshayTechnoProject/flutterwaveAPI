import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import DoTransfer from "./component/DoTransfer";
import FApp from "./component/flutterwavePage";
import Transaction from "./component/transaction";
import FlutterAccountTransfer from "./component/FlutterAccountTransfer";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <DoTransfer /> */}
        {/* <FApp /> */}
        <FlutterAccountTransfer />
      </header>
    </div>
  );
}

export default App;
