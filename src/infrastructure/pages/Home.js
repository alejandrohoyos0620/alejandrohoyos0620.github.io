import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import clientService from "../../domain/services/clientService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import iconsShortCut from "../components/shared/constants/iconsShortCut";
const Home = () => {
    return (
        <div className="container h-100 d-flex justify-content-center align-items-center" >
            <div className="row w-50 div-buttons">
                <Link to='auth/client/login'>
                    <button className="btn btn-primary w-100">
                        CLIENTE
                    </button>
                </Link>
                <Link to='auth/user/login'>
                    <button className="btn btn-primary w-100">
                        USUARIO
                    </button>
                </Link>
            </div>
        </div >
    )
}

export default Home;