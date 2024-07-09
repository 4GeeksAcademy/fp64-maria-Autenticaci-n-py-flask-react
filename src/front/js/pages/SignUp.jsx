import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const SignUp = () => {
	const { store, actions } = useContext(Context);
  const [inputUser, setInputUser] = useState("");
	const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  function save() {
		actions.postSignUp(inputUser, inputEmail, inputPassword);
	}

	return (
		<div className="text-center justify-content-center d-md-flex m-5"> 
			<div className="form-signin">
  				<form className="text-center container justify-content-center"> 
            <h1 className="h3 mb-3 fw-normal">Please register</h1>
            <div className="form-floating m-1">
              <input 
                    type="text" 
                    className="form-control"
                    id="userName"  
                    placeholder="User name"
                    onChange={e => setInputUser(e.target.value)}
                    value={inputUser}
              />
              <label htmlFor="userName">User name</label>
            </div>
            <div className="form-floating m-1">
              <input 
                    type="email"
                    className="form-control" 
                    id="email"
                    placeholder="name@example.com"
                    onChange={e => setInputEmail(e.target.value)}
                    value={inputEmail} 
              />
              <label htmlFor="email">Email address</label>
            </div>
            <div className="form-floating m-1">
              <input 
                    type="password" 
                    className="form-control"
                    id="password" 
                    placeholder="Password"
                    onChange={e => setInputPassword(e.target.value)}
                    value={inputPassword}
              />
            <label htmlFor="password">Password</label>
            </div>
            <div>
              <Link to={inputUser != "" && inputEmail != "" && inputPassword != "" ? '/login' : '/signup' }>
                <button 
                       className="w-100 btn btn-lg btn-primary m-1" 
                       type="submit"
                       onClick={() => {
                        if (inputUser != "" && inputEmail != "" && inputPassword != "") {
                          save();
                        } else {
                          alert("Please fill out all input fields");
                        }
                       }}>Create User</button>
              </Link>
            </div>
          </form>
      </div>
    </div>
	)
}