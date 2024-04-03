import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import TodoList from "./components/TodoList";
// import Todo2List from "./components/Todo2List";

import amplifyconfig from "../amplifyconfiguration.json";
Amplify.configure(amplifyconfig);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <TodoList />
    {/* <Todo2List /> */}
  </React.StrictMode>
);
