
import React from 'react';
import axios from "axios";
import Config from './Config';
import Fixture from './Fixture';
import Sidenav from "./Sidenav";
import { withAlert } from 'react-alert'
import Loading from './Loading';

class SetFixtures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {Fixtures:[],loading:false };
    }

  AppendFixture(){
    this.setState({
    Fixtures: [...this.state.Fixtures, <Fixture />]
    })
  }

  componentDidMount() {
    this.setState({ loading:true}); 

    const token = localStorage.getItem('user');
    const config = {  headers: { Authorization: `Bearer `+token } };
    const bodyParameters = {  key: "value"  };
    axios.post(Config.api+`GetTeams`,
    bodyParameters,
    config)
      .then(res => {
        const data = res.data;
        console.log(data);
        this.setState({ loading:false}); 

       }).catch(error => {

      })
  }

  AddFixtures(Fixtures) {
    this.setState({ loading:true}); 
        
    const token = localStorage.getItem('user');
    const config = {  headers: { Authorization: `Bearer `+token } };
     axios.post(Config.api+`AddFixtures`,
     Fixtures,
    config)
      .then(res => {
        const data = res.data;
        console.log('from backend',data);
             if (data==='done'){this.setState({Fixtures:[],loading:false});  this.props.alert.show('Fixtures added',{type: 'success'}) ;}
       }).catch(error => {

      })
  }

  
             CollectFixtures(){
            var Home = document.getElementsByClassName("Home");
            var Away = document.getElementsByClassName("Away");
            var Fixtures = [];
            var i;

            for (i = 0; i < Home.length; i++) {
              if (Home[i].value !== "" && Away[i].value !== "" ) {
              Fixtures.push({home_id:Home[i].value,away_id:Away[i].value} );
                }    
              }
              
              if (Fixtures.length){this.AddFixtures(Fixtures);}
              else{ this.props.alert.show('Add Some Fixtures') ;}
                    console.log(Fixtures);

             }


  render() {
    return  <> 


<div>

<Sidenav admin={this.props.admin}/>

    <div   className="col-10 col offset-2 with_header" >

                  <div className="con" >

                  {this.state.loading?<Loading />: ''}

                 




                  {this.state.Fixtures.map((data, index) => (

                  <div className="content d-flex justify-content-between" key={index}>{ data }</div>

                  ))}<br /> 
                  <button type="submit" className="btn btn-primary  btn-add"   onClick={this.AppendFixture.bind(this)} >Add new fixture</button>
                  <br />  <br /><br />

                  <hr  className="hr"/>
                  <br />
                  <button type="submit" className="btn btn-primary btn-registration"   onClick={this.CollectFixtures.bind(this)} >Submit</button>
                  </div>
      </div>   
</div>


    </>;
  }
}


export default withAlert()(SetFixtures)
