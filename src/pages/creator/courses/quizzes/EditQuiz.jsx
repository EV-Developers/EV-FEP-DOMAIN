import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { translation } from '../../../../config/translations';
import ThemeContainer from '../../../../compenents/parts/ThemeContainer';

export default function EditQuiz() {
    const [data, setData] = React.useState(false);
    const [msg, setMsg] = React.useState(false);
    const [show, setShow] = React.useState(false);
    const [quizType, setQuizType] = React.useState('Multi choice');
    const [answerText, setAnswerText] = React.useState('');
    const [question, setQuestion] = React.useState('');
    const [answers, setAnswers] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [language, setLanguage] = React.useState(null);
    const { lessonId, quizzId } = useParams();
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

    const quizTypes = [
        {
            id: 'multi',
            label: 'Multi choice',
            label_arabic: 'اجابة متعددة',

        },
        {
            id: 'single',
            label: 'Single choice',
            label_arabic: 'اجابة منفردة'
        },
        {
            id: 'text',
            label: 'Text Input',
            label_arabic: 'نصي'
        },
    ]

    React.useEffect(() => {
        if (quizzId) {
            getData();
        }
    }, [quizzId]);

    async function getData() {
        const tmpData = await api.get('/quizzes/' + quizzId);
        const answers = await api.get('/answers/' + quizzId);
        console.log(tmpData, answers);

        if (tmpData.status == 200) {
            setData(tmpData.data);
            setAnswers(answers.data)
        }
    }

    React.useEffect(() => {
        if (quizType == 'Text Input') {
            setAnswers([]);
        }
    }, [quizType])

    const handleAddAnswer = () => {
        if (answerText != '') {
            let tmpAnswers = answers.slice();
            tmpAnswers.push({
                id: Date.now() * Math.random(),
                answer: answerText
            });

            setAnswers(tmpAnswers);
            setAnswerText("");
        }
    }

    const updateCorrectAnswer = (item_id, checked) => {
        let tmpAnswers = [];

        answers.map(item => {
            if (item.id === item_id) {
                tmpAnswers.push({ ...item, correct: checked })
            } else {
                if (quizType == "Single choice") {
                    tmpAnswers.push({
                        ...item,
                        correct: false
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

    const handleUpdateQuiz = () => {
        setLoading(true);
        let ok = false;
        if (question !== "") {
            if (quizType == "Text Input") {
                ok = true;
            } else {
                if (answers.length != 0) {
                    ok = true;
                }
            }
        }

        if (ok) {
            setLoading(false);
            navigate('/quizzes/' + lessonId)
        } else {
            setLoading(false);
            setMsg("Please enter  valid question and answer")
        }
    }

    return (<ThemeContainer>
        <div className="w-[75%] bg-white mx-auto block p-5 rounded-xl">
            <p className="my-5 font-bold">{language && language["new_question"]}</p>
            <div className="flex my-4">
                <label htmlFor="question" className="block w-[70%]">
                    <input type="text" onChange={val => setQuestion(val.target.value)} id="question" placeholder={language && language["write_here"]} className="py-2 px-14 rounded shodow-sm bg-gray-200 w-full placeholder-gray-400" />
                </label>
                <div className="block relative w-[30%]">
                    <button className="flex justify-between font-bold bg-color py-2 px-5 mx-3 rounded-xl text-sm w-[55%]" onClick={() => setShow(!show)}><span>{quizType}</span> <FontAwesomeIcon icon={faCaretDown} /></button>
                    {show && <div className="bg-color block rounded-xl p-3 absolute z-10">
                        {quizTypes && quizTypes.map(item => <button onClick={() => setQuizType(item.label)} key={item.id} className={`block ${language && language['dir'] == 'ltr' ? 'text-left' : 'text-right'} font-bold rounded-xl w-full mb-3 p-3 ${quizType == item.label ? 'bg-gradient-to-br from-[#fa9600] to-[#ffe696] hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400' : 'bg-white'}`}>
                            {language && language['dir'] == 'ltr' ? item.label : item.label_arabic}
                        </button>)}
                    </div>}
                </div>
            </div>
            <p className="my-5 font-bold">{language && language["add_answers"]}</p>
            {quizType != 'text' && <div className="flex">
                <label htmlFor="question" className="block w-[75%]">
                    <input type="text" id="question" placeholder="Answer Option" className="py-2 px-14 rounded shodow-sm bg-gray-200 placeholder-gray-400 w-full" value={answerText} onChange={val => setAnswerText(val.target.value)} />
                </label>
                <button onClick={handleAddAnswer} className="block mx-3 rounded pointer py-2 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400">{language && language["add_text"]}</button>
            </div>}

            {answers && answers.length != 0 && <p className="my-5 font-bold">{language && language["answers_list"]}</p>}

            <div className="mt-5">
                {answers && answers.map((item, index) => <label htmlFor={"correct-answer" + item.id} key={"answer-" + item.id} className={`hover:bg-gray-100 hover:border hover:border-gray-200 rounded-xl ${item.correct && 'bg-green-200'} p-5 py-2 my-2 text-sm flex justify-between`}><span>{(index + 1)} - {item.answer}</span> <div>
                    <span className="p-2 mx-4"><input onChange={e => updateCorrectAnswer(item.id, e.target.checked)} defaultChecked={item.correct} type={quizType == 'Single choice' ? "radio" : "checkbox"} name="correct-answer" id={"correct-answer" + item.id} /> {language && language["correct_answer"]}</span> <button onClick={() => handleRemove(item.id)} className='bg-red-400 rounded-full w-5 h-5 text-xs text-white'>x</button>
                </div>
                </label>)}
            </div>

            {msg && <div className="p-4 m-2">{msg}</div>}

            <button onClick={handleUpdateQuiz} className="block rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 mt-10">{loading && <img className="animate-spin w-4 h-4 m-1" src="/loading_white.png" />} <span>{language && language["add_to_quizzes"]}</span></button>
        </div>
    </ThemeContainer>)
}
