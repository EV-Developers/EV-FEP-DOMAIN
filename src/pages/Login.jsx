import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

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

        if (lang && lang !== '') {
            if (lang === 'english') {
                setLanguage(translation[0]);
                document.documentElement.setAttribute('dir', 'ltr');
            } else {
                setLanguage(translation[1]);
                document.documentElement.setAttribute('dir', 'rtl');
            }
        } else {
            setLanguage(translation[1]);
            window.localStorage.setItem("language", 'arabic');
            document.documentElement.setAttribute('dir', 'rtl');
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setMsg(null);
        const formData = new FormData(e.target);
        setLoading(true);

        const email = e.target.email.value;
        const password = e.target.password.value;        

        if (!email && !password) {
            setMsg(language["error_validation_password_msg"]);
            setLoading(false);
        } else if (!email.includes("@") || !email.includes(".")) {
            setMsg(language["error_validation_email_msg"]);
            setLoading(false);
        } else {
            try {
                const response = await api.post("/login", formData);
                console.log(response.data);
                
                if ((response.status === 200 || response.status === 201) && response?.data?.user?.status === "active") {
                    let ok = false;
                    if(response.data && response.data.user && response.data.user.roles[0].name == "teacher"){
                        window.localStorage.clear();
                        ok = true;
                        //active expire pending
                        /*
                        const checkUser = await api.get("/teacher/profile", {
                            "headers": {
                                "Authorization": `Bearer ${response.data.token}`
                            }
                        });

                        if(checkUser && checkUser.status == 200){                            
                            if(checkUser.data && checkUser.data.license_status !== 'valid'){
                                setLoading(false);
                                setMsg(language["license_status_unvalid"]);

                                ok = false;
                            } else {
                                ok = true;
                            }
                        } else {
                            setLoading(false);
                            setMsg(language["error_msg"]);
                            ok = false;
                        }
                        */
                    } else {
                        ok = true
                    }
                    
                    if(ok){
                        window.localStorage.setItem("RYnY7KFuRuX2Iut", Date.now());
                        window.localStorage.setItem("rJp7E3Qi7r172VD", response.data.token);
                        window.localStorage.setItem("DDOj9KHr51qW1xi", response.data.user.id);
                        window.localStorage.setItem("VPHl3hMFGI8w9kq", response.data.user.name);
                        window.localStorage.setItem("L5HiP7ZpOyuVnO4", email);

                        if (response?.data?.user?.roles[0]) {
                            window.localStorage.setItem("z8C2XXEo52uJQj7", response.data.user.roles[0].name);
                        }

                        setLoading(false);

                        if (response.data.user.roles[0].name === 'teacher') {
                            navigate('/teachers');
                        } else {
                            navigate('/');
                        }
                    }
                } else {
                    setLoading(false);
                    setMsg(language["wrong_email_password"]);
                }
            } catch (error) {
                setLoading(false);
                setMsg(language["error_msg"]);
            }
        }
    };

    return (
        <div className="flex flex-col lg:flex-row w-full min-h-screen md:w-[90%] md:mx-auto">
            <div className="w-full lg:w-[50%] bg-white p-6 lg:p-12 flex flex-col justify-center">
                <img src="/logo/Logo.png" alt="Logo" className="w-[65%] mx-auto mb-10" />
                <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
                    {language && language["get_started"]}
                </h3>

                <form method="post" onSubmit={handleLogin} className="w-full max-w-md mx-auto">
                    <div className="relative mb-6">
                        <input
                            type="email"
                            name="email"
                            placeholder=" "
                            className="peer w-full border-b border-[#FD9800] bg-transparent pt-4 pb-2 text-sm text-[#FD9800] focus:outline-none"
                            autoFocus={true}
                        />
                        <label className={`absolute ${language && language['dir'] == 'ltr' ? 'left-0' : 'right-0'} -top-2 text-xs text-[#FD9800] peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 transition-all`}>
                            {language && language["email"]}
                        </label>
                    </div>

                    <div className="relative mb-6">
                        <input
                            type={passwordType ? "password" : "text"}
                            name="password"
                            placeholder=" "
                            className="peer w-full border-b border-[#FD9800] bg-transparent pt-4 pb-2 text-sm text-[#FD9800] focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => setPasswordType(!passwordType)}
                            className={`absolute top-3 ${language?.dir === 'ltr' ? 'right-0' : 'left-0'} text-[#FD9800]`}
                        >
                            <FontAwesomeIcon icon={passwordType ? faEye : faEyeSlash} />
                        </button>
                        <label className={`absolute ${language && language['dir'] == 'ltr' ? 'left-0' : 'right-0'} -top-2 text-xs text-[#FD9800] peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 transition-all`}>
                            {language && language["password"]}
                        </label>
                    </div>

                    {msg && <div className="text-red-600 text-sm text-center mb-4">{msg}</div>}

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white text-sm bg-gradient-to-br from-[#fa9600] to-[#ffe696] hover:from-amber-700 hover:to-amber-400 transition cursor-pointer"
                    >
                        {loading && <img src="/loading_white.png" className="w-4 h-4 animate-spin" />}
                        <span>{language && language["login"]}</span>
                    </button>

                    <p className="text-sm text-center text-gray-500 mt-6">
                        {language && language['signin_signup_note']}{" "}
                        <Link to="/signup" className="text-[#FD9800] hover:underline">
                            {language && language['signup']}
                        </Link>
                    </p>
                </form>
            </div>

            <div className="w-full lg:w-[50%] h-[50vh] lg:h-screen relative">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    slidesPerView={1}
                    autoplay={{ delay: 3000 }}
                    pagination={{ clickable: true }}
                    className="h-full [&_.swiper-pagination-bullet]:bg-gray-400 [&_.swiper-pagination-bullet-active]:bg-orange-500"
                >
                    <SwiperSlide>
                        <img
                            src="/banner/banner.webp"
                            className="w-full h-full object-cover"
                            alt="Slide 1"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            src="/banner/banner.webp"
                            className="w-full h-full object-cover"
                            alt="Slide 2"
                        />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
}
