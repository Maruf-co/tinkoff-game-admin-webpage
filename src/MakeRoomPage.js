import './styles/MakeRoomPage.css'

import {useNavigate, useLocation, Link} from 'react-router-dom'
import {useState, useEffect} from "react";

import {SERVER_URL} from "./App";


export const MakeRoomPage = () => {
    let navigate = useNavigate()
    const location = useLocation()
    const adminKey = document.cookie.split(';')[0]
    const [leaderboard, setLeaderboard] = useState()
    const [mailPopUp, setMailPopUp] = useState(false)
    let [level, setLevel] = useState(0);

    useEffect(() => {
        fetch(`${SERVER_URL}/getLeaderboard?roomcode=${location.state.name}`)
            .then(response => response.json())
            .then(data => data.error !== 'incorrect roomcode' ? setLeaderboard(data) : null)
    }, [])


    return(
        <div className = 'container'>
            <h1>{location.state.name}</h1>
            <hr/>

            <h2>{location.state.preset}</h2>
            <div className = 'QRCode'>
                <img
                    src={`https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=https://tinkoff-quest-test-server.herokuapp.com/play?code=${location.state.name}`}
                    alt="roomQR"
                />
            </div>

            <div className='leaderboard'>
                <div className='leaderboardItem'>
                    <div className='levelTitle'>Уровень</div>
                    <div className='playerTitle'>Игрок</div>
                    <div className='mediumTitleBox'>
                        <div className='mediumTitle'>
                            {leaderboard ? leaderboard.attackTypes[0]: 'Название комнаты 1'}
                        </div>
                    </div>
                    <div className='mediumTitleBox'>
                        <div className='mediumTitle'>
                            {leaderboard ? leaderboard.attackTypes[1]: 'Название комнаты 2'}
                        </div>
                    </div>
                    <div className='mediumTitleBox'>
                        <div className='mediumTitle'>
                            {leaderboard ? leaderboard.attackTypes[2]: 'Название комнаты 3'}
                        </div>
                    </div>
                </div>
                <hr />
                {leaderboard ? leaderboard.players.map(player => { return <div>
                        <div className='leaderboardItem'>
                            <div className='playerLevel'>{player.level}</div>
                            <div className='playerContacts'>
                                <div className='playerName'>{player.name}</div>
                                <div className='playerMail'>{player.mail}</div>
                            </div>
                            {player.attackTypeToCorrectAnswers.map((correctCount, i) => {
                                return <div className='playerStats'>
                                    <div className='winRate'>{correctCount}</div>/
                                    <div className='loseRate'>{player.attackTypeToIncorrectAnswers[i]}</div>
                                </div>
                            })}
                        </div>
                        <hr className='nextLine'/>
                    </div>

                }) : null}

            </div>
            <div className='buttons'>
                <button className='back' onClick={() => {
                    if(location.state.isNew) {
                        fetch(`${SERVER_URL}/createRoom?roomcode=${location.state.name}&presetindex=${location.state.presetID}&adminkey=${adminKey}`)
                    }
                    navigate(`/main/${adminKey}`)
                }}>
                        Вернуться и сохранить
                </button>

                <button className='hide' onClick={ () => {
                    let x = document.querySelector('.QRCode').style;
                    x.display === "none" ? x.display = "block" : x.display = "none"
                }}>
                    Скрыть QR
                </button>
                <button className='save' onClick={() => {
                    setMailPopUp(true)
                }}>
                    Сохранить почты
                </button>
            </div>

            {mailPopUp ? <div className='savePopup'>
                <div className='savePopupContent'>
                    <h2>От какого уровня?</h2>
                    <button className='upArrow' onClick={() => setLevel(level < 10 ? (level+1) : 10)} />
                    <div className='mailLevel'>{level}</div>
                    <button className='downArrow' onClick={() => {setLevel(level > 0 ? (level-1) : 0)}} />
                    <div className='savePopupButtons'>
                        <button className='saveMails' onClick={() => {
                            if(leaderboard) {
                                let emails = '';
                                leaderboard.players.map(player => {
                                    if(player.level >= level) {
                                        emails += player.mail + ' '
                                    }
                                })
                                navigator.clipboard.writeText(emails)
                                    .then(() => {window.alert('Почты сохранены в бумер обмена')},
                                        () => {window.alert('Что-то пошло не так...')})
                            }
                        }}>
                            Сохранить
                        </button>
                        <button className='cancel' onClick={() => setMailPopUp(false)}>Отменить</button>
                    </div>
                </div>
            </div> : null}
        </div>
    );
}