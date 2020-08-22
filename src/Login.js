import './App.css';
import * as React from 'react';
import axios from "axios";
import Config from './Config';
import { Redirect , NavLink} from "react-router-dom";
import logo from "./logo.png";

 
 

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: null ,email:null,password:null ,toDashboard:false ,Invalid:false};

    // This binding is necessary to make `this` work in the callback
   }


   
 


  login(e){
    e.preventDefault();
 
    const self = this ;

    const formData = new FormData();
 
    formData.append('email',self.refs['email'].value);
    formData.append('password',self.refs['password'].value);
 
     const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
  }
 
    axios.post(Config.api+`login`,
    formData,
     config
    )
      .then(res => {
         // this.setState({ toDashboard:true });
        console.log(res.data);
        if(res.data.message === 'Invalid'){
         return this.setState({ Invalid:true });
        }
        localStorage.setItem('user', res.data.access_token);
        window.location.replace("/viewFixtures");
          // this.setState({ toDashboard:true });
        
      }).catch(error => {
            console.log(error);
      //   if (error.response.data.errors ||error.response || error.response.data ){
      //   if (error.response.data.errors.email){this.setState({ email:  error.response.data.errors.email  })}
      //   if (error.response.data.errors.password){this.setState({ password:  error.response.data.errors.password  })}
        
      // }



       })


   } // end

 
  

 


  render() {
    // if (this.state.toDashboard === true) { return <Redirect to='/SetFixtures' /> }
 
    return (
      <>
      <div className="header"><img alt='logo' className="logo" src={String(logo)} /></div>

      <div className="form">
      <br />  <br />  <br />
            <h3>Club and Admin Login</h3>
            <h5>Sign in</h5>
            <h6>You don't have account ? <span className="support">  <NavLink to="/Registration"  >Registration </NavLink></span></h6>
<form  onSubmit ={this.login.bind(this)} encType="multipart/form-data">
 
<div   className={`invalid-feedback ${this.state.Invalid ? "d-block" : ""}`}   >Wrong pawssword or email</div>

  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Your Email</label>
    <input type="email"  className={`login-form-control  form-control ${this.state.email ? "input_red" : ""}`}    ref="email" aria-describedby=" " placeholder="   "  />
    <div   className={`invalid-feedback ${this.state.email ? "d-block" : ""}`}   >{this.state.email }</div>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Your Password</label>
    <input type="password"  className={`login-form-control  form-control ${this.state.password ? "input_red" : ""}`}    ref="password" aria-describedby="password" placeholder=" "  />
    <div   className={`invalid-feedback ${this.state.password ? "d-block" : ""}`}   >{this.state.password }</div>
  </div>
 
  <button type="submit" className="btn btn-primary">Sign in</button>
</form>
      </div>
      </>
    );
  }
}

export default Login;