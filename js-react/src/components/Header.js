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
        <bs.Col md={4}>
          <bs.Form inline>
            <bs.FormControl style={{float: 'right', width: '70%'}} type="text" placeholder="Search" className="m-1" />
            <bs.Button variant="outline-success">Search</bs.Button>
          </bs.Form>
        </bs.Col>
        <bs.Col md={1}>
          {/* Dropdown options? */}
        </bs.Col>
    </bs.Navbar>
  );
}