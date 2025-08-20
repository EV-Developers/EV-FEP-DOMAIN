import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import api from '../../../config/api';
import { translation } from '../../../config/translations';
import ThemeContainer from '../../../compenents/parts/ThemeContainer';
import Sidebar from '../../../compenents/parts/Sidebar';

export default function TeachersPerformance() {
    const [data, setData] = React.useState(null);
    const [language, setLanguage] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const navigate = useNavigate();

    React.useEffect(() => {
        const lang = window.localStorage.getItem("language");
        const role = window.localStorage.getItem("z8C2XXEo52uJQj7");

        if (role && role != "" && role != null) {
            if (role == 'teacher') {
                navigate('/teachers');
            }
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

    const loadData = async () => {
        try {
            const tmpData = await api.get('/users');

            if (tmpData.status == 200) {
                setLoading(false);
                setData(tmpData.data.data);
            } else {
                setLoading(false);
            }
        } catch (error) {
            //console.log(error);
        }
    }

    React.useEffect(() => {
        loadData();
    }, []);

    return (
        <ThemeContainer role="admin">
            <div className="mt-0 h-[300px] w-full bg-gray-600 bg-[url(/imgs/aminbg.png)] bg-cover flex items-center justify-center text-center ">
            <h2 className="text-5xl font-bold p-3 text-white ">{language && language['dashboard']}</h2>
            </div>
            <div className="mx-auto 2xl:w-[75%] flex">
                <Sidebar page="teachers" />
                <div className="block w-[80%] p-2">
                    <h2 className="block text-2xl my-5 mx-2">{language && language['teachers_performances']}</h2>

                    <div className="bg-white rounded-2xl">

                        <div className="block my-2">
                            <div className="*:animate-pulse">
                                {(!data && loading) && <>
                                    <div className="flex ">
                                        <div className="w-full px-5">
                                            <div className='block rounded-xl bg-gray-300 p-5 py-2 my-2 w-[65%] h-6'></div>
                                        </div>
                                    </div>
                                    <div className="flex ">
                                        <div className="w-full px-5">
                                            <div className='block rounded-xl bg-gray-300 p-5 py-2 my-2 w-[65%] h-6'></div>
                                        </div>
                                    </div>
                                    <div className="flex ">
                                        <div className="w-full px-5">
                                            <div className='block rounded-xl bg-gray-300 p-5 py-2 my-2 w-[65%] h-6'></div>
                                        </div>
                                    </div>
                                </>}
                            </div>
                            {data && data.map(item => <Link to={'/users/' + item.id} key={"cat-" + item.id} className="p-5 py-2 my-2 text-sm flex border-b border-b-[#aba9a9a7] group hover:bg-[#f0efef9e]">
                                <div className="mx-4">
                                    <h2 className="text-2xl">{item.name}</h2>
                                    <p className="text-color py-2 flex">
                                        <span className="mx-2">{language && language["role"]} </span>
                                    </p>
                                </div>
                            </Link>)}

                        </div>
                    </div>
                </div>
            </div>
        </ThemeContainer>
    )
}
