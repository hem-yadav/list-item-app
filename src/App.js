import React from "react";
import { Dash } from "./screens/components";
import { Provider } from "react-redux";
import store from "./store";
import "./style/app.css";
import "./style/margin.css";
import "./style/flex.css";
import "./style/color.css";
import "./style/padding.css";
import "./style/text.css";

function App() {
  return (
    <div className="app-wrapper">
      <Provider store={store}>
        <Dash />
      </Provider>
    </div>
  );
}

export default App;
