import React from 'react'
// import axios from 'axios'
import AppContext from './context'
import App from './App'
import ReactDOM from 'react-dom';
import CalciteThemeProvider, { CalciteTheme } from 'calcite-react/CalciteThemeProvider';
// import { produce } from 'immer'

const CustomTheme = {
    ...CalciteTheme,
    palette: {
      ...CalciteTheme.palette,
      blue: 'green'
    }
  };

/** The context provider for our app */
export default class AppProvider extends React.Component {

    constructor(props) {
        super(props)
        this.actions = {

        }
        this.state = {

        }
    }

    async componentDidMount() {
        // this is where we make our axios API calls
        // const resp = await axios.get('http://localhost:8000/api/category/')
        // const resp2 = await axios.get('http://localhost:8000/api/product/')
        // for(const p of resp2.data) {
        //     sum++
        //     prods[p.id] = p
        //     cats[p.category].count = Number((cats[p.category].count || 0) + 1)
        // }
        // this.setState({
        //     ...this.state,
        //     products: prods,
        // })
        // console.log('hello', resp.data, resp2.data) this works now
        //this.setState({...this.state, categories: resp.data, products: resp2.data})
    }

    render() {
        return (
            <AppContext.Provider value={{...this.state, ...this.actions}}>
                <CalciteThemeProvider>
                    <App />
                </CalciteThemeProvider>
            </AppContext.Provider>
        )
    }

    //define functions here
}