import './styles/Login.css';

import {useNavigate} from 'react-router-dom'
import {useState, useCallback} from "react";

import {SERVER_URL} from "./App";

export const Login = () => {
    let navigate = useNavigate()
    const [error, setError] = useState(false)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const handleClick = useCallback(() => {
        fetch(`${SERVER_URL}/loginAsAdmin?login=${login}&password=${password}`)
            .then(response => response.json())
            .then(data => {
                if(data.adminKey) {
                    document.cookie = data.adminKey
                    navigate(`/main/${data.adminKey}`)
                } else {
                    setError(true)
                    // Some timeout for button to stay red
                    setTimeout(() => {
                        setError(false)
                    }, 400)
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
                    onChange={changeEvent => setLogin(changeEvent.target.value)}
                />
                <br/>
                <input
                    className='passwordInput'
                    type='password'
                    placeholder = 'Пароль'
                    onChange={changeEvent => setPassword(changeEvent.target.value)}
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