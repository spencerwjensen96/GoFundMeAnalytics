import React from 'react';
import * as bs from 'react-bootstrap'
// import { Link } from "react-router-dom";

export default function Header(props) {

return(
    <bs.Navbar expand="lg" style={{backgroundColor: 'white'}}>
      <bs.Col md={1}></bs.Col>
        <bs.Col md={6}>
          <bs.Navbar.Brand href="/" style={{color: '#5cb85c'}}>Go Fund Me Analytics</bs.Navbar.Brand>
        </bs.Col>
        
        <bs.Col md={2}>
          <bs.Nav className="justify-content-end" activeKey="/home">
            <bs.Nav.Item>
              <bs.Nav.Link href="/search">Search</bs.Nav.Link>
            </bs.Nav.Item>
            <bs.Nav.Item>
              <bs.Nav.Link eventKey="predict" href="/">Predict</bs.Nav.Link>
            </bs.Nav.Item>
            <bs.Nav.Item>
              <bs.Nav.Link eventKey="dashboard" href="/campaign-dashboard">MyAnalytics</bs.Nav.Link>
            </bs.Nav.Item>
          </bs.Nav>
        </bs.Col>
        <bs.Col md={3}>
          <bs.Form inline>
            <bs.FormControl style={{float: 'right', width: '70%'}} type="text" placeholder="Search" className="m-1" />
            <bs.Button variant="outline-success">Search</bs.Button>
          </bs.Form>
        </bs.Col>
    </bs.Navbar>
  );
}