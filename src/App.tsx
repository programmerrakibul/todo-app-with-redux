import { Toaster } from "@/components/ui/toast";
import { TaskPage } from "@/features/task/components/TaskPage";
import store from "@/redux/store";
import makeServer from "@/server/server";
import { Provider } from "react-redux";

makeServer({ environment: "development" });

function App() {
  return (
    <Provider store={store}>
      <TaskPage />
      <Toaster />
    </Provider>
  );
}

export default App;
