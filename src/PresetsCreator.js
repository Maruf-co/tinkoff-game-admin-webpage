import './styles/PresetsCreator.css';
import {useNavigate} from 'react-router-dom'
import {useState, useEffect} from "react";

import {hashCode} from "./MakePresetPage";
import {SERVER_URL} from "./App";
import {adminKey} from "./MainPage";


export const PresetsCreator = () => {
    let navigate = useNavigate()
    const [presets, setPresets] = useState()
    const [doesReload, setReload] = useState(false)
    const [newPresetData, setNewPresetData] = useState({ID: -1, isChanged: false, name: '', length: -1})

    useEffect(() => {
        fetch(`${SERVER_URL}/getPresets?adminkey=${adminKey}`)
            .then(response => response.json())
            .then(data => data.error !== 'incorrect admin key.' ? setPresets(data) : null)
    }, [adminKey])
    
    const updatePresets = () => {
        fetch(`${SERVER_URL}/getPreset?presetindex=${newPresetData.ID}&adminkey=${adminKey}`)
            .then(response => response.json())
            .then(data => {
                if(data.error !== 'incorrect admin key.' && data.error !== 'incorrect index'
                    && newPresetData.isChanged) {
                        fetch(`${SERVER_URL}/createPreset?presetname=${newPresetData.name}&adminkey=${adminKey}`)
                        const options = {
                            method: 'POST',
                            body: JSON.stringify(data),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                        fetch(`${SERVER_URL}/setPreset?adminkey=${adminKey}&presetindex=${newPresetData.length}`, options)
                    setNewPresetData({ID: -1, isChanged: false, name: '', length: -1})
                }
            })
    }
    useEffect(updatePresets, [adminKey, newPresetData])


    const reload = () => {
        document.location.reload(true)
        setReload(false)
    }

    return (
      <div className='presetsContainer'>
          <h1>Пресеты вопросов</h1>
          <hr/>
          <button className='createPreset' onClick={() => {
              navigate('./create_preset', {state:{presetID: presets.length.toString(), isNew: true}})
          }}>
              <div className='createPresetTitle'> + Создать пресет </div>
          </button>

          {presets ? presets.map((preset, i) => {return <div className='presetCell'
                                                             key={`${preset.name}_${hashCode(Math.random().toString())}`}>
                  <div className='presetBox' onClick={() => {
                      navigate('./create_preset', {state:{presetID: presets.indexOf(preset).toString(), isNew: false}})
                  }}>
                      <div className='presetTitleAndDate'>
                          <div className='presetTitle'>{preset.name}</div>
                          <div className='presetDateContainer'>
                              <div className='presetDate'>{preset.date}</div>
                          </div>
                      </div>
                      <div className='attackTypes'>
                          {preset.attackTypes.map((attackType, i) => {
                              return <div className='attackType' key={attackType}>
                                  <div>{attackType}</div>
                                  <div>({preset.attackTypeCounts[i]})</div>
                              </div>
                          })}
                      </div>
                  </div>
                  <div className='options'>
                      <button className='copy' onClick={() => {
                          setNewPresetData({isChanged: true, ID: i, name: preset.name, length: presets.length})
                          alert('Пресет скопирован! Обновите страницу')
                      }}/>
                      <button className='delete' onClick={() => {
                          if(window.confirm('Вы точно хотите удалить пресет?')) {
                              fetch(`${SERVER_URL}/removePreset?presetindex=${i}&adminkey=${adminKey}`)
                              setReload(true)
                          }
                      }}/>
                  </div>
              </div>
          }) : null}
          {doesReload ? reload() : null}
      </div>
    );
}