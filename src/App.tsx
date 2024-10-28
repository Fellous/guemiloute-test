import React from "react";
import "./App.css";
import CreateItem from "./components/CreateItem";
import ItemList from "./components/ItemList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bienvenue sur Guemiloute</h1>
        <CreateItem />
        <ItemList />
      </header>
    </div>
  );  
}

export default App;
