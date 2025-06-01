import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { translation } from '../config/translations';
import api from '../config/api';

export default function Login() {
    const [msg, setMsg] = React.useState(null);
    const [passwordType, setPasswordType] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();
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

    const handleLogin = async (e) => {
        e.preventDefault();
        setMsg(null);
        const formData = new FormData(e.target);
        setLoading(true);
        if (e.target.email.value == "" && e.target.password.value == "") {
            setMsg(language["error_validation_password_msg"]);
            setLoading(false);
        } else if (!e.target.email.value.includes("@") || !e.target.email.value.includes(".")) {
            setMsg(language["error_validation_email_msg"]);
            setLoading(false);
        } else {
            try {
                const response = await api.post("/login", formData);
                
                console.log(response);

                if (response.status == 200 || response.status == 201) {
                    if (response.data.user.status == "active") {
                        localStorage.setItem("auth_token", response.data.token);
                        localStorage.setItem("auth_user", response.data.user.id);
                        localStorage.setItem("auth_user_name", response.data.user.name);
                        localStorage.setItem("auth_user_email", e.target.email.value);

                        if (response.data && response.data.user.roles && response.data.user.roles[0]) {
                            localStorage.setItem("auth_user_role", response.data.user.roles[0].name);
                        }

                        setLoading(false);

                        if (response.data.user.roles[0].name == 'teacher') {
                            navigate('/teachers');
                        } else {
                            navigate('/');
                        }
                    } else {
                        setLoading(false);
                        setMsg(language["wrong_email_password"]);
                    }
                } else {
                    setMsg(language["wrong_email_password"]);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                setLoading(false)
                setMsg(language["error_msg"]);
            }
        }
    }

    return (<>
        <div className="flex w-[90%] mx-auto">
            <div className="block w-[50%] h-[100vh] bg-white">
                <img src="/logo/Logo.png" alt="" className="block mx-auto w-[45%] mt-14 " />

                <h3 className="text-3xl mx-auto block text-center m-4 my-14">{language && language["main_title"]}</h3>

                <form method="post" onSubmit={handleLogin}>
                    <div className="relative h-11 mx-auto w-[45%] mb-7">
                        <input
                            className="peer h-full w-full border-b border-[#FD9800] bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-[#FD9800] outline outline-0 transition-all placeholder-shown:border-[#FD9800] focus:border-[#FD9800] focus:outline-0 disabled:border-0 disabled:bg-[#757575]"
                            placeholder=" "
                            type="email"
                            name="email"
                        />
                        <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-[#FD9800] after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#FD9800] peer-focus:after:scale-x-100 peer-focus:after:border-[#FD9800] peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            {language && language["email"]}
                        </label>
                    </div>
                    <div className="relative h-11 mx-auto w-[45%] mb-7">
                        <input
                            className="peer h-full w-full border-b border-[#FD9800] bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-[#FD9800] outline outline-0 transition-all placeholder-shown:border-[#FD9800] focus:border-[#FD9800] focus:outline-0 disabled:border-0 disabled:bg-[#757575]"
                            placeholder=" "
                            type={passwordType ? "password" : "text"}
                            name="password"
                        />
                        <button type="button" className={`absolute ${language && language['dir'] == 'ltr' ? 'right-0' : 'left-0'} m-2 cursor-pointer `} onClick={() => setPasswordType(!passwordType)}>
                            <FontAwesomeIcon icon={passwordType ? faEye : faEyeSlash} className="text-color" />
                        </button>
                        <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-[#FD9800] after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#FD9800] peer-focus:after:scale-x-100 peer-focus:after:border-[#FD9800] peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            {language && language["password"]}
                        </label>
                    </div>

                    {msg && <div className="p-4 m-2 text-center">
                        {msg}
                    </div>}

                    <button className="rounded-xl pointer m-2 py-4 px-28 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 mx-auto cursor-pointer text-white flex">{loading && <img className="animate-spin w-4 h-4 m-1" src="/loading_white.png" />} <span>{language && language["login"]}</span></button>

                    <p className="text-sm text-gray-400 text-center my-5">
                        <span>{language && language['signin_signup_note']} <span className="mx-4"><Link to="/signup" className="hover:underline">{language && language['signup']}</Link></span> </span>
                    </p>
                </form>
            </div>
            <div className="w-[50%]">
                <img src="/banner/banner.webp" className="w-full h-[100vh]" />
            </div>
        </div>
    </>)
}
