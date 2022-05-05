import React, { Component, useState, useEffect, Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import iconsShortCut from '../shared/constants/iconsShortCut';
import userService from "../../../domain/services/userService";
import { Link } from 'react-router-dom';
import logo from '../../../assets/image/logoheader.png';
import cart from '../../../assets/image/cart.png';
import bars from '../../../assets/image/bars.png';
import './../../css/shared.css'


const Header = () => {
    let [userLogged, setUserLogged] = useState({});
    let [roleOptions, setRoleOption] = useState({
        menu_id: "14545",
        menu_name: "Nombre del menú",
        menu_description: "descripción del menú",
        menu_options: [
            {
                option_id: "1511",
                option_name: "Mis puntos",
                option_type: "link",
                option_description: "Descripción de la opción",
                option_icon: "faMagnifyingGlass",
                option_url: "/points",
                option_sub_options: [
                ]
            },
            {
                option_id: "1512",
                option_name: "Mis datos",
                option_type: "link",
                option_description: "Descripción de la opción",
                option_icon: "faIdCard",
                option_url: "/user-info",
                option_sub_options: [

                ]
            },
            {
                option_id: "1513",
                option_name: "Mis bonos",
                option_type: "link",
                option_description: "Descripción de la opción",
                option_icon: "faReceipt",
                option_url: "/my-bond",
                option_sub_options: [

                ]
            },
            {
                option_id: "1514",
                option_name: "Productos",
                option_type: "link",
                option_description: "Descripción de la opción",
                option_icon: "faGift",
                option_url: "/products",
                option_sub_options: [

                ]
            },
            {
                option_id: "1515",
                option_name: "Usuarios",
                option_type: "link",
                option_description: "Descripción de la opción",
                option_icon: "faUsers",
                option_url: "/user",
                option_sub_options: [

                ]
            },
        ]
    });
    const { getUser, Logout } = userService;

    useEffect(() => {
        setUserLogged(getUser());
    }, []);

    const logoutUser = () => {
        Logout();
        setUserLogged(getUser());
    }

    const RenderOptions = () => {
        if (roleOptions) {
            return roleOptions.menu_options.map(option => {
                return <li className="nav-item" key={option.option_id}>
                    <FontAwesomeIcon icon={iconsShortCut[option.option_icon]} />
                    <Link to={option.option_url}>
                        {option.option_name}
                    </Link>
                </li>
            })
        }
    }
    return (
        <Fragment>
            <header id="nav-bar-header">
                <div className="logo-header">
                    <img src={logo} alt="logo-quickticket" />
                </div>
                <div className="div-content-header">
                    <h6>Compra fácil y seguro en tus eventos</h6>
                    {
                        (userLogged) ?
                            (
                                <div className="d-flex">
                                    <a className="header-icon-bars" type="button" >
                                        <img className="img-fluid" src={cart} />
                                    </a>
                                    <a className="header-icon-bars" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                                        <img className="img-fluid" src={bars} />
                                    </a>
                                </div>
                            ) :
                            ('')}
                </div>
            </header>
            <div className="container" >
                <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                    <div className="offcanvas-header">
                        <div className="w-100 d-flex justify-content-end">
                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>

                        </div>

                        <h1 className="offcanvas-title" id="offcanvasExampleLabel">Carlos Andrés Castañeda</h1>
                        <h2 className="offcanvas-title" id="offcanvasExampleLabel">Tienes 1.535 Puntos</h2>
                        <div className="container">
                            <div className="row">
                                <div className="col-6 text-align-center">
                                    <p>Últimos comprados</p>
                                    <span className="text-color-primary">200</span>
                                    <p>Febrero 21 / 2022</p>
                                </div>
                                <div className="col-6 text-align-center">
                                    <p>Última transacción</p>
                                    <span className="text-color-red">113</span>
                                    <p>Junio 30 / 2023</p>
                                </div>
                            </div>
                        </div>
                        {/* <h5 className="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button> */}
                    </div>
                    <div className="offcanvas-body">
                        <ul className="nav flex-column">
                            {RenderOptions()}
                            {/* <hr className="hr-menu"/> */}
                            <li className="nav-item" >
                                <FontAwesomeIcon icon={iconsShortCut['faArrowRightFromBracket']} />
                                <Link to='auth/client/login' onClick={logoutUser}>
                                    Cerrar sesión
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </Fragment >
    )
}

export default Header