import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faArrowUp } from '@fortawesome/free-solid-svg-icons';

import { translation } from '../../../config/translations';
import ThemeContainer from '../../../compenents/parts/ThemeContainer';
import api from '../../../config/api';

export default function AddGame() {
    const [msg, setMsg] = React.useState(null);
    const [language, setLanguage] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();
    const { catId } = useParams();

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

    const handleAddGame = async (e) => {
        e.preventDefault();
        setMsg(null);
        setLoading(true);
        console.log(e.target);


        const formData = new FormData(e.target);

        if (e.target.description.value != "" && e.target.title.value != "") {
            try {
                const response = await api.post("/games/" + catId, formData);
    
                console.log(response);
    
                if (response.status == 200) {
                    setLoading(false);
                    navigate('/games');
                } else {
                    setMsg(language["error_msg"]);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            setMsg(language["error_validation_msg"])
        }

    }

    return (
        <ThemeContainer>
            <form method="post" onSubmit={handleAddGame} className="block mx-auto w-[75%] bg-white rounded-xl p-4">
                <div className="flex">
                    <Link to={"/games"}>
                        <img src="/logo/course-logo.png" alt="" className="w-10 h-10 my-1" />
                    </Link>
                    <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight: faAngleLeft} className="my-4 m-3 text-color" />
                    <Link className="m-2 my-3 hover:text-[#4b4b4b]" to={"/games/"}>{language && language["games"]}</Link>
                    <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                    <p className="m-3 my-3 text-color">{language && language["new"]}</p>
                </div>
                <hr className="text-gray-200 my-5" />
                <label htmlFor="title">
                    <p className="my-3 font-bold">{language && language["title"]}</p>
                    <input id="title" name="course-overview" className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400 " placeholder={language && language["write_here"]} />
                </label>
                <label htmlFor="title">
                    <p className="my-3 font-bold">{language && language["description"]}</p>
                    <textarea id="description" name="description" className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400 " placeholder={language && language["write_here"]} ></textarea>
                </label>
                <label htmlFor="content">
                    <p className="my-3 font-bold">{language && language["content"]}</p>
                    <textarea id="content" name="course-overview" className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400 " placeholder={language && language["write_here"]} ></textarea>
                </label>

                {msg && <div className="p-4 m-2">{msg}</div>}

                <div className="flex flex-row justify-between mt-14">
                    <button className="rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400" type="submit">{loading && <img className="animate-spin w-4 h-4 m-1" src="/loading_white.png" />} <span>{language && language["update"]}</span></button>
                </div>
            </form>
        </ThemeContainer>

    )
}
