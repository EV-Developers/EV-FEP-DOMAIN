import React from 'react'
import { faAngleLeft, faAngleRight, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate, useParams } from 'react-router-dom';

import api from '../../../config/api';
import { translation } from '../../../config/translations';
import ThemeContainer from '../../../compenents/parts/ThemeContainer';

export default function AddLesson() {
    const [language, setLanguage] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const { courseId } = useParams();
    const [msg, setMsg] = React.useState(null);
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

    const handleCreateSection = async (e) => {
        e.preventDefault();
        setMsg(null);
        setLoading(true);
        console.log(e.target);
        
        const formData = new FormData(e.target);
        formData.append("course_id", courseId);
        formData.append("createdBy", "2");
        formData.append("lesson_cover_image", "2");
        formData.append("_order", "1");

        //return false;

        if (e.target.title.value != "" && e.target.description.value != "") {
            try {
                const response = await api.post("/lessons", formData);
    
                console.log(response);
                
                if (response.status == 200) {
                    setLoading(false);
                    navigate('/courses/'+courseId);
                } else {
                    setLoading(false);
                    setMsg(language["error_msg"]);
                }
            } catch (error) {
                setLoading(false);
                setMsg(language["error_msg"]);
                console.log(error);
            }
        } else {
            setLoading(false);
            setMsg(language["error_validation_msg"])
        }
    }

    return (<ThemeContainer>
        <form method="post" encType="multipart/form-data" className="bg-white mx-auto m-3 rounded-xl p-5 w-[75%]" onSubmit={handleCreateSection}>
            <div className="flex">
                <Link to={"/courses/"+courseId}>
                    <img src="/logo/course-logo.png" alt="" className="w-10 h-10 my-1" />
                </Link>
                <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight: faAngleLeft} className="my-4 m-3 text-color" />
                <Link className="m-2 my-3 hover:text-[#4b4b4b]" to={"/courses/"+courseId}>{language && language["course"]}</Link>
                <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                <p className="m-3 my-3 text-color">{language && language["new_lesson"]}</p>
            </div>
            <hr className="text-gray-200 my-5" />
            
            <label htmlFor="sectionTitle">
                <p id="sectionTitle" className="my-3 font-bold">{language && language["title"]}</p>
                <input type="text" id="sectionTitle" name="title" placeholder={language && language["write_here"]} className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400" />
            </label>

            <p className="my-3 font-bold">{language && language["content"]}</p>
            <textarea id="addSection" name="description" className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400 " placeholder={language && language["write_here"]} ></textarea>

            <label htmlFor="uploadVideo" className="p-14 h-[300px] w-full flex items-center justify-center my-4 rounded-xl bg-color border border-color mb-14">
                <div className="text-center">
                    <FontAwesomeIcon icon={faArrowUp} className="text-3xl rounded-xl bg-gradient-to-b from-[#fa9600] to-[#ffe696] p-3 px-4 text-gray-100" />
                    <p className="text-l font-bold">{language && language["upload_video"]}</p>
                    <p className="text-sm text-gray-400">{language && language["drag_drop"]}</p>
                </div>
                <input type="file" id="uploadVideo" name="video" className="hidden" />
            </label>

            <label htmlFor="uploadImage" className="p-14 h-[300px] w-full flex items-center justify-center my-4 rounded-xl bg-color border border-color mb-14">
                <div className="text-center">
                    <FontAwesomeIcon icon={faArrowUp} className="text-3xl rounded-xl bg-gradient-to-b from-[#fa9600] to-[#ffe696] p-3 px-4 text-gray-100" />
                    <p className="text-l font-bold">{language && language["upload_video_cover"]}</p>
                    <p className="text-sm text-gray-400">{language && language["drag_drop"]}</p>
                </div>
                <input type="file" id="uploadImage" name="lesson_cover_image" className="hidden " />
            </label>

            {msg && <div className="p-4 m-2">{msg}</div>}

            <div className="flex flex-row justify-between">
                <button className="rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400">{loading && <img className="animate-spin w-4 h-4 m-1" src="/loading_white.png" />} <span>{language && language["add"]}</span></button>
            </div>
        </form>
    </ThemeContainer>)
}
