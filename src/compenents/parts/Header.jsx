import React from 'react'
import { faBell, faComment, faEnvelope, faGlobe, faPhone, faPhoneAlt, faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import api from '../../config/api';
import { translation } from '../../config/translations';
import UserProfile from './UserProfile';
import ChangPassword from './ChangPassword';
import ExploreOverlay from './ExploreOverlay';

export default function Header({ role }) {
    const [loading, setLoading] = React.useState(true);
    const [showProfile, setShowProfile] = React.useState(false);
    const [show, setShow] = React.useState(false);
    const [userName, setUserNamme] = React.useState(null);
    const [slug, setSlug] = React.useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [photo, setPhoto] = React.useState("/profile.jpeg");
    const ref = React.useRef();
    const [language, setLanguage] = React.useState(null);
    const [showExplore, setShowExplore] = React.useState(null);
    //let slug = "";
    if (role) {
        //slug = '/' + role;
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
        const uName = window.localStorage.getItem("VPHl3hMFGI8w9kq");
        let tmpSlug = '';
        setUserNamme(uName);
        if (userRole && userRole != "" && userRole != null) {
            if (userRole == 'teacher') {
                tmpSlug = '/teachers';
                //loadData();
            } else if (userRole == "student") {
                tmpSlug = '/students';
            } else if (userRole == "content_creator") {
                tmpSlug = '';
            } else if (userRole == "admin") {
                tmpSlug = '/dashboard';
            }
        } else {
            tmpSlug = '/' + role;
        }

        setSlug(tmpSlug);

        if (lang && lang != '' && lang != null) {
            if (lang == 'english') {
                setLanguage(translation[0]);
                window.document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');
            } else {
                setLanguage(translation[1]);
                window.document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
            }
        } else {
            window.localStorage.setItem("language", 'arabic');
            setLanguage(translation[1]);
            window.document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
        }
        getTeacherPhoto();
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
        try {
            const listen = document.getElementById("query").addEventListener('keydown', (ev) => {
                if (ev.key == 'Enter' || ev.keyCode == 13) {
                    handleSearch();
                }
            });
        } catch (error) {
            //console.log(error);
        }

        //return listen.removeEventListener()
    }, [ref]);

    const handleLogout = async () => {
        navigate('/login');
        try {
            const response = await api.post("/logout");
            
            if (response.status == 200 || response.status == 201) {
                window.localStorage.clear();
            }
        } catch (error) {
            //console.log(error);
        }
    }

    const handleChangeLanguage = () => {
        const lang = window.localStorage.getItem("language");

        if (lang && lang != '' && lang != null) {
            if (lang == 'english') {
                //setLanguage(translation[1]);
                window.localStorage.setItem("language", 'arabic');
                //window.document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
            } else {
                //setLanguage(translation[0]);
                window.localStorage.setItem("language", 'english');
                //window.document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');
            }
        } else {
            //setLanguage(translation[1]);
            window.localStorage.setItem("language", 'arabic');
            //window.document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
        }

        window.location.reload();
    }

  const getTeacherPhoto = async () => {
    const userRole = window.localStorage.getItem("z8C2XXEo52uJQj7");
    if(userRole == 'teacher'){
        const token = window.localStorage.getItem('rJp7E3Qi7r172VD');
        const aurl = "https://fep.misk-donate.com/api/teacher/profile/download";
        
        try {
        fetch(aurl, {
            headers: {
                'Accept': "*",
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
            try {
                if (response && !response.ok) {
                return null
                }
                return response.blob();
            } catch (error) {
                return null;
            }
            })
            .then(blob => {
            if (blob) {
                const tmpPotoURL = URL.createObjectURL(blob);
                setPhoto(tmpPotoURL);
            }
            })
            .catch(error => {
            //console.log(error);
            });
        } catch (error) {
        //console.log(error);
        }
    }
  }

    return (<>
        {show && <ChangPassword open={show} setOpen={setShow} language={language} />}

        {showProfile && <UserProfile open={showProfile} setOpen={setShowProfile} language={language} />}

        {/* {showExplore && <ExploreOverlay language={language} setShow={setShowExplore} />} */}

        <div className="w-full 2xl:mx-auto 2xl:w-[75%] bg-[#E8EBEF] border-b border-b-gray-300 relative">
            <div className="bg-gradient-to-br from-[#fa9600] to-[#ffe696] hover:bg-gradient-to-br p-2 m-0 flex text-sm rounded-bl-2xl rounded-br-2xl justify-between relative">
                <div className="flex">
                    <p className='mx-2 flex '><FontAwesomeIcon icon={faEnvelope} className="mx-2 text-xs md:text-sm" /> <span><a className="hover:underline" href={"mailto:"+'evcentersinfo'+'@'+'outlook.com'}>{'evcentersinfo'+'@'+'outlook.com'}</a></span></p>
                    <p className='mx-2 text-xs md:text-sm flex'>
                        <FontAwesomeIcon icon={language && language['dir'] == 'rtl' ? faPhoneAlt : faPhone} className="mx-2" /> <span><a className="hover:underline" href="tel:123456789">123456789</a></span>
                    </p>
                </div>

                <div className="hidden md:flex text-sm">
                    <p className="mx-2 transition-all hover:scale-125"><a href="https://instagram.com" target="_blank"><img src="/instagram.svg" className="rounded-2xl w-4" alt="" /></a></p>
                    <p className="mx-2 transition-all hover:scale-125"><a href="https://x.com" target="_blank"><img src="/x.jpg" className="rounded-l md:w-4" alt="" /></a></p>
                    {/* <button onClick={handleChangeLanguage} className="block px-5 cursor-pointer font-bold text-xs transition-all hover:scale-125">
                        <span>{language && language['change_langauge']}</span>
                    </button> */}
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
                    {slug == '/teachers' && <div className="md:block hidden group">
                        <button 
                            className="block p-3 text-[#fa9600] font-bold rounded-t group-hover:shadow-l transition-all hover:bg-[#F0F4F9] group-hover:bg-[#F0F4F9]"
                            >{language && language['explore']}</button>
                        <div className="hidden group-hover:block">
                            <ExploreOverlay language={language} />
                        </div>
                    </div>}
                    <div className="md:hidden p-0 m-0 flex items-center justify-center">
                        <button className="bg-[#fa9600] transition-all cursor-pointer rounded-2xl py-1 mx-1 px-1 flex text-xs " onClick={handleChangeLanguage}>
                            <div className={`transition-all block px-1 text-xs rounded-2xl ${language && language['dir'] == 'rtl' ? 'bg-white group-hover:bg-[#fa9600]':'group-hover:bg-white'} `}>AR</div>
                            <div className={`block px-1 transition-all text-xs rounded-2xl ${language && language['dir'] == 'ltr' ? 'bg-white group-hover:bg-[#fa9600]':'group-hover:bg-white'} `}>EN</div>
                        </button>
                    </div>
                    <div className="md:hidden group p-0 m-0 flex items-center justify-center">
                        <Link to="/teachers/profile" className="rounded-full mx-2 bg-primary cursor-pointer transition-all hover:scale-110" title={language && language['my_profile']}>
                            <img src="/usericon.png" className="w-18" alt="" />
                        </Link>
                    </div>
                    
                </div>
                <div className="md:flex w-full justify-between md:w-[85%] lg:w-[75%] mx-0 mt-2">
                    <nav className="flex mr-5">
                        <Link to={slug + "/"} className={`block p-4 hover:text-[#fa9600] font-bold relative group h-12 ${getCurrentPath(slug + '/') && 'border-b-2 border-b-[#fa9600]'} text-sm`}>
                            {language && language['home']}
                            <span className={`absolute bottom-0 ${language && language['dir'] == 'ltr' ? 'left-0' : 'right-0'} h-0.5 bg-[#fa9600] ${getCurrentPath('/teachers/') ? 'w-full h-[0.3px]' : 'w-0'} transition-all duration-300 group-hover:w-full`}></span>
                        </Link>
                        {slug != '/dashboard' && slug != '/students' && <Link to={slug + "/courses"} className={`block p-4 hover:text-[#fa9600] font-bold relative group h-12 ${getCurrentPath(slug + '/courses') && 'border-b-2 border-b-[#fa9600]'} text-sm`}>
                            {language && language['courses']}
                            <span className={`absolute bottom-0 ${language && language['dir'] == 'ltr' ? 'left-0' : 'right-0'} h-0.5 bg-[#fa9600] ${getCurrentPath(slug + '/courses') ? 'w-full h-[0.3px]' : 'w-0'} transition-all duration-300 group-hover:w-full`}></span>
                        </Link>}
                        {slug != '/dashboard' && slug != '/students' && <Link to={slug + "/categories"} className={`block p-4 hover:text-[#fa9600] font-bold relative group h-12 ${getCurrentPath(slug + '/categories') && 'border-b-2 border-b-[#fa9600]'} text-sm`}>
                            {language && language['categories']}
                            <span className={`absolute bottom-0 ${language && language['dir'] == 'ltr' ? 'left-0' : 'right-0'} h-0.5 bg-[#fa9600] ${getCurrentPath(slug + '/categories') ? 'w-full h-[0.3px]' : 'w-0'} transition-all duration-300 group-hover:w-full`}></span>
                        </Link>}
                        {slug != '/dashboard' && <Link to={slug + "/materials"} className={`block p-4 hover:text-[#fa9600] font-bold relative group h-12 ${getCurrentPath(slug + '/materials') && 'border-b-2 border-b-[#fa9600]'} text-sm`}>
                            {language && language['materials']}
                            <span className={`absolute bottom-0 ${language && language['dir'] == 'ltr' ? 'left-0' : 'right-0'} h-0.5 bg-[#fa9600] ${getCurrentPath(slug + '/materials') ? 'w-full h-[0.3px]' : 'w-0 transition-all duration-300 group-hover:w-full'}`}></span>
                        </Link>}
                        {slug != '/dashboard' && <Link to={slug + "/games"} className={`block p-4 hover:text-[#fa9600] font-bold relative group h-12 ${getCurrentPath(slug + '/games') && 'border-b-2 border-b-[#fa9600]'} text-sm`}>
                            {language && language['games']}
                            <span className={`absolute bottom-0 ${language && language['dir'] == 'ltr' ? 'left-0' : 'right-0'} h-0.5 bg-[#fa9600] ${getCurrentPath(slug + '/games') ? 'w-full h-[0.3px]' : 'w-0 transition-all duration-300 group-hover:w-full'}`}></span>
                        </Link>}
                        {slug == '/dashboard' && <Link to={slug + "/about"} className={`block p-4 hover:text-[#fa9600] font-bold relative group h-12 ${getCurrentPath(slug + '/about') && 'border-b-2 border-b-[#fa9600]'} text-sm`}>
                            {language && language['about']}
                            <span className={`absolute bottom-0 ${language && language['dir'] == 'ltr' ? 'left-0' : 'right-0'} h-0.5 bg-[#fa9600] ${getCurrentPath(slug + '/about') ? 'w-full h-[0.3px]' : 'w-0 transition-all duration-300 group-hover:w-full'}`}></span>
                        </Link>}
                        {slug == '/dashboard' && <Link to={slug + "/courses"} className={`block p-4 hover:text-[#fa9600] font-bold relative group h-12 ${getCurrentPath(slug + '/courses') && 'border-b-2 border-b-[#fa9600]'} text-sm`}>
                            {language && language['courses']}
                            <span className={`absolute bottom-0 ${language && language['dir'] == 'ltr' ? 'left-0' : 'right-0'} h-0.5 bg-[#fa9600] ${getCurrentPath(slug + '/courses') ? 'w-full h-[0.3px]' : 'w-0 transition-all duration-300 group-hover:w-full'}`}></span>
                        </Link>}
                        {slug == '/dashboard' && <Link to={slug + "/contact"} className={`block p-4 hover:text-[#fa9600] font-bold relative group h-12 ${getCurrentPath(slug + '/contact') && 'border-b-2 border-b-[#fa9600]'} text-sm`}>
                            {language && language['contact']}
                            <span className={`absolute bottom-0 ${language && language['dir'] == 'ltr' ? 'left-0' : 'right-0'} h-0.5 bg-[#fa9600] ${getCurrentPath(slug + '/contact') ? 'w-full h-[0.3px]' : 'w-0 transition-all duration-300 group-hover:w-full'}`}></span>
                        </Link>}
                        <div className="p-4 group transition-all hidden md:block">
                            {/* <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" checked={language && language['rtl'] == 'rtl'} className="sr-only peer" onChange={handleChangeLanguage} />
                            <div className="relative w-11 h-6 bg-[#fa9600] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-[#fa9600] ">AR</div>
                            </label> */}
                            <button className="bg-[#fa9600] transition-all cursor-pointer rounded-2xl py-1 mx-1 px-1 flex text-xs " onClick={handleChangeLanguage}>
                                <div className={`transition-all block px-1 text-xs rounded-2xl ${language && language['dir'] == 'rtl' ? 'bg-white group-hover:bg-[#fa9600]':'group-hover:bg-white'} `}>AR</div>
                                <div className={`block px-1 transition-all text-xs rounded-2xl ${language && language['dir'] == 'ltr' ? 'bg-white group-hover:bg-[#fa9600]':'group-hover:bg-white'} `}>EN</div>
                            </button>
                        </div>
                    </nav>

                    <div className={`hidden md:flex`}>
                        {slug && slug != '/students' && slug != '/dashboard' && <div className="relative m-0">
                            <button onClick={handleSearch} className="absolute ltr:right-0 rtl:left-0 z-10 my-4">
                                <FontAwesomeIcon icon={faSearch} className="text-xl" />
                            </button>
                            <input type="text" placeholder={language && language['search']} id="query" name="query" className="rounded-2xl py-2 my-2 p-4 mx-3 bg-white text-sm w-full" ref={ref} />
                        </div>}

                        <div className="group">
                            <button className="relative rounded-full mx-2 my-2 w-10 h-10 cursor-pointer  group-hover:bg-white transition-all hover:scale-110" title={language && language['notifications']}>
                                {notifications_list && notifications_list.length != 0 && <div className={`w-2 h-2 rounded-full absolute z-10 bg-amber-400  ${language && language['dir'] == 'ltr' ? 'left-3' : 'right-3'} border border-amber-600`}></div>}
                                <FontAwesomeIcon icon={faBell} className="text-xl primary-text" />
                            </button>
                            <div className={`hidden group-hover:block bg-white rounded-xl w-[300px] p-2 absolute ${language && language['dir'] == 'ltr' ? 'right-0' : 'left-0'} z-30 h-[300px] mx-5 shadow-sm`}>
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
                                <img src="/usericon.png" alt="" />
                                {/* <FontAwesomeIcon icon={faUser} className="text-xl text-white" /> */}
                            </button>
                            <div className={`bg-white hidden group-hover:block z-50 mx-3 absolute shadow-sm w-[300px] ${language && language['dir'] == 'ltr' ? 'right-0' : 'left-0'}`}>
                                <div className="relative bg-[url('/imgs/profilebg.png')] bg-cover bg-center w-full h-[100px]">
                                    <Link to="/teachers/profile" className="absolute bottom-[-80px] m-3">
                                        <img src={photo} alt="" className="h-[90px] w-[90px] object-cover rounded-full  border-[#000]  border" />
                                        <p className="text-xl font-bold">{userName}</p>
                                        {/* <p className="text-xs text-gray-500">Software Engneer</p> */}
                                    </Link>
                                </div>
                                <div className="mx-14 mb-2 flex mt-24 text-center">
                                    <div>
                                        <div className="px-5 border-l border-gray-300">
                                            <img src="/staricon.png" alt="" className="w-24" />
                                        </div>
                                        <p className="text-sm font-bold py-4">Positive</p>
                                    </div>
                                    <div>
                                        <div className="px-5">
                                            <img src="/chaticon.png" alt="" className="w-24" />
                                        </div>
                                        <p className="text-sm font-bold py-4">4.9</p>
                                    </div>
                                </div>
                                <button onClick={handleLogout} className="p-2 font-bold text-white mt-4 w-full  text-center bg-gradient-to-br from-[#fa9600] to-[#ff3300] hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 cursor-pointer">{language && language['logout']}</button>
                            </div>
                            {/* <div className={`hidden group-hover:block bg-white rounded-xl w-[300px] p-2 absolute ${language && language['dir'] == 'ltr' ? 'right-0' : 'left-0'} z-50 mx-3 shadow-sm`}>
                                <button onClick={() => setShowProfile(true)} className={`block ${language && language['dir'] == 'ltr' ? 'text-left' : 'text-right'} font-bold rounded-xl w-full mb-2 p-2 bg-gradient-to-br hover:from-[#fa9600] hover:to-[#ffe696] text-sm`}>
                                    {language && language['my_profile']}
                                </button>
                                <button onClick={() => setShow(true)} className={`block ${language && language['dir'] == 'ltr' ? 'text-left' : 'text-right'} font-bold rounded-xl w-full mb-2 p-2 bg-gradient-to-br hover:from-[#fa9600] hover:to-[#ffe696] text-sm`}>
                                    {language && language['change_password']}
                                </button>
                                <button onClick={handleLogout} className={`block ${language && language['dir'] == 'ltr' ? 'text-left' : 'text-right'} font-bold rounded-xl w-full mb-2 p-2 bg-gradient-to-br hover:from-[#fa9600] hover:to-[#ffe696] text-sm cursor-pointer`}>
                                    {language && language['logout']}
                                </button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
