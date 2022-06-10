import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import MailOutlineIcon from '@mui/icons-material/MailOutline';


function ResetPassword() {

    const [email, setEmail] = useState('');

    const auth = getAuth();

    const sendPasswordReset = async (e) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
            alert(`На почту ${email} отправлено сброс пароля!`);

        } catch (err) {
            const errorCode = err.code;
            switch (errorCode) {
                case 'auth/user-not-found':
                    alert('Такая почта не зарегистрирована!');
                    break;
                case 'auth/invalid-email':
                    alert('Неверная почта');
                    break;
                default:
                    alert('Неверная почта');
            }
        }
    };

    return (
        <form onSubmit={sendPasswordReset} className="resetPassword">
            <h1>Сброс пароля</h1>
            <div className="resetPassword__input">
                <MailOutlineIcon className="resetPassword__icon" />
                <input type="text" id="email" placeholder="Your email address" onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <button type="submit">Отправить</button>

        </form>

    )
}

export default ResetPassword
