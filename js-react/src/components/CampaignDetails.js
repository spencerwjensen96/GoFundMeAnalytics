import React, {useContext} from 'react'
import {Row, Col, Image, Container, ProgressBar, Tooltip, OverlayTrigger} from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import AppContext from '../context'
import NotFound from './NotFound'

const card = {background: '#F0F0F0', borderRadius: '8px', marginTop: '2rem', boxShadow: '-2px 2px 5px #9E9E9E'}

function renderTooltip(props) {
    return (
      <Tooltip id="tooltip" {...props}>
          <div style={{textAlign: 'left'}}>

            The Quality Score was determined by several metrics including:
            <br></br>
            <span>&bull;Progress to goal per day</span>
            <br></br>
            <span>&bull;Number of donors</span>
            <br></br>
            <span>&bull;Shares on social media</span>
            <br></br>
            <span>&bull;Campaign hearts</span>
            
        </div>
      </Tooltip>
    );
  }

function CampaignDetails(props){

    const context = useContext(AppContext)

    //filter the Array and get the product that we are displaying details for
    let CampArray = Object.values(context.campaigns)
    let {id} = useParams()

    const camp = CampArray.find(x => x.id == id)

    if(camp === undefined){
        return(
            <NotFound/>
        )
    }

    const date = new Date(camp.launchDate);
    var month = [];
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
    const title = {'fontFamily': 'Roboto', color: '#141414'}
    
    return(
        <Container>
            <h2 className="text-center" style={title}><strong>{camp.title}</strong></h2>
            <Row xs={12} style={{height: '500px', textAlign: 'center', background: 'black', borderRadius: '5px'}} className="d-flex justify-content-center mb-3">
                <Image style={{ maxHeight: '500px' }} src={camp.imageUrl} alt="campaign photo" ></Image>
            </Row>

            <Row>
                <Col xs={6}>
                    <Row className="p-1 mb-3">
                        <i className="fas fa-user-circle fa-lg"></i>
                        <h5 style={{lineHeight: '10%'}} className="mt-2 ml-4">{camp.userFirst} {camp.userLast} organized this fundraiser</h5>
                        </Row>
                    <Row className="p-1 mb-3">
                        <i style={{color: 'pink'}} className="fas fa-heart fa-lg"></i>
                        <h5 style={{lineHeight: '10%'}} className="mt-2 ml-4">{camp.campaignHearts} people liked this fundraiser</h5>
                        </Row>
                    <Row className="p-1 mb-2">
                        <i style={{color: 'gold'}} className="fas fa-photo-video fa-lg"></i>
                        <h5 style={{lineHeight: '10%'}} className="mt-2 ml-3">{camp.socialShareTotal} shares on social media</h5>
                        </Row>
                    <Row className="p-1 mb-2">
                        <i style={{color: 'green'}} className="fas fa-dollar-sign fa-lg"></i>
                        <h5 style={{lineHeight: '10%'}} className="mt-2 ml-4">{camp.donators} donators with ~${parseFloat(camp.moneyPerDonor).toFixed(2)} per donator</h5>
                    </Row>
                </Col>
                <Col xs={6}>
                    <div style={card} className="p-2">
                        <div className="inline p-2">
                            <h4 style={{display: 'inline'}}><b>${camp.currentAmount}</b></h4><p style={{display: 'inline'}}> raised of ${camp.goal} goal</p>
                        </div>
                        <ProgressBar style={{height: '10px'}} variant="success" now={camp.percentComplete} key={1}/>
                        <Container className="mt-2">
                            <OverlayTrigger
                                style={{display: 'inline'}}
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip}>

                                <i className="fas fa-info-circle"></i>
                            </OverlayTrigger>
                            <span style={{display: 'inline'}}>Quality Score: {parseFloat(camp.quality).toFixed(2)}</span>
                        </Container>
                    </div>
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