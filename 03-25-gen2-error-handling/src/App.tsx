import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import TodoList from "./components/TodoList";

function App() {
  return (
    <>
      <h1>Hello, Amplify 👋</h1>
      <TodoList />
    </>
  );
}

const AppWithAuthenticator = withAuthenticator(App);

export default AppWithAuthenticator;
