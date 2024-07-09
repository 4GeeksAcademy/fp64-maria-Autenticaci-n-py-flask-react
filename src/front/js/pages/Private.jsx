import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleOnClick = () => {
        actions.tokenLogout();
        navigate("/login");
    };

    useEffect(() => {
        if (!store.loggedIn) {
            navigate("/login");
        } else {
            actions.getInfo();
        }
    }, [store.loggedIn, navigate]);

    return (
        <div>
            {store.loggedIn ? (
                <div className="text-center justify-content-center d-md-flex m-5">
                    <div className="card">
                        <div className="card-header fs-1">
                            Personal Information
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Your username is:</h5>
                            <p className="card-text fs-3 fw-bold">{store.userName}</p>
                            <div>
                                <button className="btn btn-primary btn-lg" onClick={handleOnClick}>Log out</button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};
