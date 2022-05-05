import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as userActions from '../actions/userActions';
import iconUser from '../../assets/image/icon-user.png';
import WORDS from '../components/shared/constants/pageConst';
import { UpdateUser } from '../../domain/services/userService';
import { Update, SetLoading, Error } from '../../domain/services/toastService';



const UserInfo = (props) => {
    const { fetchUsers, users, fetchUserLogged, userLogged } = props;
    let [editable, setEditable] = useState(false);
    let [form, setForm] = useState({
        client_document_type: 'CC',
        client_document: '',
        client_name: '',
        client_lastname: '',
        client_username: '',
        client_address: '',
        client_phone: ''
    });
    useEffect(() => {
        // fetchUsers();

        refreshFormInfo()
        // console.log(users);

    }, userLogged.client_name);

    async function refreshFormInfo(){
        
        const id = SetLoading("Cargando, por favor espera...");
        await fetchUserLogged(id);
        console.log(userLogged);
        setForm({
            ...form,
            client_name: userLogged.client_name
        })
    }
    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    function validForm() {
        return (form.client_document_type !== '' &&
            form.client_document !== '' &&
            form.client_name !== '' &&
            form.client_username !== '' &&
            form.client_address !== '' &&
            form.client_phone !== '');
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (validForm()) {
            let clientUpdate = {
                client_document_type: form.client_document_type,
                client_document: form.client_document,
                client_name: form.client_name,
                client_username: form.client_username,
                client_address: form.client_address,
                client_phone: form.client_phone
            }
            const id = SetLoading("Cargando, por favor espera...");
            const response = await UpdateUser(clientUpdate, 1);
            if (response && response.err) {
                console.log(response.err);
                Update(response.err.data.message, id, true, false);
            } else if (response && response.data.success) {
                Update(response.data.message, id, false, true);
            }
        } else {
            Error('Error en el formulario');
        }
    }


    const userInfo = () => {
        if (userLogged) {
            return (
                <div className="col-9">
                    <div className="row">{userLogged.client_name}</div>
                    <div className="row">{userLogged.client_lastname}</div>
                    <div className="row">{userLogged.CC}</div>
                    <div className="row">{userLogged.client_document_type}</div>
                    <div className="row">{userLogged.client_address}</div>
                    <div className="row">{userLogged.client_email}</div>
                    <div className="row">{userLogged.client_phone}</div>
                </div>
            )

            // users.map((user) => {
            //     return <tr key={user.id_user}>
            //         <td>{user.id_user}</td>
            //         <td>{user.name}</td>
            //         <td>{user.username}</td>
            //         <td>{user.phone}</td>
            //         <td>{user.email}</td>
            //         <td>{user.status}</td>
            //     </tr>
            // })
        }
    }

    console.log(props);
    console.log(form);
    return (
        <div className="container h-100 d-flex justify-content-center align-items-center flex-column" >
            <h1>{WORDS.USER_INFO_TITLE}</h1>
            {(editable) ? (
                <form className="form" onSubmit={handleSubmit}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-3">
                                <img className="img-fluid" src={iconUser}></img>
                            </div>
                            <div className="col-9">
                                {/* <input
                                className="form-control"
                                id="client_document_type"
                                name="client_document_type"
                                onChange={handleChange}
                                value={form.client_document_type}
                                placeholder={WORDS.USER_INFO_CLIENT_INPUT_DOCUMENT} /> */}
                                <input
                                    className="form-control"
                                    id="client_document"
                                    name="client_document"
                                    onChange={handleChange}
                                    value={form.client_document}
                                    placeholder={WORDS.USER_INFO_CLIENT_INPUT_DOCUMENT} />
                                <input
                                    className="form-control"
                                    id="client_name"
                                    name="client_name"
                                    onChange={handleChange}
                                    value={form.client_name}
                                    placeholder={WORDS.USER_INFO_CLIENT_INPUT_NAME} />
                                <input
                                    className="form-control"
                                    id="client_lastname"
                                    name="client_lastname"
                                    onChange={handleChange}
                                    value={form.client_lastname}
                                    placeholder={WORDS.USER_INFO_CLIENT_INPUT_LASTNAME} />
                                <input
                                    className="form-control"
                                    id="client_username"
                                    name="client_username"
                                    onChange={handleChange}
                                    value={form.client_username}
                                    placeholder={WORDS.USER_INFO_CLIENT_INPUT_USERNAME} />
                                <input
                                    className="form-control"
                                    id="client_address"
                                    name="client_address"
                                    onChange={handleChange}
                                    value={form.client_address}
                                    placeholder={WORDS.USER_INFO_CLIENT_INPUT_ADDRESS} />
                                <input
                                    className="form-control"
                                    id="client_phone"
                                    name="client_phone"
                                    onChange={handleChange}
                                    value={form.client_phone}
                                    placeholder={WORDS.USER_INFO_CLIENT_INPUT_PHONE} />
                            </div>
                        </div>
                        <button className="btn btn-primary" type="submit">
                            {WORDS.USER_INFO_CLIENT_SUBMIT}
                        </button>
                    </div>
                </form>
            ) : (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3">
                            <img className="img-fluid" src={iconUser}></img>
                        </div>
                        {userInfo()}
                    </div>
                    <button className="btn btn-primary" onClick={() => setEditable(true)}>
                        Editar
                    </button>
                </div>
            )}
        </div >
    )
}
const mapStateToProps = ({ userReducer }) => userReducer;

export default connect(mapStateToProps, userActions)(UserInfo);