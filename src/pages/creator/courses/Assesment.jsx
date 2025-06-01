import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useParams } from 'react-router-dom'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

import ConfrimModal from '../../../compenents/parts/ConfrimModal';
import { translation } from '../../../config/translations';
import api from '../../../config/api';

export default function Assesment({ item }) {
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

    /**
     * delete assignments by id
     * @param {string} item_id assignments ID
     */
    const handleDelete = async (item_id) => {
        try {
            const response = await api.delete('/assignments/' + item_id);
            console.log(response);
            if (response.status == 200) {
                navigate("/courses/" + courseId)
            } else {
                console.log('error');
            }
        } catch (error) {
            console.log(error);
        }
        
    }

    return (
        <div>
            {showModal && <ConfrimModal message={language && language['confirm']} action={handleDelete} title={language && language['delete']} language={language} open={showModal} setOpen={setShowModal} />}
            <div className="bg-white p-5 m-4 shadow-sm rounded-xl cursor-pointer transition-all">
                <button className="flex justify-between transition-all cursor-pointer w-full pb-3" onClick={() => setShow(!show)}>
                    <p className="text-l font-bold">{item.title}</p>
                    <FontAwesomeIcon icon={!show ? faCaretDown : faCaretUp} className="text-xl" />
                </button>
                {show && <div className="transition-all">
                    <div className="p-2">
                        <img src="/data/vid-1.webp" alt="" />
                    </div>
                    <p className="p-2">{language && language["assesment_type"]}: {item.assesment_type}</p>
                    <div className="flex">
                        <button className="block rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400  " onClick={() => {
                            setAssesmentId(item.id);
                            setCourseId(item.course_id);
                            setShowModal(true);
                        }}>{language && language["delete"]}</button>
                        <Link to={"/edit-assesment/" + item.id} className="block rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 ">{language && language["edit"]}</Link>
                    </div>
                </div>}
            </div>

        </div>
    )
}
