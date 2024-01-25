import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Snake Game</h1>
        </div>
        <img src="./logo.png" className="App-logo" alt="logo" />
        <div className="App-data">
          <input type="text" placeholder="Username" />
          <input type="text" placeholder="Password" />
          <input type="text" placeholder="Confirm-Password" />
        </div>
        <div>
          <button>Submit</button>
        </div>
        <a
          className="App-link"
          href="https://github.com/lcaohoanq/Java-Snake-Game"
          target="_blank"
          rel="noopener noreferrer"
        >
          Click this link
        </a>
      </header>
    </div>
  );
}

export default App;
