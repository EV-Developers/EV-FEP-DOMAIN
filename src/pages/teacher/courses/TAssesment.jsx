import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

import { translation } from '../../../config/translations';
import api from '../../../config/api';

export default function TAssesment({ item }) {
    const [show, setShow] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);
    const [language, setLanguage] = React.useState(null);
    const [courseId, setCourseId] = React.useState(null);
    const [assesmentId, setAssesmentId] = React.useState(null);

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

    return (
        <div>
            <div className="p-5 m-4 rounded-xl transition-all">
                <div className="flex justify-between transition-all w-full pb-3">
                    <p className="text-l font-bold">{item.title}</p>
                </div>
                <div className="transition-all">
                    <div className="p-2">
                        <img src="/data/vid-1.webp" className="w-[65%]" alt="" />
                    </div>
                    <p className="p-2">{language && language["assesment_type"]}: {item.assesment_type}</p>
                </div>
            </div>

        </div>
    )
}
