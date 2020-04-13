import React from 'react';
import Game from './components/game/Game';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const App = () => {
  return (
    <div class="container-view">
      <Game />
      <ToastContainer />
    </div>
  );
}

export default App;
