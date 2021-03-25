import React from 'react';
import { ToastContainer } from 'react-toastify';
import Game from 'components/game/Game';
import 'react-toastify/dist/ReactToastify.css';
import 'index.css';

const App: React.FC = () => (
  <main style={{ height: '100%' }}>
    <Game />
    <ToastContainer />
  </main>
);

export default App;
