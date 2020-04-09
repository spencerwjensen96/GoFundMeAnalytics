import React, { PureComponent } from 'react';
import { Link } from "react-router-dom";
import {Container, Col, Row } from 'react-bootstrap';

const data = 
{
    "0":{"donation_id":64536,"campaign_id":"17602","collected_date":"3/16/2020","amount":"100","is_offline":false,"is_anonymous":"True","name":"Anonymous","created_at":"2011-04-27T22:17:31-05:00","profile_url":null,"verified":true},
    "1":{"donation_id":64769,"campaign_id":"17602","collected_date":"3/16/2020","amount":"100","is_offline":false,"is_anonymous":"False","name":"Janeth Amarely Aguilar","created_at":"2011-04-28T15:51:24-05:00","profile_url":null,"verified":true},
    "2":{"donation_id":64799,"campaign_id":"17602","collected_date":"3/16/2020","amount":"100","is_offline":false,"is_anonymous":"False","name":"Samir Dalal","created_at":"2011-04-28T17:28:51-05:00","profile_url":"https://graph.facebook.com/v3.0/1071960196/picture","verified":true},
    "3":{"donation_id":64815,"campaign_id":"17602","collected_date":"3/16/2020","amount":"50","is_offline":false,"is_anonymous":"False","name":"Veronica Reynoso","created_at":"2011-04-28T18:14:51-05:00","profile_url":"https://graph.facebook.com/v3.0/100001903972189/picture","verified":true},
    "4":{"donation_id":64584,"campaign_id":"17602","collected_date":"3/16/2020","amount":"50","is_offline":false,"is_anonymous":"False","name":"Melvin Principe","created_at":"2011-04-28T03:40:25-05:00","profile_url":null,"verified":true},
    "5":{"donation_id":64813,"campaign_id":"17602","collected_date":"3/16/2020","amount":"30","is_offline":false,"is_anonymous":"False","name":"oswaldo","created_at":"2011-04-28T18:12:14-05:00","profile_url":null,"verified":true},
    "6":{"donation_id":65076,"campaign_id":"17602","collected_date":"3/16/2020","amount":"25","is_offline":false,"is_anonymous":"True","name":"Anonymous","created_at":"2011-04-29T14:20:53-05:00","profile_url":null,"verified":true},
    "7":{"donation_id":64548,"campaign_id":"17602","collected_date":"3/16/2020","amount":"20","is_offline":false,"is_anonymous":"False","name":"Anonymous","created_at":"2011-04-27T23:01:42-05:00","profile_url":null,"verified":true},
    "8":{"donation_id":64819,"campaign_id":"17602","collected_date":"3/16/2020","amount":"20","is_offline":false,"is_anonymous":"True","name":"Anonymous","created_at":"2011-04-28T18:24:52-05:00","profile_url":null,"verified":true},
    "9":{"donation_id":64587,"campaign_id":"17602","collected_date":"3/16/2020","amount":"10","is_offline":false,"is_anonymous":"False","name":"Friend","created_at":"2011-04-28T04:22:06-05:00","profile_url":null,"verified":true},
    "10": { "donation_id":64540,"campaign_id":"17602","collected_date":"3/16/2020", "amount":"10","is_offline":false, "is_anonymous":"False", "name":"Anonymous","created_at":"2011-04-27T22:27:26-05:00","profile_url":null,"verified":true},
}

export default class Example extends PureComponent {
render() {
    return (
        <Container>
            <div style={{textAlign: 'center'}} className="pb-2">
                <h1><b>My Donor Analytics Dashboard</b></h1>
                <p><Link style={{color: 'black'}} eventKey="dashboard" to="/campaign-dashboard">Campaign Dashboard</Link> | <Link style={{color: 'black'}} eventKey="dashboard" to="/donor-dashboard">Donor Dashboard</Link></p>
            </div>
            {Object.values(data).map((d) => {
                return(
                    <Row>
                    <Col style={{backgroundColor: '#EBEBEB', borderRadius: '7px'}} className="pb-2 mb-2">
                        <img src={d.profile_url ? d.profile_url : "https://rosieshouse.org/wp-content/uploads/2016/06/avatar-large-square.jpg"} className="pt-2" style={{width: '65px', height: '70px', borderRadius:'50%'}}></img>
                        <p style={{display: 'inline'}} className="pl-3 pt-2">Name: {d.name.toUpperCase()}</p>
                        <p style={{display: 'inline'}} className="pl-5 pt-2">Donation Total: </p>
                        <i style={{'color': 'green'}} class="fas fa-dollar-sign pl-1 pt-3"></i>
                        <p style={{display: 'inline', 'color': 'green'}} className="pt-3"> {d.amount}</p>
                        <p style={{display: 'inline'}} className="pl-5 pt-2">Donation Date: {d.collected_date}</p>
                        <a href="mailto:"><i style={{color: '#00568C'}} class="fas fa-envelope fa-3x float-right pt-3 pr-5"></i></a>
                    </Col>
                </Row>
                )
            })}
        </Container>
    
    )}
}