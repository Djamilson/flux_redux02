import dotenv from "dotenv";
import React from "react";
import "./config/ReactotronConfig";

import { Provider } from "react-redux";

import store from "./store";
import Routes from "./routes";

dotenv.config();

const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

export default App;
