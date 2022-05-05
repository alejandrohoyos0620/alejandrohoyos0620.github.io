import React, { useState } from "react";
import WORDS from '../../shared/constants/authConst';
import { Link, useParams, useLocation, use, useNavigate } from 'react-router-dom';
import logo from '../../../../assets/image/logoquixkcard.png';
import './../../../css/loginClient.css';
import { connect } from "react-redux";
import * as clientActions from '../../../actions/clientActions';
import { Login, VerifyDocument } from '../../../../domain/services/clientService';

import { Update, SetLoading, Error } from '../../../../domain/services/toastService';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} location={useLocation()} navigate={useNavigate()} />;
}
const LoginClient = (props) => {
    let [isVerified, setIsVerified] = useState(false);
    let [form, setForm] = useState({
        document_type: 'CC',
        document_number: '',
        password: '',
    });

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (hasDocumentFormValid()) {
            validateDocument();
        } else if (hasCredentialsFormValid()) {
            loginUser();
        }
    }
    function hasDocumentFormValid() {
        let valid = true;
        console.log(form.document_type);
        if (!isVerified) {
            if (!form.document_type) {
                valid = false;
                Error('Debes seleccionar un tipo de documento');
            }
            if (!form.document_number) {
                valid = false;
                Error('Debes ingresar un documento válido');
            }
        } else return false;

        return valid;
    }
    function hasCredentialsFormValid() {
        let valid = true;
        if (isVerified) {
            if (!form.password) {
                valid = false;
                Error('Debes ingresar una contraseña');
            }
        } else return false;
        return valid
    }
    async function validateDocument() {
        let document = {
            document_type: form.document_type,
            document_number: form.document_number
        }
        const response = await VerifyDocument(document);
        if (response && response.err) {
            Error(response.err.data.message);
        } else if (response && response.data.success) {
            setIsVerified(true);
        }
    }
    async function loginUser() {
        let client = {
            password: form.password,
            document_number: form.document_number
        }
        const id = SetLoading("Cargando, por favor espera...");
        const response = await Login(client);
        if (response && response.err) {
            Update(response.err.data.message, id, true, false);
        } else if (response && response.data.success) {
            Update(response.data.message, id, false, true);
            props.navigate('/');
        }
    }
    return (
        <form className="form login" onSubmit={handleSubmit}>
            <div className="container">
                <div className="row py-4 justify-content-center">
                    <img className="w-50" src={logo} alt="logo-quickticket" />
                </div>
                {!isVerified ? (
                    <div className="row justify-content-center">
                        <h1 className="text-center my-4">{WORDS.LOGIN_CLIENT_TITLE}</h1>
                        <div className="px-5 container-form">
                            <select className="form-select" id="document_type" name="document_type" onChange={handleChange}>
                                <option key='1' value={'CC'}>Cédula de ciudadanía</option>
                                <option key='2' value={'CE'}>Cédula de extranjería</option>
                                <option key='3' value={'TI'}>TI</option>
                            </select>
                            <input
                                className="form-control"
                                id="document_number"
                                name="document_number"
                                onChange={handleChange}
                                value={form.document_number}
                                placeholder={WORDS.LOGIN_CLIENT_INPUT_IDENTIFIER_NUMBER} />
                        </div>
                    </div>
                ) : (
                    <div>
                        <h1 className="text-center my-5">
                            Ingresa tu clave
                        </h1>
                        <div className="px-5 container-form">
                            <input
                                type='password'
                                className="form-control"
                                id="password"
                                name="password"
                                onChange={handleChange}
                                value={form.password}
                                minLength="4"
                                maxLength='4' />
                            <Link to='/auth/client/forgot-password'>Olvidé mi contraseña</Link>

                        </div>
                    </div>
                )}

                <div className="d-flex justify-content-center py-5">
                    <button className="btn btn-primary px-5">Continuar</button>
                </div>
                {!isVerified ? (
                    <div className="div-buttons">
                        <p>¿No eres miembro?</p>
                        <Link to=''>Solicita tu tarjeta ya</Link>
                        <Link to='/auth/client/register'>Registrate</Link>

                    </div>
                ) : ('')
                }
            </div>
        </form>
    )

}

const mapStateToProps = ({ clientReducer }) => clientReducer;
export default connect(mapStateToProps, clientActions)(withParams(LoginClient));