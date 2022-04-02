import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Notes from './pages/Notes'
import Create from './pages/Create'
import Ex01 from './pages/Ex01'
import Ex02 from './pages/ex02/Ex02'
import Chart01 from './pages/Chart01'
import Shipment from './pages/Shipment'
import Table01 from './pages/Table01'
import Table02 from './pages/Table02'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><Notes /></Route>
        <Route path="/create"><Create /></Route>
        <Route path="/ex01"><Ex01 /></Route>
        <Route path="/ex02"><Ex02 /></Route>
        <Route path="/chart01"><Chart01 /></Route>
        <Route path="/ship"><Shipment /></Route>
        <Route path="/table01"><Table01 /></Route>
        <Route path="/table02"><Table02 /></Route>
      </Switch>
    </Router>
  );
}

export default App;
