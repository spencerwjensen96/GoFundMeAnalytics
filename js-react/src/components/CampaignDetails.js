import React, {useState, useContext} from 'react'
import {useRouteMatch} from "react-router-dom";
import {Row, Col, Image, Button} from 'react-bootstrap'

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
        <div className="flex">
            <h1>{camp.title}</h1>

        </div>
    )
}

export default CampaignDetails