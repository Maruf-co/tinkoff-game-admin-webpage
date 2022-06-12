import './styles/RoomCreator.css';

import {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom'

import {SERVER_URL} from "./App";


export const RoomCreator = () => {
    let roomName = ''
    let navigate = useNavigate()
    const adminKey = document.cookie.split(';')[0]
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
                            onChange={(changeEvent) => {
                                roomName = changeEvent.target.value;
                            }}
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
                            navigate('./create_room', {state:{name: roomName, preset: chosenPreset[0], presetID: chosenPreset[1], isNew: true}})
                        }
                    }}/>

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
                                <div className='meadow' />
                                <div className='nums'> {oldRoom.playersReachingSpecificLocation[0]} </div>
                                <div className='castle' />
                                <div className='nums'> {oldRoom.playersReachingSpecificLocation[1]} </div>
                                <div className='desert' />
                                <div className='nums'> {oldRoom.playersReachingSpecificLocation[2]} </div>
                                <div className='winter' />
                                <div className='nums'> {oldRoom.playersReachingSpecificLocation[3]} </div>
                                <div className='final' />
                                <div className='nums'> {oldRoom.playersReachingSpecificLocation[4]} </div>
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

