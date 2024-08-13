import React from "react";
import "./App.css";
import { FullscreenElement } from "./components/MovieList/ui/FullscreenElement";
import Map from "./components/MovieList/ui/Map";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FullscreenElement />
        <Map />
      </header>
    </div>
  );
}

export default App;
