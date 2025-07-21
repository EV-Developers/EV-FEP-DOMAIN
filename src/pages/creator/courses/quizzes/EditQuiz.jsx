import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { translation } from '../../../../config/translations';
import ThemeContainer from '../../../../compenents/parts/ThemeContainer';
import api from '../../../../config/api';

export default function EditQuiz() {
    const [data, setData] = React.useState(false);
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
    const [questionImage, setQuestionImage] = React.useState({ url: null, file: null });
    const [answerImage, setAnswerImage] = React.useState({ url: null, file: null });
    const { courseId, lessonId, quizzId, questionId } = useParams();
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
        if (quizzId) {
            getData();
        }
    }, [quizzId]);

    async function getData() {
        try {
            const tmpData = await api.get('/quizzes/' + quizzId);

            console.log(tmpData.data);


            if (tmpData.status == 200) {
                setQuestions(tmpData.data.questions);
            }
        } catch (error) {
            //console.log(error);
        }
    }

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
                answer_image: answerImage.file,
                answer_image_preview: answerImage.url,
                is_correct: false
            });

            setAnswers(tmpAnswers);
            setAnswerText("");
            setAnswerImage({ url: null, file: null });
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
            question_image: questionImage.file,
            question_image_preview: questionImage.url,
            mark: mark,
            answers: answers
        });

        setQuestions(tmpArr);
        setQuestion("");
        setMark("");
        setAnswers([]);
        setUpdated(Date.now());
        setQuestionImage({ url: null, file: null });
    }

    const handleAddQuiz = async () => {
        setLoading(true);
        let ok = false;

        if (questions.length != 0) {
            ok = true;
        }

        if (ok) {
            const formData = new FormData();
            formData.append("lesson_id", lessonId);
            formData.append("title", "Quiz");

            questions.map((q, n) => {
                formData.append(`questions[${n}][question_text]`, q.question_text);
                formData.append(`questions[${n}][question_type]`, q.question_type);

                if (q.question_image) {
                    formData.append(`questions[${n}][question_image]`, q.question_image);
                }

                formData.append(`questions[${n}][mark]`, q.mark);

                q.answers.map((a, i) => {
                    formData.append(`questions[${n}][answers][${i}][answer_text]`, a.answer_text);

                    if (a.answer_image) {
                        formData.append(`questions[${n}][answers][${i}][answer_image]`, a.answer_image);
                    }

                    formData.append(`questions[${n}][answers][${i}][is_correct]`, a.is_correct ? 1 : 0);
                });
            });

            /*
            const payload = {
                "lesson_id": lessonId,
                "title": "Quiz",
                "questions": questions
            };
            */

            try {
                const response = await api.post("https://fep.misk-donate.com/api/quizzes/" + quizzId, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });

                if (response.status == 200) {
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

    const handlePreview = (img, file) => {
        let url = window.URL.createObjectURL(file);
        if (img == 'qimg') {
            setQuestionImage({ url: url, file: file });
        } else {
            setAnswerImage({ url: url, file: file });
        }
    }

    return (<ThemeContainer>
        <div className="w-[75%] bg-white mx-auto block p-5 rounded-xl">
            <div className="flex">
                <img src="/logo/course-logo.png" alt="" className="w-10 h-10 my-1" /> <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                <Link className="m-2 my-3 hover:text-[#4b4b4b]" to={"/courses"}>{language && language["courses"]}</Link><FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                <Link className="m-2 my-3 hover:text-[#4b4b4b]" to={"/courses/" + courseId}>{language && language['course']}</Link>
                <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                <Link className="m-2 my-3 hover:text-[#4b4b4b]" to={`/lessons/quizzes/${courseId}/${lessonId}`}>{language && language['lessons_quizzes']}</Link>
                <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                <p className="m-3 my-3 text-color">{language && language["edit"]}</p>
            </div>
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
                    <label htmlFor="qimg" className="my-4 relative group flex">
                        <span className="mx-3 my-2">{language && language['upload_image']}</span>
                        <img src={questionImage && questionImage.url ? questionImage.url : "/default.png"} className="w-10 h-10 rounded shodow-sm mx-3 my-2 placeholder-gray-400 inset-shadow-sm inset-gray-indigo-800 cursor-pointer" alt="" title={language && language['upload_image']} />

                        {questionImage && questionImage.url && <img src={questionImage && questionImage.url ? questionImage.url : "/default.png"} className="w-full rounded shodow-sm mx-3 placeholder-gray-400 inset-shadow-sm inset-gray-indigo-800 absolute z-10 hidden group-hover:block border-2 border-amber-100 shadow-2xl my-14" alt="" />}

                        <input type="file" onChange={val => handlePreview('qimg', val.target.files[0])} id="qimg" placeholder={language && language["image"]} className="hidden" />
                    </label>
                </div>
            </div>
            <p className="my-5 font-bold">{language && language["add_answers"]}</p>
            {quizType != 'text' && <div className="flex w-full">
                <label htmlFor="question" className="block w-[60%]">
                    <input type="text" id="question" placeholder="Answer Option" className="py-2 px-14 rounded shodow-sm bg-gray-200 placeholder-gray-400 w-full inset-shadow-sm inset-gray-indigo-800" value={answerText} onChange={val => setAnswerText(val.target.value)} />
                </label>
                <label htmlFor="aimg" className="block relative group">
                    <img src={answerImage && answerImage.url ? answerImage.url : "/default.png"} className="w-10 h-10 rounded shodow-sm mx-3 py-0 my-0 placeholder-gray-400 cursor-pointer" alt="" title={language && language['upload_image']} />
                    <input type="file" name="aimg" onChange={val => handlePreview('aimg', val.target.files[0])} id="aimg" placeholder={language && language["image"]} className="hidden" />
                </label>
                <button onClick={handleAddAnswer} className="block mx-3 rounded pointer py-2 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-xs hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400">{language && language["add_text"]}</button>
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
                {(item.question_image_preview || item.question_image) && <img src={item.question_image_preview ? item.question_image_preview : "https://fep.misk-donate.com/storage/" + item.question_image} className="w-[25%]" />}
                <p className="text-xl p-3 m-2 font-bold">{item.question_text}</p>
                {item.answers && item.answers.length != 0 && <p className="text-sm p-3 m-2">{language && language["mark"]}: {item.mark}</p>}
                {item.answers && item.answers.length != 0 && <p className="text-sm p-3 m-2">{language && language["question_type"]}: {language && language[item.question_type]}</p>}
                {item.answers && item.answers.length != 0 && <p className="text-sm p-3 m-2">{language && language["answers_list"]}:</p>}
                {item.answers && item.answers.map((answer, aindex) => <div key={"question" + index + "-answers-" + aindex} className={`p-3 m-2 flex rounded-2xl ${answer.is_correct ? 'bg-green-200' : 'bg-white'}`}>
                    {answer.answer_image_preview && <img src={answer.answer_image_preview ? answer.answer_image_preview : "https://fep.misk-donate.com/storage/" + answer.answer_image} className="w-[25%] rounded-2xl" />}
                    <p className="mx-3">{answer.answer_text}</p>
                </div>)}

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
