import React, {useState, useContext} from 'react'
import {useRouteMatch} from "react-router-dom";
import {Row, Col, Image, Button, Container, ProgressBar} from 'react-bootstrap'

import AppContext from '../context'
import NotFound from './NotFound'

function CampaignDetails(props){

    const context = useContext(AppContext)

    //filter the Array and get the product that we are displaying details for
    let CampArray = Object.values(props.campaign)

    const match = useRouteMatch()

    if(match){
        CampArray = CampArray.filter(c => {
            return String(c.id) === match.params.id
        })
    }

    let camp = CampArray[0]

    if(camp === undefined){
        return(
            <NotFound/>
        )
    }

    return(
        <Container>
            <Col md={1}>
            </Col>
            <Col md={10}>
                <Row>
                    <Image src={camp.imageUrl}></Image>
                </Row>
                <Row>
                    <h1>{camp.title}</h1>
                    <ProgressBar style={{height: '10px'}} variant="success" now={camp.percentComplete} key={1}/>
                    <div className="inline">
                        <h4><b>${camp.currentAmount}</b></h4><h6>raised of ${camp.goal} goal</h6>
                    </div>
                </Row>
                <Row>
                    <Image></Image><h5>{camp.userFirst}{camp.userLast} organized this fundraiser</h5>
                    <Image></Image><h5>{camp.campaignHearts} people liked this fundraiser</h5>
                    <Image></Image><h5>{camp.socialShareTotal} shares on social media</h5>
                    <Image></Image><h5>{camp.donators} donators with ~${camp.moneyPerDonor} per donator</h5>
                </Row>
                <Row style={{borderTop: 'solid 1px lightgray', borderBottom: 'solid 1px lightgray'}}>
                    <h5>Created on {camp.launchDate} | {camp.status}</h5>
                </Row>
                <Row>
                    <h5>{camp.description}</h5>
                </Row>
            </Col>
            <Col md={1}>
            </Col>
            
        </Container>
    )
}

export default CampaignDetails