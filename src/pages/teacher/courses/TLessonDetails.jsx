import React from 'react'
import ThemeContainer from '../../../compenents/parts/ThemeContainer'
import { Link, useParams } from 'react-router-dom'
import { translation } from '../../../config/translations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

export default function TLessonDetails() {
    const [language, setLanguage] = React.useState(null);
    const { lessonId } = useParams();
    const tmp_vid_url = "https://www.w3schools.com/html/mov_bbb.mp4";

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

    return (<ThemeContainer role="teachers">

        <div className="block mx-auto w-[75%]">
            <div className="flex">
                <Link to="/courses">
                    <img src="/logo/course-logo.png" alt="" className="w-10 h-10 my-1" />
                </Link>
                <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                <Link className="m-2 my-3 hover:text-[#4b4b4b]" to={"/teachers/courses"}>{language && language["courses"]}</Link>
                <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                <p className="m-3 my-3 text-color">{language && language["course_details"]}</p>
            </div>
            <div className="transition-all px-0">
                <h3 className="text-l font-bold m-3">Lesson 1</h3>
                <p className="p-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias perspiciatis, nam rerum facere unde expedita voluptate.</p>
                <video height="440" className="w-[65%] my-7 px-0 overflow-x-hidden rounded-2xl" poster="/data/vid-1.webp" controls>
                    <source src={tmp_vid_url} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="flex">
                    <Link to={"/teachers/courses/quiz/" + lessonId} className="block rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400  ">{language && language["lesson_quizzes"]}</Link>
                </div>
            </div>
        </div>
    </ThemeContainer>)
}
