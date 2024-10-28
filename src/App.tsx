import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AppRes from "./App.res";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <AppRes />
      </header>
    </div>
  );
}

export default App;
