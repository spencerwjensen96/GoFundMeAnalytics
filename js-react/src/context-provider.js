import React from 'react'
import axios from 'axios'
import AppContext from './context'
import App from './App'
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
            campaigns: {},
        }
    }

    async componentDidMount() {
        // We need to load in all the campaigns here but not the analytics. That should be called during the button onClick().
        // this is where we make our axios API calls
        const resp = await axios.get('http://localhost:8000/api/campaigns/')

        this.setState({
            ...this.state,
            campaigns: resp.data,
        })
    }

    render() {
        return (
            <AppContext.Provider value={{...this.state, ...this.actions}}>
                <CalciteThemeProvider theme={CustomTheme}>
                    <App />
                </CalciteThemeProvider>
            </AppContext.Provider>
        )
    }

    //define functions here
}