import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./Components/Loader";
import Viewport from "./Components/Viewport";
import Nav from "./Components/Nav";
import ErrorBoundary from "./Components/ErrorBoundary";
// import { AmplifyProvider } from "@aws-amplify/ui-react";
// import "@aws-amplify/ui-react/styles.css";
// import { theme } from "./theme";

const TodoComponent = React.lazy(() => import("./Components/Todo"));
// const Chatbot = React.lazy(() => import("./Components/Chatbot"));
const BelongsTo = React.lazy(() => import("./Components/BelongsTo"));

const App = () => {
  return (
    <Router>
      <div>
        <Nav />
        {/* <Divider orientation="horizontal" /> */}
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Viewport>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <React.Suspense fallback={<Loader />}>
                  <ErrorBoundary>
                    <TodoComponent />
                  </ErrorBoundary>
                </React.Suspense>
              }
            />
            <Route
              exact
              path="/belongs-to"
              element={
                <React.Suspense fallback={<Loader />}>
                  <ErrorBoundary>
                    <BelongsTo />
                  </ErrorBoundary>
                </React.Suspense>
              }
            />
          </Routes>
        </Viewport>
      </div>
    </Router>
  );
};

export default App;
