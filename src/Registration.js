import './App.css';
import * as React from 'react';
import axios from "axios";
import Config from './Config';
import { Redirect, NavLink } from "react-router-dom";
import logo from "./logo.png";
import upload from "./assets/upload.png";

 

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: null ,email:null,password:null,file:null,toDashboard:false,selectedFile:null,selectedFileName:'' };
   }


   onUpload(e) {
      this.setState({file:e.target.files[0]})
      this.setState({
      selectedFile: e.target.files,
      selectedFileName: e.target.files[0].name
    });
  }
 
 

  register(e){
    e.preventDefault();
 if (this.state.selectedFileName){ document.getElementById("File").classList.remove("input_red");}
 else{ document.getElementById("File").classList.add("input_red"); return ;}
     
    const self = this ;
    const formData = new FormData();
    formData.append('logo',this.state.file);
    formData.append('name',self.refs['name'].value);
    formData.append('email',self.refs['email'].value);
    formData.append('password',self.refs['password'].value);
 
    const config = { headers: { 'content-type': 'multipart/form-data' } }
    axios.post(Config.api+`register`,
    formData,
     config
    )
      .then(res => {
         // this.setState({ toDashboard:true });
        console.log(res.data);
        localStorage.setItem('user', res.data.access_token);
            this.setState({ toDashboard:true });
        
      }).catch(error => {

        if (error.response.data.errors && error.response && error.response.data ){
        if (error.response.data.errors.name){this.setState({ name:  error.response.data.errors.name  })}
        if (error.response.data.errors.email){this.setState({ email:  error.response.data.errors.email  })}
        if (error.response.data.errors.password){this.setState({ password:  error.response.data.errors.password  })}
        }
         console.log(error.response.data.errors);
      })
   } // end


    componentDidMount() {
    const token = localStorage.getItem('user');
    const config = {  headers: { Authorization: `Bearer `+token } };
    const bodyParameters = {  key: "value"  };
    axios.post(Config.api+`validate-token`,
    bodyParameters,
    config)
      .then(res => {
        // const persons = res.data;
           this.setState({ toDashboard:true });

       }).catch(error => {

      })
  }
   
  render() {
    if (this.state.toDashboard === true) { return <Redirect to='/SetFixtures' /> }


    return (
      <div  >
          <div className="header"><img alt='logo' className="logo" src={String(logo)} /></div>

          {/* {JSON.stringify(this.state)} */}
          <form  className="con" onSubmit ={this.register.bind(this)} encType="multipart/form-data">

          <div className="row">
          <div className="col-6">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Clup name</label>
                <input required type="text"  className={`form-control ${this.state.name ? "input_red" : ""}`}  name="name"  ref="name" aria-describedby=" " placeholder=" "  />
                <div   className={`invalid-feedback ${this.state.name ? "d-block" : ""}`}   >{this.state.name }</div>
              </div>

              <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Clup Email address</label>
                  <input required type="email"  className={`form-control ${this.state.email ? "input_red" : ""}`}  name="email"  ref="email" aria-describedby=" " placeholder="   "  />
                  <div   className={`invalid-feedback ${this.state.email ? "d-block" : ""}`}   >{this.state.email }</div>
              </div>
              <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input required type="password"  className={`form-control ${this.state.password ? "input_red" : ""}`}  name="password"  ref="password" aria-describedby="password" placeholder=" "  />
                  <div  className={`invalid-feedback ${this.state.password ? "d-block" : ""}`}   >{this.state.password }</div>
               </div>
          </div>
          <div className="col-6">
            <div className="form-group">
            <div> <label htmlFor="exampleFormControlFile1" >Clup logo</label></div>

            <label className="custom-file-upload" id="File">
            <input      type="file" className="form-control-file" accept="image/*" name="upload"    onChange={this.onUpload.bind(this)}    />
            <img alt='logo'  className="upload" src={String(upload)} /> file upload
            </label>
            <span> {this.state.selectedFileName.slice(0,30)  } </span>
            </div> 
          </div>       
          </div><br /><hr />

          <div> <p>have account ? <span className="support">  <NavLink to="/login"  >Login </NavLink></span></p>
             <button type="submit" className="btn btn-primary btn-registration   float-right">Submit</button>
          </div>
          <br />
          </form>
      </div>
    );
  }
}

export default Registration;