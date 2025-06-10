import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { faClock } from '@fortawesome/free-solid-svg-icons'

import api from '../../../config/api';
import { translation } from '../../../config/translations';
import VideoPlayer from '../../../compenents/parts/VideoPlayer';

export default function TLesson({ item, courseId, userProgress=0 }) {
    const [language, setLanguage] = React.useState(null);
    const [videoData, setVideoData] = React.useState(null);

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

    return (<div id={"lesson-" + item.id} className="px-3 py-5 m-4 rounded-xl transition-all">
        <div className="flex justify-between transition-all w-full pb-3">
            <div className="text-l font-bold flex">
                <div>{item.title}</div>
                <div className="text-sm text-gray-500 font-light mx-3"> <span>-</span> <FontAwesomeIcon icon={faClock} /> <span> 3 {language && language["mintus"]}, 33 {language && language["seconds"]}</span></div>
            </div>
        </div>
        <div className="transition-all px-0">
            <p className="p-2">{item.desc}</p>
            <div className="justify-baseline">
                {/* <Link to={`/teachers/courses/${courseId}/lessons/${item.id}/`} className="relative flex justify-center items-center w-[65%] group p-0">
                    <div className="text-amber-600 bg-[#CFCFCD] absolute bottom-4 z-10 mx-0 left-0 my-3 h-2 px-3 transition-all w-full"></div>
                    <div style={{ width: (parseInt(item.progress)) + '%' }} className="text-amber-600 bg-amber-500 absolute bottom-4 z-20 mx-0 left-0 my-3 h-2 px-0 transition-all blur-xs"></div>
                    <div style={{ width: (parseInt(item.progress)) + '%' }} className="text-amber-600 bg-amber-500 absolute bottom-4 z-20 mx-0 left-0 my-3 h-2 px-0 transition-all"></div>
                    <div className="w-28 h-28 pointer m-2 py-1 px-5 text-sm absolute z-10 flex justify-center items-center">
                        <img src="/play_btn.png" alt="" className="w-full" />
                    </div>

                    <img src="/data/vid-1.webp" className="w-full my-7 px-0 overflow-x-hidden rounded-t-2xl" />
                </Link> */}
                
                <VideoPlayer lessonId={item.id} courseId={courseId} videoData={videoData} tmp_vid_url={"https://fep.misk-donate.com/storage/"+item.video_path} setVideoData={setVideoData} userProgress={userProgress} />

                <div className="flex">
                    <Link to={`/teachers/courses/${courseId}/quiz/${item.id}`} className="block rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 font-bold">{language && language["lesson_quizzes"]}</Link>
                </div>
            </div>
        </div>
    </div>)
}
