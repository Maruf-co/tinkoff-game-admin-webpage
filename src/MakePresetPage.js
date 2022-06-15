import './styles/MakePresetPage.css';
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

import {QuestionBox} from "./QuestionBox";

import {SERVER_URL} from "./App";
import {adminKey} from "./MainPage";

export const TEMPLATE_PRESET_DATA = [
    {
        id: '0',
        topic: 'MultipleAnswers_FirstAttack',
        questionBlock: {
            question: '',
            answers: [],
            correctAnswer: '',
            levelPrerequisite: '5'
        },
        isValid: false
    },
    {
        id: '1',
        topic: 'MultipleAnswers_SecondAttack',
        questionBlock: {
            question: '',
            answers: [],
            correctAnswer: '',
            levelPrerequisite: '5'
        },
        isValid: false
    },
    {
        id: '2',
        topic: 'MultipleAnswers_ThirdAttack',
        questionBlock: {
            question: '',
            answers: [],
            correctAnswer: '',
            levelPrerequisite: '5'
        },
        isValid: false
    },
    {
        id: '3',
        topic: 'Input_FirstAttack',
        questionBlock: {
            question: '',
            answers: [],
            correctAnswer: '',
            levelPrerequisite: '7'
        },
        isValid: false
    },
    {
        id: '4',
        topic: 'Input_SecondAttack',
        questionBlock: {
            question: '',
            answers: [],
            correctAnswer: '',
            levelPrerequisite: '7'
        },
        isValid: false
    },
    {
        id: '5',
        topic: 'Input_ThirdAttack',
        questionBlock: {
            question: '',
            answers: [],
            correctAnswer: '',
            levelPrerequisite: '7'
        },
        isValid: false
    },
    {
        id: '6',
        topic: 'Priority_FirstAttack',
        questionBlock: {
            question: '',
            answers: [],
            correctAnswer: '',
            levelPrerequisite: '3'
        },
        isValid: false
    },
    {
        id: '7',
        topic: 'Priority_SecondAttack',
        questionBlock: {
            question: '',
            answers: [],
            correctAnswer: '',
            levelPrerequisite: '3'
        },
        isValid: false
    },
    {
        id: '8',
        topic: 'Priority_ThirdAttack',
        questionBlock: {
            question: '',
            answers: [],
            correctAnswer: '',
            levelPrerequisite: '3'
        },
        isValid: false
    },
    {
        id: '9',
        topic: 'SingularAnswer_FirstAttack',
        questionBlock: {
            question: '',
            answers: [],
            correctAnswer: '',
            levelPrerequisite: '0'
        },
        isValid: false
    },
    {
        id: '10',
        topic: 'SingularAnswer_SecondAttack',
        questionBlock: {
            question: '',
            answers: [],
            correctAnswer: '',
            levelPrerequisite: '0'
        },
        isValid: false
    },
    {
        id: '11',
        topic: 'SingularAnswer_ThirdAttack',
        questionBlock: {
            question: '',
            answers: [],
            correctAnswer: '',
            levelPrerequisite: '0'
        },
        isValid: false
    },
]

export const addToLS = (obj) => {
    Object.keys(obj).map(key => {
        if (key === 'questionBlock') {
            Object.keys(obj[key]).map(innerKey => {
                if (innerKey === 'answers') {
                    obj[key][innerKey].map((question, i) => {
                        localStorage.setItem(`${obj.id}_${key}_${innerKey}_${i}`, question)
                    })
                    localStorage.setItem(`${obj.id}_${key}_${innerKey}_length`, obj[key][innerKey].length)
                } else {
                    localStorage.setItem(`${obj.id}_${key}_${innerKey}`, obj[key][innerKey])
                }
            })
        } else {
            localStorage.setItem(`${obj.id}_${key}`, obj[key])
        }
    })
}
export const delFromLS = (obj) => {
    Object.keys(obj).map(key => {
        if(key === 'questionBlock') {
            Object.keys(obj[key]).map(innerKey => {
                if (innerKey === 'answers') {
                    obj[key][innerKey].map((question, i) => {
                        localStorage.removeItem(`${obj.id}_${key}_${innerKey}_${i}`)
                    })
                    localStorage.removeItem(`${obj.id}_${key}_${innerKey}_length`)
                } else {
                    localStorage.removeItem(`${obj.id}_${key}_${innerKey}`)
                }
            })
        } else {
            localStorage.removeItem(`${obj.id}_${key}`)
        }
    })
}
export const getFromLS = (objID) => {
    const n = localStorage.getItem(`${objID}_questionBlock_answers_length`)
    let arr = []
    for(let i = 0; i < n; ++i) {
        arr.push(i)
    }
    return {
        id: objID,
        topic: localStorage.getItem(`${objID}_topic`),
        questionBlock: {
            question: localStorage.getItem(`${objID}_questionBlock_question`),
            answers: arr.map(i => localStorage.getItem(`${objID}_questionBlock_answers_${i}`)),
            correctAnswer: localStorage.getItem(`${objID}_questionBlock_correctAnswer`),
            levelPrerequisite: localStorage.getItem(`${objID}_questionBlock_levelPrerequisite`),
        },
        isValid: localStorage.getItem(`${objID}_isValid`) === 'true'
    }
}


export const getDate = () => {
    const today = new Date(Date.now())
    const yyyy = today.getFullYear();
    const mm = today.getMonth() + 1; // Months start at 0!
    const dd = today.getDate();
    return dd + '.' + mm + '.' + yyyy;
}

export const hashCode = (word) => {
    let h = 0, l = word.length, i = 0;
    if ( l > 0 )
        while (i < l)
            h = (h << 5) - h + word.charCodeAt(i++) | 0;
    return h.toString();
};

export const MakePresetPage = () => {
    let navigate = useNavigate()
    const location = useLocation()

    const [presetName, setPresetName] = useState('')
    const [categoryNames, setCategoryNames] = useState(['', '', ''])

    const [questionType, setQuestionType] = useState(1)
    const [category, setCategory] = useState(1)
    const [presetQuestions, setPresetQuestions] = useState([])
    const [date, setDate] = useState(getDate)

    const updatePresets = () => {
        if(presetQuestions) {
            setPresetQuestions(presetQuestions.map(obj => getFromLS(obj.id)))
        }
    }
    useEffect(updatePresets, [category, questionType])

    const collectPresetData = () => {
        const topics = [
            "MultipleAnswers_FirstAttack", "MultipleAnswers_SecondAttack", "MultipleAnswers_ThirdAttack",
            "Input_FirstAttack", "Input_SecondAttack", "Input_ThirdAttack",
            "Priority_FirstAttack", "Priority_SecondAttack", "Priority_ThirdAttack",
            "SingularAnswer_FirstAttack", "SingularAnswer_SecondAttack", "SingularAnswer_ThirdAttack",
        ]

        return {
            presetName,
            date: getDate(),
            attackTypes: categoryNames,
            questionFiles: topics.map(topic => {
                return {
                    topic,
                    questionsAndAnswers: presetQuestions
                        .filter(el => (el.topic === topic && el.isValid))
                        .map(el => {
                            return {
                                question: el.questionBlock.question,
                                answers: el.questionBlock.answers,
                                correctAnswer: el.questionBlock.correctAnswer,
                                levelPrerequisite: el.questionBlock.levelPrerequisite,
                                id: el.id
                            }
                        })
                }
            })
        }
    }
    const addQuestion = (levelPrerequisite, topic, question, answers, correctAnswer, id, isValid) => {
        const curQuestion = {
            id: id ? id : hashCode(Math.random().toString()),
            topic,
            questionBlock: {
                question,
                answers,
                correctAnswer,
                levelPrerequisite
            },
            isValid
        }
        if(presetQuestions === undefined || !presetQuestions.includes(curQuestion)) {
            setPresetQuestions([...presetQuestions, curQuestion])
            addToLS(curQuestion)
        }
    }


    const parsePreset = (data) => {
        localStorage.clear()
        setPresetName(data.presetName)
        setCategoryNames(data.attackTypes)
        setDate(data.date)
        let questionIDs = []
        data.questionFiles.map(questionFile => {
            const curTopic = questionFile.topic
            questionFile.questionsAndAnswers.map(el => {
                addQuestion(el.levelPrerequisite, curTopic, el.question, el.answers, el.correctAnswer, el.id, true)
                questionIDs.push(el.id)
            })
        })
        // adding questions to presetQuestions
        const questions = questionIDs.map(id => getFromLS(id))
        setPresetQuestions(questions)
    }
    const addTemplate = () => {
        localStorage.clear()
        TEMPLATE_PRESET_DATA.map(obj => {
            addToLS(obj)
        })
        setPresetQuestions(TEMPLATE_PRESET_DATA)
    }

    useEffect(() => {
        fetch(`${SERVER_URL}/getPreset?presetindex=${location.state.presetID}&adminkey=${adminKey}`)
            .then(response => response.json())
            .then(data => (data.error !== 'incorrect admin key.' && data.error !== 'incorrect index') ?
                parsePreset(data) :
                addTemplate())
    }, [])

    const getTopic = (curQuestionType, curCategory) => {
        const qTypes = ['SingularAnswer', 'Priority', 'MultipleAnswers', 'Input']
        const categories = ['FirstAttack', 'SecondAttack', 'ThirdAttack']
        return qTypes[curQuestionType-1] + '_' + categories[curCategory-1]
    }

    const countQuestions = (curQuestionType, curCategory) => {
        const curTopic = getTopic(curQuestionType, curCategory)
        let ans = 0
        presetQuestions.map(presetQuestion => {
            if(presetQuestion.topic === curTopic && presetQuestion.isValid) {
                ++ans
            }
        })
        return ans
    }

    const outputQuestions = (minLevel, maxLevel, curQuestionType, curCategory) => {
        const curTopic = getTopic(curQuestionType, curCategory)
        return presetQuestions.map((el, i) => {
            const isValidLevel = parseInt(el.questionBlock.levelPrerequisite) >= parseInt(minLevel) &&
                                    parseInt(el.questionBlock.levelPrerequisite) < parseInt(maxLevel)
            if(curTopic === el.topic && isValidLevel) {
                return (
                    <div className='questionBoxContainer' key={`${el.id}`}>
                                <QuestionBox
                                    id={el.id}
                                    topic={curTopic}
                                    type={curTopic.split('_')[0]}
                                    question={el.questionBlock.question}
                                    answers={el.questionBlock.answers}
                                    correctAnswer={el.questionBlock.correctAnswer}
                                    levelPrerequisite={el.questionBlock.levelPrerequisite}
                                    isValid={el.isValid}
                                />
                        <div className='buttonsContainer'>
                            <button className='copy' onClick={() => {
                                addQuestion(el.questionBlock.levelPrerequisite, el.topic, el.questionBlock.question,
                                    el.questionBlock.answers, el.questionBlock.correctAnswer, '', el.isValid)
                            }}/>
                            <button className='delete' onClick={() => {
                                setPresetQuestions(presetQuestions.filter((el, j) => j !== i))
                                delFromLS(presetQuestions[i])
                            }}/>
                        </div>
                    </div>
                )
            }
        })
    }

    return(
        <div className='presetPageContainer'>
            <div className='titleBox'>
                <div className='titleInputBox'>
                    <input
                        className='dataInput'
                        type='text'
                        placeholder='Введите название пресета...'
                        defaultValue={presetName}
                        maxLength="50"
                        onBlur={(changeEvent) => {
                            setPresetName(changeEvent.target.value);
                        }}
                    />
                    <div className='dataUnderText'>Название пресета</div>
                </div>
                <button className='back' onClick={() => {
                    if(presetName && categoryNames[0] && categoryNames[1] && categoryNames[2]) {
                        const presetFile = collectPresetData()
                        if (location.state.isNew) {
                            fetch(`${SERVER_URL}/createPreset?presetname=${presetName}&adminkey=${adminKey}`)
                        }
                        const options = {
                            method: 'POST',
                            body: JSON.stringify(presetFile),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                        fetch(`${SERVER_URL}/setPreset?adminkey=${adminKey}&presetindex=${location.state.presetID}`, options)

                        navigate(`/main/${adminKey}`)
                    } else {
                        alert('Пожалуйста, заполните все поля (название пресета, названия направлений)')
                    }
                }}>
                    Вернуться и сохранить
                </button>
            </div>

            <div className='presetPageBody'>
                <div className='categoryBox'>
                    <div className='categoryTitle'>Мини-игры</div>
                    <div className='questionTypesColumns'>
                        <div className='questionTypesRows'>
                            <div className={questionType === 1 ? 'questionTypeBoxChosen' : 'questionTypeBox'}
                                 onClick={() => setQuestionType(1)}>
                                <div className='questionType'>Одиночный ответ</div>
                                <div className='questionCtr'>
                                    {presetQuestions ? countQuestions(1, category) : 0}
                                </div>
                            </div>
                            <div className={questionType === 2 ? 'questionTypeBoxChosen' : 'questionTypeBox'}
                                 onClick={() => setQuestionType(2)}>
                                <div className='questionType' >Упорядочивание</div>
                                <div className='questionCtr'>
                                    {presetQuestions ? countQuestions(2, category) : 0}
                                </div>
                            </div>
                        </div>
                        <div className='questionTypesRows'>
                            <div className={questionType === 3 ? 'questionTypeBoxChosen' : 'questionTypeBox'}
                                 onClick={() => setQuestionType(3)}>
                                <div className='questionType'>Множественный ответ</div>
                                <div className='questionCtr'>
                                    {presetQuestions ? countQuestions(3, category) : 0}
                                </div>
                            </div>
                            <div className={questionType === 4 ? 'questionTypeBoxChosen' : 'questionTypeBox'}
                                 onClick={() => setQuestionType(4)}>
                                <div className='questionType'>Конкретика</div>
                                <div className='questionCtr'>
                                    {presetQuestions ? countQuestions(4, category) : 0}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='categoryTitle'>Направления вопросов</div>
                    <div className={category === 1 ? 'categoryInputChosen' : 'categoryInput'}
                         onClick={() => setCategory(1)}>
                        <input
                            className='categoryDataInput'
                            type='text'
                            placeholder='Введите название направления...'
                            defaultValue={categoryNames[0]}
                            maxLength="150"
                            onBlur={(changeEvent) => {
                                setCategoryNames(categoryNames.map((el, i) =>
                                    i === 0 ? changeEvent.target.value : el
                                ));
                            }}
                        />
                        <div className='dataUnderText'>Первое направление</div>
                    </div>
                    <div className={category === 2 ? 'categoryInputChosen' : 'categoryInput'}
                         onClick={() => setCategory(2)}>
                        <input
                            className='categoryDataInput'
                            type='text'
                            placeholder='Введите название направления...'
                            defaultValue={categoryNames[1]}
                            maxLength="150"
                            onBlur={(changeEvent) => {
                                setCategoryNames(categoryNames.map((el, i) =>
                                    i === 1 ? changeEvent.target.value : el
                                ));
                            }}
                        />
                        <div className='dataUnderText'>Второе направление</div>
                    </div>
                    <div className={category === 3 ? 'categoryInputChosen' : 'categoryInput'}
                         onClick={() => setCategory(3)}>
                        <input
                            className='categoryDataInput'
                            type='text'
                            placeholder='Введите название направления...'
                            defaultValue={categoryNames[2]}
                            maxLength="150"
                            onBlur={(changeEvent) => {
                                setCategoryNames(categoryNames.map((el, i) =>
                                    i === 2 ? changeEvent.target.value : el
                                ));
                            }}
                        />
                        <div className='dataUnderText'>Третье направление</div>
                    </div>
                </div>

                <div className='questionsCreatorBox'>
                    {questionType === 1 ?
                        <div>
                            <div className='questionTitle'>Начальные вопросы</div>
                                <hr className='underline'/>
                            {presetQuestions ?
                                outputQuestions('0', '3', questionType, category) :
                                null}
                                <button className='createQuestionButton' onClick={() => {
                                const curTopic = getTopic(questionType, category)
                                addQuestion('0', curTopic, '', [], '', '', false)
                            }}/>
                        </div>
                        : null
                    }

                    {(questionType === 1 || questionType === 2)?
                        <div>
                            <div className='questionLevelTitle'>Вопросы после уровня 3</div>
                            <hr className='underline'/>
                            {presetQuestions ?
                                outputQuestions('3', '5', questionType, category) :
                                null}
                            <button className='createQuestionButton' onClick={() => {
                                const curTopic = getTopic(questionType, category)
                                addQuestion('3', curTopic, '', [], '', '', false)
                            }}/>
                        </div>
                        :
                        null
                    }

                    {questionType !== 4 ?
                        <div>
                            <div className='questionLevelTitle'>Вопросы после уровня 5</div>
                            <hr className='underline'/>
                            {presetQuestions ?
                                outputQuestions('5', '7', questionType, category) :
                                null}
                            <button className='createQuestionButton' onClick={() => {
                                const curTopic = getTopic(questionType, category)
                                addQuestion('5', curTopic, '', [], '', '', false)
                                // setPresetQuestions([...presetQuestions, newQ])
                            }}/>
                        </div>
                        :
                        null
                    }

                    <div className='questionLevelTitle'>Вопросы после уровня 7</div>
                    <hr className='underline'/>
                    {presetQuestions ?
                        outputQuestions('7', '42', questionType, category) :
                        null}
                    <button className='createQuestionButton' onClick={() => {
                        const curTopic = getTopic(questionType, category)
                        addQuestion('7', curTopic, '', [], '', '', false)
                    }}/>
                </div>
            </div>
        </div>
    );
}