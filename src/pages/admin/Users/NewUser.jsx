import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faArrowUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

import api from '../../../config/api';
import { translation } from '../../../config/translations';
import ThemeContainer from '../../../compenents/parts/ThemeContainer';

export default function NewUser() {
    const [language, setLanguage] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [msg, setMsg] = React.useState(null);
    const navigate = useNavigate();
    const [show, setShow] = React.useState(false);
    const [userType, setUserType] = React.useState({
        id: 'teacher',
        title: "معلم",
        title_en: 'Teacher',
    });

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


    const user_types = [
        {
            id: 'teacher',
            title: "معلم",
            title_en: 'Teacher',
        },
        {
            id: 'content_creator',
            title: 'منشئ محتوى',
            title_en: 'Content Creator',
        },
        {
            id: 'student',
            title: 'طالب',
            title_en: 'Student',
        },
        {
            id: 'admin',
            title: 'إدارة',
            title_en: 'Adminstrator',
        },
    ];

    const handleAddUser = async (e) => {
        e.preventDefault();
        setMsg(null);
        const formData = new FormData(e.target);

        setLoading(true);

        if (e.target.name.value == "" || e.target.email.value == "" || e.target.password.value == "") {
            setMsg(language["error_validation_password_msg"]);
            setLoading(false);
        } else if (e.target.password.value !== e.target.password_confirmation.value) {
            setMsg(language["error_validation_password_match_msg"]);
            setLoading(false);
        } else if (e.target.password.value.length < 6) {
            setMsg(language["error_validation_password_length_msg"]);
            setLoading(false);
        } else if (!e.target.email.value.includes("@") || !e.target.email.value.includes(".")) {
            setMsg(language["error_validation_email_msg"]);
            setLoading(false);
        } else {
            try {
                const response = await api.post("/register", formData);

                if (response.status == 200 || response.status == 201) {
                    navigate('/dashboard/users');
                } else {
                    setMsg(language["error_msg"]);
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
                if (error.response && error.response.data) {
                    setMsg(error.response.data.message);
                }
            }
        }
    }

    return (
        <ThemeContainer role="admin">
            <form method="post" encType="multipart/form-data" onSubmit={handleAddUser} className="w-[75%] block mx-auto rounded-xl m-5 bg-white p-5">
                <div className="flex">
                    <Link to={"/dashboard/users"}>
                        <img src="/logo/course-logo.png" alt="" className="w-10 h-10 my-1" />
                    </Link>
                    <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                    <Link className="m-2 my-3 hover:text-[#4b4b4b]" to="/dashboard/users">{language && language["users"]}</Link>
                    <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                    <p className="m-3 my-3 text-color">{language && language["new"]}</p>
                </div>

                <hr className="text-gray-200 my-5" />

                <p className="my-3 font-bold">{language && language["user_type"]}</p>

                <div className="relative">
                    <button type="button" className="flex justify-between font-bold bg-color py-2 px-14 mx-3 rounded-xl text-sm" onClick={() => setShow(!show)}>
                        <span className="mx-2">{userType && language && language['dir'] == 'ltr' ? userType.title_en : userType.title}</span> <FontAwesomeIcon icon={faCaretDown} />
                    </button>
                    {show && <div className="bg-color block rounded-xl w-[25%] p-3 absolute z-10">
                        {user_types && user_types.map(item => <button type="button" onClick={() => setUserType(item)} key={item.id} className={`block text-left font-bold rounded-xl w-full mb-3 p-3 ${userType && userType.id == item.id ? 'bg-gradient-to-br from-[#fa9600] to-[#ffe696] hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400' : 'bg-white'}`}>
                            {language && language['dir'] == 'ltr' ? item.title_en : item.title}
                        </button>)}
                    </div>}
                    <input type="hidden" name="role" value={userType && userType.id} />
                </div>

                <label htmlFor="name" className="block">
                    <p className="my-3 font-bold">{language && language["name"]}</p>
                    <input type="text" id="name" name="name" placeholder={language && language["write_here"]} className="py-2 px-14  rounded shodow-sm bg-gray-200 w-full placeholder-gray-400 inset-shadow-sm inset-gray-indigo-800" />
                </label>

                <label htmlFor="email" className="block">
                    <p className="my-3 font-bold">{language && language["email"]}</p>
                    <input type="text" id="email" name="email" placeholder={language && language["write_here"]} className="py-2 px-14 inset-shadow-sm inset-gray-indigo-800 rounded shodow-sm bg-gray-200 w-full placeholder-gray-400" />
                </label>

                <label htmlFor="password" className="block">
                    <p className="my-3 font-bold">{language && language["password"]}</p>
                    <input type="password" id="password" name="password" placeholder={language && language["write_here"]} className="py-2 px-14  rounded shodow-sm bg-gray-200 w-full placeholder-gray-400 inset-shadow-sm inset-gray-indigo-800" />
                </label>
                <label htmlFor="password_confirmation" className="block">
                    <p className="my-3 font-bold">{language && language["repeat_password"]}</p>
                    <input type="password" id="password_confirmation" name="password_confirmation" placeholder={language && language["write_here"]} className="py-2 px-14  rounded shodow-sm bg-gray-200 w-full placeholder-gray-400 inset-shadow-sm inset-gray-indigo-800" />
                </label>

                {msg && <div className="p-4 m-2 text-center">
                    {msg}
                </div>}

                <button type="submit" className="block rounded pointer m-2 mt-5 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 mx-auto">{language && language["add"]}</button>
            </form>
        </ThemeContainer>
    )
}
