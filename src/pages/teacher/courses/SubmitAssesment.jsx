import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { jsPDF } from "jspdf";
import { QRCode } from '@liquid-js/qrcode-generator';

import { translation } from '../../../config/translations';
import ThemeContainer from '../../../compenents/parts/ThemeContainer';
import api from '../../../config/api';
import VideoPlayer from '../../../compenents/parts/VideoPlayer';

export default function SubmitAssesment() {
    const [language, setLanguage] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [loadingFile, setLoadingFile] = React.useState(false);
    const [data, setData] = React.useState(null);
    const [videoData, setVideoData] = React.useState(null);
    const [course, setCourse] = React.useState(null);
    const [courses, setCourses] = React.useState(null);
    const [msg, setMsg] = React.useState(null);
    const [file, setFile] = React.useState(false);
    const [videoUrl, setVideoUrl] = React.useState(null);
    const [videoError, setVideoError] = React.useState(null);
    const [submissions, setSubmissions] = React.useState([]);
    const token = window.localStorage.getItem('rJp7E3Qi7r172VD');
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

        loadData();
    }, []);

    const loadData = async () => {
        const user_id = window.localStorage.getItem("DDOj9KHr51qW1xi");

        try {
            const response = await api.get('/assignments/' + assesmentId + "?user_id="+user_id);

            if (response.status == 200) {
                if(response.data){

                    setData(response.data);
                    if (response.data.submissions) {
                        const user_id = parseInt(window.localStorage.getItem("DDOj9KHr51qW1xi"))
                        const tmpArr = [];
                        response.data.submissions.map(item => {
                            if (item.user_id == user_id) {
                                tmpArr.push(item);
                            }
                        });
    
                        setSubmissions(tmpArr)
                    }

                    const course_response = await api.get('/courses/' + response.data.course_id);
                    if (course_response.status == 200) {
                        setCourse(course_response.data.data);
                        getCoursesByCategory(course_response.data.data.category.id);
                    }
                }
            }
        } catch (error) {
            //console.log(error);
        }
    }

    
    const getCoursesByCategory = async (categoryId) => {
        try {
            const response = await api.get('/courses?sort_by=level_id&category_id=' + categoryId);

            if (response.status == 200) {                
                setCourses(response.data.data);
            }
        } catch (error) {
            //
        }
    }

    const handleSubmitAssestment = async (ev) => {
        ev.preventDefault();
        
        setMsg(null);
        if (!data) {
            setMsg(language['error_msg']);
            return false;
        }

        try {
            setLoading(true);
            const formData = new FormData();

            switch (data.type) {
                case "questions":
                    if (data && data.questions) {
                        data.questions.map((item, index) => {
                            let answer = ev.target["question-" + item.id].value
                            formData.append(`answers[${index}].question_id`, item.id);
                            formData.append(`answers[${index}].answer_text`, answer);
                        });
                    }
                    break;

                case "meeting":
                    formData.append("meeting_requested", '1')
                    break;

                case "url":
                    formData.append("url", ev.target.url.value);

                    break;

                case "file":
                    formData.append("file", ev.target.file.files[0]);
                    break;

                default:
                    setMsg(language['error_msg']);
                    return false;
                    break;
            }

            //const response = await api.post(`/assignments/${assesmentId}/submit`, formData);

            const response = await fetch(`https://fep.misk-donate.com/api/assignments/${assesmentId}/submit`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });

            setLoading(false);

            if (response.status == 200) {
                createCertificte();
                //navigate('/teachers/courses/' + data.course_id);
            } else if (response.status == 422) {
                setMsg(language["assignment_error"]);
            } else {
                setMsg(language['error_msg']);
            }
        } catch (error) {
            setLoading(false);
            setMsg(language['error_msg']);
        }

    }

    const handleSetFile = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0].name);
        }
    }

    React.useEffect(() => {
        if (data && data.video) {
            getAssesment();
        }
    }, [data]);

    const getAssesment = async () => {
        const aurl = "https://fep.misk-donate.com/api/assignments/download/";

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

    /*
        answers: []
        assignment_id: 12
        created_at: "2025-06-23T06:57:34.000000Z"
        file_path: "Mu1kA78NGBQWp0U5sk5dL7l6we3ZQUEW5XHtSdnu.png"
        id: 2
        is_completed: true
        meeting_link: null
        meeting_requested: null
        meeting_time: null
        submitted_at: "2025-06-23 06:57:34"
        updated_at: "2025-06-24T10:19:34.000000Z"
        url: null
        user_id: 5
    */

    const downloadSubmition = async (assignment_id, file) => {
        setLoadingFile(true);
        const aurl = `https://fep.misk-donate.com/api/assignments/${data.course_id}/download/`;
        const token = window.localStorage.getItem('rJp7E3Qi7r172VD');

        try {
            fetch(aurl + file, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
                .then(response => {
                    try {
                        if (response && !response.ok) {
                            return false
                        }
                        return response.blob();
                    } catch (error) {
                        return false;
                    }
                })
                .then(blob => {
                    const tmpURL = URL.createObjectURL(blob);
                    const element = document.createElement('a');
                    element.href = tmpURL;
                    element.download = file;
                    document.body.appendChild(element);
                    element.click();
                    document.body.removeChild(element);
                    setLoadingFile(false);
                })
                .catch(error => {
                    setLoadingFile(false);
                    //console.error('Error loading video:', error);
                });
        } catch (error) {
            setLoadingFile(false);
            //console.log(error);
        }
    }

    const createCertificte = async () => {
        if(courses){
            const completed = courses.filter(item => item.courseProgress && item.courseProgress.completed && item.courseProgress.completed === 1);

            if(completed.length == courses.length){
                try {
                    const user_id = window.localStorage.getItem("DDOj9KHr51qW1xi");
                    const form = new FormData();
                    form.append("category_id", "");
                    form.append("user_id", user_id);
                    form.append("certificate", getCertificatePdf());
            
                    const response = await api.post('/certificates', form, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    });
            
                    if(response.status == 200){
                        navigate('/teachers/courses/' + data.course_id);
                    } else {
                        setMsg(language['error-msg']);
                    }
                } catch (error) {
                    setMsg(language['error-msg']);
                }
            } else {
                navigate('/teachers/courses/' + data.course_id);
            }
        } else {
            navigate('/teachers/courses/' + data.course_id);
        }
    }

    const getCertificatePdf = () => {        
        if(course){
            const username = window.localStorage.getItem("VPHl3hMFGI8w9kq");
            const courseTitle = course.category.name;
            const date = new Date().toLocaleDateString('en-GB');

            if (username != null && username != '') {
                const cr_ref = String(Date.now());
                // Replace file name spaces with dash
                const file_name = courseTitle.replaceAll(' ', '-') + '-certificate.pdf';

                // Add certificate URL as QR Code.
                const qr = new QRCode(4, 'L');
                qr.addData('https://fep.misk-donate.com/?c=' + cr_ref);
                qr.make();
                const qr_image = qr.toDataURL();

                let logo = "/logo/Logo.png";
                let bgcer = "/cerbg.png";

                // creating certificate PDF
                const doc = new jsPDF('landscape', 'pt', 'a4');
                const centerX = doc.internal.pageSize.getWidth() / 2;
                // get font name from 'Amiri-Regular-normal.js'
                doc.setFont('Amiri-Regular');
                doc.setTextColor('#212121');
                doc.setFontSize(26);
                doc.addImage(bgcer, 'png', 0, 0, 850, 600);
                doc.addImage(logo, 'png', centerX - 70, 180, 142, 54);
                doc.addImage(qr_image, 'png', centerX + 200, 450, 100, 100);
                doc.setFontSize(32);
                doc.text(username, centerX, 310, { align: 'center', dir: language['dir'] });
                doc.setFontSize(18);

                // if user UI language is arabic or english this will effect the certificate language.
                if (language['dir'] == 'ltr') {
                    doc.text("In " + course.category.name + " on " + date, centerX, 350, { align: 'center', dir: 'ltr' });
                } else {
                    doc.text("في برنامج " + course.category.name + " بتاريخ " + date, centerX, 350, { align: 'center', dir: 'rtl' });
                }

                //doc.save(file_name);
                const pdfBlob = doc.output("blob", {filename: file_name});
                
                return pdfBlob;
            }
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

            {(data && data.type == "url") && <div>
                <p>URL</p>
                <p><input type="text" name="url" className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400 " placeholder={language && language["write_here"]} /></p>
            </div>}

            {(data && data.type == "questions") && data.questions && data.questions.map(item => <div key={"question-" + item.id}>
                <p>{item.question_text}</p>
                <p><input type="text" name={"question-" + item.id} className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400 " placeholder={language && language["write_here"]} /></p>
            </div>)}

            {videoUrl && !videoError && <div className="block justify-baseline mx-auto">
                <VideoPlayer videoData={videoData} setVideosTime={null} tmp_vid_url={videoUrl} setVideoData={setVideoData} />
            </div>}

            {(data && data.type == "file") && <div>
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

            {msg && <p className="text-red-500 p-5 my-3 text-center text-sm">{msg}</p>}

            <button className="flex rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 mx-auto font-bold cursor-pointer">{loading && <img className="animate-spin w-4 h-4 m-1" src="/loading_white.png" />} {language && (data && data.type == 'meeting' ? language["request_meeting"] : language["submit"])}</button>
        </form>

        {(data && submissions && submissions.length != 0) && <div className="w-[75%] block mx-auto rounded-xl m-5 bg-white p-5">
            <h3 className="text font-bold">{language && language['submitions']}</h3>
            {submissions.map(item => <div key={"sub-" + item.id} className="border-b border-b-gray-400 p-3 tex-sm">
                {data.type == 'file' && <div className="flex justify-between">
                    <span>{new Date(item.submitted_at).toLocaleString("en-GB")} - {language && language['file']}</span> <button className="flex rounded pointer py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 text-xs cursor-pointer" onClick={() => downloadSubmition(item.id, item.file_path)}>{loadingFile && <img className="animate-spin w-2 h-2 m-1" src="/loading_white.png" />} {language && language['download']}</button>
                </div>}
                {data.type == 'url' && <p><a className="cursor-pointer hover:bg-amber-500 px-3 rounded-2xl" href={item.url} target="_blank">{new Date(item.submitted_at).toLocaleString("en-GB")} - {language && language['url']}</a></p>}
                {data.type == 'meeting' && <p><a className="cursor-pointer hover:bg-amber-500 px-3 rounded-2xl" href={item.meeting_link} target="_blank">{new Date(item.submitted_at).toLocaleString("en-GB")} - {language && language['time']}: {item.meeting_time ? language['tba'] : item.meeting_time}</a></p>}
                {data.type == 'questions' && <p>{new Date(item.submitted_at).toLocaleString("en-GB")} - {language && language['questions_done']}</p>}
            </div>)}
        </div>}
    </ThemeContainer>)
}
