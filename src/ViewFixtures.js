import React from 'react';
import axios from "axios";
import Config from './Config';
import Sidenav from './Sidenav';
import Loading from './Loading';

class ViewFixtures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {Fixtures:[] };
    }
 
  componentDidMount() {
    this.setState({ loading:true}); 
    const token = localStorage.getItem('user');
    const config = {  headers: { Authorization: `Bearer `+token } };
    const bodyParameters = {  key: "value"  };
    axios.post(Config.api+`GetFixtures`,
    bodyParameters,
    config)
      .then(res => {
        const data = res.data;
        this.setState({ Fixtures: data  })
        this.setState({ loading:false}); 
       }).catch(error => {

      })
  }
 
  CollectFixtures(){
        var FixtureId = document.getElementsByClassName("FixtureId");
        var Home = document.getElementsByClassName("home");
        var Away = document.getElementsByClassName("away");
        var Fixtures = [];
        var i;
        for (i = 0; i < Home.length; i++) {
          if (Home[i].value !== "" && Away[i].value !== "" ) {
          Fixtures.push({home_score:Home[i].value,away_score:Away[i].value,FixtureId:FixtureId[i].value} );
            }
                  
          }
            if (Fixtures.length){this.SetScores(Fixtures);}
            else{alert ('Add Some Fixtures')}
            console.log(Fixtures);
     }


  render() {
    return  <>

<Sidenav admin={this.props.admin}/>

<div   className="col-10 col offset-2 with_header" >
          <div   className="con" >{this.state.loading?<Loading />: ''}
                {this.state.Fixtures.map((data, index) => (

                <div className="container" key={index}>
                    <div className="content d-flex justify-content-between"> 
                          <div className="row"> 
                              <p  className="team_title"> {data.home_team}  </p>   
                          </div>
                          <div className="vs">vs</div>
                          <div  className="row d-flex flex-row-reverse"> 
                              <p className="team_title"> {data.away_team}  </p> 
                          </div>
                    </div>
                </div>
                ))}
                <br /> <br /> 
          </div><br /> <br /> 
 </div>


    </>;
  }
}

export default ViewFixtures;