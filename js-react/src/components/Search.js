import React, { useContext, useState }from 'react';
import * as bs from 'react-bootstrap';
import {CardDeck, Card, ProgressBar, Accordion, Button, DropdownButton, Dropdown, FormControl } from 'react-bootstrap'
import {useHistory, Link} from "react-router-dom";
import AppContext from '../context';
import stateObject from './States.json';

const stateObjects = stateObject;
const progressBar = {height: '4px'}
const greenText = {color: '#32b80d', 'fontFamily': 'Roboto Condensed'}
const title = {'fontFamily': 'Roboto', 'fontSize': '17px', color: '#141414'}
const desc = {'fontFamily': 'Roboto', 'fontSize': '17px'}

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    &#x25bc;
  </a>
));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Filter States..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value),
          )}
        </ul>
      </div>
    );
  },
);


export default function Search(props) {
const context = useContext(AppContext)
const history = useHistory();
let [limit, setLimit] = useState(30)
let [displayVar, setDisplayVar] = useState('block')
let [displayDropdown, setDisplayDropdown] = useState('none')
let [stateDropdown, setStateDropdown] = useState('none')

let campaigns = Object.values(context.campaigns)

for(let camp of campaigns) {
  if(camp.quality < 0.31) {
    camp.qualityText = 'Poor'
  }
  else if (camp.quality <= 0.35) {
    camp.qualityText = 'Fair'
  }
  else if (camp.quality <= 0.51) {
    camp.qualityText = 'Good'
  }
  else if (camp.quality <= 0.67) {
    camp.qualityText = 'Great'
  }
  else {
    camp.qualityText = 'Excellent'
  }
}

const url = window.location.search
if(url) {
  let filter = url.substr(url.indexOf('?') + 1, url.indexOf('=') -1)
  let search = url.substr(url.indexOf('=') + 1)
  if(filter && search) {
    //filtering done here
    if(search.includes('%20')) {
      search = search.replace(/%20/gi, ' ')
    }
    if(search.match(new RegExp('United States', 'i'))) {
      search = 'us'
    }
    if(search.match(new RegExp('Canada', 'i'))) {
      search = 'ca'
    }
    if(search.match(new RegExp('Great Britain', 'i')) || search.match(new RegExp('England', 'i'))) {
      search = 'gb'
    }
    // console.log("filter: ", filter, "search: ", search)
    campaigns = campaigns.filter(campaign => campaign[filter].match(new RegExp(search, "i")))
    //sort the campaigns if filtering on quality
    if(filter === 'qualityText') {
      campaigns = campaigns.sort((camp, camp2) => camp['quality'] > camp2['quality'])
    }
  }
}

if(campaigns) {
  function handleClick(e) {
    if(e) {
      e.preventDefault();
      history.push("/search/")
      history.push(`?${e.target.radiogroup.value}=${e.target.search.value}`)
    }

    setLimit(30)
    if(campaigns.length < limit) {
      setDisplayVar('none');
    }
    else {
     setDisplayVar('block')
    }
  }
  return(
    <>
    <div style={{textAlign: 'center'}}>
      <h1>Go Fund Me Campaigns</h1>
    </div>
    <Accordion defaultActiveKey="0" className="mx-3 px-3">
      <Card>
      <bs.Form style={{'display': 'inline'}} onSubmit={(e) => handleClick(e)}>
          <Accordion.Toggle style={{'display': 'block'}} as={Card.Header} variant="link" eventKey="0">
              <h3 className='mt-3' style={{'display': 'inline'}}>Search Filters</h3>
              <bs.Button className='m-1' style={{float: 'right', 'display': 'inline'}} variant="outline-success" type="submit">Search</bs.Button>
              <bs.FormControl name="search" id="search" style={{float: 'right', width: '30%', 'display': 'inline'}} type="text" placeholder="Search by..." className="m-1" />
          </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body style={{'display': 'inline', float: 'left', width: '100%'}}>
          <div className="flex-box">
          <label className="pr-3 radio-inline" onClick={() => {
              setDisplayDropdown('none')
              setStateDropdown('none')}}><input className="mx-1" type="radio" value="locationCity" name="radiogroup"/>
            City</label>

            <label className="pr-3" onClick={() => {
              setDisplayDropdown('none')
              setStateDropdown('inline')}}><input className="mx-1" type="radio" value="locationState" name="radiogroup"/>
            State </label>

            <label className="pr-3" onClick={() => {
              setDisplayDropdown('none')
              setStateDropdown('none')}}><input className="mx-1" type="radio" value="locationCountry" name="radiogroup"/>
             Country </label>
            
             <label className="pr-3" onClick={() => {
              setDisplayDropdown('none')
              setStateDropdown('none')}}><input className="mx-1" type="radio" value="title" name="radiogroup"/>
             Campaign Title </label>

             <label className="pr-3" onClick={() => {
              setDisplayDropdown('none')
              setStateDropdown('none')}}><input className="mx-1" type="radio" value="description" name="radiogroup"/>
             Campaign Description </label>
            
             <label className="pr-3" onClick={() => {
              setDisplayDropdown('inline')
              setStateDropdown('none')}}><input className="mx-1" type="radio" value="qualityText" name="radiogroup"/>
             Campaign Quality </label>
             <DropdownButton id="dropdown-basic-button" key='left' title="Campaign Quality" variant='outline-success' style={{display: displayDropdown}}>
              <Dropdown.Item onClick={() => {
                document.getElementById('search').value = 'Poor';
                handleClick();
              }}>Poor</Dropdown.Item>
              <Dropdown.Item onClick={() => {
                document.getElementById('search').value = 'Fair';
                handleClick();
              }}>Fair</Dropdown.Item>
              <Dropdown.Item onClick={() => {
                document.getElementById('search').value = 'Good';
                handleClick();
              }}>Good</Dropdown.Item>
              <Dropdown.Item onClick={() => {
                document.getElementById('search').value = 'Great';
                handleClick();
              }}>Great</Dropdown.Item>
              <Dropdown.Item onClick={() => {
                document.getElementById('search').value = 'Excellent';
                handleClick();
              }}>Excellent</Dropdown.Item>
            </DropdownButton>
            <Dropdown style={{display: stateDropdown }}>
              <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                Filter State
              </Dropdown.Toggle>

              <Dropdown.Menu as={CustomMenu}>
                {Object.keys(stateObjects).map((abbrev) => {
                  return(
                    <Dropdown.Item eventKey="1" key={abbrev} onClick={() => {
                      document.getElementById('search').value = abbrev;
                      handleClick();
                    }}>{abbrev}</Dropdown.Item>
                );})}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div style={{display: displayDropdown}}><br/><br/><br/><br/><br/><br/><br/></div>
          <div style={{display: stateDropdown}}><br/><br/><br/><br/><br/><br/><br/></div>
          </Card.Body>
        </Accordion.Collapse>
        </bs.Form>
      </Card>
    </Accordion> <br></br>
      <CardDeck className="row-cols-3">
          {campaigns.slice(0,limit).map((camp) => {
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
                          <h6 className="card-subtitle mb-2 text-muted"><strong style={greenText}>{camp.locationCity.toUpperCase()}</strong></h6>
                          <Link to={`/details/${camp.id}`}><h5 className="card-subtitle mb-2"><strong style={title}>{camp.title}</strong></h5></Link>
                          <p className="card-text" style={desc}> {camp.description.substring(0, 50)}...</p>
                            <ProgressBar style={progressBar} variant='success' now={camp.percentComplete}/>
                            {/* {console.log(progress)} */}
                          <p><strong>${camp.currentAmount} raised</strong> of ${camp.goal} </p>
                      </Card.Footer>
                      </Card>
                  </bs.Col>
                );
          })}
        </CardDeck>
        <Button onClick={() => {
          setLimit(limit = limit + 15)
          if(campaigns.length < limit) {
             setDisplayVar('none');
          }
        }} variant='success'
        style={{ display: `${displayVar}`, margin: 'auto' }}
        >Load More</Button>
    </>
    );
  }
else {
  return (
    <p>Campaigns failed to load from the API. Try refreshing the page, to reconnect to the campaigns database.</p>
  );
}

}