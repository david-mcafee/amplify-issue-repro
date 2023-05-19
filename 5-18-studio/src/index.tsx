import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import awsExports from "./aws-exports";
import { Amplify, DataStore } from "aws-amplify";

Amplify.configure(awsExports);

// https://docs.amplify.aws/lib/datastore/real-time/q/platform/js/#observe-query-results-in-real-time
DataStore.configure({
  // syncPageSize: 1000,
  maxRecordsToSync: 100000,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
