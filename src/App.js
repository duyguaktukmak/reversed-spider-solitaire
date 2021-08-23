import "./App.css";
import {
  OneSuite,
  Home,
  NotFound,
} from "./components/pages";

import { BrowserRouter as Router, Switch } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <div className="app__gameplay">
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <Home path="/"></Home>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
