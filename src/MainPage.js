import './styles/MainPage.css';

import {Link, useNavigate, useLocation} from "react-router-dom";
// pages
import {RoomCreator} from "./RoomCreator";
import {PresetsCreator} from "./PresetsCreator";
import {useState} from "react";
import {SERVER_URL} from "./App";

export const adminKey = document.cookie.split(';')[0]

export const MainPage = () => {
    let navigate = useNavigate()
    const location = useLocation()
    const [newPass, setNewPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')

    const [passEditorVisibility, setPassEditorVisibility] = useState(false)
    return(
        <div className='container'>
            <div className='innerContainer'>
                <RoomCreator/>
                <PresetsCreator/>
            </div>
            <div className='exit'>
                <div className='exitText' onClick={() => {
                    setPassEditorVisibility(true)
                }}>
                    [Редактировать пароль]
                </div>
                <Link className='exitText' to='/'>
                    [Выйти из аккаунта]
                </Link>
            </div>
            {passEditorVisibility ?
                <div className='editPassPopup'>
                    <div className='editPopupContent'>
                        <input
                            className='passInput'
                            type='password'
                            placeholder='Введите новый пароль...'
                            onBlur={(changeEvent) => setNewPass(changeEvent.target.value)}
                        />
                        <input
                            className='passInput'
                            type='password'
                            placeholder='Подтвердите новый пароль...'
                            onChange={(changeEvent) => setConfirmPass(changeEvent.target.value)}
                        />
                        <div className='savePopupButtons'>
                            <button className='save' onClick={() => {
                                if(!newPass || newPass !== confirmPass) {
                                    alert('Пароли не совпадают! Попробуйте снова')
                                } else {
                                    console.log('New pass', newPass)
                                    console.log('adminKey', adminKey)
                                    fetch(`${SERVER_URL}/changePassword?adminkey=${location.state.pass}&newpassword=${newPass}`)
                                        .then(response => response.json())
                                        .then(data => console.log(data, adminKey))
                                    alert('Пароль обновлён!')
                                    setPassEditorVisibility(false)
                                }
                            }}>
                                Сохранить
                            </button>
                            <button className='cancel' onClick={() =>setPassEditorVisibility(false)}>
                                {adminKey}
                            </button>
                        </div>
                    </div>
                </div>
                :
                null
            }
        </div>
    );
}