import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import Config from './Config';
import Registration from "./Registration";
import ViewFixtures from "./ViewFixtures";
import Login from "./Login";
import SetFixtures from "./SetFixtures";
import SetScores from "./SetScores";
import ViewLeagueTable from "./ViewLeagueTable";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
 
 

  const options = {
    timeout: 5000,
    position: positions.BOTTOM_CENTER
  };

 export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  toLogin:false ,toDashboard:false ,admin:0};

    }
 
  componentDidMount() {
 
    const token = localStorage.getItem('user');
    const config = {  headers: { Authorization: `Bearer `+token } };
    const bodyParameters = {  key: "value"  };
    axios.post(Config.api+`validate-token`,
    bodyParameters,
    config)
      .then(res => {
        const persons = res.data;
        console.log(persons);
                     this.setState({ admin:res.data.user.admin });

      if (window.location.pathname.substring(1)==='SetScores' || window.location.pathname.substring(1)==='SetFixtures')
        { 

              if ( persons.user.admin === 0) {window.location.replace("/viewFixtures")}
        }

      // if (window.location.pathname.substring(1)==='login'||window.location.pathname.substring(1)==='registration')
      // { window.location.replace("/viewFixtures");}
            }).catch(error => {
              // if (window.location.pathname.substring(1)!=='login'&&window.location.pathname.substring(1)!=='registration')
              // { 
              //   console.log(window.location.pathname.substring(1));
              //   window.location.replace("/login")
              // }
      })
}

  RouteGuard = ({ component: Component  }) => (
  <Route
     render={routeProps => {
      const item = localStorage.getItem("user");
      
       return item !== null ? (
        <Component  admin={this.state.admin} />
      ) : (
         <Redirect to="/login" />
      );
    }}
  />
);


  render() {
  
  return (

  <Provider template={AlertTemplate} {...options}>
      <Router>
          <Switch>
            <this.RouteGuard path="/ViewFixtures" component={ViewFixtures} />
            <this.RouteGuard path="/SetFixtures" component={SetFixtures}  />
            <this.RouteGuard path="/SetScores" component={SetScores} />
            <this.RouteGuard path="/ViewLeagueTable" component={ViewLeagueTable} />
            <Route exact path="/"> <div>homepage</div> </Route>
            <Route path="/Login"><Login /></Route>
            <Route path="/Registration"><Registration /></Route>
          </Switch>
      </Router>
   </Provider>
  );
}

 }