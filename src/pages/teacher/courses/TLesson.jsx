import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { faClock } from '@fortawesome/free-solid-svg-icons'

import api from '../../../config/api';
import { translation } from '../../../config/translations';
import VideoPlayer from '../../../compenents/parts/VideoPlayer';

export default function TLesson({ item, courseId, userProgress = 0 }) {
    const [language, setLanguage] = React.useState(null);
    const [videoData, setVideoData] = React.useState(null);
    const [videoUrl, setVideoUrl] = React.useState(null);
    const [videoError, setVideoError] = React.useState(null);

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

        getVideo();
    }, []);

    const getVideo = async () => {        
        const aurl = "https://fep.misk-donate.com/api/lessons/download/";
        const token = window.localStorage.getItem('rJp7E3Qi7r172VD');

        try {
            fetch(aurl+item.video_path, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then(response => {            
                try {
                    if (response && !response.ok) {
                        setVideoError(true)
                    }
                    return response.blob();
                } catch (error) {
                    setVideoError(true)
                    return null;
                }
            })
            .then(blob => {            
                const tmpVideoURL = URL.createObjectURL(blob);  
                setVideoUrl(tmpVideoURL);          
            })
            .catch(error => {
                setVideoError(true)
                //console.error('Error loading video:', error);
            });
        } catch (error) {
            setVideoError(true)
            //console.log(error);
        }
    }

    return (<div id={"lesson-" + item.id} className="px-3 py-5 m-4 rounded-xl transition-all">
        <div className="flex justify-between transition-all w-full pb-3">
            <div className="text-l font-bold flex">
                <div>{item.title}</div>
                {videoUrl && !videoError && <div className="text-sm text-gray-500 font-light mx-3"> <span>-</span> <FontAwesomeIcon icon={faClock} /> <span> {videoData && videoData.minutes} {language && language["minitus"]}, {videoData && videoData.seconds} {language && language["seconds"]}</span></div>}
            </div>
        </div>
        <div className="transition-all px-0">
            <p className="p-2">{item.desc}</p>
            {videoUrl && !videoError && <div className="justify-baseline">
                <VideoPlayer 
                    lessonId={item.id} 
                    courseId={courseId} 
                    videoData={videoData} 
                    tmp_vid_url={videoUrl} 
                    setVideoData={setVideoData} 
                    userProgress={userProgress}
                />
                <div className="flex">
                    <Link to={`/teachers/courses/${courseId}/quiz/${item.id}`} className="block rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 font-bold">{language && language["lesson_quizzes"]}</Link>
                </div>
            </div>}
        </div>
    </div>)
}
