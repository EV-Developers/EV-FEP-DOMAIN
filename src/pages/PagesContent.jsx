import React from 'react'
import ThemeContainer from '../compenents/parts/ThemeContainer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useParams } from 'react-router-dom'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { translation } from '../config/translations'

export default function PagesContent() {
    const [language, setLanguage] = React.useState(null);
    const { pageName } = useParams();

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
        <div className="block mx-auto w-[75%]">
            <div className="flex">
                <Link to={"/categories"}>
                    <img src="/logo/course-logo.png" alt="" className="w-10 h-10 my-1" />
                </Link>
                <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight: faAngleLeft} className="my-4 m-3 text-color" />
                <Link className="m-2 my-3 hover:text-[#4b4b4b]" to={"/categories/"}>{language && language["categories"]}</Link>
                <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                <p className="m-3 my-3 text-color">{language && language["edit"]}</p>
            </div>
            <hr className="text-gray-200 my-5" />
            <h2 className="p-5 m-5 text-2xl">{pageName.toUpperCase()}</h2>
            <div className="p-5 m-5">Pages Content</div>
        </div>
  </ThemeContainer>)
}
