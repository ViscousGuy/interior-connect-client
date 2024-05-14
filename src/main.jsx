import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes.jsx";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
