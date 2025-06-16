import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faEnvelope, faMapMarkerAlt, faPhone, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';

import ThemeContainer from '../compenents/parts/ThemeContainer'
import { translation } from '../config/translations'

export default function ContactPage() {
    const [language, setLanguage] = React.useState(null);
    const [msg, setMsg] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [userRole, setUserRole] = React.useState(null);

    React.useEffect(() => {
        let role = window.localStorage.getItem("z8C2XXEo52uJQj7");

        if (role && role != "" && role != null) {
            if (role == 'teacher') {
                role = 'teachers';
            } else if (role == 'student') {
                role = 'students';
            } else if (role == 'content_creator') {
                role = '';
            }
        } else {
            role = '';
        }

        setUserRole(role);

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

    const handleContact = () => {

    }

    return (<ThemeContainer role={userRole}>
        <div className="block mx-auto w-[75%]">
            <div className="flex">
                <Link className="m-2 my-3 hover:text-[#4b4b4b]" to={"/"}>{language && language["home"]}</Link>
                <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                <p className="m-3 my-3 text-color">{language && language['contact']}</p>
            </div>
            <hr className="text-gray-200 my-5" />
            <div className="flex">
                <div className="p-5 m-5 w-full md:w-[55%]">
                    <p><FontAwesomeIcon icon={faMapMarkerAlt} className="mx-2" /> Muscat, AL Mawaleh 200 Oman, CA 94110</p>
                    <p><FontAwesomeIcon icon={faEnvelope} className="mx-2" /> evcentersinfo@outlook.com</p>
                    <p><FontAwesomeIcon icon={language && language['dir'] == 'rtl' ? faPhoneAlt : faPhone} className="mx-2" /> 1-800-800-2299</p>

                    <hr className="my-5 text-gray-300" />

                    <form method="post" className="mt-5" onSubmit={handleContact}>
                        <div className="relative h-11 mx-auto mb-7">
                            <input
                                className="peer h-full w-full border-b border-[#FD9800] bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-[#FD9800] outline-0 transition-all placeholder-shown:border-[#FD9800] focus:border-[#FD9800] focus:outline-0 disabled:border-0 disabled:bg-[#757575]"
                                placeholder=" "
                                type="text"
                                name="name"
                            />
                            <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-[#FD9800] after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#FD9800] peer-focus:after:scale-x-100 peer-focus:after:border-[#FD9800] peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                {language && language["name"]}
                            </label>
                        </div>
                        <div className="relative h-11 mx-auto mb-7">
                            <input
                                className="peer h-full w-full border-b border-[#FD9800] bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-[#FD9800] outline-0 transition-all placeholder-shown:border-[#FD9800] focus:border-[#FD9800] focus:outline-0 disabled:border-0 disabled:bg-[#757575]"
                                placeholder=" "
                                type="email"
                                name="email"
                            />
                            <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-[#FD9800] after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#FD9800] peer-focus:after:scale-x-100 peer-focus:after:border-[#FD9800] peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                {language && language["email"]}
                            </label>
                        </div>
                        <div className="relative h-11 mx-auto mb-7">
                            <textarea
                                className="peer h-full w-full border-b border-[#FD9800] bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-[#FD9800] outline-0 transition-all placeholder-shown:border-[#FD9800] focus:border-[#FD9800] focus:outline-0 disabled:border-0 disabled:bg-[#757575]"
                                placeholder=" "
                                type="email"
                                name="email"
                            >
                            </textarea>
                            <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-[#FD9800] after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#FD9800] peer-focus:after:scale-x-100 peer-focus:after:border-[#FD9800] peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                {language && language["message"]}
                            </label>
                        </div>

                        {msg && <div className="p-4 m-2 text-center">
                            {msg}
                        </div>}

                        <button className="rounded-xl pointer py-2 px-14 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 cursor-pointer text-white flex">{loading && <img className="animate-spin w-4 h-4 m-1" src="/loading_white.png" />} <span>{language && language["send"]}</span></button>
                    </form>
                </div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3655.480068402018!2d58.2494584!3d23.622972700000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e8dfd9e88fb6fab%3A0x4ebf682885e95e74!2sEngineering%20Village!5e0!3m2!1sen!2som!4v1748757046671!5m2!1sen!2som" height="450" style={{ border: 0 }} allowFullscreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-2xl  w-full md:w-[45%]"></iframe>
            </div>
        </div>
    </ThemeContainer>)
}
