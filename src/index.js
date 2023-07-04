import { AppRegistry } from "react-native";
import App from "./App";
import name from "./app.json";
import { Provider } from "react-redux";
import configureStore from "./redux/store";
import './index.css';

const store = configureStore();

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(name, () => RNRedux);

AppRegistry.runApplication(name, {
  rootTag: document.getElementById("root"),
});
