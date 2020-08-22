import React from 'react';
import axios from "axios";
import Config from './Config';
import Sidenav from './Sidenav';
import Loading from './Loading';

class ViewLeagueTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {Teams:[] };
    }
 
  componentDidMount() {
    this.setState({ loading:true}); 
    const token = localStorage.getItem('user');
    const config = {  headers: { Authorization: `Bearer `+token } };
    const bodyParameters = {  key: "value"  };
    axios.post(Config.api+`LeagueTable`,
    bodyParameters,
    config)
      .then(res => {
        const data = res.data;
        this.setState({ Teams: data  })
        this.setState({ loading:false}); 
       }).catch(error => {

      })
  }

 
  render() {
    return  <>

<Sidenav admin={this.props.admin}/>

<div className="col-10 col offset-2 with_header" >
        <div   className="con con-table" >{this.state.loading?<Loading />: ''}
            <div className="content-table d-flex justify-content-between"> 
                <div className="row"> 
                <p  className="team_table">Position</p>  <p  className="team_table">Teams</p>   
                </div>
            </div>

            {this.state.Teams.map((data, index) => (

            <div className=" d-flex justify-content-between" key={index}> 
                    <div className="row"> 
                        <p  className="team_table">{index+1}</p> <p  className="team_table">{data.title}</p>   
                    </div>
            </div>

            ))}
            <br /> <br /> 
        </div><br /> <br />
</div>


    </>;
  }
}

export default ViewLeagueTable;