import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Main = () => {
	const { store, actions } = useContext(Context);

	return ( 
        <div className="text-center justify-content-center d-md-flex m-5"> 
            <div className="card">
                <div className="card-header fs-1">
                    Welcome
                </div>
                <div className="card-body">
                    <h5 className="card-title fw-bold">Please log in</h5>
                    <div>
					    <Link to="/login">
						    <button className="btn btn-primary btn-lg">Log in</button>
					    </Link>
				    </div>
                    <h5 className="card-title fw-bold">If not registered, please sign up</h5>
                    <div>
					    <Link to="/signup">
						    <button className="btn btn-secondary btn-lg">Sign up</button>
					    </Link>
				    </div>
                </div>
            </div>
        </div>
    )
}