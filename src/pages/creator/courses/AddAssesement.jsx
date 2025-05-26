import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faArrowUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import { translation } from '../../../config/translations';
import ThemeContainer from '../../../compenents/parts/ThemeContainer';
import api from '../../../config/api';

export default function AddAssesement() {
    const [show, setShow] = React.useState(false);
    const { coursesId } = useParams();

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

    const [attchmentType, setAttchmentType] = React.useState({
        id: 'Oral',
        title: 'Oral',
    });

    const attachments_types = [
        {
            id: 'oral',
            title: 'Oral Assesewment',
        },
        {
            id: 'document',
            title: 'Uploading a Document',
        },
        {
            id: 'git',
            title: 'Public Git Reposastory',
        },
        {
            id: 'file',
            title: 'ZIP file',
        },
    ]

    const handleAddAssesement = async (e) => {
        e.preventDefault();
        setMsg(null);

        const formData = new FormData(e.target);
        formData.append("course_id", coursesId);
        formData.append("createdBy", "2");

        //return false;

        if (e.target.title.value != "" && e.target.description.value != "") {
            const response = await api.post("/assignments", formData);

            if (response.status == 200) {
                navigate('/courses/' + coursesId);
            } else {
                setMsg(language["error_msg"]);
            }
        } else {
            setMsg(language["error_validation_msg"])
        }
    }

    return (
        <ThemeContainer>
            <form method="post" encType="multipart/form-data" onSubmit={handleAddAssesement} className="w-[75%] block mx-auto rounded-xl m-5 bg-white p-5">
                <div className="flex">
                    <Link to={"/courses/"}>
                        <img src="/logo/course-logo.png" alt="" className="w-10 h-10 my-1" />
                    </Link>
                    <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                    <Link className="m-2 my-3 hover:text-[#4b4b4b]" to={"/courses/" + coursesId}>{language && language["course"]}</Link>
                    <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                    <p className="m-3 my-3 text-color">{language && language["new_assesment"]}</p>
                </div>

                <hr className="text-gray-200 my-5" />

                <p className="my-3 font-bold">{language && language["choose_assesment_type"]}</p>
                <div className="relative">
                    <button className="flex justify-between font-bold bg-color py-2 px-5 mx-3 rounded-xl text-sm" onClick={() => setShow(!show)}><span>{attchmentType && attchmentType.title}</span> <FontAwesomeIcon icon={faCaretDown} /></button>
                    {show && <div className="bg-color block rounded-xl w-[25%] p-3 absolute z-10">
                        {attachments_types && attachments_types.map(item => <button onClick={() => setAttchmentType(item)} key={item.id} className={`block text-left font-bold rounded-xl w-full mb-3 p-3 ${attchmentType && attchmentType.id == item.id ? 'bg-gradient-to-br from-[#fa9600] to-[#ffe696] hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400' : 'bg-white'}`}>
                            {item.title}
                        </button>)}
                    </div>}
                </div>

                <label htmlFor="description" className="block mb-14">
                    <p className="my-3 font-bold">{language && language["description"]}</p>
                    <input type="text" id="description" placeholder={language && language["write_here"]} className="py-2 px-14  rounded shodow-sm bg-gray-200 w-full placeholder-gray-400" />
                </label>

                <p className="my-3 font-bold">{language && language["assesment_explenation_video"]} <span className="text-gray-600">({language && language["optional"]})</span></p>
                <label htmlFor="uploadImage" className="p-14 h-[300px] w-full flex items-center justify-center my-4 rounded-xl bg-color border border-color">
                    <div className="text-center">
                        <FontAwesomeIcon icon={faArrowUp} className="text-3xl rounded-xl bg-gradient-to-b from-[#fa9600] to-[#ffe696] p-3 px-4 text-gray-100" />
                        <p className="text-l font-bold">{language && language["upload_video"]}</p>
                        <p className="text-sm text-gray-400">{language && language["drag_drop"]}</p>
                    </div>
                    <input type="file" accept="image/jpg,image/png" id="uploadImage" name="uploadImage" className="hidden " />
                </label>

                <button className="block rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 mx-auto">{language && language["add"]}</button>
            </form>
        </ThemeContainer>
    )
}
