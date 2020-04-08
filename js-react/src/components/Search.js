import React from 'react';
// import { useContext } from 'react';
import * as bs from 'react-bootstrap';
import {CardDeck, Card, ProgressBar, Accordion, Button } from 'react-bootstrap'
import {useHistory} from "react-router-dom";
// import AppContext from '../context'
import {
  Link
} from "react-router-dom";

const progressBar = {height: '4px'}
const greenText = {color: '#32b80d', 'font-family': 'Roboto Condensed'}
const title = {'font-family': 'Roboto', 'font-size': '17px', color: '#141414'}
const desc = {'font-family': 'Roboto', 'font-size': '17px'}



export default function Search(props) {
//let match = useRouteMatch('/qualityanalysis/:searchparams/');
// const context = useContext(AppContext)
// if(context.campaigns) {

  const history = useHistory();

  function handleClick(e) {
    e.preventDefault();
    e.target.search.name = e.target.radiogroup.value
    history.push("/search/")
    history.push(`?${e.target.radiogroup.value}=${e.target.search.value}`)
  }

  return(
    <>
    <Accordion defaultActiveKey="0" className="mx-3 px-3">
      <Card>
      <bs.Form inline style={{'display': 'inline'}} onSubmit={(e) => handleClick(e)}>
          <Accordion.Toggle style={{'display': 'block'}} as={Card.Header} variant="link" eventKey="0">
              <h3 className='mt-3' style={{'display': 'inline'}}>Search Filters</h3>
              <bs.Button className='m-1' style={{float: 'right', 'display': 'inline'}} variant="outline-success" type="submit">Search</bs.Button>
              <bs.FormControl name="search" style={{float: 'right', width: '30%', 'display': 'inline'}} type="text" placeholder="Search" className="m-1" />
            
          </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
          <div>
            <input className="mx-1" type="radio" value="city" name="radiogroup"/>
            <label className="pr-3">City</label>

            <input className="mx-1" type="radio" value="state" name="radiogroup"/>
            <label className="pr-3"> State </label>

            <input className="mx-1" type="radio" value="country" name="radiogroup"/>
            <label className="pr-3"> Country </label>
            
            <input className="mx-1" type="radio" value="quality" name="radiogroup"/>
            <label className="pr-3"> Campaign Quality </label>   
            
            <input className="mx-1" type="radio" value="title" name="radiogroup"/>
            <label className="pr-3"> Campaign Title </label>
          </div>
          </Card.Body>
        </Accordion.Collapse>
        </bs.Form>
      </Card>
    </Accordion> <br></br>
      <CardDeck className="row-cols-3">
          {/* {Object.values(context.campaigns).map((camp) => { */}
          {Object.values(Campaigns).map((camp) => {
            const progress = camp.currentAmount / camp.goal * 100;
                return (
                  <bs.Col md="4" key={camp.id}>
                    <Card className="mb-3">
                      <div>
                        <Link to={`/CampaignDetails/${camp.id}`}><Card.Img variant="top" src={'https://bloximages.newyork1.vip.townnews.com/standard.net/content/tncms/assets/v3/editorial/4/77/47738102-9cab-57d3-8eef-0cdbbf1dbdeb/5b4fb6bfe21df.image.jpg?resize=1200%2C799'} alt={camp.name} /></Link>
                      </div>
                      <Card.Footer>
                          <h6 class="card-subtitle mb-2 text-muted"><strong style={greenText}>{camp.location.toUpperCase()}</strong></h6>
                          <Link to={`/CampaignDetails/${camp.id}`}><h5 class="card-subtitle mb-2"><strong style={title}>{camp.name}</strong></h5></Link>
                          <p class="card-text" style={desc}> {camp.description.substring(0, 50)}...</p>
                            <ProgressBar style={progressBar} variant='success' now={progress}/>
                            {console.log(progress)}
                          <p><strong>${camp.currentAmount} raised</strong> of ${camp.goal} </p>
                      </Card.Footer>
                      </Card>
                  </bs.Col>
                );
          })}
        </CardDeck>
    </>
    );
  // }
// else {
//   return (
//     <p>Campaigns failed to load from the API. Try refreshing the page, to reconnect to the campaigns database.</p>
//   );
// }

}
const Campaigns = {
  "0": {
      id: "867850",
      name: "Jessica's COVID-19 fund",
      description:"Anim excepteur incididunt adipisicing id cillum. Velit consequat ut dolor voluptate eiusmod esse sint tempor esse. Irure sint ea exercitation reprehenderit. Labore aliqua incididunt duis magna incididunt mollit exercitation amet cupidatat. Nostrud amet sit pariatur elit commodo. Laborum laboris aliqua non excepteur anim laborum mollit velit. Ullamco sint adipisicing nostrud reprehenderit sint.",
      currentAmount: 45,
      location: "Detroit, MI",
      goal: 500,
  },
  "1": {
      id: "477227",
      name: "Rubber Duck COVID-19 fund",
      description: "Sunt nisi irure in et ut ex labore ea non sit dolor. Laboris pariatur ea duis sint esse anim mollit anim cupidatat aliquip officia veniam minim. Amet aliquip voluptate voluptate tempor tempor eiusmod officia. Ut magna dolor mollit consequat minim. Est qui commodo fugiat ex minim do. Laborum laborum anim adipisicing voluptate cillum sunt cupidatat adipisicing reprehenderit. Non pariatur in sint do esse do ullamco sit.",
      currentAmount: 147,
      location: "Dearborne, MI",
      goal: 5000,
  },
  "2": {
      id: "946406",
      name: "Apple COVID-19 fund",
      description: "Aliquip elit amet ad deserunt. Ea elit occaecat aliquip id ipsum. Anim eu nulla nostrud culpa commodo pariatur commodo fugiat adipisicing voluptate occaecat laboris. Amet deserunt in fugiat esse eu duis. Do magna occaecat nisi commodo commodo.",
      currentAmount: 211,
      location: "Grand Rapids, MI",
      goal: 500,
  },
  "3": {
      id: "936979",
      name: "Bag COVID-19 fund",
      description: "Aliquip veniam veniam irure ipsum. In eiusmod ex reprehenderit irure incididunt esse ad voluptate amet ea culpa nisi ipsum. Commodo commodo et aliqua duis eu anim. Anim anim eu commodo ea nulla laborum.",
      currentAmount: 369,
      location: "Sault Saint Marie, MI",
      goal: 2000,
  },
}
// filename={`${process.env.PUBLIC_URL}/media/products/${pro.filename}-1.png`}