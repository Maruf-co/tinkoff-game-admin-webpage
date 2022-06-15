import './styles/RoomCreator.css';

import {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom'

import {SERVER_URL} from "./App";
import {adminKey} from "./MainPage";

export const finalTextTemplate = [
    [
        'я',
        'люблю',
        'пельмени'
    ],
    [
        'ты',
        'победил',
        'друг'
    ],
    [
        'ура',
        'ура',
        'ору'
    ],
    [
        'Спасибо за прохождение игры',
        'Вы сразили всех боссов и достигли десятого уровня!',
        'Подойдите к стенду и заберите свою награду'
    ]
]


export const RoomCreator = () => {
    let navigate = useNavigate()
    const [roomName, setRoomName] = useState('')
    const [finalWordsChosen, setFinalWordsChosen] = useState(0)
    const finalInputPlaceholders = ['верхнее', 'центральное', 'нижнее']
    const locations = ['meadow', 'castle', 'desert', 'winter', 'final']
    const [customFinalText, setCustomFinalText] = useState(finalTextTemplate)
    const [oldRooms, setOldRooms] = useState()
    const [showOldRooms, setShowOldRooms] = useState(false)
    const [presets, setPresets] = useState()

    useEffect(() => {
        fetch(`${SERVER_URL}/getRoomList?adminkey=${adminKey}`)
            .then(response => response.json())
            .then(data => data.error !== 'incorrect admin key.' ? setOldRooms(data) : null)
    }, [])
    useEffect(() => {
        fetch(`${SERVER_URL}/getPresets?adminkey=${adminKey}`)
            .then(response => response.json())
            .then(data => data.error !== 'incorrect admin key.' ? setPresets(data) : null)
    }, [])

    return (
        <div className='roomContainer'>
            <div className='createRoom'>
                <h1>Создать комнату</h1>
                <div className='inputBox'>
                    <div className='inputLines'>
                        <input
                            className='roomName'
                            type='text'
                            placeholder='Введите название комнаты...'
                            onBlur={(changeEvent) => setRoomName(changeEvent.target.value)}
                        />
                        <div className='presetSelector'>
                            <select className='presets' id='existingPresets'>
                                {presets ? presets.map((preset, i)=> {
                                    return (
                                        <option value={`${preset.name}_${i}`} key={`${preset.name}_${i}`}>
                                            {preset.name}
                                        </option>
                                    )
                                }) : null}
                            </select>
                        </div>
                    </div>

                    <button className='create' onClick={() => {
                        const select = document.getElementById('existingPresets');
                        const chosenPreset = select.options[select.selectedIndex].value.split('_');
                        if(roomName !== '') {
                            const finalWords = {
                                customTextAfterSpecificLocation: customFinalText
                            }
                            const options = {
                                method: 'POST',
                                body: JSON.stringify(finalWords),
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }
                            fetch(`${SERVER_URL}/createRoom?roomcode=${roomName}&presetindex=${chosenPreset[1]}&adminkey=${adminKey}`, options)
                            navigate('./create_room', {state:{name: roomName, preset: chosenPreset[0]}})
                        }
                    }}/>
                </div>
                <div className='finalWordsBox'>
                    <div className='finalWordsButtons'>
                        <div className='finalWordsTitle'>
                            Изменить текст наград:
                        </div>
                        {locations.map((el, i) => {
                            if (i !== 0) {
                                return(
                                    <button
                                        key={`${el}_${i}`}
                                        className={finalWordsChosen === i ? `${el}Chosen` : `${el}Button`}
                                        onClick={() => {
                                            finalWordsChosen === i ?
                                                setFinalWordsChosen(0)
                                                :
                                                setFinalWordsChosen(i)}
                                        }/>
                                )
                            }
                        })}
                    </div>
                    {finalWordsChosen !== 0 ?
                        finalInputPlaceholders.map((el, i) => {
                            return(
                                <textarea
                                    key={`${el}_${customFinalText[finalWordsChosen-1][i]}`}
                                    className='finalWordsInput'
                                    // type='text'
                                    placeholder={`Введите ${el} предложение...`}
                                    defaultValue={customFinalText[finalWordsChosen-1][i]}
                                    onBlur={(changeEvent) => {
                                        // rewrite whole customFinalText array after some change made
                                        setCustomFinalText(
                                            customFinalText.map((finalText, j) => {
                                            if (j !== finalWordsChosen-1) { // case when we are not in needed place
                                                return finalText
                                            } else {
                                                return customFinalText[j].map((customFinalWord, k) => {
                                                    return k !== i ? customFinalWord : changeEvent.target.value
                                                })
                                            }})
                                        )
                                    }}
                                />
                            )
                        })
                        :
                        null
                    }
                </div>
            </div>
            {oldRooms && oldRooms.length > 0 ?
                <div>
                    <button className='oldRoomsButton' onClick={() => setShowOldRooms(!showOldRooms)}>
                        Старые комнаты
                    </button>
                    <button className='oldRoomsDownArrow' onClick={() => setShowOldRooms(!showOldRooms)}/>
                    {showOldRooms ? <div className='oldRoomsSecondDownArrow' /> : null}
                </div> : null
            }


            {showOldRooms && oldRooms ? oldRooms.map(oldRoom => {
                return (
                    <div className='oldRoom' key={`${oldRoom.code}_${oldRoom.date}`}>
                        <div className='oldRoomBox' onClick={() => {
                            navigate('./create_room', {state:{name: oldRoom.code, preset: oldRoom.presetName, isNew: false}})
                        }}>
                            <div className='roomNameAndDate'>
                                <div className='roomNameTitle'>{oldRoom.code}</div>
                                <div className='roomDateContainer'>
                                    <div className='roomDate'>{oldRoom.date}</div>
                                </div>
                            </div>
                            <div className='presetNameTitle'>{oldRoom.presetName}</div>
                            <div className='oldRoomLocations'>
                                {locations.map((el, i) => {
                                    return <div className='locationIcons' key={`${el}_${i}`}>
                                        <div className={el} />
                                        <div className='nums'>
                                            {oldRoom.playersReachingSpecificLocation[i]}
                                        </div>
                                    </div>
                                })}

                                <button className='deleteRoom' onClick={() => {
                                    if(window.confirm('Вы точно хотите удалить комнату?')) {
                                        fetch(`${SERVER_URL}/removeRoom?roomcode=${oldRoom.code}&adminkey=${adminKey}`)
                                        document.location.reload(true)
                                    }
                                }} />
                            </div>
                        </div>
                    </div>
                )
            }) : null}

        </div>
    );
}

