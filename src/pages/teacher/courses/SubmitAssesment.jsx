import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faArrowUp } from '@fortawesome/free-solid-svg-icons';

import { translation } from '../../../config/translations';
import ThemeContainer from '../../../compenents/parts/ThemeContainer';
import api from '../../../config/api';
import VideoPlayer from '../../../compenents/parts/VideoPlayer';

export default function SubmitAssesment() {
    const [language, setLanguage] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState(null);
    const [videoData, setVideoData] = React.useState(null);
    const [file, setFile] = React.useState(false);
    const [videoUrl, setVideoUrl] = React.useState(null);
    const [videoError, setVideoError] = React.useState(null);
    const { assesmentId } = useParams();

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

    React.useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const response = await api.get('/assignments/' + assesmentId);

            if (response.status == 200) {
                setData(response.data);
            }
        } catch (error) {
            //console.log(error);
        }
    }

    const handleSubmitAssestment = async (ev) => {
        ev.preventDefault();
        //
        try {
            setLoading(true);
            if (data && data.type != 'questions') {
                const file_url = window.URL.createObjectURL(ev.target.file.files[0]);

                const response = await api.get('/assignments/submit', {
                    "assignment_id": assesmentId,
                    "file_path": file_url, //"/files/submission.pdf"
                });

                setLoading(false);

                if (response.status == 200) {

                }
            } else {
                const response = await api.get('/assignments/submit', {
                    "assignment_id": assesmentId,
                    "file_path": file_url, //"/files/submission.pdf"
                });

                setLoading(false);

                if (response.status == 200) {

                }
            }
        } catch (error) {
            setLoading(false);
        }

    }

    const handleSetFile = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0].name);
        }
    }

    React.useEffect(() => {
        if (data && data.video) {
            getVideo();
        }
    }, [data]);

    const getVideo = async () => {
        const aurl = "https://fep.misk-donate.com/api/assignments/download/";
        const token = window.localStorage.getItem('rJp7E3Qi7r172VD');

        try {
            fetch(aurl + data.video, {
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

    return (<ThemeContainer role="teachers">
        <form method="post" onSubmit={handleSubmitAssestment} encType="multipart/form-data" className="w-[75%] block mx-auto rounded-xl m-5 bg-white p-5">
            <div className="flex">
                <Link to={"/teachers/courses/"}>
                    <img src="/logo/course-logo.png" alt="" className="w-10 h-10 my-1" />
                </Link>
                <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                <Link className="m-2 my-3 hover:text-[#4b4b4b]" to={"/teachers/courses/"}>{language && language["courses"]}</Link>
                <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                <Link className="m-2 my-3 hover:text-[#4b4b4b]" to={"/teachers/courses/" + (data && data.course_id)}>{language && language["course"]}</Link>
                <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                <p className="m-3 my-3 text-color">{language && language["submit"]}</p>
            </div>

            <hr className="text-gray-200 my-5" />
            <p className="text-l font-bold">{data && data.title}</p>
            {data && data.due_date && data.due_date != '' && <p className="text-sm text-color italic font-bold">{language && language['due_date']}: {data.due_date}</p>}
            <p className="text-sm text-color">{data && data.description}</p>

            {data && data.type == "questions" && data.questions && data.questions.map(item => <div key={"question-" + item.id}>
                <p>{item.question_text}</p>
                <p><input type="text" name={"question-" + item.id} className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400 " placeholder={language && language["write_here"]} /></p>
            </div>)}

            {videoUrl && !videoError && <div className="justify-baseline">
                <VideoPlayer videoData={videoData} tmp_vid_url={videoUrl} setVideoData={setVideoData} />
            </div>}

            {data && data.type != "questions" && <div>
                <label htmlFor="file" className="p-14 h-[300px] w-full flex items-center justify-center my-4 rounded-xl bg-color border border-color">
                    <div className="text-center">
                        <FontAwesomeIcon icon={faArrowUp} className="text-3xl rounded-xl bg-gradient-to-b from-[#fa9600] to-[#ffe696] p-3 px-4 text-gray-100" />
                        <p className="text-l font-bold">{language && language["upload"]}</p>
                        <p className="text-sm text-gray-400">{language && language["drag_drop"]}</p>
                        {file && <p className="p-4">{file}</p>}
                    </div>
                    <input type="file" id="file" name="file" onChange={handleSetFile} className="hidden " />
                </label>
            </div>}


            <button className="flex rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 mx-auto font-bold">{loading && <img className="animate-spin w-4 h-4 m-1" src="/loading_white.png" />} {language && language["submit"]}</button>
        </form>
    </ThemeContainer>)
}
