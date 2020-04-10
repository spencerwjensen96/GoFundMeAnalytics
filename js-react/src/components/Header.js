import React from 'react';
import * as bs from 'react-bootstrap'
import {useHistory, Link} from 'react-router-dom'
// import { Link } from "react-router-dom";

export default function Header(props) {

  const history = useHistory();

function handleClick(e) {
  history.push("/search/")
  //history.push(`${e.target.value}`)
}

return(
    <bs.Navbar expand="lg" style={{backgroundColor: 'white'}}>
      <bs.Col md={1}></bs.Col>
        <bs.Col md={2}>
          <Link className="navbar-brand" to="/" style={{color: '#5cb85c'}}>Go Fund Me Analytics</Link>
        </bs.Col>
        
        <bs.Col md={5}>
          <bs.Nav className="justify-content-end" activeKey="/home">
            <bs.Nav.Item>
              <Link className="nav-link" eventkey="search" to="/search">Find a Campaign</Link>
            </bs.Nav.Item>
            <bs.Nav.Item>
              <Link className='nav-link' eventKey="predict" to="/">Predict Success</Link>
            </bs.Nav.Item>
            <bs.Nav.Item>
              <Link className='nav-link' eventKey="dashboard" to="/campaign-dashboard">My Analytics</Link>
            </bs.Nav.Item>
          </bs.Nav>
        </bs.Col>
        <bs.Col md={3}>
          <bs.Form inline onSubmit={(e) => handleClick(e)}>
            <bs.FormControl name="title" style={{float: 'right', width: '70%'}} type="text" placeholder="Search by Campaign title..." className="m-1" />
            <bs.Button variant="outline-success" type="submit">Search</bs.Button>
          </bs.Form>
        </bs.Col>
        <bs.Col md={1}>
          <bs.Nav className="justify-content-end" activeKey="/home">
            <bs.Nav.Item>
              <bs.Nav.Link eventkey="login" href="/log-in">Log In</bs.Nav.Link>
            </bs.Nav.Item>
          </bs.Nav>
        </bs.Col>
    </bs.Navbar>
  );
}