import React from 'react';
import './App.css';
import NavBar from './app/components/NavBar';
import InputForm from './app/utilities/InputForm';

function App() {
  return (
    <div className="App_main_container">
      <NavBar/>
      <InputForm/>
    </div>
  );
}

export default App;
