import React from "react";
import "./App.css";
import CreateItem from "./components/CreateItem";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bienvenue sur Guemiloute</h1>
        <CreateItem />
      </header>
    </div>
  );
}

export default App;
