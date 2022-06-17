import './styles/MainPage.css';

import {Link, useNavigate} from "react-router-dom";
// pages
import {RoomCreator} from "./RoomCreator";
import {PresetsCreator} from "./PresetsCreator";
import {useState} from "react";
import {SERVER_URL} from "./App";

export const adminKey = document.cookie.split(';')[0]

export const MainPage = () => {
    let navigate = useNavigate()
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
                <div className='exitText' onClick={() => setPassEditorVisibility(true)}>
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
                                    alert('Ffofofof')
                                } else {
                                    // console.log('New pass', newPass)
                                    fetch(`${SERVER_URL}/changePassword?adminkey=${adminKey}&newpassword=${newPass}`)
                                        .then(response => response.json())
                                        .then(data => console.log(data))
                                    alert('Пароль обновлён!')
                                    setPassEditorVisibility(false)
                                }
                            }}>
                                Сохранить
                            </button>
                            <button className='cancel' onClick={() => setPassEditorVisibility(false)}>
                                Отменить
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