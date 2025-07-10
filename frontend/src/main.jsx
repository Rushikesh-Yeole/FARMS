import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { HashRouter } from "react-router-dom"; // Import HashRouter

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <HashRouter>  Wrap your App with HashRouter */}
      <Provider store={store}>
        <App />
      </Provider>
    {/* </HashRouter> */}
  </StrictMode>
);
