import React from 'react';
import * as bs from 'react-bootstrap'
import { Link } from "react-router-dom";

export default function Header(props) {

return(
    <bs.Navbar expand="lg" style={{backgroundColor: 'white', borderBottom: 'solid 2px lightgray'}}>
      <bs.Col md={1}></bs.Col>
        <bs.Col md={2}>
          <bs.Navbar.Brand href="/" style={{color: 'green'}}>Go Fund Me Analytics</bs.Navbar.Brand>
        </bs.Col>
        <bs.Col md={8} block>
          <bs.Form inline>
            <bs.FormControl style={{width: '80%'}} type="text" placeholder="Search"  />
            <bs.Button variant="outline-success">Search</bs.Button>
          </bs.Form>
        </bs.Col>
        <bs.Col md={1}></bs.Col>
    </bs.Navbar>
  );
}