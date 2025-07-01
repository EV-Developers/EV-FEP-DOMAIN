import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { faCaretDown, faCaretUp, faClock } from '@fortawesome/free-solid-svg-icons'

import api from '../../../config/api';
import ConfrimModal from '../../../compenents/parts/ConfrimModal';
import { translation } from '../../../config/translations';
import VideoPlayer from '../../../compenents/parts/VideoPlayer';

export default function Lesson({ courseId, item }) {
    const [show, setShow] = React.useState(false);
    const [videoData, setVideoData] = React.useState(null);
    const [videoUrl, setVideoUrl] = React.useState(null);
    const [videoError, setVideoError] = React.useState(null);
    const [showModal, setShowModal] = React.useState(false);
    const [language, setLanguage] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        console.log(item);
        
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
            fetch(aurl + item.video_path, {
                //fetch(textVideo, {
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
                        setVideoError(true);
                        return null;
                    }
                })
                .then(blob => {
                    const tmpVideoURL = URL.createObjectURL(blob);
                    setVideoUrl(tmpVideoURL);
                })
                .catch(error => {
                    //console.error('Error loading video:', error);
                });
        } catch (error) {
            //console.log(error);
        }
    }

    const handleDeleteLesson = async () => {
        try {
            const response = await api.delete('/lessons/' + item.id);

            if (response.status == 200) {
                window.location.reload()
            } else {
                //console.log('error');
            }
        } catch (error) {
            //console.log(error);
        }
    }

    return (<div id={"lesson-" + item.id} className="bg-white px-3 py-5 m-4 shadow-sm rounded-xl cursor-grab transition-all">
        {showModal && <ConfrimModal message={language && language['confirm']} action={handleDeleteLesson} title={language && language['delete']} language={language} open={showModal} setOpen={setShowModal} />}
        <button className="flex justify-between transition-all cursor-pointer w-full pb-3" onClick={() => setShow(!show)}>
            <div className="text-l font-bold flex">
                <div>{item.title}</div>
                {show && <div className="text-sm text-gray-500 font-light mx-3"> <span>-</span> <FontAwesomeIcon icon={faClock} /> <span> {videoData && videoData.minutes} {language && language["minitus"]}, {videoData && videoData.seconds} {language && language["seconds"]}</span></div>}
            </div>
            <FontAwesomeIcon icon={!show ? faCaretDown : faCaretUp} className="text-xl" />
        </button>
        {show && <div className="transition-all px-0">
            <p className="p-2">{item.description}</p>
            {!videoError && <VideoPlayer language={language} tmp_vid_url={videoUrl} courseId={courseId} lessonId={item.lessonId} videoData={videoData} setVideoData={setVideoData} userProgress={0} poster="/data/vid-1.webp" />}
            <div className="flex">
                <Link to={"/lessons/" + item.id} className="block rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400  ">{language && language["edit"]}</Link>
                <button onClick={() => setShowModal(true)} className="block rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400  ">{language && language["delete"]}</button>
                <Link to={"/lessons/quizzes/" + courseId + "/" + item.id} className="block rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400  ">{language && language["lesson_quizzes"]}</Link>
            </div>
        </div>}
    </div>)
}
