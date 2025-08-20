import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import api from '../../../config/api';
import { translation } from '../../../config/translations';
import ThemeContainer from '../../../compenents/parts/ThemeContainer';
import Sidebar from '../../../compenents/parts/Sidebar';

export default function Acourses() {
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
            const tmpData = await api.get('/courses');

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
                <Sidebar page="courses" />
                <div className="block w-[80%] p-2">
                    <h2 className="block text-2xl my-5 mx-2">{language && language['courses']}</h2>

                    <div className="bg-white rounded-2xl">
                        <div className="grid grid-cols-3 p-4 bg-[#e4e4e4] rounded-2xl mx-2 mt-5 py-2">
                            <p className="">{language && language['course-name']}</p>
                            <p>{language && language['status']}</p>
                            <p>{language && language['category']}</p>
                        </div>
                        <div className="grid grid-cols-3 p-4 border-l border-l-[#000] border-b border-b-[#000] border-r border-r-[#000] rounded-xl m-2 mt-0 py-2 border-t-none">
                            <div className="*:animate-pulse grid grid-cols-3">
                                {(!data && loading) && <>
                                    <div className="flex ">
                                        <div className="w-full px-5">
                                            <div className='block rounded-xl bg-gray-300 p-5 py-2 my-2  h-6'></div>
                                        </div>
                                    </div>
                                    <div className="flex ">
                                        <div className="w-full px-5">
                                            <div className='block rounded-xl bg-gray-300 p-5 py-2 my-2  h-6'></div>
                                        </div>
                                    </div>
                                    <div className="flex ">
                                        <div className="w-full px-5">
                                            <div className='block rounded-xl bg-gray-300 p-5 py-2 my-2  h-6'></div>
                                        </div>
                                    </div>
                                </>}
                            </div>
                            {data && data.map(item => <div>
                                <div className="mx-4">
                                    <h2 className="text-2xl">{item.name}</h2>
                                    <h2 className="text-2xl">{item.status}</h2>
                                    <h2 className="text-2xl">{item.category.name}</h2>
                                </div>
                            </div>)}

                        </div>
                    </div>
                </div>
            </div>
        </ThemeContainer>
    )
}
