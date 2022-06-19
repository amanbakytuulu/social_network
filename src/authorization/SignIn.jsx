import React, { useState } from 'react';
import { getAuth, signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";
import { Navigate, NavLink, useLocation } from 'react-router-dom';
import Google from "../assets/images/google.png";
import Facebook from "../assets/images/facebook.png";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useError } from './../hooks/useError';
import { firestore } from '../firebase';
import { addNewUser } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

function SignIn() {

    const auth = getAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmptyEmail, setIsEmptyEmail] = useState(false);
    const [isEmptyPassword, setIsEmptyPassword] = useState(false);
    const { error, setError } = useError();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (email.length == '' || password.length == '') {
            setLoading(false);
            setIsEmptyEmail(true);
            setIsEmptyPassword(true);
            return setError('Поля не могут быть пустыми');
        }

        await signInWithEmailAndPassword(auth, email, password).then((user) => {
            setLoading(false);
            setError('');
            setIsEmptyEmail(false);
            setIsEmptyPassword(false);

        }).catch((error) => {
            const errorCode = error.code;
            setLoading(false);
            setIsEmptyEmail(false);
            setIsEmptyPassword(false);
            switch (errorCode) {
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                    setError('Неверный логин или пароль');
                    break;
                case 'auth/invalid-email':
                    setError('Некорректный email');
                    break;
                default:
                    setError('');
            }

        })
    }

    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const res = await signInWithPopup(auth, provider);
            const user = res.user;
            const q = query(collection(firestore, "users"), where("uid", "==", user.uid));
            const docs = await getDocs(q);
            if (docs.docs.length === 0) {
                dispatch(addNewUser(user));
            }
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    const onAuthFacebook = async () => {
        try {
            const provider = new FacebookAuthProvider();
            const res = await signInWithPopup(auth, provider);
            const user = res.user;
            const q = query(collection(firestore, "users"), where("uid", "==", user.uid));
            const docs = await getDocs(q);
            if (docs.docs.length === 0) {
                dispatch(addNewUser(user));
            }
        } catch (err) {
            alert(err.message);
        }
    }


    return (
        <form onSubmit={onSubmit} className="signIn">
            <h1>Авторизация</h1>
            <div className="signIn__input">
                <MailOutlineIcon className="signIn__icon" />
                <input type="text" id="email" style={{ border: `${isEmptyEmail ? '1px solid red' : ''}` }} placeholder="Your email address" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="signIn__input">
                <LockOpenIcon className="signIn__icon" />
                <input type="password" id="password" style={{ border: `${isEmptyPassword ? '1px solid red' : ''}` }} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div style={{ color: 'red' }}>{error && error}</div>
            <div className="signIn__save" style={{ marginBottom: '5px' }}>
                <label>
                    <input type="checkbox" />Запомнить
                    <span className="checkmark"></span>
                </label>
                <NavLink to="/login/resetPassword">
                    <p>Забыли пароль?</p>
                </NavLink>
            </div>
            {
                loading ?
                    <button type="submit" style={{ marginTop: '10px', background: 'black' }} disabled>Подождите...</button>
                    :
                    <button type="submit" style={{ marginTop: '10px' }}>Войти</button>
            }
            <p>Не зарегистрированы? <NavLink to="/login/signUp">Создать аккаунт</NavLink><br />
                или авторизуйтесь через другие соц.сети</p>
            <div style={{ marginTop: '15px' }}></div>
            <button type="button" className="btn__google" onClick={signInWithGoogle}><img src={Google} alt="google" /> Войдите в систему с помощью Google</button>
            <button type="button" className="btn__facebook" onClick={onAuthFacebook}><img src={Facebook} alt="facebook" /> Войдите в систему с помощью Facebook</button>
        </form>

    )
}

export default SignIn
