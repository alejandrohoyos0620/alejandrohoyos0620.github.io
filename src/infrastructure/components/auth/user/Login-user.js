import React, { useState } from "react";
import WORDS from '../../shared/constants/authConst';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import logo from '../../../../assets/image/logoquixkcard.png';
import './../../../css/loginClient.css';
import { connect } from "react-redux";
import * as userActions from '../../../actions/userActions';
import { Login } from '../../../../domain/services/userService';
import { Update, SetLoading, Error } from '../../../../domain/services/toastService';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} location={useLocation()} navigate={useNavigate()} />;
}
const LoginUser = (props) => {
    let [form, setForm] = useState({
        email: '',
        password: '',
    });

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (form.email && form.password) {
            let user = {
                password: form.password,
                email: form.email
            }
            const id = SetLoading("Cargando, por favor espera...");
            const response = await Login(user);
            if (response && response.err) {
                Update(response.err.data.message, id, true, false);
            } else if (response && response.data.success) {
                Update(response.data.message, id, false, true);
                props.navigate('/');
            }
        } else {
            Error('Error en el formulario');
        }
    }

    return (
        <form className="form login" onSubmit={handleSubmit}>
            <div className="container">
                <div className="row">
                    <img src={logo} alt="logo-quickticket" />
                </div>
                <div>
                    <h1>{WORDS.LOGIN_USER_TITLE}</h1>
                    <input
                        className="form-control"
                        id="email"
                        name="email"
                        onChange={handleChange}
                        value={form.email}
                        placeholder={WORDS.LOGIN_USER_INPUT_USERNAME} />
                    <input
                        type='password'
                        className="form-control"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        placeholder={WORDS.LOGIN_USER_INPUT_PASSWORD}
                        value={form.password} />
                    <Link to='/user/forgot-password'>Olvidé mi contraseña</Link>
                </div>

                <div>
                    <button className="btn btn-primary">Continuar</button>
                </div>
            </div>
        </form>
    )

}

const mapStateToProps = ({ userReducer }) => userReducer;
export default connect(mapStateToProps, userActions)(withParams(LoginUser));