import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { store } from "./redux/store/store";
import { Provider } from "react-redux";
import AppRouting from "./AppRouting";

function App() {
  return (
    <Provider store={store}>
      <AppRouting />
    </Provider>
  );
}

export default App;
