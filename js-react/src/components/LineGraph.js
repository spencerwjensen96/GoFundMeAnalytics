import React, { PureComponent } from 'react';
import {Container, Col, Row } from 'react-bootstrap'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, Bar, BarChart
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
const data02 = [
    {
      name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
    },
    {
      name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
    },
    {
      name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
    },
    {
      name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
    },
    {
      name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
    },
    {
      name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
    },
    {
      name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
    },
  ];
const data01 = [
    { name: 'Anonymous Donors', value: 500 }, { name: 'Named Donors', value: 1000 },
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const card = {background: '#F5F2F2', 'border-radius': '7px'}
const paddingFix = {height: '300px'}

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
                <img src="https://img.icons8.com/pastel-glyph/2x/person-male.png" className="float-right" style={{'width':'40px', 'height':'40px'}}></img>
                    <p style={{'line-height':'80%'}}>DONORS</p>
                    <strong><h3 style={{'line-height':'80%'}}>5</h3></strong>
                    <i style={{'color': 'green'}} class="fas fa-arrow-up"></i>
                    <p style={{'display': 'inline', 'color': 'green'}}><strong> 8%</strong></p>
                    <p style={{'display': 'inline'}}> since last week</p>
                </Col>
                <Col style={card} className="p-2 mx-2 mb-3">
                <img src="https://www.workplaceweek.com/wp-content/uploads/2018/03/Workplace-Week-Speech-Icon.png" className="float-right" style={{'width':'40px', 'height':'40px'}}></img>
                    <p style={{'line-height':'80%'}}>COMMENTS</p>
                    <strong><h3 style={{'line-height':'80%'}}>11</h3></strong>
                    <i style={{'color': 'green'}} class="fas fa-arrow-up"></i>
                    <p style={{'display': 'inline', 'color': 'green'}}><strong> 2%</strong></p>
                    <p style={{'display': 'inline'}}> since last week</p>
                </Col>
            </Row>
            <Row >
                <Col className="p-2 mx-2 mb-3" style={card}>
                    <h5 className="text-center">DONATIONS BY DAY OF WEEK</h5><br></br><br></br>
                    <LineChart
                        width={600}
                        height={300}
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
                <Col className="p-2 mx-2 mb-3" xs={3} style={card}>
                    <h5 className="text-center">ANONYMOUS DONORS</h5>
                    <PieChart width={350} height={350}>
                    <Pie
                        data={data01}
                        cx={115}
                        cy={180}
                        innerRadius={54}
                        outerRadius={72}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                        >
                        {
                            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                        }
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </Col>
            </Row>
            <Row className="p-2">
                <Col style={card} className="p-2 mx-2">
                    <h3>Analytic 1</h3>
                </Col>
                <Col xs={8} style={card} className="p-2 mx-2">
                  <h3>Analytic 2</h3>
                  <BarChart
                    width={500}
                    height={300}
                    data={data02}
                    margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pv" fill="#8884d8" />
                    <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
                </Col>
            </Row>
        </Container>
    );
  }
}
