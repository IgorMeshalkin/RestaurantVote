import React, {useContext, useEffect, useRef, useState} from 'react';
import cl from './LoginAndRegistrationForm.module.css'
import RegularButton from "../UI/RegularButton/RegularButton";
import InputPassword from "../UI/InputPassword/InputPassword";
import InputText from "../UI/InputText/InputText";
import {AuthContext} from "../../context/context";
import AuthAPI from "../../API/AuthAPI";
import {useNavigate} from "react-router-dom";
import pizza from '../../images/loader/pizza1.png'
import {validateCredentialsForRegistration} from "../../utils/credentials";

const LoginAndRegistrationForm = () => {
    const {setCurrentUser} = useContext(AuthContext)

    const navigate = useNavigate();

    const backgroundRef = useRef()
    const inputFirstNameRef = useRef()
    const inputLastNameRef = useRef()
    const inputLoginRef = useRef()
    const inputFirstPasswordRef = useRef()
    const inputSecondPasswordRef = useRef()

    const [isPizzaRotate, setIsPizzaRotate] = useState(false)
    const [isRegistration, setIsRegistration] = useState(false)
    const [errorMessage, setErrorMessage] = useState()

    useEffect(() => {
        isRegistration ?
            backgroundRef.current.setAttribute('style', 'height:400px') :
            backgroundRef.current.setAttribute('style', 'height:200px')
    }, [isRegistration])

    function changeShape() {
        setIsRegistration(!isRegistration)
        setErrorMessage(null)
        setIsPizzaRotate(false)
    }

    async function submit() {
        if (isRegistration) {
            const validationResult = validateCredentialsForRegistration(
                inputLoginRef.current.value,
                inputFirstPasswordRef.current.value,
                inputSecondPasswordRef.current.value
            )
            if (!validationResult) {
                await AuthAPI.registration(
                    inputFirstNameRef.current.value,
                    inputLastNameRef.current.value,
                    inputLoginRef.current.value,
                    inputFirstPasswordRef.current.value
                ).then(
                    (response) => successfulLogin(response.data),
                    (response) => {
                        if (response.response.status === 400 && response.response.headers['username-is-duplicate'] === '1') {
                            setErrorMessage('Пользователь с таким логином уже есть.')
                        } else {
                            setErrorMessage('Непредвиденная ошибка сервера. Повторите попытку позже.')
                        }
                    }
                )
            } else {
                setErrorMessage(validationResult)
            }

        } else {
            await AuthAPI.login(
                inputLoginRef.current.value,
                inputFirstPasswordRef.current.value
            ).then(
                (response) => successfulLogin(response.data),
                () => setErrorMessage('Не верные учётные данные'))
        }
    }

    function successfulLogin(user) {
        setCurrentUser(user)
        navigate(-1)
    }

    function Pizza() {
        return (
            <img
                src={pizza}
                className={isPizzaRotate ? cl.lrPizzaRotate : cl.lrPizza}
            />
        );
    }

    return (
        <div className={cl.background} ref={backgroundRef}>
            <Pizza/>
            <div className={cl.entrance}>
                {isRegistration ? 'Регистрация' : 'Вход в аккаунт'}
            </div>

            {isRegistration &&
                <InputText
                    ref={inputFirstNameRef}
                    placeholder={'Введите ваше имя'}
                />
            }

            {isRegistration &&
                <InputText
                    ref={inputLastNameRef}
                    placeholder={'Введите вашу фамилию'}
                />
            }

            <InputText
                ref={inputLoginRef}
                placeholder={isRegistration ? 'Придумайте логин' : 'Введите логин'}
            />

            <InputPassword
                inputRef={inputFirstPasswordRef}
                placeholder={isRegistration ? 'Придумайте пароль' : 'Введите пароль'}
            />

            {isRegistration &&
                <InputPassword
                    inputRef={inputSecondPasswordRef}
                    placeholder={'Повторите пароль'}
                />
            }

            <div className={cl.setFormTypeButton}
                 onClick={changeShape}>
                {isRegistration ? 'Вход в аккаунт' : 'Регистрация'}
            </div>
            <div className={cl.submitButtonContainer}>
                <RegularButton
                    onClick={submit}>
                    {isRegistration ? 'Зарегистрироваться' : 'Войти'}
                </RegularButton>
            </div>
            {
                errorMessage &&
                <div className={cl.errorMessage}>{errorMessage}</div>
            }
        </div>
    );
};

export default LoginAndRegistrationForm;