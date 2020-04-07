import React, {useContext} from 'react'
import {useRouteMatch} from "react-router-dom";
import {Col, Card, ProgressBar} from 'react-bootstrap'
import {
    Link
  } from "react-router-dom";
import AppContext from '../context'

const Campaigns = {
    "0": {
        id: "867850",
        name: "Jessica's COVID-19 fund",
        description:"Anim excepteur incididunt adipisicing id cillum. Velit consequat ut dolor voluptate eiusmod esse sint tempor esse. Irure sint ea exercitation reprehenderit. Labore aliqua incididunt duis magna incididunt mollit exercitation amet cupidatat. Nostrud amet sit pariatur elit commodo. Laborum laboris aliqua non excepteur anim laborum mollit velit. Ullamco sint adipisicing nostrud reprehenderit sint.",
        donations: 45.48,
        location: "Detroit, MI",
    },
    "1": {
        id: "477227",
        name: "Rubber Duck COVID-19 fund",
        description: "Sunt nisi irure in et ut ex labore ea non sit dolor. Laboris pariatur ea duis sint esse anim mollit anim cupidatat aliquip officia veniam minim. Amet aliquip voluptate voluptate tempor tempor eiusmod officia. Ut magna dolor mollit consequat minim. Est qui commodo fugiat ex minim do. Laborum laborum anim adipisicing voluptate cillum sunt cupidatat adipisicing reprehenderit. Non pariatur in sint do esse do ullamco sit.",
        donations: 147.02,
        location: "Dearborne, MI",
    },
    "2": {
        id: "946406",
        name: "Apple COVID-19 fund",
        description: "Aliquip elit amet ad deserunt. Ea elit occaecat aliquip id ipsum. Anim eu nulla nostrud culpa commodo pariatur commodo fugiat adipisicing voluptate occaecat laboris. Amet deserunt in fugiat esse eu duis. Do magna occaecat nisi commodo commodo.",
        dontaions: 211.14,
        location: "Grand Rapids, MI",
    },
    "3": {
        id: "936979",
        name: "Bag COVID-19 fund",
        description: "Aliquip veniam veniam irure ipsum. In eiusmod ex reprehenderit irure incididunt esse ad voluptate amet ea culpa nisi ipsum. Commodo commodo et aliqua duis eu anim. Anim anim eu commodo ea nulla laborum.",
        donations: 368.72,
        location: "Sault Saint Marie, MI",
    },
}

function CampaignCard(){
    let C = Object.values(Campaigns)
    const context = useContext(AppContext)
    let cardID = useRouteMatch('/home/:id')
    
    return C //CHANGE THIS the name might be different
    .filter(val => {
        if (cardID) {
            return val.id == cardID; //THIS might need to change
        } else {
            return true;
        }
    })
    .map(p => {
        return (
            <Col className="md-4" key={p.id}> 
             <Card>
               <div>
                 <Link to={`/CampaignDetails/${p.id}`} className="btn btn-dark position-absolute top-right">Details</Link>
                 <Card.Img variant="top" src={'https://c7.alamy.com/comp/B65FX8/woman-holding-baby-man-standing-behind-smiling-B65FX8.jpg'} alt={p.name} />
               </div>
               <Card.Footer>
                 <h6 class="card-subtitle mb-2 text-muted">{p.location}</h6>
                 <p>{p.name}</p>
                 <p class="card-text"> {p.description.substring(0, 60)}...</p>
                 <ProgressBar>
                    <ProgressBar variant='success' now={p.percentComplete} key={1}/>
                    <ProgressBar striped variant='success' now={100 - p.percentComplete} key={1}/>
                </ProgressBar>
                 <p>${p.donations}</p>
               </Card.Footer>
             </Card>
           </Col>
         );
    })
}

export default CampaignCard

