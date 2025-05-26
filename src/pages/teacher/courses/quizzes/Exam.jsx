import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import ThemeContainer from '../../../../compenents/parts/ThemeContainer';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { translation } from '../../../../config/translations';

export default function Exam() {
    const { lessonId } = useParams();
    const [language, setLanguage] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
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

    const quzzes_list = [
        {
            id: "quiz-1",
            question: "Lorem ipsum dolor sit amet consectetur adipisicing elit?",
            question_type: "One choice",
            answers: [
                {
                    id: 'ans-1',
                    answer: 'Yes',
                    correct: false
                },
                {
                    id: 'ans-2',
                    answer: 'No',
                    correct: true
                },
            ]
        },
        {
            id: "quiz-2",
            question: "Expedita nam alias praesentium soluta porro maxime asperiores sapiente recusandae illum molestiae inventore?",
            question_type: "Multi choice",
            answers: [
                {
                    id: 'ans2-1',
                    answer: 'Yes',
                    correct: false
                },
                {
                    id: 'ans2-1',
                    answer: 'Maybe',
                    correct: true
                },
                {
                    id: 'ans2-2',
                    answer: 'No',
                    correct: true
                },
            ]
        },
        {
            id: "quiz-3",
            question: "Sapiente recusandae illum molestiae inventore?",
            question_type: "Text Input",
            answers: []
        }
    ]

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        navigate('teachers/courses/lesson'+lessonId)
    }

    return (<ThemeContainer role="teachers">
        <form method="POST" className="bg-white mx-auto m-3 rounded-xl p-5 w-[75%]">
            <div className="flex">
                <img src="/logo/course-logo.png" alt="" className="w-10 h-10 my-1" /> <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                <Link className="m-2 my-3 hover:text-[#4b4b4b]" to={"/teachers/courses"}>{language && language["courses"]}</Link><FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                <Link className="m-2 my-3 hover:text-[#4b4b4b]" to={"/teachers/courses/lesson/" + lessonId}>{language && language['details']}</Link>
                <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                <p className="m-3 my-3 text-color">{language && language["lessons_quizzes"]}</p>
            </div>
            {quzzes_list && quzzes_list.map(item => <div key={item.id} className="border-t border-t-gray-200 py-5">
                <p className="text-xl p-3 m-2 font-bold">{item.question}</p>
                {item.question_type == "Text Input" && <textarea placeholder={language && language['write_here']} className="py-2 px-14 rounded shodow-sm bg-gray-200 w-[75%] placeholder-gray-400 m-5" name={"question-" + item.id}></textarea>}
                {item.answers && item.answers.map(answer => <label className={`block p-3 m-2 rounded-2xl`} key={"answer-" + answer.id}><input type={item.question_type == "Multi choice" ? "checkbox" : "radio"} name={"question-" + item.id} /> {answer.answer}</label>)}
            </div>)}

            <button onClick={handleSubmit} className="flex rounded pointer mx-3 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 my-5">
                {loading && <img className="animate-spin w-4 h-4 m-1" src="/loading_white.png" />}
                <span>{language && language['submit']}</span>
            </button>
        </form>

    </ThemeContainer>)
}
