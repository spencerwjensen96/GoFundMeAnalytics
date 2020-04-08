import React from 'react';
import { useContext } from 'react';
import * as bs from 'react-bootstrap';
import {CardDeck, Card, ProgressBar, Accordion, Button } from 'react-bootstrap'
import {useHistory} from "react-router-dom";
import AppContext from '../context'
import {
  Link
} from "react-router-dom";

const progressBar = {height: '4px'}
const greenText = {color: '#32b80d', 'font-family': 'Roboto Condensed'}
const title = {'font-family': 'Roboto', 'font-size': '17px', color: '#141414'}
const desc = {'font-family': 'Roboto', 'font-size': '17px'}



export default function Search(props) {
const context = useContext(AppContext)
const history = useHistory();

let campaigns = context.campaigns
const url = window.location.search
// console.log("campaigns: ", campaigns)
if(url) {
  let filter = url.substr(url.indexOf('?') + 1, url.indexOf('=') -1)
  let search = url.substr(url.indexOf('=') + 1)
  if(filter && search) {
    if(filter === 'state') {
      filter = 'locationState';
    }
    if(filter === 'city') {
      filter = 'locationCity';
    }
    if(filter === 'country') {
      filter = 'locationCountry';
    }
    console.log("URL: ", url, "\tSearch:", search, "\tFilter:", filter)
    //filtering done here
    campaigns = Object.values(campaigns).filter(campaign => campaign[filter].includes(search))
    console.log("filtered campaigns", campaigns)
  }
}

if(campaigns) {
  function handleClick(e) {
    e.preventDefault();
    e.target.search.name = e.target.radiogroup.value
    history.push("/search/")
    history.push(`?${e.target.radiogroup.value}=${e.target.search.value}`)
  }
  //console.log(context.campaigns)
  return(
    <>
    <Accordion defaultActiveKey="0" className="mx-3 px-3">
      <Card>
      <bs.Form style={{'display': 'inline'}} onSubmit={(e) => handleClick(e)}>
          <Accordion.Toggle style={{'display': 'block'}} as={Card.Header} variant="link" eventKey="0">
              <h3 className='mt-3' style={{'display': 'inline'}}>Search Filters</h3>
              <bs.Button className='m-1' style={{float: 'right', 'display': 'inline'}} variant="outline-success" type="submit">Search</bs.Button>
              <bs.FormControl name="search" style={{float: 'right', width: '30%', 'display': 'inline'}} type="text" placeholder="Search by..." className="m-1" />
          </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body style={{'display': 'inline', float: 'left', width: '100%'}}>
          <div className="flex-box">
          <label className="pr-3 radio-inline"><input className="mx-1" type="radio" value="city" name="radiogroup"/>
            City</label>

            <label className="pr-3"><input className="mx-1" type="radio" value="state" name="radiogroup"/>
            State </label>

            <label className="pr-3"><input className="mx-1" type="radio" value="country" name="radiogroup"/>
             Country </label>
            
             <label className="pr-3"><input className="mx-1" type="radio" value="quality" name="radiogroup"/>
             Campaign Quality </label>   
            
             <label className="pr-3"><input className="mx-1" type="radio" value="title" name="radiogroup"/>
             Campaign Title </label>
          </div>
          </Card.Body>
        </Accordion.Collapse>
        </bs.Form>
      </Card>
    </Accordion> <br></br>
      <CardDeck className="row-cols-3">
          {/* {Object.values(context.campaigns).map((camp) => { */}
          {Object.values(campaigns).map((camp) => {
                return (
                  <bs.Col md="4" key={camp.id}>
                    <Card className="mb-3">
                      <div>
                        <Link to={`/details/${camp.id}`}>
                          <Card.Img 
                            variant="top" 
                            style={{height: '200px'}}
                            src={camp.imageUrl}
                            alt={camp.title} />
                        </Link>
                      </div>
                      <Card.Footer>
                          <h6 class="card-subtitle mb-2 text-muted"><strong style={greenText}>{camp.locationCity.toUpperCase()}</strong></h6>
                          <Link to={`/details/${camp.id}`}><h5 class="card-subtitle mb-2"><strong style={title}>{camp.title}</strong></h5></Link>
                          <p class="card-text" style={desc}> {camp.description.substring(0, 50)}...</p>
                            <ProgressBar style={progressBar} variant='success' now={camp.percentComplete}/>
                            {/* {console.log(progress)} */}
                          <p><strong>${camp.currentAmount} raised</strong> of ${camp.goal} </p>
                      </Card.Footer>
                      </Card>
                  </bs.Col>
                );
          })}
        </CardDeck>
    </>
    );
  }
else {
  return (
    <p>Campaigns failed to load from the API. Try refreshing the page, to reconnect to the campaigns database.</p>
  );
}

}