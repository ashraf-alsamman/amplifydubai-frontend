
import React from 'react';
import axios from "axios";
import Config from './Config';
class Fixture extends React.Component {
    constructor(props) {
        super(props);
        this.state = {Home:[],Away:[] ,data:[]};
        }

  onHomeChange(e){
        const list = [...this.state.data];
        const  arr = list.filter(function(el){
          return el.id !==  parseInt(e.target.value);
        });
        this.setState({ Away :arr });
      }

 onAwayChange(e){
    const list = [...this.state.data];
    const  arr = list.filter(function(el){
      return el.id !==  parseInt(e.target.value);
    });
    this.setState({ Home :arr });
   }

  componentDidMount() {
    const token = localStorage.getItem('user');
    const config = {  headers: { Authorization: `Bearer `+token } };
    const bodyParameters = {  key: "value"  };
    axios.post(Config.api+`GetTeams`,
    bodyParameters,
    config)
      .then(res => {
        const data = res.data;
        this.setState({  Home:  [...data ] })
        this.setState({  Away:   [...data]  }) 
        this.setState({  data:   [...data ] })
       }).catch(error => {
      })
    }


  render() {
    return  <>
    <div class="form-group">
        <select className="mdb-select md-form Home form-control"      searchable="Search here.."onChange={this.onHomeChange.bind(this)}>
        <option value=""  disabled selected>Select Team</option>
        {this.state.Home.map((data, index) => (
        <option value={data.id} >{data.title}</option>
        ))}
        </select>
    </div> 
    <div className="vs">VS</div>

    <div class="form-group"> 
        <select className="mdb-select md-form Away form-control" searchable="Search here.." onChange={this.onAwayChange.bind(this)}>
        <option value="" disabled selected>Select Team</option>
        {this.state.Away.map((data, index) => (
        <option value={data.id}>{data.title}</option>
        ))}
        </select>
    </div> 
    </>;
  }
}

export default Fixture;