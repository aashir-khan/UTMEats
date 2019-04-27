/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { AppRegistry } from "react-native";
import App from "./src/App";
import { name as appName } from "./app.json";

import { Provider } from "react-redux";
import React from "react";

import { createStore, compose } from "redux";
import reducers from "./src/reducers";

// to make Redux Debugging possible
const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
);
const store = createStore(reducers, enhancers);

const AppContainer = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => AppContainer);
