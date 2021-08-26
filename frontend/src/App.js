import "./styles.css";

import { Login, Register } from "./Components/Login";
import { Home } from "./Components/Home"
import { Main } from "./Components/Main"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

export default function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/SignUp" component={Register}/>
          <Route path="/SignIn" component={Login} />
          <Route path="/home" component={Home}/>
          <Route path="/" component={Main}></Route>
        </Switch>
      </Router>
    </div>
  );
}