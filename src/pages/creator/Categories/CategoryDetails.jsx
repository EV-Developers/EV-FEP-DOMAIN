import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { ReactSortable } from "react-sortablejs";

import { translation } from '../../../config/translations';
import ThemeContainer from '../../../compenents/parts/ThemeContainer';
import api from '../../../config/api';
import ConfrimModal from '../../../compenents/parts/ConfrimModal';

export default function CategoryDetails() {
    const [data, setData] = React.useState(null);
    const [msg, setMsg] = React.useState(null);
    const { catId } = useParams();
    const navigate = useNavigate();
    const [showModal, setShowModal] = React.useState(false);
    const [language, setLanguage] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [coursesData, setCoursesData] = React.useState(null);

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
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const response = await api.get('/course-categories/'+catId);

            console.log(response);
            
            if (response.status == 200) {
                setData(response.data);
                loadCoursesData();
            } else {
                console.log('error');
                loadCoursesData();
            }
        } catch (error) {
            console.log(error);
            loadCoursesData();
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        setMsg(null);
        console.log(e.target);
        setLoading(true);

        const formData = new FormData(e.target);

        if (e.target.description.value != "" && e.target.name.value != "" ) {
            try {
                const response = await api.put("/course-categories/"+catId, formData);
    
                console.log(response);
    
                if (response.status == 200) {
                    setLoading(false);
                    navigate('/categories');
                } else {
                    setLoading(false);
                    setMsg(language['error_msg']);
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
                setMsg(language['error_msg']);
            }
        } else {
            setMsg(language["error_validation_msg"])
        }

    }

    const handleDelete = async () => {
        try {
            const response = await api.delete('/course-categories/'+catId);
            console.log(response);
            if (response.status == 200) {
                navigate('/categories')
            } else {
                console.log('error');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const loadCoursesData = async () => {
        try {
            const tmpData = await api.get('/courses');
    
            console.log(tmpData);
            
            if (tmpData.status == 200) {
                setCoursesData(tmpData.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ThemeContainer>
            {showModal && <ConfrimModal message={language && language['confirm']} action={handleDelete} title={language && language['delete']} language={language} open={showModal} setOpen={setShowModal} />}
            {data && <form method="post" onSubmit={handleUpdate} className="block mx-auto w-[75%] bg-white rounded-xl p-4 mt-3">
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
                <div>
                    <label htmlFor="title">
                        <p id="title" className="my-3 font-bold">{language && language["title"]}</p>
                        <input type="text" id="title" name="name" defaultValue={data.name} placeholder={language && language["write_here"]} className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400 inset-shadow-sm inset-gray-indigo-800" />
                    </label>
                    <label htmlFor="description">
                        <p className="my-3 font-bold">{language && language["description"]}</p>
                        <textarea name="description" id="description" className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400 inset-shadow-sm inset-gray-indigo-800" placeholder={language && language["description"]} >{data.description}</textarea>
                    </label>   
                </div>

                {msg && <div className="p-4 m-2">{msg}</div>}

                <div className="flex flex-row justify-between mt-14">
                    <button className="rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400" type="submit">{language && language["update"]}</button>
                    <button onClick={() => setShowModal(true)} className="rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400" type="button">{loading && <img className="animate-spin w-4 h-4 m-1" src="/loading_white.png" />} <span>{language && language["delete"]}</span></button>
                </div>
            </form>}

            {coursesData && <div className="block mx-auto w-[75%] bg-white rounded-xl p-4 mt-3">
                <h3 className="text-l font-bold my-4">{language && language['category_sort']}</h3>

                <ReactSortable list={coursesData} setList={setCoursesData}>
                {coursesData.map(item => (
                    <div key={item.id} className="py-2 px-14 rounded-xl shadow-sm w-full placeholder-gray-400 flex justify-between my-4 hover:bg-[#ffe696] hover:border hover:border-amber-300 cursor-grab">{item.title}</div>
                ))}
                </ReactSortable>
            </div>}
        </ThemeContainer>

    )
}
