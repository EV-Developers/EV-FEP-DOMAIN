import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faArrowUp } from '@fortawesome/free-solid-svg-icons';

import api from '../../../config/api';
import ConfrimModal from '../../../compenents/parts/ConfrimModal';
import { translation } from '../../../config/translations';
import ThemeContainer from '../../../compenents/parts/ThemeContainer';

export default function Material() {
    const [data, setData] = React.useState(null);
    const [msg, setMsg] = React.useState(null);
    const [showModal, setShowModal] = React.useState(false);
    const [language, setLanguage] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
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

    React.useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            const response = await api.get('/materials/' + catId);
            console.log(response);
            if (response.status == 200) {
                setData(response.data);
            } else {
                console.log('error');
            }
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * handle edit and update materials
     * @param {Event} e form submit event
     */
    const handleUpdate = async (e) => {
        e.preventDefault();
        setMsg(null);

        const formData = new FormData(e.target);

        if (e.target.description.value != "" && e.target.name.value != "") {
            try {
                const response = await api.put("/materials/" + catId, formData);

                console.log(response);


                if (response.status == 200) {
                    navigate('/materials');
                } else {
                    setMsg(language["error_msg"]);
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            setMsg(language["error_validation_msg"])
        }

    }

    const handleDelete = async () => {
        setLoading(true);
        try {
            const response = await api.delete('/materials/' + catId);
            console.log(response);
            if (response.status == 200) {
                setLoading(false);
                navigate('/materials');
            } else {
                console.log('error');
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <ThemeContainer>
            {showModal && <ConfrimModal message={language && language['confirm']} action={handleDelete} title={language && language['delete']} language={language} open={showModal} setOpen={setShowModal} />}
            {data}<form method="post" onSubmit={handleUpdate} className="block mx-auto w-[75%] bg-white rounded-xl p-4">
                <div className="flex">
                    <Link to={"/materials"}>
                        <img src="/logo/course-logo.png" alt="" className="w-10 h-10 my-1" />
                    </Link>
                    <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                    <Link className="m-2 my-3 hover:text-[#4b4b4b]" to={"/materials/"}>{language && language["materials"]}</Link>
                    <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                    <p className="m-3 my-3 text-color">{language && language["edit"]}</p>
                </div>
                <hr className="text-gray-200 my-5" />

                <label htmlFor="courseOverview">
                    <p className="my-3 font-bold">{language && language["title"]}</p>
                    <textarea id="courseOverview" name="course-overview" className="py-2 px-14 inset-shadow-sm inset-gray-indigo-800 rounded shodow-sm bg-color w-full placeholder-gray-400 " placeholder={language && language["write_here"]} ></textarea>
                </label>
                <label htmlFor="uploadImage" className="p-14 h-[300px] w-full flex items-center justify-center my-4 rounded-xl bg-color border inset-shadow-sm inset-gray-indigo-800 border-gray-300">
                    <div className="text-center">
                        <FontAwesomeIcon icon={faArrowUp} className="text-3xl rounded-xl bg-gradient-to-b from-[#fa9600] to-[#ffe696] p-3 px-4 text-gray-100" />
                        <p className="text-l font-bold">{language && language["upload_material"]}</p>
                        <p className="text-sm text-gray-400">{language && language["drag_drop"]}</p>
                    </div>
                    <input type="file" accept="image/jpg,image/png" id="file" name="file" className="hidden " />
                </label>

                {msg && <div className="p-4 m-2">{msg}</div>}

                <div className="flex flex-row justify-between mt-14">
                    <button className="rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 flex" type="submit">{loading && <img className="animate-spin w-4 h-4 m-1" src="/loading_white.png" />}  <span>{language && language["update"]}</span></button>
                    <button onClick={() => setShowModal(true)} className="rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400" type="button"><span>{language && language["delete"]}</span></button>
                </div>
            </form>
        </ThemeContainer>

    )
}
