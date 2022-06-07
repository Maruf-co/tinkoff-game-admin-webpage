import './styles/Login.css';

import {useNavigate} from 'react-router-dom'
import {useState, useCallback} from "react";

import {SERVER_URL} from "./App";

export const Login = () => {
    let login = ''
    let password = ''
    let navigate = useNavigate()
    const [error, setError] = useState(false)

    const handleClick = useCallback(() => {
        fetch(`${SERVER_URL}/loginAsAdmin?login=${login}&password=${password}`)
            .then(response => response.json())
            .then(data => {
                if(data.adminKey) {
                    // console.log('Ok!')
                    document.cookie = data.adminKey
                    navigate(`/main/${data.adminKey}`)
                } else {
                    setError(true)
                    // console.log('Error')
                    // console.log('Login: ' + login + '\nPass: ' + password)
                }
            })

    }, [login, password])


    return (
        <div className='container'>
            <div className='form'>
                <h2>Авторизация</h2>
                <input
                    className='loginInput'
                    type='text'
                    placeholder = 'Логин'
                    onChange={(changeEvent) => {
                        login = changeEvent.target.value;
                    }}
                />
                <br/>
                <input
                    className='passwordInput'
                    type='password'
                    placeholder = 'Пароль'
                    onChange={(changeEvent) => {
                        password = changeEvent.target.value;
                    }}
                />
                <br/>
                {/*{error ? 'errorButton' : 'loginButton'}*/}
                <button className={error ? 'errorButton' : 'loginButton'} onClick={handleClick}>
                    ВХОД
                </button>
            </div>
        </div>
    );
}