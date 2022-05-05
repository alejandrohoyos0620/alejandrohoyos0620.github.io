import React, { useEffect, useState } from "react";
import WORDS from '../../shared/constants/authConst';
import { Navigate } from 'react-router-dom';
import logo from '../../../../assets/image/logoquixkcard.png';
import './../../../css/loginClient.css';
import { connect } from "react-redux";
import * as userActions from '../../../actions/userActions';
import { Update, SetLoading, Error } from '../../../../domain/services/toastService';
import { Register, FetchRoles } from '../../../../domain/services/userService';


const CreateUser = (props) => {
    let [form, setForm] = useState({
        role: '',
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    let [goBack, setGoBack] = useState(false);

    let [roles, setRoles] = useState([]);
    let [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUserRoles();
    }, [])

    const fetchUserRoles = async () => {
        setLoading(true);
        const response = await FetchRoles();
        if (response.data) {
            setRoles(response.data);
            setLoading(false);
        }
        else {
            Error(response.err.data.message);
            setLoading(false);
        }
    }

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    function validForm() {
        return (
            form.role !== '' &&
            form.user_document_type !== '' &&
            form.name !== '' &&
            form.username !== '' &&
            form.email !== '' &&
            form.password !== '' &&
            form.password_confirmation !== ''
        );
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const { fetchUsers } = props;
        if (validForm()) {
            let user = {
                role: form.role,
                name: form.name,
                username: form.username,
                email: form.email,
                password: form.password,
                password_confirmation: form.password_confirmation
            }
            const id = SetLoading("Cargando, por favor espera...");
            const response = await Register(user);
            if (response && response.err) {
                Update(response.err.data.message, id, true, false);
            } else if (response && response.data.success) {
                Update(response.data.message, id, false, true);
                fetchUsers();
                setGoBack(true);
            }
        } else {
            Error('Error en el formulario');
        }
    }
    return (
        (loading) ?
            (
                <div className="spinner-grow text-primary" role="status">
                    <span className="visually-hidden">Cargando</span>
                </div>
            ) : (
                <form className="form login" onSubmit={handleSubmit}>
                    {
                        (goBack) ? <Navigate to='/user' /> : ''
                    }
                    <div className="container">
                        <div className="row">
                            <img src={logo} alt="logo-quickticket" />
                        </div>
                        <div>
                            <h1>{WORDS.LOGIN_user_TITLE}</h1>
                            <select className="form-select" id="role" name="role" onChange={handleChange}>
                                <option key='0' value=''>Selecciona un rol</option>
                                {roles.length > 0 && roles.map((role) => {
                                    return <option key={role.id} value={role.name}>{role.name}</option>
                                })}
                            </select>
                            <input
                                className="form-control"
                                id="name"
                                name="name"
                                onChange={handleChange}
                                value={form.name}
                                placeholder={WORDS.REGISTER_USER_INPUT_NAME} />
                            <input
                                className="form-control"
                                id="username"
                                name="username"
                                onChange={handleChange}
                                value={form.username}
                                placeholder={WORDS.REGISTER_USER_INPUT_USERNAME} />
                            <input
                                className="form-control"
                                type='email'
                                id="email"
                                name="email"
                                onChange={handleChange}
                                value={form.email}
                                placeholder={WORDS.REGISTER_USER_INPUT_EMAIL} />
                            <input
                                type='password'
                                className="form-control"
                                id="password"
                                name="password"
                                onChange={handleChange}
                                value={form.password}
                                placeholder={WORDS.REGISTER_USER_PASSWORD} />
                            <input
                                type='password'
                                className="form-control"
                                id="password_confirmation"
                                name="password_confirmation"
                                onChange={handleChange}
                                value={form.password_confirmation}
                                placeholder={WORDS.REGISTER_USER_PASSWORD_CONFIRMATION} />
                        </div>
                        <div>
                            <button className="btn btn-primary">{WORDS.REGISTER_USER_SUBMIT}</button>
                        </div>
                    </div>
                </form>
            )

    )

}

const mapStateToProps = ({ userReducer }) => userReducer;
export default connect(mapStateToProps, userActions)(CreateUser);