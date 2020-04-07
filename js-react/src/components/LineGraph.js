import React, { PureComponent } from 'react';
import {Container, Col, Row, Card} from 'react-bootstrap'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, 
} from 'recharts';

const data = [
  {
    name: 'Mon', 'Number of Donations': 40, 'Total Donations': 2400, amt: 2400,
  },
  {
    name: 'Tue', 'Number of Donations': 30, 'Total Donations': 1398, amt: 2210,
  },
  {
    name: 'Wed', 'Number of Donations': 20, 'Total Donations': 9800, amt: 2290,
  },
  {
    name: 'Thu', 'Number of Donations': 27, 'Total Donations': 3908, amt: 2000,
  },
  {
    name: 'Fri', 'Number of Donations': 18, 'Total Donations': 4800, amt: 2181,
  },
  {
    name: 'Sat', 'Number of Donations': 23, 'Total Donations': 3800, amt: 2500,
  },
  {
    name: 'Sun', 'Number of Donations': 34, 'Total Donations': 4300, amt: 2100,
  },
];
const card = {background: '#F5F2F2', 'border-radius': '7px'}

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  render() {
    return (
        <Container fluid="md">
            <Row className="p-2">
                <Col style={card} className="p-2 mx-2 mb-3">
                    <img src="https://pngimg.com/uploads/dollar_sign/dollar_sign_PNG21539.png" className="float-right" style={{'width':'40px', 'height':'40px'}}></img>
                    <p style={{'line-height':'80%'}}>DONATIONS</p>
                    <strong><h3 style={{'line-height':'80%'}}>$2,500</h3></strong>
                    <i style={{'color': 'green'}} class="fas fa-arrow-up"></i>
                    <p style={{'display': 'inline', 'color': 'green'}}><strong> 12%</strong></p>
                    <p style={{'display': 'inline'}}> since last week</p>
                </Col>
                <Col style={card} className="p-2 mx-2 mb-3">
                <img src="https://img.icons8.com/cotton/2x/like.png" className="float-right" style={{'width':'40px', 'height':'40px'}}></img>
                    <p style={{'line-height':'80%'}}>HEARTS</p>
                    <strong><h3 style={{'line-height':'80%'}}>50</h3></strong>
                    <i style={{'color': 'red'}} class="fas fa-arrow-down"></i>
                    <p style={{'display': 'inline', 'color': 'red'}}><strong> 5%</strong></p>
                    <p style={{'display': 'inline'}}> since last week</p>
                </Col>
                <Col style={card} className="p-2 mx-2 mb-3">
                <img src="https://pngimg.com/uploads/dollar_sign/dollar_sign_PNG21539.png" className="float-right" style={{'width':'40px', 'height':'40px'}}></img>
                    <p style={{'line-height':'80%'}}>DONATIONS</p>
                    <strong><h3 style={{'line-height':'80%'}}>$2,500</h3></strong>
                    <i style={{'color': 'green'}} class="fas fa-arrow-up"></i>
                    <p style={{'display': 'inline', 'color': 'green'}}><strong> 12%</strong></p>
                    <p style={{'display': 'inline'}}> since last week</p>
                </Col>
                <Col style={card} className="p-2 mx-2 mb-3">
                <img src="https://pngimg.com/uploads/dollar_sign/dollar_sign_PNG21539.png" className="float-right" style={{'width':'40px', 'height':'40px'}}></img>
                    <p style={{'line-height':'80%'}}>DONATIONS</p>
                    <strong><h3 style={{'line-height':'80%'}}>$2,500</h3></strong>
                    <i style={{'color': 'green'}} class="fas fa-arrow-up"></i>
                    <p style={{'display': 'inline', 'color': 'green'}}><strong> 12%</strong></p>
                    <p style={{'display': 'inline'}}> since last week</p>
                </Col>
            </Row>
            <Row >
                <Col className="p-2 mx-2 mb-3" xs={8} style={card}>
                    <h3 className="text-center">Donations by Day of Week</h3>
                    <LineChart
                        width={400}
                        height={200}
                        data={data}
                        margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                        }}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Total Donations" stroke="#8884d8" activeDot={{ r: 8 }} />
                        {/* <Line type="monotone" dataKey="Number of Donations" stroke="#82ca9d" /> */}
                    </LineChart>
                </Col>
                <Col className="p-2 mx-2 mb-3" style={card}>
                    <h3 className="text-center">Donations by Day of Week</h3>
                    <LineChart
                        width={200}
                        height={100}
                        data={data}
                        margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                        }}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Total Donations" stroke="#8884d8" activeDot={{ r: 8 }} />
                        {/* <Line type="monotone" dataKey="Number of Donations" stroke="#82ca9d" /> */}
                    </LineChart>
                </Col>
            </Row>
            <Row className="p-2">
                <Col style={card} className="p-2 mx-2">
                    <h3>Col 1</h3>
                </Col>
                <Col xs={8} style={card} className="p-2 mx-2">
                  <h3>Col 2</h3>
                  <h3 className="text-center">Donations by Day of Week</h3>
                    <LineChart
                        width={200}
                        height={100}
                        data={data}
                        margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                        }}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Total Donations" stroke="#8884d8" activeDot={{ r: 8 }} />
                        {/* <Line type="monotone" dataKey="Number of Donations" stroke="#82ca9d" /> */}
                    </LineChart>
                </Col>
            </Row>
        </Container>
    );
  }
}
