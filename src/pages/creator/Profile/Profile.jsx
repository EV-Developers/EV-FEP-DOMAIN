import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import { translation } from '../../../config/translations';
import ThemeContainer from '../../../compenents/parts/ThemeContainer';
import api from '../../../config/api';

export default function Profile() {
    const [loading, setLoading] = React.useState(false);
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

    return (<ThemeContainer>
        <form method="post" className="bg-white mx-auto m-3 rounded-xl p-5 w-[75%]">
            <div className="flex">
                <Link to={"/"}>
                    <img src="/logo/course-logo.png" alt="" className="w-10 h-10 my-1" />
                </Link>
                <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                <Link className="m-2 my-3 hover:text-[#4b4b4b]" to={"/"}>{language && language["home"]}</Link>
                <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                <p className="m-3 my-3 text-color">{language && language["my_profile"]}</p>
            </div>
            <hr className="text-gray-200 my-5" />
            <label htmlFor="name">
                <p id="name" className="my-3 font-bold">{language && language["name"]}</p>
                <input type="text" id="name" name="name" placeholder={language && language["write_here"]} className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400" />
            </label>
            <label htmlFor="name">
                <p id="name" className="my-3 font-bold">{language && language["email"]}</p>
                <input type="text" id="name" name="name" placeholder={language && language["write_here"]} className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400" />
            </label>

            <h2 className="py-4 text-xl font-bold border-t border-t-gray-200 mt-4">{language && language["change_password"]}:</h2>
            <label htmlFor="password">
                <p id="password" className="my-3 font-bold">{language && language["password"]}</p>
                <input type="text" id="password" name="password" placeholder={language && language["write_here"]} className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400" />
            </label>
            <label htmlFor="repeat-password">
                <p id="repeat-password" className="my-3 font-bold">{language && language["repeat_password"]}</p>
                <input type="text" id="repeat-password" name="repeat-password" placeholder={language && language["write_here"]} className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400" />
            </label>

            <button className="flex rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 mx-auto mt-5">{loading && <img className="animate-spin w-4 h-4 m-1" src="/loading_white.png" />} <span>{language && language["update"]}</span></button>
        </form>
    </ThemeContainer>)
}
