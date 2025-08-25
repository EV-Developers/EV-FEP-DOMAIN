import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom'
import { faClock } from '@fortawesome/free-solid-svg-icons'

import api from '../../../config/api';
import { translation } from '../../../config/translations';
import VideoPlayer from '../../../compenents/parts/VideoPlayer';

export default function TLesson({ item, courseId, videosTime, setVideosTime, playNext, setIsPlayed }) {
    const [language, setLanguage] = React.useState(null);
    const [videoUrl, setVideoUrl] = React.useState(null);
    const [videoData, setVideoData] = React.useState(null);
    const [videoError, setVideoError] = React.useState(null);
    const [videoProgress, setVideoProgress] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [token, setToken] = React.useState(null);
    const url = "https://fep.misk-donate.com/api/";

    const navigate = useNavigate();

    React.useEffect(() => {
        const tmpToken = window.localStorage.getItem("rJp7E3Qi7r172VD");
        
        setToken(tmpToken);
    }, []);  

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
    
    /*
    const getVideo = async () => {
        const aurl = "https://fep.misk-donate.com/api/lessons/download/";
        const token = window.localStorage.getItem('rJp7E3Qi7r172VD');

        try {
            fetch(aurl + item.video_path, {
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
                    setLoading(false);
                })
                .catch(error => {
                    setVideoError(true);
                    setLoading(false);
                    //console.error('Error loading video:', error);
                });
        } catch (error) {
            setVideoError(true);
            setLoading(false);
            //console.log(error);
        }
    }
    */

    React.useEffect(()=> {
        if(videoProgress && videoData){  
            try {
                let completed = false;
                let lock = true;
                const pregress = parseInt((videoProgress / videoData.duration) * 100);
                
                if(videoData.duration == videoProgress){
                    completed = true;
                    if(item.has_quiz){
                        navigate(`/teachers/courses/${courseId}/quiz/${item.id}`);
                    } else if(playNext){
                        //window.location.hash = 'lesson-'+playNext.id;
                        document.getElementById('lesson-'+playNext.id).scrollIntoView({ behavior: 'smooth' });

                        window.document.getElementById("video-"+playNext.id).click();
                        setIsPlayed(playNext);                        
                    }
                }                
                
                if(item.progress && item.progress.completed){
                    lock = false;
                    completed = true;
                }

                if(lock == true){
                    const lesson_progress = api.post(`/lessons/${item.id}/progress`, {
                        "video_progress": pregress,
                        "completed": completed
                    });
                    
                    
                    if (lesson_progress.status == 200) {
                        //console.log('sended.'); 
                    }
                }
            } catch (error) {
                //console.log(error);
            }
        }
    }, [videoProgress]);

    return (<div id={"lesson-" + item.id} className="px-3 py-5 m-4 rounded-xl transition-all">
        <div className="flex justify-between transition-all w-full pb-3">
            <div className="text-l font-bold flex">
                <div>{item.title}</div>
                {videoUrl && !videoError && <div className="text-sm text-gray-500 font-light mx-3"> <span>-</span> <FontAwesomeIcon icon={faClock} /> <span> {videoData && videoData.minutes} {language && language["minitus"]}, {videoData && videoData.seconds} {language && language["seconds"]}</span></div>}
            </div>
        </div>
        <div className="transition-all px-0">
            <p className="p-2">{item.desc}</p>
            <div className="justify-baseline">
                {token && <VideoPlayer
                    language={language}
                    lessonId={item.id}
                    courseId={courseId}
                    videoData={videoData}
                    tmp_vid_url={url + "lessons/stream/" + item.video_path + "?token=" + token}
                    setVideoData={setVideoData}
                    setVideosTime={setVideosTime}
                    userProgress={item.progress ? item.progress.completed == 1 ? 100 : item.progress.video_progress : 0}
                    setVideoProgress={setVideoProgress}
                    playNext={playNext}
                    has_quiz={item.has_quiz}
                    completed={item.progress && item.progress.completed}
                    locked={item.locked}
                />}
                {item.has_quiz && item.progress && item.progress.completed == 1 && <div className="flex">
                    <Link to={`/teachers/courses/${courseId}/quiz/${item.id}`} className="block rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 font-bold">{language && language["lesson_quizzes"]}</Link>
                </div>}
            </div>

            {/* {loading && <div className="flex flex-wrap animate-pulse">
                <div className="shadow w-full md:w-[75%] h-[400px] bg-gray-200 rounded-xl p-2 mx-2 my-3 flex justify-center items-center">
                    <div className="relative">
                        <div className="w-0 h-0 border-t-14 border-b-14 border-l-14 border-t-transparent border-b-transparent border-l-gray-400 absolute right-7 bottom-0 top-7 z-10"></div>
                        <div className="bg-gray-300 w-20 h-20 rounded-full"></div>
                    </div>
                </div>
            </div>} */}
        </div>
    </div>)
}
