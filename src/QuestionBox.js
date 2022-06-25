import './styles/QuestionBox.css';

import {useEffect, useState} from "react";

import {addToLS} from "./MakePresetPage";

export const QuestionBox = (props) => {
    const createAnswers = () => {
        const texts = props.answers.length ? props.answers : ['']
        const checkBoxes = props.answers.length ?
                props.answers.map((ans, i) => props.correctAnswer.split('').includes(i.toString())) : [false]

        const ans = texts.map((el, i) => {
            return {
                text: el,
                checkBox: checkBoxes[i]
            }
        })
        return ans
    }

    const [question, setQuestion]= useState(props.question)
    const [answers, setAnswers] = useState(createAnswers())
    const [isValid, setIsValid] = useState(props.isValid)

    const singAns = () => {
        return <div className='optionsContainer'>
            {answers.map((answer, i) => {
                return (
                    <div className='option' key={`${answer.text}_${i}`}>
                        <input
                            className='choiceInput'
                            type='text'
                            placeholder='Введите ответ...'
                            defaultValue={answer.text}
                            maxLength="50"
                            onBlur={(changeEvent) => {
                                setAnswers(answers.map((el, j) =>
                                    j === i ?
                                        {text: changeEvent.target.value, checkBox: el.checkBox}:
                                        el))
                            }}
                        />
                        <input className='checkbox'
                               type='checkbox'
                               defaultChecked={answer.checkBox}
                               onClick={() => {
                                   setAnswers(answers.map((el, j) =>
                                        j === i ?
                                            {text: el.text, checkBox: !el.checkBox}
                                            : el))
                               }}
                        />
                        <button className='deleteChoice' onClick={() => {
                            setAnswers(answers.filter((el, j) => j !== i))
                        }}/>
                    </div>
                )
            })}
            {answers.length < 4 ?
                <button className='addQuestion' onClick={() => {
                    setAnswers([...answers, {text: '', checkBox: false}])
                }}>
                    <div className='addQuestionText'>Добавить ответ</div>
                </button>
                : null}
        </div>
    }

    const priority = () => {
        return (
            <div className='optionsAndPriorityArrow'>
                <div className='optionsContainer'>
                    {answers.map((answer, i) => {
                        return (
                            <div className='option' key={`${answer.text}_${i}`}>
                                <input
                                    className='choiceInput'
                                    type='text'
                                    placeholder='Введите ответ...'
                                    defaultValue={answer.text}
                                    maxLength="50"
                                    onBlur={(changeEvent) => {
                                        setAnswers(answers.map((el, j) =>
                                            j === i ?
                                                {text: changeEvent.target.value, checkBox: el.checkBox}:
                                                el))
                                    }}
                                />
                                <button className='deleteChoice' onClick={() => {
                                    setAnswers(answers.filter((el, j) => j !== i))
                                }}/>
                            </div>
                        )
                    })}
                    {answers.length < 4 ?
                        <button className='addQuestion' onClick={() => {
                            setAnswers([...answers, {text: '', checkBox: false}])
                        }}>
                            <div className='addQuestionText'>Добавить ответ</div>
                        </button>
                        : null}
                </div>
                <div className='arrow' />
            </div>
        )
    }

    const multipleAns = () => {
        return (
            <div className='optionsContainer'>
                {answers.map((answer, i) => {
                    return (
                        <div className='option' key={`${answer.text}_${i}`}>
                            <input
                                className='choiceInput'
                                type='text'
                                placeholder='Введите ответ...'
                                defaultValue={answer.text}
                                maxLength="50"
                                onBlur={(changeEvent) => {
                                    setAnswers(answers.map((el, j) =>
                                        j === i ?
                                            {text: changeEvent.target.value, checkBox: el.checkBox}:
                                            el))
                                }}
                            />
                            <input className='checkbox'
                                   type='checkbox'
                                   defaultChecked={answer.checkBox}
                                   onClick={() => {
                                       setAnswers(answers.map((el, j) =>
                                           j === i ?
                                               {text: el.text, checkBox: !el.checkBox}
                                               : el))
                                   }}
                            />
                            <button className='deleteChoice' onClick={() => {
                                setAnswers(answers.filter((el, j) => j !== i))
                            }}/>
                        </div>
                    )
                })}
                {answers.length < 4 ?
                    <button className='addQuestion' onClick={() => {
                        setAnswers([...answers, {text: '', checkBox: false}])
                    }}>
                        <div className='addQuestionText'>Добавить ответ</div>
                    </button>
                    : null}
            </div>
        )
    }

    const input = () => {
        return <div className='optionsContainer'>
            {answers.map((answer, i) => {
                return (
                    <div className='option' key={`${answer.text}_${i}`}>
                        <input
                            className='choiceInput'
                            type='text'
                            placeholder='Введите ответ...'
                            defaultValue={answer.text}
                            maxLength="50"
                            onBlur={(changeEvent) => {
                                setAnswers(answers.map((el, j) =>
                                    j === i ?
                                        {text: changeEvent.target.value, checkBox: el.checkBox}:
                                        el))
                            }}
                        />
                        <button className={answer.checkBox ? 'anyRegisterButton' : 'registerButton'}
                                onClick={() => {
                                    setAnswers(answers.map((el, j) =>
                                        j === i ?
                                            {text: el.text, checkBox: !el.checkBox}
                                            : el))
                                }}
                        />
                        <button className='deleteChoice' onClick={() => {
                            setAnswers(answers.filter((el, j) => j !== i))
                        }}/>
                    </div>
                )
            })}
            <button className='addQuestion' onClick={() => {
                setAnswers([...answers, {text: '', checkBox: false}])
            }}>
                <div className='addQuestionText'>Добавить ответ</div>
            </button>
        </div>
    }

    const returnOptions = () => {
        switch (props.type){
            case 'SingularAnswer':
                return singAns()
            case 'Priority':
                return priority()
            case 'MultipleAnswers':
                return multipleAns()
            case 'Input':
                return input()
        }
    }

    const validate = () => {
        const checkBoxCtr = answers.reduce((accum, el) => accum + el.checkBox, 0)
        const isEnoughCheckboxes = (props.type !== 'SingularAnswer' && props.type !== 'MultipleAnswers') ||
            (props.type === 'SingularAnswer' && checkBoxCtr === 1) ||
            (props.type === 'MultipleAnswers' && checkBoxCtr > 0)
        // count number of empty texts and check whether we have at least one
        const isOptionsFilled = answers.reduce((accum, el) =>
            accum + (el.text.length===0), 0) === 0

        return question.length &&
            ((answers.length > 1 && props.type !== 'Input') || props.type === 'Input') &&
            isEnoughCheckboxes &&
            isOptionsFilled
    }

    const updateQuestionBlock = () => {
        // e.g. from [false, true, false, true] get '13'
        const correctAns = answers.map((el, i) =>
            el.checkBox ? i.toString() : '').join('')
        setIsValid(validate())

        const modifiedQuestion = {
            id: props.id,
            topic: props.topic,
            questionBlock: {
                question: question,
                answers: answers.map(el => el.text),
                correctAnswer: correctAns,
                levelPrerequisite: props.levelPrerequisite
            },
            isValid: validate()
        }
        addToLS(modifiedQuestion)
    }
    useEffect(updateQuestionBlock, [question, answers, isValid])

    return (
        <div className='questionBoxWithValidation'>
            <div className='questionBox'>
                <textarea
                    className='questionInput'
                    placeholder='Введите вопрос...'
                    defaultValue={question}
                    maxLength="150"
                    onBlur={(changeEvent) => {
                        setQuestion(changeEvent.target.value);
                        // updateQuestionBlock()
                        // setIsValid(updateQuestionBlock(answers, props, question))
                    }}
                />
                <div className='answers'>Ответы:</div>
                {returnOptions()}
            </div>
            {isValid === true ?
                null :
                <div className='incorrectQuestion'>Неправильный вопрос</div>
            }
        </div>
    );
}