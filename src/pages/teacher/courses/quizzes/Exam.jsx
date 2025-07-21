import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { faAngleLeft, faAngleRight, faArrowLeft, faArrowRight, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { translation } from '../../../../config/translations';
import ThemeContainer from '../../../../compenents/parts/ThemeContainer';
import api from '../../../../config/api';

export default function Exam() {
    const { courseId, lessonId } = useParams();
    const [inprogress, setInprogress] = React.useState(true);
    const [totalResult, setTotalResult] = React.useState(0);
    const [result, setResult] = React.useState(0);
    const [language, setLanguage] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [totalQuestions, setTotalQuestions] = React.useState(0);
    const [quizId, setQuizId] = React.useState(0);
    const [step, setStep] = React.useState(0);
    const [quizzList, setQuizzList] = React.useState(null);
    const [currentQuestion, setCurentQuestion] = React.useState(null);
    const [answered, setAnswered] = React.useState(0);
    const [updated, setUpdated] = React.useState(null);
    const [progress, setProgress] = React.useState(0);
    const [msg, setMsg] = React.useState(null);
    const [completedQuiz, setCompletedQuiz] = React.useState(false);
    const url = "https://fep.misk-donate.com/storage/";
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

        //setQuestions(quzzes_list);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setInprogress(false);

        const answers = [];

        quizzList.map((item) => {  
            let answer_ids = [];
            item.answers.map((answer) => {                
                if(answer.user_answer){
                    answer_ids.push(answer.id)
                }
            });
            answers.push({
                "question_id": item.id,
                "answer_ids": answer_ids
            })
        });

        console.log(answers);
        
        //return 0;
        
        try {
            const response = await api.post(`/quizzes/${quizId}/complete`, { "answers": answers });
                        
            if(response.status == 200){
                window.location.reload();
                //navigate(`/courses/${courseId}/#${lessonId}`)
            } else {
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        loadQuestions();
    }, []);

    const loadQuestions = async () => {
        try {
            const user_id = window.localStorage.getItem("DDOj9KHr51qW1xi");
            const response = await api.get(`/quizzes?lesson_id=${lessonId}&user_id=${user_id}`);
            let completed_quiz = false;
            let totalMarks = 0;
            let userMarks = 0
            
            if (response.status == 200) {
                if (response.data) {
                    console.log(response.data);
                    
                    let tmpArr = [];
                    let index = 0;
                    
                    setQuizId(response.data[0].id);
                    response.data.map((quiz) => {
                        quiz.questions.map(item => {
                            totalMarks += item.mark;
                            if(item.answer.length != 0){
                                completed_quiz = true;
                                item.answer.map(a => {
                                    userMarks += a.score;
                                })
                            }
                            let score = 0;
                            item.answers.map((answer, aindex) => {
                                item.answer.map(a => {
                                    if(a.answer_id == answer.id){
                                        item.answers[aindex].user_answer = true;
                                        score += a.score;
                                    }
                                });
                            });

                            item.score = score;

                            tmpArr.push({
                                index: index,
                                ...item
                            });
                            index++;

                            console.log(tmpArr);
                            
                        });
                    });
                    
                    setQuizzList(tmpArr);
                    setTotalQuestions(tmpArr.length);
                    setCompletedQuiz(completed_quiz)
                    setTotalResult(totalMarks);
                    setResult(userMarks);

                    if(tmpArr.length != 0){
                        setCurentQuestion(tmpArr[0]);
                        setUpdated(Date.now());
                    }
                }
            } else {
                //console.log('error');
            }
        } catch (error) {
            //console.log(error);
        }
    }

    const handleNext = (op) => {                
        if(step < quizzList.length){
            if(op == 'next'){
                const tmpStep = step + 1;
                setStep(tmpStep);
                const cq = quizzList[tmpStep];

                if(progress != 100){
                    const tmpAnswer = answered == 0 ? answered + 1 : answered;
                    const tmpProgress = (tmpAnswer / quizzList.length) * 100;
                    
                    setProgress(tmpProgress);
                }
                
                if((step + 1) != answered){
                    setAnswered(ol => ol + 1);
                }

                setCurentQuestion(cq);
            } else {
                const tmpStep = step - 1;
                const cq = quizzList[tmpStep];

                setStep(tmpStep);
                setCurentQuestion(cq);                
            }
        } else {
            const tmpStep = step - 1;
            const cq = quizzList[tmpStep];

            setStep(tmpStep);
            setCurentQuestion(cq);
        }
        setUpdated(Date.now());
    }

    const handleAnswer = (item) => {
        const checked = document.getElementById("answer-"+item).checked
        
        if(quizzList){
            let tmpArr = [];
            quizzList.map((quiz, index) => {
                if(quiz.id == currentQuestion.id){
                    quiz.answers.map((answer, aindex) => {
                        if(answer.id == item){
                            answer.user_answer = checked;
                            quiz.answered = true;
                        } else {
                            if(currentQuestion.question_type == "single_choice"){
                                answer.user_answer = false;
                            }
                        }
                    })   
                }
                tmpArr.push(quiz);
            });
            
            setQuizzList(tmpArr);
        }
    }

    return (<ThemeContainer role="teachers" customeClasses="w-full mt-0 pt-0">
        <div className="mt-0 h-[250px] w-full bg-green-600 quizbg">
            <div className="mx-auto w-[75%] text-center text-white">
                <h2 className="text-3xl font-bold p-3 pt-14">{language && language['lessons_quizzes']}</h2>
                <h3 className="text-l italic underline mt-4 p-4">* {language && language['exam_note']}</h3>
            </div>
        </div>
        
        <form method="POST" onSubmit={handleSubmit} className="flex bg-white mx-auto m-3 rounded-xl p-5 w-[85%]">
            <div className="w-[75%]">
                <div className="border-b border-b-gray-300 py-4 mb-4">
                    <Link to={"/teachers/courses/"+courseId} className="my-5 text-l mb-14"><FontAwesomeIcon icon={language && language['dir'] == 'ltr' ? faArrowLeft : faArrowRight} /> {language && language['course']}</Link>
                </div>
                <div className="flex">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 my-3">
                        <div className="bg-green-400 h-2.5 rounded-full" style={{ width: completedQuiz ? "100%" : parseInt(progress)+'%' }}></div> 
                    </div>
                    <span className="py-2 mx-2 text-sm font-bold">{completedQuiz ? 100 : parseInt(progress)}%</span>
                </div>
                {currentQuestion && <div className={`py-5`}>
                    <h2 className="p-2 m-2 text-l font-bold">{language && language['question']} {(currentQuestion.index + 1)}/{quizzList.length}</h2>

                    <p className="text-l p-3 m-2 flex justify-between">
                        <span>{currentQuestion.question_text}</span> <span className="text-xs">({language && language['mark']} {currentQuestion.mark})</span> 
                    </p>

                    {currentQuestion.question_image && <img src={url+currentQuestion.question_image} className="w-[45%] rounded m-2" />}

                    {currentQuestion.question_type == "Text Input" && <textarea placeholder={language && language['write_here']} id={"text-answer-" + currentQuestion.id} disabled={!inprogress ? true : false} className="py-2 px-4 rounded shodow-sm bg-gray-200 w-[75%] placeholder-gray-400 m-5" name={"question-" + currentQuestion.id}></textarea>}

                    {currentQuestion.answers && currentQuestion.answers.map(answer => <div key={"answer-"+answer.id} className={`${answer.answer_image ? 'inline-block w-[25%] mx-2' : 'block'}`}>
                        <input id={"answer-"+answer.id} value={answer.id} className="hidden peer" type={currentQuestion.question_type == "single_choice" ? "radio" : "checkbox"} name={"q-"+currentQuestion.id} onChange={() => handleAnswer(answer.id)} disabled={currentQuestion.answer.length != 0} defaultChecked={answer.user_answer} />
                        <label htmlFor={"answer-"+answer.id} className={`bg-blue-50 rounded p-3 my-2 peer-checked:text-blue-500 font-bold text-xs py-2 peer-checked:border peer-checked:border-blue-500 flex transition-colors group`}>
                            {currentQuestion.question_type == "single_choice" && <div className={`bg-white group-peer-checked:bg-[#001f4e] rounded-full w-6 h-6 transition-colors`}></div>}
                            <span className="mx-3 py-1">
                                {answer.answer_image && <img src={url+answer.answer_image} className="w-full rounded " />}
                                <p className={answer.answer_image ? 'text-xs' : ''}>{answer.answer_text}</p>
                            </span>
                        </label>
                    </div>)}
                </div>}

                {msg && <div className="p-4 m-2">{msg}</div>}

                {quizzList && <div className="flex items-center justify-center w-full">
                    {step != 0 && <button type="button" className="bg-white border text-sm m-1 hover:border-[#1a31d3] hover:bg-[#1a31d3] hover:text-white text-[#1a31d3] cursor-pointer border-[#1a31d3] p-2 px-5 rounded" onClick={() => handleNext('previus')}>{language && language['previous']}</button>}
                    {step !== (quizzList.length - 1) && <button type="button" className="text-sm m-1 text-white cursor-pointer bg-[#1a31d3] p-2 px-5 rounded hover:bg-white hover:text-[#1a31d3] border hover:border-[#1a31d3]" onClick={() => handleNext('next')}>{language && language['next']}</button>}
                    {step == (quizzList.length - 1) && !completedQuiz && <button className="text-sm m-1 text-white cursor-pointer bg-[#1a31d3] hover:bg-white hover:text-[#1a31d3] border hover:border-[#1a31d3] p-2 px-5 rounded">{language && language['submit']}</button>}
                </div>}

            </div>
            <div className="w-[25%] p-5">
                <div className="bg-blue-50 w-full p-4 rounded-xl text-center py-14 mb-14">
                    <h1 className="text-4xl">{completedQuiz ? "100" : parseInt(progress)}%</h1>
                    <p className="text-xs text-gray-400">{language && language['you_answered']} {(completedQuiz ? quizzList && quizzList.length : answered)} {language && language['out_of']} {quizzList && quizzList.length}</p>
                </div>

                {quizzList && quizzList.map((item, index) => <div key={"ques-"+index} className={`flex bg-blue-50 p-3 py-2 rounded my-2 ${item.score && item.score != 0 && 'bg-green-200 border-green-500'} ${item.score && item.score == 0 && 'bg-red-200 border-red-400'}`}>
                    <div className={`rounded-full w-6 h-6 text-center bg-white ${item.score && item.score == 0 && 'bg-red-400'} ${item.score && item.score != 0 && 'bg-green-500'}`}>
                        {item.score && item.score != 0 && <FontAwesomeIcon icon={faCheck} className="text-green-500 text-sm" />}
                        {item.score && item.score == 0 && <FontAwesomeIcon icon={faTimes} className="text-red-400 text-sm" />}
                    </div>
                    <div className="mx-3 text-xs font-medium py-1">
                        {language && language['question']} {(index + 1)}
                    </div>
                </div>)}
            </div>
        </form>


        {completedQuiz && <div className="flex bg-white mx-auto m-3 rounded-xl p-5 w-[85%] my-5">
            <div className="block w-[35%] m-auto p-5 text-center rounded-2xl">
                <h3 className="text-2xl font-bold">{language && language['result']}</h3>
                <p className="text-4xl font-bold my-4">{totalResult + "/" + result}</p>
                <p className="p-4 text-l text-center italic">{language && language['submitted']}</p>
            </div>
        </div>}
    </ThemeContainer>)
}