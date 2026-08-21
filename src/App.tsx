import { Provider } from "react-redux";
import store from "@/redux/store";
import { TaskPage } from "@/features/task/components/TaskPage";

function App() {
  return (
    <Provider store={store}>
      <TaskPage />
    </Provider>
  );
}

export default App;
