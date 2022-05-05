import React, { useState } from "react";
import WORDS from '../../shared/constants/authConst';
import logo from '../../../../assets/image/logoquixkcard.png';
import './../../../css/loginClient.css';
import { connect } from "react-redux";
import * as clientActions from '../../../actions/clientActions';
import { ForgotPassword } from '../../../../domain/services/clientService';
import { Navigate } from 'react-router-dom';

import { Update, SetLoading, Error } from '../../../../domain/services/toastService';

const ForgotPasswordClient = (props) => {
    let [form, setForm] = useState({
        email: ''
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
        if (hasEmailFormValid()) {
            let email = {
                email: form.email,
                lang: 'es'
            }
            const id = SetLoading("Cargando, por favor espera...");
            const response = await ForgotPassword(email);
            if (response && response.err) {
                Update(response.err.data.message, id, true, false);

            } else if (response && response.data.success) {
                Update(response.data.message, id, false, true);
                setGoBack(true);
            }
        }
    }
    function hasEmailFormValid() {
        if (!form.email) {
            Error('Debes ingresar un correo válido');
            return false;
        }
        return true;
    }

    return (
        <form className="form login" onSubmit={handleSubmit}>
            {
                (goBack) ? <Navigate to='/' /> : ''
            }
            <div className="container">
                <div className="row">
                    <img src={logo} alt="logo-quickticket" />
                </div>
                <div>
                    <h1>
                        {WORDS.FORGOT_CLIENT_TITLE}
                    </h1>
                    <input
                        type='email'
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder={WORDS.FORGOT_CLIENT_INPUT_EMAIL}
                        onChange={handleChange}
                        value={form.email} />
                    <div>
                        <button className="btn btn-primary">{WORDS.FORGOT_CLIENT_SUBMIT}</button>
                    </div>
                </div>
            </div>
        </form>
    )

}

const mapStateToProps = ({ clientReducer }) => clientReducer;
export default connect(mapStateToProps, clientActions)(ForgotPasswordClient);