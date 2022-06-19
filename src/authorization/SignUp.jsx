import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import firebase, { firestore } from './../firebase';
import { useError } from './../hooks/useError';
import { addNewUser } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

function SignUp() {

    const auth = getAuth();

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const { error, setError } = useError();

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const onSend = async (event) => {
        event.preventDefault();
        setLoading(true);
        await createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                const user = firebase.auth().currentUser;
                setLoading(false);
                return user.updateProfile({
                    displayName: userName
                })

            }).then(() => {
                const user = firebase.auth().currentUser;
                dispatch(addNewUser(user));
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                switch (errorCode) {
                    case 'auth/invalid-email':
                        setError('Некоректный email');
                        break;
                    case 'auth/weak-password':
                        setError('Слабый пароль');
                        break;
                    default:
                        setError('');
                }
                setLoading(false);
            })
    }

    return (
        <form className="signUp" onSubmit={onSend}>
            <h1>Регистрация</h1>
            <div className="signUp__input">
                <MailOutlineIcon className="signUp__icon" />
                <input type="text" placeholder="Электронный адрес" onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="signUp__input">
                <PersonOutlineIcon className="signUp__icon" />
                <input type="text" placeholder="Имя пользователя" onChange={(e) => setUserName(e.target.value)} required />
            </div>
            <div className="signUp__input">
                <LockOpenIcon className="signUp__icon" />
                <input type="password" placeholder="Пароль" onChange={(e) => setPassword(e.target.value)} required /><br />
            </div>
            <div className="signUp__input">
                <LockOpenIcon className="signUp__icon" />
                <input type="password" placeholder="Повторите пароль" onChange={(e) => setRePassword(e.target.value)} required /><br />
            </div>
            <div style={{ color: 'red' }}>{error && error}</div>

            {/* <label>
                <input type="checkbox" />Запомнить
            </label> */}
            {
                loading ?
                    <button type="submit" style={{ marginTop: '10px', background:'black' }} disabled>Обработка...</button>
                    :
                    <button type="submit" style={{ marginTop: '10px' }}>Зарегистрироваться</button>
            }
            <p>У вас есть аккаунт? <NavLink to="/login/signIn">Войти</NavLink> </p>
        </form>
    )
}

export default SignUp
