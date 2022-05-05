import React, { useState, useEffect } from "react";
import WORDS from '../../shared/constants/authConst';
import { Link, useParams, useLocation, BrowserRouter as Router, } from 'react-router-dom';
import logo from '../../../../assets/image/logoquixkcard.png';
import './../../../css/loginClient.css';
import { connect } from "react-redux";
import * as userActions from '../../../actions/userActions';
function withParams(Component) {
    return props => <Component {...props} params={useParams()} location={useLocation()} />;
}
const RecoveryPasswordUser = (props) => {
    let [hasToken, setHasToken] = useState(false);
    let [form, setForm] = useState({
        token: '',
        password: '',
        password_confirmation: '',
        email: ''
    });
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
            if (await recoveryPassword(recovery_data)) { 
                console.log('Clave recuperada correctamente')
            };
        }
    }
    function validForm() {
        return (form.email != '' &&
            form.password !== '' &&
            form.password_confirmation !== '' &&
            form.token !== '');
    }

    function checkPassword() {
        return (form.password != '' && form.password === form.password_confirmation);
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

const mapStateToProps = ({ userReducer }) => userReducer;
export default connect(mapStateToProps, userActions)(withParams(RecoveryPasswordUser));