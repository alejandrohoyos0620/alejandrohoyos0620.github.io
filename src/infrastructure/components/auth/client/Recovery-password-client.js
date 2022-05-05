import React, { useState, useEffect } from "react";
import WORDS from '../../shared/constants/authConst';
import { Link, useParams, useLocation, BrowserRouter as Router, useNavigate, } from 'react-router-dom';
import logo from '../../../../assets/image/logoquixkcard.png';
import './../../../css/loginClient.css';
import { connect } from "react-redux";
import * as clientActions from '../../../actions/clientActions';
import { RecoveryPassword } from '../../../../domain/services/clientService';

import { Update, SetLoading, Error } from '../../../../domain/services/toastService';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} location={useLocation()} navigate={useNavigate()} />;
}

const RecoveryPasswordClient = (props) => {
    let [hasToken, setHasToken] = useState(false);
    let [form, setForm] = useState({
        token: '',
        password: '',
        password_confirmation: '',
        email: ''
    });
    //FUNCIÓN PARA OBTENER LOS QUERY PARAMS.
    function useQuery() {
        const { search } = useLocation();
        return React.useMemo(() => new URLSearchParams(search), [search]);
    }
    let query = useQuery();

    useEffect(() => {
        const token = query.get('token');
        if (token) {
            setHasToken(true);
            form.token = token;
        }
    }, []);

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const { recoveryPassword } = props;
        if (validForm() && checkPassword()) {
            let recovery_data = {
                email: form.email,
                password: form.password,
                password_confirmation: form.password_confirmation,
                token: form.token,
            }

            const id = SetLoading("Cargando, por favor espera...");
            const response = await RecoveryPassword(recovery_data);
            if (response && response.err) {
                Update(response.err.data.message, id, true, false);
            } else if (response && response.data.success) {
                Update(response.data.message, id, false, true);
                props.navigate('/auth/client/login');
            }
        }
    }
    function validForm() {
        let valid = true;
        if (!form.email) {
            valid = false;
            Error('Debes ingresar un correo válido');
        }
        if (!form.password) {
            valid = false;
            Error('Debes ingresar un contraseña');
        }
        if (!form.password_confirmation) {
            valid = false;
            Error('Debes ingresar la confirmación de la contraseña');
        }
        if (!form.token) {
            valid = false;
        }
        return valid;
    }
    function checkPassword() {
        if (form.password != '' && form.password !== form.password_confirmation) {
            Error('Las contraseñas no coinciden');
            return false;
        };
        return true
    }

    return (
        <form className="form login" onSubmit={handleSubmit}>
            <div className="container">
                <div className="row">
                    <img src={logo} alt="logo-quickticket" />
                </div>
                {(hasToken) ? (
                    <div>
                        <h1>{WORDS.RECOVERY_CLIENT_PASSWORD}</h1>
                        <input
                            type='email'
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder={WORDS.RECOVERY_CLIENT_INPUT_EMAIL}
                            onChange={handleChange}
                            value={form.email} />
                        <input
                            type='password'
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder={WORDS.RECOVERY_CLIENT_INPUT_PASSWORD}
                            onChange={handleChange}
                            value={form.password}
                            minLength="4"
                            maxLength='4' />
                        <input
                            type='password'
                            className="form-control"
                            id="password_confirmation"
                            name="password_confirmation"
                            placeholder={WORDS.RECOVERY_CLIENT_INPUT_PASSWORD_CONFIRMATION}
                            onChange={handleChange}
                            value={form.password_confirmation}
                            minLength="4"
                            maxLength='4' />
                        <div>
                            <button className="btn btn-primary">{WORDS.RECOVERY_CLIENT_SUBMIT}</button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h1>{WORDS.RECOVERY_CLIENT_NOT_FOUND_TOKEN}</h1>
                        <div>
                            <Link to='/client/forgot-password'>
                                <button className="btn btn-primary">
                                    {WORDS.RECOVERY_CLIENT_SUBMIT}
                                </button>
                            </Link>
                        </div>
                    </div>
                )}

            </div>
        </form>
    )

}

const mapStateToProps = ({ clientReducer }) => clientReducer;
export default connect(mapStateToProps, clientActions)(withParams(RecoveryPasswordClient));