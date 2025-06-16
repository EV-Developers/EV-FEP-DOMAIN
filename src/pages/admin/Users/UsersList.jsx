import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import api from '../../../config/api';
import { translation } from '../../../config/translations';
import ThemeContainer from '../../../compenents/parts/ThemeContainer';

export default function UsersList() {
    const [data, setData] = React.useState(null);
    const [userType, setUserType] = React.useState(null);
    const [language, setLanguage] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const navigate = useNavigate();

    const usersTypes = [
        {
            id: 1,
            name: "Admins",
        },
        {
            id: 2,
            name: "Teachers",
        },
        {
            id: 3,
            name: "Content Creators",
        },
        {
            id: 4,
            name: "Students",
        },
    ];

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
            <div className="block mx-auto w-[75%]">
                <div className="flex justify-between">
                    <div></div>
                    <Link to="/dashboard/new-user" className="block rounded pointer m-4 py-3 px-10 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400   font-bold">{language && language["create"]}</Link>
                </div>

                <div className="flex">
                    <div className='w-[25%] mx-5 flex items-center'>
                        {usersTypes && <>
                            <div className="block mx-auto relative mb-6">
                                <div className="max-h-[30vh] overflow-auto">
                                    {usersTypes.map(item => <button onClick={() => setUserType(item.id)} className={`text-gray-400 text-sm px-2 hover:text-gray-600 hover:border-b-gray-600 rounded-xl cursor-pointer text-left w-full ${userType == item.id && 'border border-gray-400'}`}>{item.name}</button>)}
                                </div>
                            </div>
                        </>}
                    </div>

                    <div className="w-[75%]">
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
        </ThemeContainer>
    )
}
