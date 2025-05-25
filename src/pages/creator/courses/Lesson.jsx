import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { faCaretDown, faCaretUp, faClock } from '@fortawesome/free-solid-svg-icons'

import ConfrimModal from '../../../compenents/parts/ConfrimModal';
import { translation } from '../../../config/translations';
import api from '../../../config/api';

export default function Lesson({ courseId, item }) {
    const [show, setShow] = React.useState(false);
    const tmp_vid_url = "https://www.w3schools.com/html/mov_bbb.mp4";
    const [showModal, setShowModal] = React.useState(false);

    const [language, setLanguage] = React.useState(null);

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

    const handleDeleteLesson = async (lessonId) => {
        const response = await api.delete('/lessons/'+lessonId);
        console.log(response);
        if (response.status == 200) {
            window.location.reload()
        } else {
            console.log('error');
        }
    }

    return (<div id={"lesson-"+item.id} className="bg-white px-3 py-5 m-4 shadow-sm rounded-xl cursor-pointer transition-all">
        {showModal && <ConfrimModal message={language && language['confirm']} action={handleDeleteLesson} title={language && language['delete']} language={language} open={showModal} setOpen={setShowModal} />}
        <button className="flex justify-between transition-all cursor-pointer w-full pb-3" onClick={() => setShow(!show)}>
            <p className="text-l font-bold flex">
                <div>{item.title}</div>
                <div className="text-sm text-gray-500 font-light mx-3"> <span>-</span> <FontAwesomeIcon icon={faClock} /> <span> 3 {language && language["minitus"]}, 33 {language && language["seconds"]}</span></div>
            </p>
            <FontAwesomeIcon icon={!show ? faCaretDown : faCaretUp} className="text-xl" />
        </button>
        {show && <div className="transition-all px-0">
            <p className="p-2">{item.desc}</p>
            <video height="440" className="w-[65%] px-0 overflow-x-hidden rounded-2xl" poster="/data/vid-1.webp" controls>
                <source src={tmp_vid_url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="flex">
                <Link to={"/lessons/" + item.id} className="block rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400  ">{language && language["edit"]}</Link>
                <button onClick={() => setShowModal(true)} className="block rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400  ">{language && language["delete"]}</button>
                <Link to={"/lessons/quizzes/"+courseId+"/" + item.id} className="block rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400  ">{language && language["lesson_quizzes"]}</Link>
            </div>
        </div>}
    </div>)
}
