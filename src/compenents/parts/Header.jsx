import React from 'react'
import { faBell, faComment, faEnvelope, faGlobe, faPhone, faPhoneAlt, faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import api from '../../config/api';
import { translation } from '../../config/translations';
import UserProfile from './UserProfile';
import ChangPassword from './ChangPassword';

export default function Header({ role }) {
    const [loading, setLoading] = React.useState(true);
    const [showProfile, setShowProfile] = React.useState(false);
    const [show, setShow] = React.useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const ref = React.useRef();
    const [language, setLanguage] = React.useState(null);

    let slug = "";
    if (role) {
        slug = '/' + role;
    }

    const notifications_list = []; /*[
        {
            id: "notification_1",
            message: "New comment from Adam for Ardurno Course.",
            date: new Date().toLocaleString("en-GB"),
            course_id: 10,
            type: "comment",
        }
    ];*/


    React.useEffect(() => {
        const lang = window.localStorage.getItem("language");
        const userRole = window.localStorage.getItem("z8C2XXEo52uJQj7");

        if (userRole && userRole != "" && userRole != null) {
            if (userRole == 'teacher') {
                slug = '/teachers';
            }
        }

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

    const handleSearch = () => {
        if (ref.current.value != "") {
            navigate('/search/' + ref.current.value)
        }
    }

    const getCurrentPath = (name) => {
        const { pathname } = location;

        if (pathname && pathname == name) {
            return true;
        } else {
            return false;
        }
    }

    React.useEffect(() => {
        let auth_check = window.localStorage.getItem("rJp7E3Qi7r172VD");

        if (auth_check == "" || auth_check == null) {
            navigate("/login");
        } else {
            setLoading(false)
        }
    }, []);

    React.useEffect(() => {
        const listen = document.getElementById("query").addEventListener('keydown', (ev) => {
            if (ev.key == 'Enter' || ev.keyCode == 13) {
                handleSearch();
            }
        });

        //return listen.removeEventListener()
    }, [ref]);

    const handleLogout = async () => {
        try {
            const response = await api.post("/logout");

            if (response.status == 200 || response.status == 201) {
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleChangeLanguage = () => {
        const lang = window.localStorage.getItem("language");

        if (lang && lang != '' && lang != null) {
            if (lang == 'english') {
                setLanguage(translation[1]);
                window.localStorage.setItem("language", 'arabic');
                window.document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
            } else {
                setLanguage(translation[0]);
                window.localStorage.setItem("language", 'english');
                window.document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');
            }
        } else {
            setLanguage(translation[0]);
            window.localStorage.setItem("language", 'english');
            window.document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');
        }

        window.location.reload();
    }

    return (<>
        {show && <ChangPassword open={show} setOpen={setShow} language={language} />}

        {showProfile && <UserProfile open={showProfile} setOpen={setShowProfile} language={language} />}

        <div className="w-full 2xl:mx-auto 2xl:w-[75%] bg-[#E8EBEF] border-b border-b-gray-300">
            <div className="bg-gradient-to-br from-[#fa9600] to-[#ffe696] hover:bg-gradient-to-br p-2 m-0 flex text-sm rounded-bl-2xl rounded-br-2xl justify-between">
                <div className="flex">
                    <p className='mx-2'><FontAwesomeIcon icon={faEnvelope} className="mx-2 text-sm" /> <span><a className="hover:underline" href="mailto:evcentersinfo@gmail.com">evcentersinfo@gmail.com</a></span></p>
                    <p className='mx-2 text-sm'>
                        <FontAwesomeIcon icon={language && language['dir'] == 'rtl' ? faPhoneAlt : faPhone} className="mx-2" /> <span><a className="hover:underline" href="tel:123456789">123456789</a></span>
                    </p>
                </div>

                <div className="flex">
                    <p className="mx-2 transition-all hover:scale-125"><a href="https://instagram.com" target="_blank"><img src="/instagram.svg" className="rounded-2xl w-4" alt="" /></a></p>
                    <p className="mx-2 transition-all hover:scale-125"><a href="https://x.com" target="_blank"><img src="/x.jpg" className="rounded-l w-4" alt="" /></a></p>
                    <button onClick={handleChangeLanguage} className="block px-5 cursor-pointer font-bold text-xs transition-all hover:scale-125">
                        <span>{language && language['change_langauge']}</span>
                    </button>
                </div>
            </div>
            <div className="block md:flex justify-between ml-10">
                <div className="flex my-2 mx-0 w-full md:w-[25%] lg:w-[35%]">
                    <Link to="/" className="border-r border-r-gray-400 w-[100px] md:w-[9%] lg:w-[15%]">
                        <img src="/logo/Logo-bp.png" className="w-full" alt="" />
                    </Link>
                    <Link className="w-[300px] md:w-[45%]" to="/">
                        <img src="/logo/Logo.png" className="w-full border-r border-r-gray-400" alt="" />
                    </Link>
                    <div className="block">
                        <Link to={slug + "/explore"} className="block p-3 text-[#fa9600] font-bold transition-all hover:scale-110 hover:text-[#FD9800]">{language && language['explore']}</Link>
                    </div>
                </div>
                <div className="md:flex w-full md:w-[75%] lg:w-[70%] mx-0 mt-2">
                    <nav className="flex mr-14">
                        <Link to={slug + "/"} className={`block p-4 hover:text-[#fa9600] font-bold relative group h-12 ${getCurrentPath('/teachers/') && 'border-b-2 border-b-[#fa9600]'}`}>
                            {language && language['home']}
                            <span className={`absolute bottom-0 ${language && language['dir'] == 'ltr' ? 'left-0' : 'right-0'} h-0.5 bg-[#fa9600] ${getCurrentPath('/teachers/') ? 'w-full h-[0.3px]' : 'w-0'} transition-all duration-300 group-hover:w-full`}></span>
                        </Link>
                        <Link to={slug + "/courses"} className={`block p-4 hover:text-[#fa9600] font-bold relative group h-12 ${getCurrentPath(slug + '/courses') && 'border-b-2 border-b-[#fa9600]'}`}>
                            {language && language['courses']}
                            <span className={`absolute bottom-0 ${language && language['dir'] == 'ltr' ? 'left-0' : 'right-0'} h-0.5 bg-[#fa9600] ${getCurrentPath(slug + '/courses') ? 'w-full h-[0.3px]' : 'w-0'} transition-all duration-300 group-hover:w-full`}></span>
                        </Link>
                        <Link to={slug + "/categories"} className={`block p-4 hover:text-[#fa9600] font-bold relative group h-12 ${getCurrentPath(slug + '/categories') && 'border-b-2 border-b-[#fa9600]'}`}>
                            {language && language['categories']}
                            <span className={`absolute bottom-0 ${language && language['dir'] == 'ltr' ? 'left-0' : 'right-0'} h-0.5 bg-[#fa9600] ${getCurrentPath(slug + '/categories') ? 'w-full h-[0.3px]' : 'w-0'} transition-all duration-300 group-hover:w-full`}></span>
                        </Link>
                        <Link to={slug + "/materials"} className={`block p-4 hover:text-[#fa9600] font-bold relative group h-12 ${getCurrentPath(slug + '/materials') && 'border-b-2 border-b-[#fa9600]'}`}>
                            {language && language['materials']}
                            <span className={`absolute bottom-0 ${language && language['dir'] == 'ltr' ? 'left-0' : 'right-0'} h-0.5 bg-[#fa9600] ${getCurrentPath(slug + '/materials') ? 'w-full h-[0.3px]' : 'w-0 transition-all duration-300 group-hover:w-full'}`}></span>
                        </Link>
                        <Link to={slug + "/games"} className={`block p-4 hover:text-[#fa9600] font-bold relative group h-12 ${getCurrentPath(slug + '/games') && 'border-b-2 border-b-[#fa9600]'}`}>
                            {language && language['games']}
                            <span className={`absolute bottom-0 ${language && language['dir'] == 'ltr' ? 'left-0' : 'right-0'} h-0.5 bg-[#fa9600] ${getCurrentPath(slug + '/games') ? 'w-full h-[0.3px]' : 'w-0 transition-all duration-300 group-hover:w-full'}`}></span>
                        </Link>
                    </nav>

                    <div className={`hidden md:flex absolute ${language && language['dir'] == 'ltr' ? 'right-2' : 'left-2'}`}>
                        <div className="relative m-0">
                            <button onClick={handleSearch} className={`absolute z-10 m-4 ${language && language['dir'] == 'ltr' ? 'right-2' : 'left-2'} `}>
                                <FontAwesomeIcon icon={faSearch} className="text-xl" />
                            </button>
                            <input type="text" placeholder={language && language['search']} id="query" name="query" className="rounded-2xl py-2 my-2 p-4 mx-3 bg-white text-sm" ref={ref} />
                        </div>

                        <div className="group">
                            <button className="relative rounded-full mx-2 my-2 w-10 h-10 cursor-pointer  group-hover:bg-white transition-all hover:scale-110" title={language && language['notifications']}>
                                {notifications_list && notifications_list.length != 0 && <div className={`w-2 h-2 rounded-full absolute z-10 bg-amber-400  ${language && language['dir'] == 'ltr' ? 'left-3' : 'right-3'} border border-amber-600`}></div>}
                                <FontAwesomeIcon icon={faBell} className="text-xl primary-text" />
                            </button>
                            <div className={`hidden group-hover:block bg-white rounded-xl w-[75%] p-2 absolute ${language && language['dir'] == 'ltr' ? 'right-0' : 'left-0'} z-10 h-[300px] mx-5 shadow-sm`}>
                                <h2 className="text-l border-b border-b-gray-200 p-3 font-bold">{language && language['notifications']}</h2>
                                {notifications_list && notifications_list.map(item => <div key={item.id} className="block hover:bg-gray-100 hover:border hover:border-gray-200 bg-white p-3 my-2 border-b border-b-gray-200 cursor-pointer" onClick={() => {
                                    if (item.type == 'comment') {
                                        navigate(slug + "/courses/" + item.course_id)
                                    }
                                }}>
                                    <p className="text-xs">{item.date}</p>
                                    <p className="text-xs text-color">{item.message}</p>
                                </div>)}

                                {notifications_list && notifications_list.length == 0 && <div className="flex flex-col items-center justify-center">
                                    <FontAwesomeIcon icon={faComment} className="text-6xl text-center text-gray-300 mt-14 mb-5" />
                                    <p className="text-xs text-color text-center">{language && language['no_notifications']}</p>
                                </div>}
                            </div>
                        </div>
                        <div className="group">
                            <button className="rounded-full mx-2 my-2 w-10 h-10 bg-primary cursor-pointer transition-all hover:scale-110" title={language && language['my_profile']}>
                                <FontAwesomeIcon icon={faUser} className="text-xl text-white" />
                            </button>
                            <div className={`hidden group-hover:block bg-white rounded-xl w-[65%] p-2 absolute ${language && language['dir'] == 'ltr' ? 'right-0' : 'left-0'} z-10 mx-3 shadow-sm`}>
                                {/* to={slug+"/profile"}  */}
                                <button onClick={() => setShowProfile(true)} className={`block ${language && language['dir'] == 'ltr' ? 'text-left' : 'text-right'} font-bold rounded-xl w-full mb-2 p-2 bg-gradient-to-br hover:from-[#fa9600] hover:to-[#ffe696] text-sm`}>
                                    {language && language['my_profile']}
                                </button>
                                <button onClick={() => setShow(true)} className={`block ${language && language['dir'] == 'ltr' ? 'text-left' : 'text-right'} font-bold rounded-xl w-full mb-2 p-2 bg-gradient-to-br hover:from-[#fa9600] hover:to-[#ffe696] text-sm`}>
                                    {language && language['change_password']}
                                </button>
                                <button onClick={handleLogout} className={`block ${language && language['dir'] == 'ltr' ? 'text-left' : 'text-right'} font-bold rounded-xl w-full mb-2 p-2 bg-gradient-to-br hover:from-[#fa9600] hover:to-[#ffe696] text-sm cursor-pointer`}>
                                    {language && language['logout']}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
