import React from 'react'
import { useHistory } from 'react-router-dom'
import { ProgressBar } from 'react-bootstrap';

function Prediction(props) {
    const history = useHistory();
    let percent = history.location.calculatedPercent;
    const goal = history.location.goal
    const e = 2.71828
    percent = percent**e
    if(percent !== 0) {
    return (
        <div className="p-5">
            <h1 style={{textAlign: 'center'}}>We predict you will complete {parseFloat(percent).toFixed(2)}% of your goal</h1>
            <br/>
            <ProgressBar style={{height: '15px'}} variant="success" now={parseFloat(percent).toFixed(2)} key={1}></ProgressBar>
            <br/>
            <h3 style={{textAlign: 'center'}}>Based on the information you gave us, we predict you can raise 
                <span style={{color: 'green'}}> ${(parseFloat(percent) / 100 * parseFloat(goal)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span></h3>
            <br/>
            <p>We calculated these numbers based off of data we scraped from <a href="https://www.gofundme.com/" target="_blank" rel="noopener noreferrer">gofundme.com</a>
            . We then cleaned the data with python code, and created a machine learning model on azure machine learning studio to predict 
            the percentage of your goal that you will meet (whether it's over or under the goal).</p>
        </div>
    )
    }
    else {
        return (
            <>
                <h1>Sorry, you must go back to the main page and submit another campaign to see the prediction</h1>
            </>
        )
    }
}

export default Prediction;