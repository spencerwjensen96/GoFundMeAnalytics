import React, {useState, useContext} from 'react'
//import {useRouteMatch} from "react-router-dom";
import {Row, Col, Image, Button, Container, ProgressBar} from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import AppContext from '../context'
import NotFound from './NotFound'

const card = {background: '#F0F0F0', borderRadius: '8px', marginTop: '2rem', boxShadow: '-2px 2px 5px #9E9E9E'}

function CampaignDetails(props){

    const context = useContext(AppContext)

    //filter the Array and get the product that we are displaying details for
    let CampArray = Object.values(context.campaigns)
    let {id} = useParams()

    const camp = CampArray.find(x => x.id == id)
    console.log(camp)

    if(camp === undefined){
        return(
            <NotFound/>
        )
    }

    const date = new Date(camp.launchDate);
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    console.log(date)
    const title = {'font-family': 'Roboto', color: '#141414'}
    
    return(
        <Container>
            <h2 className="text-center" style={title}><strong>{camp.title}</strong></h2>
            <Row xs={12} style={{height: '500px', textAlign: 'center', background: 'black', borderRadius: '5px'}} className="d-flex justify-content-center mb-3">
                <Image height="500px" src={camp.imageUrl} ></Image>
            </Row>

            <Row>
                <Col xs={6}>
                    <Row className="p-1 mb-3">
                        <i className="fas fa-user-circle fa-lg"></i>
                        <h5 style={{lineHeight: '10%'}} className="mt-2 ml-4">{camp.userFirst} {camp.userLast} organized this fundraiser</h5>
                        </Row>
                    <Row className="p-1 mb-3">
                        <i style={{color: 'pink'}} class="fas fa-heart fa-lg"></i>
                        <h5 style={{lineHeight: '10%'}} className="mt-2 ml-4">{camp.campaignHearts} people liked this fundraiser</h5>
                        </Row>
                    <Row className="p-1 mb-2">
                        <i style={{color: 'gold'}} class="fas fa-photo-video fa-lg"></i>
                        <h5 style={{lineHeight: '10%'}} className="mt-2 ml-3">{camp.socialShareTotal} shares on social media</h5>
                        </Row>
                    <Row className="p-1 mb-2">
                        <i style={{color: 'green'}} class="fas fa-dollar-sign fa-lg"></i>
                        <h5 style={{lineHeight: '10%'}} className="mt-2 ml-4">{camp.donators} donators with ~${parseFloat(camp.moneyPerDonor).toFixed(2)} per donator</h5>
                    </Row>
                </Col>
                <Col xs={6}>
                    <div style={card} className="p-2">
                        <div className="inline p-2">
                            <h4 style={{display: 'inline'}}><b>${camp.currentAmount}</b></h4><p style={{display: 'inline'}}> raised of ${camp.goal} goal</p>
                        </div>
                        <ProgressBar style={{height: '10px'}} variant="success" now={camp.percentComplete} key={1}/>
                        <p className="showing"><i className="fas fa-info-circle"></i> Quality Score: {camp.quality}</p>
                    </div>
                    <p className="notshowing">Quality Score Determination:</p>
                </Col>
            </Row>
            <Row>
                <h5 className="p-3">{camp.description}</h5>
            </Row>
            <Row className="p-3" style={{borderTop: 'solid 1px lightgray', borderBottom: 'solid 1px lightgray', contentAlign: 'center'}}>
                <h5>Created on {month[date.getMonth()]} {date.getUTCDay()}, {date.getUTCFullYear()} | status: {camp.status ? "active" : "not active"}</h5>
            </Row>
        </Container>
        
    )
}

export default CampaignDetails