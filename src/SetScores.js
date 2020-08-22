import React from 'react';
import axios from "axios";
import Config from './Config';
import Sidenav from './Sidenav';
import { withAlert } from 'react-alert';
import Loading from './Loading';



class SetScores extends React.Component {
  constructor(props) {
    super(props);
    this.state = {Fixtures:[] ,loading:false};

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





  SetScores(Fixtures) {
    this.setState({ loading:true}); 
    const token = localStorage.getItem('user');
    const config = {  headers: { Authorization: `Bearer `+token } };
    axios.post(Config.api+`SetScores`,
    Fixtures,
    config)
      .then(res => {
        const data = res.data;
        console.log('from backend',data);
        if (data==='done'){ this.setState({ loading:false}); this.props.alert.show('Scores Saved',{type: 'success'}) ; }else {alert('error')}
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
          if (Home[i].value !== "" || Away[i].value !== "" ) {
          //  
          Fixtures.push({home_score:Home[i].value,away_score:Away[i].value,FixtureId:FixtureId[i].value} );                    
          if (Home[i].value === ""){ Fixtures.push({home_score:Home[i].placeholder,away_score:Away[i].value,FixtureId:FixtureId[i].value} );}
          if (Away[i].value === ""){ Fixtures.push({home_score:Home[i].value,away_score:Away[i].placeholder,FixtureId:FixtureId[i].value} );}
          
            }    
          }
            if (Fixtures.length){this.SetScores(Fixtures);}
            else{  this.props.alert.show('Add Some Score')}
          
        console.log(Fixtures);
     }


  render() {
    return  <>

      <Sidenav admin={this.props.admin}/>

<div className="col-10 col offset-2 with_header" >

        <div   className="con con-table" > {this.state.loading?<Loading />: ''}
        {this.state.Fixtures.map((data, index) => (

        <div className="container" key={index}>
            <div className="content d-flex justify-content-between"> 
                <input className="FixtureId form-control form-control-sm" id="inputdefault" type="hidden" value={data.id}/>  
                <div className="row"> 
                  <p  className="team_title"> {data.home_team}  </p> <input className="home home-control form-control-sm" id="inputdefault"  min="0" type="number"  placeholder={data.home_score}/>  
                </div>
                <div className="vs">vs</div>
                <div  className="row d-flex flex-row-reverse"> 
                  <p className="team_title"> {data.away_team}  </p> 
                  <input className="away home-control form-control-sm" id="inputdefault" type="number"  min="0" placeholder={data.away_score}/> 
                </div>
            </div>
        </div>
        ))}<br /> <br /><hr />

        <button type="submit" className="btn btn-primary float-right"   onClick={this.CollectFixtures.bind(this)} >submit</button>
        </div> <br /> <br />

 </div>


    </>;
  }
}

export default withAlert()(SetScores)
