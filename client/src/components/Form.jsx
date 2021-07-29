import React,{useState} from 'react';
import axios from 'axios';
import {navigate} from '@reach/router'

const Form = (props) => {

	const [credentials,setCredentials] = useState({
		firstName:"",
		lastName:"",
		email:"",
		password:"",
		confirmPassword:"",
	});
	const [logincredentials,setLoginCredentials] = useState({

		email:"",
		password:"",

	});

	const [validState,setValidState] = useState({
		firstName:false,
		lastName:false,
		email:false,
		password:false,
		confirmPassword:false,
	})
	const [loginValidState,setLoginValidState] = useState({
		email:false,
		password:false,
	})
	
	const handleChange = (e) => {
			setCredentials({
				...credentials,
				[e.target.name]:e.target.value
			});
	}
		const handleChangeLogin = (e) => {
			setLoginCredentials({
				...logincredentials,
				[e.target.name]:e.target.value
			});
	}

	const handleClick = e =>{
		axios.get("http://localhost:8000/api/logout",{withCredentials:true})
		.then(res=>console.log(res))
		.catch(err=>console.log(err))
		navigate("/register")
	}


	const handleSubmit = (e) => {
		e.preventDefault();
		if(credentials.firstName.length<3){
			var firstName = true;
		}
		if(credentials.lastName.length<3){
			var lastName = true;
		}	
		if(credentials.email.length<3){
			var email = true;
		}
		if(credentials.password.length<8){
			var password = true;
		}
		if(credentials.confirmPassword !== credentials.password ){
			var confirmPassword = true;
		}

		setValidState({
				...validState,firstName,lastName,email,password,confirmPassword
		});
		if(firstName||lastName||email||password||confirmPassword) return
		axios.post("http://localhost:8000/api/register",credentials)
		.then(res=>console.log(res))
		.catch(err=>console.log(err.response))
		setCredentials({
		firstName:"",
		lastName:"",
		email:"",
		password:"",
		confirmPassword:"",
	})
	}

	const handleSubmitLogin = (e) => {
		e.preventDefault();
		if(logincredentials.email.length<3){
			var email = true;
		}
		if(logincredentials.password.length<8){
			var password = true;
		}

		setLoginValidState({
				...loginValidState,email,password
		});
		if(email||password) return
		axios.post("http://localhost:8000/api/login",logincredentials,{withCredentials:true})
		.then(res=>{
			console.log(res)
			navigate("/success")})
		.catch(err=>console.log(err.response))
	// 	setLoginCredentials({
	// 	email:"",
	// 	password:"",
	// })
	}

  return (
  	
    <div>
    	<button onClick={handleClick}>Logout</button>
    	<form class="form" onSubmit={handleSubmit}>
    		<label>first name: </label>
    			<input value={credentials.firstName} onChange={handleChange} name="firstName" type="text"/>
    			<br/>
    		{validState.firstName ? <p style={{color:"red"}}>it has to be more than 3 chars.</p>:null}
    		
    		<label>last name:</label>
    			<input value={credentials.lastName} onChange={handleChange} name="lastName" type="text"/>
    			<br/>
    		{validState.lastName ? <p style={{color:"red"}}>it has to be more than 3 chars.</p>:null}
  
    		<label>email:</label>
    		<input value={credentials.email} onChange={handleChange} name="email" type="text"/>
    		<br/>
    		{validState.email ? <p style={{color:"red"}}>it has to be more than 3 chars.</p>:null}
    		
    		<label>password:</label>
				<input value={credentials.password} onChange={handleChange} name="password" type="text"/>
    		<br/>
    		{validState.password ? <p style={{color:"red"}}>it has to be more than 8 chars.</p>:null}
    		
    		<label>confirm password:</label>
    		<input value={credentials.confirmPassword} onChange={handleChange} name="confirmPassword" type="text"/>
    		{validState.confirmPassword ? <p style={{color:"red"}}>passwords has to match.</p>:null}
    		<br/>

    		<input type="submit" class="btn btn-primary" onSubmit={handleChange} value="add it"/>
    	
    	</form>
	<form class="form" onSubmit={handleSubmitLogin}>
	    		<label>email:</label>
	    		<input onChange={handleChangeLogin} name="email" type="text"/>
	    		<br/>
	    		{loginValidState.email ? <p style={{color:"red"}}>it has to be more than 3 chars.</p>:null}
	    		
	    		<label>password:</label>
					<input onChange={handleChangeLogin} name="password" type="text"/>
	    		<br/>
	    		{loginValidState.password ? <p style={{color:"red"}}>it has to be more than 8 chars.</p>:null}
	    		
	    		<input type="submit" class="btn btn-primary" onSubmit={handleChange} value="add it"/>
	    	</form>
    </div>
  )
}

export default Form;