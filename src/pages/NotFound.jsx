import React from 'react'
import { Link } from 'react-router-dom'
import { faAngleLeft, faAngleRight, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { translation } from '../config/translations';
import ThemeContainer from '../compenents/parts/ThemeContainer';

export default function NotFound() {
    const [language, setLanguage] = React.useState(null);
    const [userRole, setUserRole] = React.useState(null);

    React.useEffect(() => {
        const lang = window.localStorage.getItem("language");
        const role = window.localStorage.getItem("z8C2XXEo52uJQj7");
        if(role && role == 'teacher'){
            setUserRole("teachers");
        } else {
            //setUserRole(role);
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

    return (<ThemeContainer role={userRole}>
        <div className="block mx-auto w-[75%]">
            <div className="flex">
                <Link to={"/"}>
                    <img src="/logo/course-logo.png" alt="" className="w-10 h-10 my-1" />
                </Link>
                <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                <Link className="m-2 my-3 hover:text-[#4b4b4b]" to={"/"}>{language && language["home"]}</Link>
                <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                <p className="m-3 my-3 text-color">404</p>
            </div>
            <hr className="text-gray-200 my-5" />

            <div className="text-center my-[15%]">
                <FontAwesomeIcon icon={faTriangleExclamation} className="text-6xl text-[#fa9600]" />
                <h2 className="text-5xl my-5"> 404</h2>
                <p>{language && language['not_found']}</p>
            </div>
        </div>
    </ThemeContainer>
    )
}
