import React from 'react'
import { useHistory } from 'react-router-dom'

function Prediction(props) {
    const history = useHistory();
    let percent = history.location.calculatedPercent;
    // const e = 
    // percent = Math.pow(percent, e)
    if(percent !== 0) {
    return (
        <div>
            <h1>We predict you will complete {percent}% of your goal</h1>
            <br/>
            <br/>
            <p>We calculated these numbers based off of data we scraped from <a href="https://www.gofundme.com/" target="_blank" rel="noopener noreferrer">gofundme.com</a>
            We then cleaned the data with python code, and created a machine learning model on azure machine learning studio to predict 
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