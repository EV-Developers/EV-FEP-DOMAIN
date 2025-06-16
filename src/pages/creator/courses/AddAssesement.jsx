import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faArrowUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useParams } from 'react-router-dom';

import api from '../../../config/api';
import { translation } from '../../../config/translations';
import ThemeContainer from '../../../compenents/parts/ThemeContainer';

export default function AddAssesement() {
    const [language, setLanguage] = React.useState(null);
    const [show, setShow] = React.useState(false);
    const [questionText, setQuestionText] = React.useState("");
    const [questionsList, setQuestionsList] = React.useState([]);
    const [assesementType, setAssesementType] = React.useState("file");
    const [loading, setLoading] = React.useState(false);
    const [msg, setMsg] = React.useState(null);
    const assesement_types = ["file", "url", "meeting", "questions"];
    const { courseId } = useParams();
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


    const handleAddAssesement = async (e) => {
        e.preventDefault();
        setMsg(null);
        setLoading(true);
        let formData = null;
        const auth_user = window.localStorage.getItem("DDOj9KHr51qW1xi");

        if (assesementType == 'questions') {
            formData = JSON.stringify({
                "title": e.target.title.value,
                "course_id": courseId,
                "type": "questions",
                "description": e.target.description.value,
                "questions": questionsList
            })
        } else {
            formData = {
                "title": e.target.title.value,
                "course_id": parseInt(courseId),
                "type": assesementType,
                "description": e.target.description.value,
            }
        }

        if (e.target.title.value != "" && e.target.description.value != "") {
            try {
                const response = await api.post("/assignments", formData);

                if (response.status == 200) {
                    setLoading(false);

                    navigate('/courses/' + courseId);
                } else {
                    setLoading(false);
                    setMsg(language["error_msg"]);
                }
            } catch (error) {
                setMsg(language['error_msg']);
                setLoading(false);
            }
        } else {
            setLoading(false);
            setMsg(language["error_validation_msg"])
        }
    }

    React.useEffect(() => {
        setShow(false);
    }, [assesementType])

    const handleAddQuestion = () => {
        const tmpArr = questionsList;
        tmpArr.push({
            id: Date.now(),
            question_text: questionText
        });
        setQuestionsList(tmpArr);
        setQuestionText("");
    }

    const handleRemove = (item) => {
        const tmpArr = questionsList.filter(oldItem => oldItem.id != item.id);
        setQuestionsList(tmpArr);
    }

    return (
        <ThemeContainer>
            <form method="post" encType="multipart/form-data" onSubmit={handleAddAssesement} className="w-[75%] block mx-auto rounded-xl m-5 bg-white p-5">
                <div className="flex">
                    <Link to={"/courses/"}>
                        <img src="/logo/course-logo.png" alt="" className="w-10 h-10 my-1" />
                    </Link>
                    <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                    <Link className="m-2 my-3 hover:text-[#4b4b4b]" to={"/courses/" + courseId}>{language && language["course"]}</Link>
                    <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                    <p className="m-3 my-3 text-color">{language && language["new_assesment"]}</p>
                </div>

                <hr className="text-gray-200 my-5" />

                <p className="my-3 font-bold">{language && language["choose_assesment_type"]}</p>
                <div className="relative">
                    <button type="button" className="flex justify-between font-bold bg-color py-2 px-5 mx-3 rounded-xl text-sm" onClick={() => setShow(!show)}><span>{assesementType && language && language[assesementType]}</span> <FontAwesomeIcon icon={faCaretDown} className={language && language['dir'] == 'rtl' ? "mr-4" : "ml-4"} /></button>
                    {show && <div className="bg-color block rounded-xl w-[25%] p-3 absolute z-10">
                        {assesement_types && assesement_types.map(item => <button type="button" onClick={() => setAssesementType(item)} key={item} className={`block font-bold rounded-xl w-full mb-3 p-3 ${assesementType && assesementType == item ? 'bg-gradient-to-br from-[#fa9600] to-[#ffe696] hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400' : 'bg-white'}`}>
                            {language && language[item]}
                        </button>)}
                    </div>}
                </div>

                <label htmlFor="title" className="block mb-14">
                    <p className="my-3 font-bold">{language && language["title"]}</p>
                    <input type="text" name="title" id="title" placeholder={language && language["write_here"]} className="py-2 px-14  rounded shodow-sm bg-gray-200 w-full placeholder-gray-400" />
                </label>

                <label htmlFor="description" className="block mb-14">
                    <p className="my-3 font-bold">{language && language["description"]}</p>
                    <textarea name="description" id="description" placeholder={language && language["write_here"]} className="py-2 px-14  rounded shodow-sm bg-gray-200 w-full placeholder-gray-400" rows={3}></textarea>
                </label>

                {assesementType == 'questions' && <div>
                    <p className="my-5 font-bold">{language && language["new_question"]}</p>
                    <div className="flex">
                        <label htmlFor="question" className="block w-[75%]">
                            <input type="text" id="question" placeholder={language && language['write_here']} className="py-2 px-14 rounded shodow-sm bg-gray-200 placeholder-gray-400 w-full inset-shadow-sm inset-gray-indigo-800" value={questionText} onChange={val => setQuestionText(val.target.value)} />
                        </label>
                        <button type="button" onClick={handleAddQuestion} className="block mx-3 rounded pointer py-2 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400">{language && language["add"]}</button>
                    </div>

                    {questionsList && questionsList.length != 0 && <div className="mt-5">
                        {questionsList && questionsList.map((item, index) => <div key={"question-" + index} className="flex justify-between w-full">
                            <span>{item.question_text}</span>
                            <span className="p-2 mx-4">
                                <button type="button" onClick={() => handleRemove(item)} className='bg-red-400 rounded-full w-5 h-5 text-xs text-white'>x</button></span>
                        </div>)}
                    </div>}
                </div>}

                {msg && <div className="p-4 m-2">
                    {msg}
                </div>}

                <div className="flex flex-row justify-between">
                    <button type="submit" className="flex rounded pointer m-2 mt-5 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 mx-auto">{loading && <img className="animate-spin w-4 h-4 m-1" src="/loading_white.png" />} {language && language["create"]}</button>
                </div>
            </form>
        </ThemeContainer>
    )
}
