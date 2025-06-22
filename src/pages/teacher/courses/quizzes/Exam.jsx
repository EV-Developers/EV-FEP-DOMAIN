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
    const [questions, setQuestions] = React.useState(null);
    const [totalResult, setTotalResult] = React.useState(0);
    const [result, setResult] = React.useState(0);
    const [language, setLanguage] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [totalQuestions, setTotalQuestions] = React.useState(0);
    const [step, setStep] = React.useState(0);
    const [quizzList, setQuizzList] = React.useState(null);
    const [currentQuestion, setCurentQuestion] = React.useState(null);
    const [answered, setAnswered] = React.useState(0);
    const [updated, setUpdated] = React.useState(null);
    const [progress, setProgress] = React.useState(0);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setInprogress(false);
        /**
         * @constant {string} user_id get user ID from localstorage
         */
        const user_id = window.localStorage.getItem("DDOj9KHr51qW1xi");
        const user_results = [];
        let user_total_marks = 0;
        let tmp_total_marks = 0;

        const form = new FormData();
        form.append("user_id", user_id);
        form.append("lesson_id", lessonId);

        if (questions) {
            questions.map((item) => {
                /**
                 * @constant {HTMLElement} elements get elements that their name start with 'question-'
                 */
                const elements = document.getElementsByName("question-" + item.id);
                const checkboxList = [];
                let answerOptionText = "";
                let user_mark = 0;
                item.answers.map((answer) => {
                    /**
                     * @constant {HTMLElement} element get current answer
                     */
                    const element = document.getElementById("answer-" + answer.id);
                    /**
                     * @constant {Array} total_is_correct_answers get all correct answers number
                    */
                    const total_is_correct_answers = item.answers.filter(ans => ans.is_correct == true);

                    if (element.type == 'radio' || element.type == 'checkbox') {
                        if (element.checked) {
                            if (element.checked == answer.is_correct) {
                                user_mark += item.mark / total_is_correct_answers.length;
                            } else {
                                if (element.type == 'checkbox') {
                                    user_mark -= user_mark != 0 ? (item.mark / total_is_correct_answers.length) : user_mark;
                                }
                            }
                            // assgin new property userAnswer to answer Object.
                            answer.userAnswer = true;

                            if (element.type == 'checkbox') {
                                checkboxList.push(element.value);
                            } else {
                                answerOptionText = element.value;
                            }
                        }
                    }
                });

                if (item.answers.length == 0) {
                    const textElement = document.getElementById("text-answer-" + item.id)

                    if (textElement.value != "") {
                        user_mark += item.mark;
                    }

                    answerOptionText = textElement.value;
                }

                // assign marks for final result and each question

                item.user_mark = parseInt(item.mark / user_mark);
                tmp_total_marks += item.mark;
                user_total_marks += parseInt(user_mark);

                user_results.push(item);

                const quest_id = "question-" + item.id;

                if (elements && elements[0] && elements[0].type == 'checkbox') {
                    form.append(quest_id, JSON.stringify(checkboxList))
                } else {
                    form.append(quest_id, answerOptionText)
                }
            });

            let obj = {}
            form.forEach((item, key) => {
                obj[key] = item;
            });

            setLoading(false);
            setQuestions(user_results);
            setResult(user_total_marks);
            setTotalResult(tmp_total_marks);
        }
        // after saving to database
        // navigate('/teachers/courses/lesson' + lessonId);
    }

    React.useEffect(() => {
        loadQuestions();
    }, []);

    const loadQuestions = async () => {
        try {
            const response = await api.get('/quizzes?lesson_id=' + lessonId);
            if (response.status == 200) {
                if (response.data) {
                    let tmpArr = [];
                    let index = 0;
                    
                    response.data.map((quiz) => {
                        quiz.questions.map(item => {
                            tmpArr.push({
                                index: index,
                                ...item
                            });
                            index++;
                        });
                    });
                    
                    setQuizzList(tmpArr);
                    setTotalQuestions(tmpArr.length);

                    if(tmpArr.length != 0){
                        setCurentQuestion(tmpArr[0]);
                        setUpdated(Date.now());
                        console.log(tmpArr[0]);
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
        console.log(quizzList);
           
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
                setUpdated(Date.now());
            } else {
                const tmpStep = step - 1;
                const cq = quizzList[tmpStep];
                console.log(cq);

                setStep(tmpStep);
                setCurentQuestion(cq);                
                setUpdated(Date.now());
            }
        } else {
            const tmpStep = step - 1;
            const cq = quizzList[tmpStep];
            console.log(cq);

            setStep(tmpStep);
            setCurentQuestion(cq);
            setUpdated(Date.now());
        }
        
        //handleMarkQuestion();
    }

    const handleMarkQuestion = () => {
        let tmpArr = [];

        quizzList.map(item => {
            if(item.id == currentQuestion.id){
                item.answered = true;
                /*
                item.answers.map(answer => {
                    const elements = document.getElementsByName("q-"+currentQuestion.id);
                    console.log(elements);
                    
                    elements.map(el => {
                        if(el.target.value == answer.id){
                            if(el.target.value.check == answer.is_correct){
                                item.is_correct = true
                            }
                        }
                    })
                });
                */
            }

            tmpArr.push(item);
        });
        
        setQuizzList(tmpArr);
        setCurentQuestion(tmpArr[step]);
    }

    const handleAnswer = (item) => {
        const checked = document.getElementById("answer-"+item).checked
        console.log(item, checked);
        
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
            //setCurentQuestion(tmpArr[step]);
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
                        <div className="bg-green-400 h-2.5 rounded-full" style={{ width: progress+'%' }}></div> 
                    </div>
                    <span className="py-2 mx-2 text-sm font-bold">{progress}%</span>
                </div>
                {currentQuestion && <div className={`py-5`}>
                    <h2 className="p-2 m-2 text-l font-bold">{language && language['question']} {(currentQuestion.index + 1)}/{quizzList.length}</h2>

                    <p className="text-l p-3 m-2 ">{currentQuestion.question_text}</p>

                    {currentQuestion.question_type == "Text Input" && <textarea placeholder={language && language['write_here']} id={"text-answer-" + currentQuestion.id} disabled={!inprogress} className="py-2 px-4 rounded shodow-sm bg-gray-200 w-[75%] placeholder-gray-400 m-5" name={"question-" + currentQuestion.id}></textarea>}

                    {currentQuestion.answers && currentQuestion.answers.map(answer => <div key={"answer-"+answer.id}>
                        <input id={"answer-"+answer.id} value={answer.id} className="hidden peer" type={currentQuestion.question_type == "single_choice" ? "radio" : "checkbox"} name={"q-"+currentQuestion.id} onChange={() => handleAnswer(answer.id)} defaultChecked={answer.user_answer} />
                        <label htmlFor={"answer-"+answer.id} className={`bg-blue-50 rounded p-3 my-2 peer-checked:text-blue-500 font-bold text-xs py-2 peer-checked:border peer-checked:border-blue-500 flex transition-colors group`}>
                            {currentQuestion.question_type == "single_choice" && <div className={`bg-white group-peer-checked:bg-[#001f4e] rounded-full w-6 h-6 transition-colors`}></div>}
                            <span className="mx-3 py-1">{answer.answer_text}</span>
                        </label>
                    </div>)}
                </div>}

                {quizzList && <div className="flex items-center justify-center w-full">
                    {step != 0 && <button type="button" className="bg-white border text-sm m-1 hover:border-[#1a31d3] hover:bg-[#1a31d3] hover:text-white text-[#1a31d3] cursor-pointer border-[#1a31d3] p-2 px-5 rounded" onClick={() => handleNext('previus')}>{language && language['previous']}</button>}
                    {step !== (quizzList.length - 1) && <button type="button" className="text-sm m-1 text-white cursor-pointer bg-[#1a31d3] p-2 px-5 rounded hover:bg-white hover:text-[#1a31d3] border hover:border-[#1a31d3]" onClick={() => handleNext('next')}>{language && language['next']}</button>}
                    {step == (quizzList.length - 1) && <button className="text-sm m-1 text-white cursor-pointer bg-[#1a31d3] hover:bg-white hover:text-[#1a31d3] border hover:border-[#1a31d3] p-2 px-5 rounded">{language && language['submit']}</button>}
                </div>}

                {/* {!inprogress && <div className="block w-[35%] m-auto p-5 text-center rounded-2xl secandery">
                    <h3 className="text-2xl">{language && language['result']}</h3>
                    <p className="text-4xl font-bold my-4">{totalResult + "/" + result}</p>
                    <p className="p-4 text-l text-center italic">{language && language['submitted']}</p>
                </div>} */}

            </div>
            <div className="w-[25%] p-5">
                <div className="bg-blue-50 w-full p-4 rounded-xl text-center py-14 mb-14">
                    <h1 className="text-4xl">{progress}%</h1>
                    <p className="text-xs text-gray-400">{language && language['you_answered']} {answered} {language && language['out_of']} {quizzList && quizzList.length}</p>
                </div>

                {quizzList && quizzList.map((item, index) => <div key={"ques-"+index} className={`flex bg-blue-50 p-3 py-2 rounded my-2 ${item.answered && item.result && item.is_correct && 'bg-green-200 border-green-500'} ${item.answered && item.result && !item.is_correct && 'bg-red-200 border-red-400'}`}>
                    <div className={`rounded-full w-6 h-6 text-center bg-white ${item.answered && item.result && 'bg-red-400'} ${item.answered && item.result && item.is_correct && 'bg-green-500'}`}>
                        {item.answered && item.result && item.is_correct && <FontAwesomeIcon icon={faCheck} className="text-white text-sm" />}
                        {item.answered && item.result && !item.is_correct && <FontAwesomeIcon icon={faTimes} className="text-white text-sm" />}
                    </div>
                    <div className="mx-3 text-xs font-medium py-1">
                        {language && language['question']} {(index + 1)}
                    </div>
                </div>)}
            </div>
        </form>
    </ThemeContainer>)
}