
import React from 'react';
import logo_dark from "./assets/logo_dark.png";
import {
    Redirect,
    NavLink
  } from "react-router-dom";
class Sidenav extends React.Component {
 
 
 logout(){
    // return <Redirect to="/login" />
     localStorage.clear();
    return    <Redirect to="/login" />

 }
   


  render() {
    return  <>

<div className="sidenav col-2">
          
              <div className="nav-header"><img alt='logo' className="logo" src={String(logo_dark)} /></div>
            <ul className="custom-scrollbar" >
                <li > <NavLink to="/ViewLeagueTable" activeClassName="active">view league table</NavLink></li>            
                <li > <NavLink to="/ViewFixtures" activeClassName="active">view fixtures </NavLink></li> 
                {this.props.admin ? 
                <>
                <li > <NavLink to="/SetScores" activeClassName="active">set match score</NavLink></li> 
                <li > <NavLink to="/SetFixtures" activeClassName="active">set fixtures </NavLink></li>  
                 </>              
                :  ' '}
                <li > <a   href="SetFixtures"  onClick={this.logout.bind(this)}>logout </a></li> 
             </ul>

</div>


    </>;
  }
}

export default Sidenav;