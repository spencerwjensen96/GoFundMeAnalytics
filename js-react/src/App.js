import React from 'react';
import './App.css';
import * as bs from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//custom component imports
import Header from './components/Header.js';
import LeftSide from './components/LeftSide.js';
import Home from './components/Home.js';
import Footer from './components/Footer.js';

function App() {
  return (
    <Router>
      <bs.Container fluid className="p-0 min-vh-100 d-flex flex-column">
        <bs.Row noGutters className="flex-grow-0 flex-shrink-0 shadow-lg">
          <bs.Col md={12} style={{ backgroundColor: "white"/*#282C35 -light black "#121C1C" -dark black "#C15703" -orangey */}}>
            <Header />
          </bs.Col>
        </bs.Row>
        <bs.Row noGutters className="flex-grow-1 shadow-sm">
          <bs.Col md={2} className="px-3 py-4" style={{ backgroundColor: "gray"}}> 
            <LeftSide />
          </bs.Col>
          <bs.Col md={8} className="px-3 py-4" style={{ position: "relative", backgroundColor: "white"}}>
            {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
              <Switch>
                <Route path="/home">
                  <Home />
                </Route>
                <Route path="/">
                  <Home/>
                </Route>
              </Switch>
          </bs.Col>
        </bs.Row>
        <bs.Row noGutters className="flex-grow-0 flex-shrink-0 shadow-lg">
          <bs.Col md={12} style={{ backgroundColor: "gray"}}>
            <Footer />
          </bs.Col>
        </bs.Row>
      </bs.Container>
    </Router>
  );
}

export default App;
