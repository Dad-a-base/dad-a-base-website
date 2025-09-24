import './App.css';
import { Routes, Route } from 'react-router-dom';
import Board from './components/board';

function App() {

  return (
    <Routes>
      <Route path='/' element={ <Board />}/>
    </Routes>
  );
}

export default App;
