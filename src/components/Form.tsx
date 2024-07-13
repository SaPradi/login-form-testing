import React, { useState } from 'react';
import useCustomForm from '../hooks/useForm';
import '../styles/form.css';

import Tittle from './Tittle';

interface FormData {
    username: string;
    password: string;
}

const validate = (values: FormData) => {
    const errors: { [key: string]: string | undefined } = {};
    if (!values.username) {
        errors.username = 'Username is required';
    } else if (values.username.length < 4) {
        errors.username = 'Username must be at least 4 characters long';
    } else if (values.username.length > 20) {
        errors.username = 'Username cannot exceed 20 characters';
    } else if (['admin', 'root', 'santy'].includes(values.username)) {
        errors.username = 'Username not available!';
    }

    if (!values.password) {
        errors.password = 'Password is required';
    } else if (values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters long';
    } else if (values.password.length > 20) {
        errors.password = 'Password cannot exceed 20 characters';
    } else if (!/^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,20}$/.test(values.password)) {
        errors.password = 'Password must need contain one special character';
    }

    return errors;
};

const Form: React.FC = () => {
    const { values, errors, handleChange, handleSubmit, reset } = useCustomForm({ username: '', password: '' }, validate);

    const [showPwd, setShowPwd] = useState<boolean>(false);
    const [loading,setLoading] = useState<boolean>(false);

    const handleEye = (): void => {
        setShowPwd((prev) => !prev);
    };

    const submit = (): void => {
        setLoading(true);
        console.log(values);
        setTimeout(() => {
            alert(JSON.stringify(values));
            reset();
            setLoading(false);
        }, 600);
    };

    return (
        <div className='container'>
            <Tittle />
            <form onSubmit={handleSubmit(submit)} className='container__form'>
                <input
                    aria-label="username"
                    className={`container__form__field ${errors.username ? 'container__form__field--error' : ''}`}
                    disabled={loading}
                    type="text"
                    id='username'
                    name='username'
                    placeholder='Username'
                    value={values.username}
                    onChange={handleChange}
                />
                <span className='container__form__error'>
                    {errors.username && (
                        <div className='form__error__content'>
                            <img className='form__error__icon' src="src/assets/errorIcon.png" alt="" />
                            <p>{errors.username}</p>
                        </div>
                    )}
                </span>

                <div className='container__form__field__password'>
                    <input
                        aria-label="password"
                        className={`container__form__field ${errors.password ? 'container__form__field--error' : ''}`}
                        type={showPwd ? 'text' : 'password'}
                        placeholder='Password'
                        disabled={loading}
                        id="password"
                        name='password'
                        value={values.password}
                        onChange={handleChange}
                    />
                    <div onClick={handleEye} className="form__field_password">
                        <img className='field__password__icon' src={showPwd ? 'src/assets/IconoirEyeClosed.png' : 'src/assets/IconoirEye.png'} alt="" />
                    </div>
                </div>

                <span className={`container__form__error ${errors.password ? 'container__form__error--warning' : ''}`}>
                    {errors.password && (
                        <div className='form__error__content'>
                            <img className='form__error__icon' src={`src/assets/errorIcon.png`} alt="" />
                            <p>{errors.password}</p>
                        </div>
                    )}
                </span>

                <button disabled={loading} className='container__form__button' name='submit_button'>
                    {loading ? <img className='container__form__button__loading' src="src/assets/loading.svg" alt="" /> : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default Form;