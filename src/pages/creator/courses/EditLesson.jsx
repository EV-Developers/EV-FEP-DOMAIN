import React from 'react'
import { faAngleLeft, faAngleRight, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate, useParams } from 'react-router-dom';

import api from '../../../config/api';
import { translation } from '../../../config/translations';
import ThemeContainer from '../../../compenents/parts/ThemeContainer';
import VideoPlayer from '../../../compenents/parts/VideoPlayer';
import axios from 'axios';

export default function EditLesson() {
    const [data, setData] = React.useState(null);
    const [msg, setMsg] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [language, setLanguage] = React.useState(null);
    const [tmp_vid_url, setVidUrl] = React.useState(null);
    const { courseId, lessonId } = useParams();
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


    const getVideo = async (video_path) => {
        const aurl = "https://fep.misk-donate.com/api/lessons/download/";
        const token = window.localStorage.getItem('rJp7E3Qi7r172VD');

        try {
            fetch(aurl + video_path, {
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
                        return null;
                    }
                })
                .then(blob => {
                    const tmpVideoURL = URL.createObjectURL(blob);
                    setVidUrl(tmpVideoURL);
                })
                .catch(error => {
                    //console.error('Error loading video:', error);
                });
        } catch (error) {
            //console.log(error);
        }
    }

    React.useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const response = await api.get('/lessons/' + lessonId);

        if (response.status == 200) {
            setData(response.data);
            getVideo(response.data.video_path);
        } else {
            //console.log('error');
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        setMsg(null);
        setLoading(true);
        const token = localStorage.getItem('rJp7E3Qi7r172VD');
        const formData = new FormData(e.target);
        formData.append("lesson_cover_image", "2");

        if (e.target.name.value != "" && e.target.description.value != "") {
            try {
                //const response = await api.put("/lessons/" + lessonId, formData);

                const response = await axios.post('https://fep.misk-donate.com/api/lessons/' + lessonId, formData, {
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    },
                });

                if (response.status == 200) {
                    setLoading(false);
                    navigate('/courses');
                } else {
                    setLoading(false);
                    setMsg(language["error_msg"]);
                }
            } catch (error) {
                //console.log(error);
            }
        } else {
            setLoading(false);
            setMsg(language["error_validation_msg"])
        }
    }

    return (<ThemeContainer>
        <form method="post" encType="multipart/form-data" className="bg-white mx-auto m-3 rounded-xl p-5 w-[75%]" onSubmit={handleUpdate}>
            <div className="flex">
                <Link to="/courses">
                    <img src="/logo/course-logo.png" alt="" className="w-10 h-10 my-1" />
                </Link>
                <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                <Link className="m-2 my-3 hover:text-[#4b4b4b]" to={"/courses"}>{language && language["courses"]}</Link>
                <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                <p className="m-3 my-3 text-color">{language && language["edit"]}</p>
            </div>
            <hr className="text-gray-200 my-5" />

            <label htmlFor="lessonTitle">
                <p id="lessonTitle" className="my-3 font-bold">{language && language["title"]}</p>
                <input type="text" id="lessonTitle" name="title" placeholder={language && language["write_here"]} className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400"
                    defaultValue={data && data.title}
                />
            </label>

            <p className="my-3 font-bold">{language && language["content"]}</p>
            <textarea id="addSection" name="description" className="py-2 px-14  rounded /shodow-sm bg-color w-full placeholder-gray-400 " placeholder="Add lesson"
                defaultValue={data && data.description}
            ></textarea>

            {tmp_vid_url && <VideoPlayer tmp_vid_url={tmp_vid_url} />}

            <label htmlFor="uploadVideo" className="p-14 h-[300px] w-full flex items-center justify-center my-4 rounded-xl bg-color border border-color mb-14">
                <div className="text-center">
                    <FontAwesomeIcon icon={faArrowUp} className="text-3xl rounded-xl bg-gradient-to-b from-[#fa9600] to-[#ffe696] p-3 px-4 text-gray-100" />
                    <p className="text-l font-bold">{language && language["upload_video"]}</p>
                    <p className="text-sm text-gray-400">{language && language["drag_drop"]}</p>
                </div>
                <input type="file" id="uploadVideo" name="video_path" className="hidden" />
            </label>

            {msg && <div className="p-4 m-2">{msg}</div>}

            <div className="flex flex-row justify-between">
                <button className="rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 flex">{loading && <img className="animate-spin w-4 h-4 m-1" src="/loading_white.png" />}  <span>{language && language["update"]}</span></button>
            </div>
        </form>
    </ThemeContainer>)
}
