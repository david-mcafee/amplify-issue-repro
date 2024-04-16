import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
// import TodoList from "./components/TodoList";
// import Todo2List from "./components/Todo2List";
import Todo3List from "./components/Todo3List";
// import CustomerList from "./components/CustomerList";
// import Customer2List from "./components/Customer2List";
// import Customer4List from "./components/Customer4List";

import amplifyconfig from "../amplifyconfiguration.json";
Amplify.configure(amplifyconfig);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    {/* <TodoList /> */}
    {/* <Todo2List /> */}
    <Todo3List />
    {/* <CustomerList /> */}
    {/* <Customer2List /> */}
    {/* <Customer4List /> */}
  </React.StrictMode>
);
