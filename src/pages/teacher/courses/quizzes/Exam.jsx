import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
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
    const [quizzList, setQuizzList] = React.useState("");
    const navigate = useNavigate();

    const quzzes_list = [
        {
            id: "quiz-1",
            question_text: "What does HTTP stand for?",
            question_type: "Single choice",
            mark: 5,
            answers: [
                {
                    id: 'ans-1',
                    answer_text: 'HyperText Transfer Protocol',
                    is_correct: true
                },
                {
                    id: 'ans-2',
                    answer_text: 'HyperText Transmission Program',
                    is_correct: false
                },
                {
                    id: 'ans-3',
                    answer_text: 'Hyperlink Text Transfer Protocol',
                    is_correct: false
                },
            ]
        },
        {
            id: "quiz-2",
            question_text: "What does CPU stand for?",
            question_type: "Single choice",
            mark: 5,
            answers: [
                {
                    id: 'ans2-1',
                    answer_text: 'Computer Performance Unit',
                    is_correct: false
                },
                {
                    id: 'ans2-2',
                    answer_text: 'Central Processing Unit',
                    is_correct: true
                },
                {
                    id: 'ans2-3',
                    answer_text: 'Central Programming Unit',
                    is_correct: false,
                },
            ]
        },
        {
            id: "quiz-3",
            question_text: "Which of the following is considered output hardware?",
            question_type: "Multi choice",
            mark: 5,
            answers: [
                {
                    id: 'ans3-1',
                    answer_text: 'Monitor',
                    is_correct: true
                },
                {
                    id: 'ans3-2',
                    answer_text: 'Printer',
                    is_correct: true
                },
                {
                    id: 'ans3-3',
                    answer_text: 'Keyboard',
                    is_correct: false,
                },
                {
                    id: 'ans3-4',
                    answer_text: 'Speaker',
                    is_correct: true,
                },
            ]
        },
        {
            id: "quiz-4",
            question_text: "What is the function of a router in a network?",
            question_type: "Text Input",
            mark: 5,
            answers: []
        }
    ];

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

        setQuestions(quzzes_list);
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
                    setQuizzList(response.data)
                }
            } else {
                //console.log('error');
            }
        } catch (error) {
            //console.log(error);
        }
    }

    return (<ThemeContainer role="teachers">
        <form method="POST" onSubmit={handleSubmit} className="bg-white mx-auto m-3 rounded-xl p-5 w-[75%]">
            <div className="flex">
                <img src="/logo/course-logo.png" alt="" className="w-10 h-10 my-1" /> <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                <Link className="m-2 my-3 hover:text-[#4b4b4b]" to={"/teachers/courses"}>{language && language["courses"]}</Link><FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                <Link className="m-2 my-3 hover:text-[#4b4b4b]" to={`/teachers/courses/${courseId}/lessons/${lessonId}/`} >{language && language['details']}</Link>
                <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                <p className="m-3 my-3 text-color">{language && language["lessons_quizzes"]}</p>
            </div>
            <div className="border-t border-t-gray-200">
                <h3 className="text-l italic underline mt-4 p-4">* {language && language['exam_note']}</h3>
            </div>

            {quizzList && quizzList.map(quiz => quiz.questions.map(item => <div key={"Q-" + item.id} className={` py-5`}>
                <p className="text-xl p-3 m-2 font-bold">{item.question_text}</p>
                {item.question_type == "Text Input" && <textarea placeholder={language && language['write_here']} id={"text-answer-" + item.id} disabled={!inprogress} className="py-2 px-4 rounded shodow-sm bg-gray-200 w-[75%] placeholder-gray-400 m-5" name={"question-" + item.id}></textarea>}
                {item.answers && item.answers.map(answer => <label className={`flex p-3 m-2 rounded-2xl ${inprogress == false ? (item.question_type !== "Text Input" && answer.userAnswer == answer.is_correct) ? 'bg-green-400' : (answer.userAnswer !== undefined && answer.userAnswer != answer.is_correct) ? 'bg-red-400' : '' : ''} ${(!inprogress && answer.userAnswer === undefined && answer.is_correct == true) ? 'bg-green-100' : ''}`} key={"answer-" + answer.id}><input type={item.question_type == "multiple_choice" ? "checkbox" : "radio"} name={"question-" + item.id} value={answer.answer_text} id={"answer-" + answer.id} disabled={!inprogress} className="mx-4 py-5 after:top-3 "  /> <span className="block py-3">{answer.answer_text}</span> </label>)}
            </div>))}

            {!inprogress && <div className="block w-[35%] m-auto p-5 text-center rounded-2xl secandery">
                <h3 className="text-2xl">{language && language['result']}</h3>
                <p className="text-4xl font-bold my-4">{totalResult + "/" + result}</p>
                <p className="p-4 text-l text-center italic">{language && language['submitted']}</p>
            </div>}

            {inprogress && <button className="flex rounded pointer mx-3 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 my-5 font-bold">
                {loading && <img className="animate-spin w-4 h-4 m-1" src="/loading_white.png" />}
                <span>{language && language['submit']}</span>
            </button>}
        </form>
    </ThemeContainer>)
}