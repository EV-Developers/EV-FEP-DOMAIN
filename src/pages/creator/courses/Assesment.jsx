import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

import api from '../../../config/api';
import ConfrimModal from '../../../compenents/parts/ConfrimModal';
import { translation } from '../../../config/translations';
import VideoPlayer from '../../../compenents/parts/VideoPlayer';

export default function Assesment({ assignments }) {
    const [show, setShow] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);
    const [language, setLanguage] = React.useState(null);
    const [courseId, setCourseId] = React.useState(null);
    const [assesmentId, setAssesmentId] = React.useState(null);
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

    }, []);

    /**
     * delete assignments by id
     * @param {string} assignments_id assignments ID
     */
    const handleDelete = async () => {
        try {
            const response = await api.delete('/assignments/' + assignments.id);

            if (response.status == 200) {
                window.location.reload();
            }
        } catch (error) {
            //console.log(error);
        }
    }

    React.useEffect(() => {
        if (assignments && assignments.video && assignments.video != '') {
            getVideo();
        }
    }, []);

    const getVideo = async () => {
        const aurl = "https://fep.misk-donate.com/api/assignments/download/";
        const token = window.localStorage.getItem('rJp7E3Qi7r172VD');

        try {
            fetch(aurl + assignments.video, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
                .then(response => {
                    try {
                        if (response && !response.ok) {
                            setVideoError(true);
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
                    setVideoError(true);
                });
        } catch (error) {
            //console.log(error);
            setVideoError(true);
        }
    }

    return (
        <div>
            {showModal && <ConfrimModal message={language && language['confirm']} action={handleDelete} title={language && language['delete']} language={language} open={showModal} setOpen={setShowModal} />}
            <div className="bg-white p-5 m-4 shadow-sm rounded-xl cursor-pointer transition-all">
                <button className="flex justify-between transition-all cursor-pointer w-full pb-3" onClick={() => setShow(!show)}>
                    <p className="text-l font-bold">{assignments.title}</p>
                    <FontAwesomeIcon icon={!show ? faCaretDown : faCaretUp} className="text-xl" />
                </button>
                {show && <div className="transition-all">
                    <p className="text-sm text-color">{assignments.description}</p>
                    {assignments.video && assignments.video != '' && <div className="p-2">
                        {videoUrl && !videoError && <VideoPlayer videoData={videoData} tmp_vid_url={videoUrl} setVideoData={setVideoData} />}
                    </div>}
                    <p className="p-2">{language && language["assesment_type"]}: {language && language[assignments.type]}</p>
                    <div className="flex">
                        <button className="block rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400  " onClick={() => setShowModal(true)}>{language && language["delete"]}</button>
                        <Link to={"/edit-assesment/" + assignments.id} className="block rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 ">{language && language["edit"]}</Link>
                    </div>
                </div>}
            </div>

        </div>
    )
}
