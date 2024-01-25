import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Snake Game</h1>
      </header>
      <section id="tmp">
        <section id="App-img">
          <img src="./logo.png" className="App-logo" alt="logo" />
        </section>
        <section id="App-data">
          <div className="form-floating mb-3">
            <input
              type="username"
              className="form-control"
              id="floating"
              placeholder="Username"
            />
            <label htmlFor="floatingInput">Username</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floating"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floating"
              placeholder="Confirm-Password"
            />
            <label htmlFor="floatingCPassword">Confirm-Password</label>
          </div>
          <div class="submit-btn">
            <button type="submit">Submit</button>
          </div>
          <div class="bottom-btn">
            <p>Do not have account?</p>
            <button type="submit">Sign up here</button>
          </div>
        </section>
      </section>
      <footer>
        <a
          className="App-link"
          href="https://github.com/lcaohoanq/Java-Snake-Game"
          target="_blank"
          rel="noopener noreferrer"
        >
          Follow my Github for more, click here !
        </a>
      </footer>
    </div>
  );
}

export default App;
