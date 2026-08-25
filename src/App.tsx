import { Toaster } from "@/components/ui/toast";
import { TaskPage } from "@/features/task/components/TaskPage";
import store from "@/redux/store";
import { Provider } from "react-redux";
import makeServer from "@/server/server";

makeServer();

function App() {
  return (
    <Provider store={store}>
      <TaskPage />
      <Toaster />
    </Provider>
  );
}

export default App;
