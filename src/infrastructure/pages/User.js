import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import clientService from "../../domain/services/clientService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import iconsShortCut from "../components/shared/constants/iconsShortCut";
import { connect } from "react-redux";
import * as userActions from '../actions/userActions';

const User = (props) => {
    const { fetchUsers, users } = props;

    useEffect(() => {
        fetchUsers();
    }, [])
    // const RenderOptions = () => {
    //     if (roleOptions) {
    //         return roleOptions.menu_options.map(option => {
    //             return <li className="nav-item" key={option.option_id}>
    //                 <FontAwesomeIcon icon={iconsShortCut[option.option_icon]} />
    //                 <Link to={option.option_url}>
    //                     {option.option_name}
    //                 </Link>
    //             </li>
    //         })
    //     }
    // }
    const CreateRowUsers = () => {
        if (users.length > 0) {
            return users.map((user) => {
                return <tr key={user.id_user}>
                    <td>{user.id_user}</td>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    <td>{user.status}</td>
                </tr>
            })
        }
        
    }
    return (
        <div className="container h-100 d-flex justify-content-center align-items-center flex-column" >
            <Link to='/create-user'>
                <button className="btn btn-primary w-100">
                    Crear Usuario
                </button>
            </Link>
            <table className="table table-bordered border-primary">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Username</th>
                        <th>Teléfono</th>
                        <th>Correo</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody> {CreateRowUsers()}</tbody>
                {/* <tbody>
                    <tr>
                        <td>pruerbix</td>
                    </tr>
                </tbody> */}
            </table >
        </div >
    )
}
const mapStateToProps = ({ userReducer }) => userReducer;

export default connect(mapStateToProps, userActions)(User);