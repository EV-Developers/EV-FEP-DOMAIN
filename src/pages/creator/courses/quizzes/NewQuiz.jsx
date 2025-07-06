import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';

import { translation } from '../../../../config/translations';
import ThemeContainer from '../../../../compenents/parts/ThemeContainer';
import api from '../../../../config/api';

export default function NewQuiz() {
    const [msg, setMsg] = React.useState(false);
    const [show, setShow] = React.useState(false);
    const [quizType, setQuizType] = React.useState('single_choice');
    const [answerText, setAnswerText] = React.useState('');
    const [questions, setQuestions] = React.useState([]);
    const [updated, setUpdated] = React.useState(null);
    const [question, setQuestion] = React.useState('');
    const [mark, setMark] = React.useState('');
    const [answers, setAnswers] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [language, setLanguage] = React.useState(null);
    const { courseId, lessonId } = useParams();
    const navigate = useNavigate();

    React.useEffect(() => {
        const lang = window.localStorage.getItem("language");

        if (lang && lang != '' && lang != null) {
            if (lang == 'english') {
                setLanguage(translation[0]);
                window.document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');
            } else {
                setLanguage(translation[1]);
                window.document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
            }
        } else {
            setLanguage(translation[0]);
            window.localStorage.setItem("language", 'english');
            window.document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');
        }

    }, []);

    const quizTypes = ["single_choice", "multiple_choice"]

    React.useEffect(() => {
        if (quizType == 'Text Input') {
            setAnswers([]);
        }

        setShow(false);
    }, [quizType])

    const handleAddAnswer = () => {
        if (answerText != '') {
            let tmpAnswers = answers.slice();
            tmpAnswers.push({
                id: Date.now() * Math.random(),
                answer_text: answerText,
                is_correct: false
            });

            setAnswers(tmpAnswers);
            setAnswerText("");
        }
    }

    const updateCorrectAnswer = (item_id, checked) => {
        let tmpAnswers = [];

        answers.map(item => {
            if (item.id === item_id) {
                tmpAnswers.push({ ...item, is_correct: checked });
            } else {
                if (quizType == "single_choice") {
                    tmpAnswers.push({
                        ...item,
                        is_correct: false
                    });
                } else {
                    tmpAnswers.push(item);
                }
            }
        });

        setAnswers(tmpAnswers);
    }

    const handleRemove = (item_id) => {
        const tmpAnswers = answers.filter(item => item.id != item_id);

        setAnswers(tmpAnswers);
    }

    const handleAddQuestion = () => {
        setMsg(null);

        if (!answers || mark == "") {
            setMsg(language["error_validation_msg"]);
            return false;
        }

        let ok = false;

        answers.map(item => {
            if (item.is_correct) {
                ok = true
            }
        });

        if (!ok) {
            setMsg(language["error_validation_msg"]);
            return false;
        }

        let tmpArr = questions;
        
        tmpArr.push({
            id: Date.now(),
            question_text: question,
            question_type: quizType,
            mark: mark,
            answers: answers
        });        

        setQuestions(tmpArr);
        setQuestion("");
        setMark("");
        setAnswers([]);
        setUpdated(Date.now());
    }

    const handleAddQuiz = async () => {
        setLoading(true);
        let ok = false;

        if (questions.length != 0) {
            ok = true;
        }

        if (ok) {
            const payload = {
                "lesson_id": lessonId,
                "title": "Quiz",
                "questions": questions
            };             

            try {
                const response = await api.post("https://fep.misk-donate.com/api/quizzes", payload);

                if(response.status == 200){
                    setLoading(false);
                    navigate('/lessons/quizzes/' + courseId + '/' + lessonId);
                } else {
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                
                setLoading(false);
                setMsg(language['error-msg']);
            }

        } else {
            setLoading(false);
            setMsg(language["error_validation_msg"])
        }
    }

    const handleRemoveQuestion = (item_id) => {
        let tmpArr = questions.filter(item => item.id != item_id);
        setQuestions(tmpArr);
    }

    return (<ThemeContainer>
        <div className="w-[75%] bg-white mx-auto block p-5 rounded-xl">
            <p className="my-5 font-bold">{language && language["new_question"]}</p>
            <div className="flex my-4">
                <div className="w-[70%]">
                    <label htmlFor="question" className="block my-4">
                        <input type="text" value={question} onChange={val => setQuestion(val.target.value)} id="question" placeholder={language && language["write_here"]} className="py-2 px-14 rounded shodow-sm bg-gray-200 w-full placeholder-gray-400 inset-shadow-sm inset-gray-indigo-800" />
                    </label>
                    <label htmlFor="mark" className="block my-4">
                        <input type="number" value={mark} onChange={val => setMark(val.target.value)} id="mark" placeholder={language && language["mark"]} className="py-2 px-14 rounded shodow-sm bg-gray-200 w-full placeholder-gray-400 inset-shadow-sm inset-gray-indigo-800" />
                    </label>
                </div>
                <div className="block relative w-[45%]">
                    <button className="flex justify-between font-bold bg-color py-2 px-5 mx-3 rounded-xl text-sm w-[55%] my-4" onClick={() => setShow(!show)}><span>{language && language[quizType]}</span> <FontAwesomeIcon icon={faCaretDown} /></button>
                    {show && <div className="bg-color block rounded-xl p-3 absolute z-10">
                        {quizTypes && quizTypes.map(item => <button onClick={() => setQuizType(item)} key={item} className={`block ${language && language['dir'] == 'ltr' ? 'text-left' : 'text-right'} font-bold rounded-xl w-full mb-3 p-3 ${quizType == item ? 'bg-gradient-to-br from-[#fa9600] to-[#ffe696] hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400' : 'bg-white'}`}>
                            {language && language[item]}
                        </button>)}
                    </div>}
                </div>
            </div>
            <p className="my-5 font-bold">{language && language["add_answers"]}</p>
            {quizType != 'text' && <div className="flex">
                <label htmlFor="question" className="block w-[75%]">
                    <input type="text" id="question" placeholder="Answer Option" className="py-2 px-14 rounded shodow-sm bg-gray-200 placeholder-gray-400 w-full inset-shadow-sm inset-gray-indigo-800" value={answerText} onChange={val => setAnswerText(val.target.value)} />
                </label>
                <button onClick={handleAddAnswer} className="block mx-3 rounded pointer py-2 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400">{language && language["add_text"]}</button>
            </div>}

            {answers && answers.length != 0 && <p className="my-5 font-bold">{language && language["answers_list"]} </p>}

            {answers && answers.length != 0 && <p className="text-sm">* {language && language['select_correct']}</p>}

            <div className="mt-5">
                {answers && answers.map((item, index) => <label htmlFor={"correct-answer" + item.id} key={"answer-" + item.id} className={`hover:bg-gray-100 hover:border hover:border-gray-200 rounded-xl ${item.is_correct && 'bg-green-200'} p-5 py-2 my-2 text-sm flex justify-between`}><span>{(index + 1)} - {item.answer_text}</span> <div>
                    <span className="p-2 mx-4">
                        <input onChange={e => updateCorrectAnswer(item.id, e.target.checked)} defaultChecked={item.is_correct} type={quizType == "single_choice" ? "radio" : "checkbox"} name="correct-answer" id={"correct-answer" + item.id} className={`${language && language['dir'] == 'ltr' ? ' input-left' : 'input-right'} hidden`} /> {item.is_correct && language && language["correct_answer"]}</span>
                    <button onClick={() => handleRemove(item.id)} className='bg-red-400 rounded-full w-5 h-5 text-xs text-white'>x</button>
                </div>
                </label>)}
            </div>

            {msg && <div className="p-4 m-2">{msg}</div>}

            <button onClick={handleAddQuestion} className="block rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 mt-10">{language && language["add_to_quizzes"]}</button>

            {questions && questions.map((item, index) => <div key={"question-" + index} className="border-t border-t-gray-200 py-5">
                <p className="text-xl p-3 m-2 font-bold">{item.question_text}</p>
                {item.answers && item.answers.length != 0 && <p className="text-sm p-3 m-2">{language && language["mark"]}: {language && language[item.mark]}</p>}
                {item.answers && item.answers.length != 0 && <p className="text-sm p-3 m-2">{language && language["question_type"]}: {language && language[item.question_type]}</p>}
                {item.answers && item.answers.length != 0 && <p className="text-sm p-3 m-2">{language && language["answers_list"]}:</p>}
                {item.answers && item.answers.map((answer, aindex) => <div key={"question" + index + "-answers-" + aindex} className={`p-3 m-2 rounded-2xl ${answer.is_correct ? 'bg-green-200' : 'bg-white'}`}>{answer.answer_text}</div>)}

                <button onClick={() => handleRemoveQuestion(item.id)} className="block rounded text-sm pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400">{language && language["delete"]}</button>
            </div>)}

            <hr className="my-5 text-gray-200 mx-5" />

            <div className="flex flex-row justify-between">
                <div></div>
                <button onClick={handleAddQuiz} className="flex rounded pointer m-2 mt-5 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 mx-auto">{loading && <img className="animate-spin w-4 h-4 m-1 mx-2" src="/loading_white.png" />} <span>{language && language["add"]}</span></button>
            </div>
        </div>
    </ThemeContainer>)
}
