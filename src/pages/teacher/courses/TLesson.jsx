import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { faClock, faPlay } from '@fortawesome/free-solid-svg-icons'

import { translation } from '../../../config/translations';
import api from '../../../config/api';

export default function TLesson({ item }) {
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
                <Link to={"/teachers/courses/lesson/" + item.id} className="relative flex justify-center items-center w-[65%] group p-0 rounded-2xl">
                    <div style={{ width: (parseInt(item.progress) - 0.5) + '%' }} className={`text-amber-600 bg-amber-500 absolute bottom-4 z-10 mx-0 left-1 my-3 h-3 transition-all ${parseInt(item.progress) == 100 ? 'rounded-b-2xl' : language && language['dir'] == 'ril' ? 'rounded-br-2xl' : 'rounded-bl-2xl'}
                    `}></div>
                    <div className="rounded-full w-14 h-14 pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br  hover:from-amber-700 group-hover:to-amber-400 absolute z-10 flex justify-center items-center">
                        <FontAwesomeIcon icon={faPlay} className="text-white text-3xl" />
                    </div>
                    <img src="/data/vid-1.webp" className="w-full my-7 px-0 overflow-x-hidden rounded-2xl" />
                </Link>
            </div>
        </div>
    </div>)
}
