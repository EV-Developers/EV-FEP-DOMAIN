import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { translation } from '../../../config/translations';
import ThemeContainer from '../../../compenents/parts/ThemeContainer';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Membership() {
    const [language, setLanguage] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [msg, setMsg] = React.useState(null);
    const navigate = useNavigate();

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

    return (<ThemeContainer role="admin">
        <div className="mt-0 h-[300px] w-full bg-gray-600 bg-[url(/imgs/aminbg.png)] bg-cover flex items-center justify-center text-center ">
            <h2 className="text-5xl font-bold p-3 text-white ">{language && language['dashboard']}</h2>
        </div>
        <div className="mx-auto 2xl:w-[75%]">
            <div className="flex">
                <Link to={"/dashboard"}>
                    <img src="/logo/course-logo.png" alt="" className="w-10 h-10 my-1" />
                </Link>
                <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                <Link className="m-2 my-3 hover:text-[#4b4b4b]" to="/dashboard/subscriptions">{language && language["subscriptions"]}</Link>
                <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                <p className="m-3 my-3 text-color">{language && language["details"]}</p>
            </div>
            <hr className="text-gray-200 my-5" />
            <div>Membership</div>
        </div>
    </ThemeContainer>)
}
