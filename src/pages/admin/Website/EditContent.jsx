import React from 'react'
import ThemeContainer from '../../../compenents/parts/ThemeContainer';
import { translation } from '../../../config/translations';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

export default function EditContent() {
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

    const handleUpdateContent = () => {

    }

    return (<ThemeContainer role="admin">
        <div className="block mx-auto w-[75%]">
            <div className="flex">
                <Link to={"/dashboard"}>
                    <img src="/logo/course-logo.png" alt="" className="w-10 h-10 my-1" />
                </Link>
                <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                <Link className="m-2 my-3 hover:text-[#4b4b4b]" to="/dashboard/contents">{language && language["contents"]}</Link>
                <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                <p className="m-3 my-3 text-color">{language && language["edit"]}</p>
            </div>
            <hr className="text-gray-200 my-5" />
            <form method="post" encType="multipart/form-data" onSubmit={handleUpdateContent} className="block mx-auto rounded-xl m-5 bg-white p-5">
                <label htmlFor="title" className="block">
                    <p className="my-3 font-bold">{language && language["title"]}</p>
                    <input type="text" id="title" name="title" placeholder={language && language["write_here"]} className="py-2 px-14 inset-shadow-sm inset-gray-indigo-800 rounded shodow-sm bg-gray-200 w-full placeholder-gray-400" />
                </label>

                <label htmlFor="title" className="block">
                    <p className="my-3 font-bold">{language && language["title"]} - {language && language["english"]}</p>
                    <input type="text" id="title" name="title" placeholder={language && language["write_here"]} className="py-2 px-14 inset-shadow-sm inset-gray-indigo-800 rounded shodow-sm bg-gray-200 w-full placeholder-gray-400" />
                </label>

                <label htmlFor="name" className="block">
                    <p className="my-3 font-bold">{language && language["content"]}</p>
                    <textarea id="name" name="name" placeholder={language && language["write_here"]} className="py-2 px-14 inset-shadow-sm inset-gray-indigo-800 rounded shodow-sm bg-gray-200 w-full placeholder-gray-400"></textarea>
                </label>

                <label htmlFor="name" className="block">
                    <p className="my-3 font-bold">{language && language["content"]} - {language && language["english"]}</p>
                    <textarea id="name" name="name" placeholder={language && language["write_here"]} className="py-2 px-14 inset-shadow-sm inset-gray-indigo-800 rounded shodow-sm bg-gray-200 w-full placeholder-gray-400"></textarea>
                </label>

                {msg && <div className="p-4 m-2 text-center">
                    {msg}
                </div>}

                <button type="submit" className="block rounded pointer m-2 mt-5 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 mx-auto">{language && language["update"]}</button>
            </form>
        </div>
    </ThemeContainer>)
}
