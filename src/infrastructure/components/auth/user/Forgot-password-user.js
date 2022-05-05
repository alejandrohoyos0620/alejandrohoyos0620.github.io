import React, { useState } from "react";
import WORDS from '../../shared/constants/authConst';
import logo from '../../../../assets/image/logoquixkcard.png';
import './../../../css/loginClient.css';
import { connect } from "react-redux";
import * as userActions from '../../../actions/userActions';

const ForgotPasswordUser = (props) => {
    let [form, setForm] = useState({
        email: ''
    });

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const { forgotPassword } = props;
        if (form.email) {
            let email = {
                email: form.email,
                lang: 'es'
            }
            if (await forgotPassword(email)) { 
                console.log('Correo de recuperación enviado')
            };
        }
    }

    return (
        <form className="form login" onSubmit={handleSubmit}>
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

const mapStateToProps = ({ userReducer }) => userReducer;
export default connect(mapStateToProps, userActions)(ForgotPasswordUser);