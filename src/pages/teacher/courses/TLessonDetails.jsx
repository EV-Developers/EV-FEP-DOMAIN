import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faPlay } from '@fortawesome/free-solid-svg-icons';

import { translation } from '../../../config/translations';
import ThemeContainer from '../../../compenents/parts/ThemeContainer'
import VideoPlayer from '../../../compenents/parts/VideoPlayer';

export default function TLessonDetails() {
    const [language, setLanguage] = React.useState(null);
    const [videoData, setVideoData] = React.useState(true);
    const { courseId, lessonId } = useParams();
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
                <Link className="m-2 my-3 hover:text-[#4b4b4b]" to={"/teachers/courses/" + courseId}>{language && language["course"]}</Link>
                <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                <p className="m-3 my-3 text-color">{language && language["details"]}</p>
            </div>
            <div className="transition-all px-0">
                <h3 className="text-l font-bold m-3">Lesson 1</h3>
                <p className="p-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias perspiciatis, nam rerum facere unde expedita voluptate.</p>

                <VideoPlayer lessonId={lessonId} courseId={courseId} videoData={videoData} setVideoData={setVideoData} tmp_vid_url={tmp_vid_url} userProgress={6.555291} />


                <div className="flex flex-row justify-between mt-7 w-[75%]">
                    <button className="bg-color pointer rounded m-2 py-1 px-5 text-sm">{language && language['previous']}</button>
                    <Link to={`/teachers/courses/${courseId}/quiz/${lessonId}`} className="block rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 font-bold">{language && language["lesson_quizzes"]}</Link>
                    <button className="rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 cursor-pointer">{language && language['next']}</button>
                </div>
                <div className="flex">
                </div>
            </div>
        </div>
    </ThemeContainer>)
}
