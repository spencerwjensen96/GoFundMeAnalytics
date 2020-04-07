import React from 'react'

    class Prediction extends React.Component{
    render(){
        return (
        <div>
                <h1>We predict you will complete %{this.props.percent} of your goal</h1>
                <br/>
                <br/>
                <p>We calculated these numbers based off of data we scraped from <a href="https://www.gofundme.com/" target="_blank" rel="noopener noreferrer">gofundme.com</a>
                We then cleaned the data with python code, and created a machine learning model on azure machine learning studio to predict 
                the percentage of your goal that you will meet (whether it's over or under the goal).</p>
        </div>
        )
    }
}

export default Prediction;