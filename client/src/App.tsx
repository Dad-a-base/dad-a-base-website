import { useState } from 'react';
import './App.css';
import JokeDemo from './JokesDemo';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Team Snorlax</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">We will decide on one :)</p>
      <JokeDemo />
    </>
  );
}

export default App;
