import store from "@/redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <>
      <Provider store={store}>
        <div>
          <h1>App</h1>
        </div>
      </Provider>
    </>
  );
}

export default App;
