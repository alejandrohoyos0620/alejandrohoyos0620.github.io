import React, { useState } from "react";
import WORDS from '../../shared/constants/authConst';
import { Navigate } from 'react-router-dom';
import logo from '../../../../assets/image/logoquixkcard.png';
import './../../../css/loginClient.css';
import { connect } from "react-redux";
import * as clientActions from '../../../actions/clientActions';
import { Register } from '../../../../domain/services/clientService';


import { Update, SetLoading, Error } from '../../../../domain/services/toastService';

const RegisterClient = (props) => {
    let [form, setForm] = useState({
        client_document_type: 'CC',
        client_document: '',
        client_name: '',
        client_lastname: '',
        client_username: '',
        client_address: '',
        client_email: '',
        client_password: '',
        client_phone: '',
        client_password_confirmation: ''
    });
    let [goBack, setGoBack] = useState(false);

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }


    async function handleSubmit(e) {
        e.preventDefault();
        if (validForm() && checkPassword()) {
            let client = {
                client_document_type: form.client_document_type,
                client_document: form.client_document,
                client_name: form.client_name,
                client_username: form.client_username,
                client_address: form.client_address,
                client_email: form.client_email,
                client_password: form.client_password,
                client_phone: form.client_phone,
                client_lastname: form.client_lastname,
                client_password_confirmation: form.client_password_confirmation
            }
            const id = SetLoading("Cargando, por favor espera...");
            const response = await Register(client);
            if (response && response.err) {
                console.log(response.err);
                Update(response.err.data.message, id, true, false);
            } else if (response && response.data.success) {
                Update(response.data.message, id, false, true);
                setGoBack(true);
            }
        }
    }
    function validForm() {
        let valid = true;
        if (!form.client_document_type) {
            valid = false;
            Error('Debes seleccionar un tipo de documento');
        }
        if (!form.client_document) {
            valid = false;
            Error('Debes ingresar documento válido');
        }
        if (!form.client_name) {
            valid = false;
            Error('Debes ingresar un nombre');
        }
        if (!form.client_username) {
            valid = false;
            Error('Debes ingresar un username');
        }
        if (!form.client_address) {
            valid = false;
            Error('Debes ingresar una dirección');
        }
        if (!form.client_phone) {
            valid = false;
            Error('Debes ingresar un teléfono válido');
        }
        if (!form.client_email) {
            valid = false;
            Error('Debes ingresar un correo válido');
        }
        if (!form.client_password) {
            valid = false;
            Error('Debes ingresar un contraseña');
        }
        if (!form.client_password_confirmation) {
            valid = false;
            Error('Debes ingresar la confirmación de la contraseña');
        }
        return valid;
    }
    function checkPassword() {
        if (form.client_password != '' && form.client_password !== form.client_password_confirmation) {
            Error('Las contraseñas no coinciden');
            return false;
        };
        return true
    }
    return (
        <form className="form login" onSubmit={handleSubmit}>
            {
                (goBack) ? <Navigate to='auth/client/login' /> : ''
            }
            <div className="container">
                <div className="row">
                    <img src={logo} alt="logo-quickticket" />
                </div>
                <div>
                    <h1>{WORDS.LOGIN_CLIENT_TITLE}</h1>
                    <select className="form-select" id="client_document_type" name="client_document_type" onChange={handleChange}>
                        <option key='1' value={'CC'}>Cédula de ciudadanía</option>
                        <option key='2' value={'CE'}>Cédula de extranjería</option>
                        <option key='3' value={'TI'}>TI</option>
                    </select>
                    <input
                        className="form-control"
                        id="client_document"
                        name="client_document"
                        onChange={handleChange}
                        value={form.document_number}
                        placeholder={WORDS.REGISTER_CLIENT_INPUT_DOCUMENT} />
                    <input
                        className="form-control"
                        id="client_name"
                        name="client_name"
                        onChange={handleChange}
                        value={form.client_name}
                        placeholder={WORDS.REGISTER_CLIENT_INPUT_NAME} />
                    <input
                        className="form-control"
                        id="client_lastname"
                        name="client_lastname"
                        onChange={handleChange}
                        value={form.client_lastname}
                        placeholder={WORDS.REGISTER_CLIENT_INPUT_LASTNAME} />
                    <input
                        className="form-control"
                        id="client_username"
                        name="client_username"
                        onChange={handleChange}
                        value={form.client_username}
                        placeholder={WORDS.REGISTER_CLIENT_INPUT_USERNAME}
                        minLength="8" />
                    <input
                        className="form-control"
                        id="client_address"
                        name="client_address"
                        onChange={handleChange}
                        value={form.client_address}
                        placeholder={WORDS.REGISTER_CLIENT_INPUT_ADDRESS} />
                    <input
                        className="form-control"
                        id="client_email"
                        name="client_email"
                        onChange={handleChange}
                        value={form.client_email}
                        placeholder={WORDS.REGISTER_CLIENT_INPUT_EMAIL} />
                    <input
                        className="form-control"
                        id="client_phone"
                        name="client_phone"
                        onChange={handleChange}
                        value={form.client_phone}
                        placeholder={WORDS.REGISTER_CLIENT_INPUT_PHONE} />
                    <input
                        type='password'
                        className="form-control"
                        id="client_password"
                        name="client_password"
                        onChange={handleChange}
                        value={form.client_password}
                        minLength="4"
                        maxLength='4' />
                    <input
                        type='password'
                        className="form-control"
                        id="client_password_confirmation"
                        name="client_password_confirmation"
                        onChange={handleChange}
                        value={form.client_password_confirmation}
                        minLength="4"
                        maxLength='4' />
                </div>
                <div>
                    <button className="btn btn-primary">{WORDS.REGISTER_CLIENT_SUBMIT}</button>
                </div>
            </div>
        </form>
    )

}

const mapStateToProps = ({ clientReducer }) => clientReducer;
export default connect(mapStateToProps, clientActions)(RegisterClient);