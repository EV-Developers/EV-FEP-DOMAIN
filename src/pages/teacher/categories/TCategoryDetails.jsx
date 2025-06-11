import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import api from '../../../config/api';
import { translation } from '../../../config/translations';
import ThemeContainer from '../../../compenents/parts/ThemeContainer';

export default function TCategoryDetails() {
    const [data, setData] = React.useState(null);
    const [language, setLanguage] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
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

    const loadData = async () => {
        const tmpData = await api.get('/courses?sort_by=level_id&category_id='+catId);
        console.log(tmpData);

        if (tmpData.status == 200) {
            setLoading(false);
            setData(tmpData.data.data);
        } else {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        loadData();
    }, []);

    return (
        <ThemeContainer role="teachers">
            <div className="block mx-auto w-[75%]">
                <div className="flex">
                    <Link to="/courses">
                        <img src="/logo/course-logo.png" alt="" className="w-10 h-10 my-1" />
                    </Link>
                    <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                    <Link className="m-2 my-3 hover:text-[#4b4b4b]" to={"/teachers/categories"}>{language && language["categories"]}</Link>
                    <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                    <p className="m-3 my-3 text-color">{language && language["category"]}</p>
                </div>
                <div className='animate-pulse'>
                    {(!data && loading) && <>
                        <div className="flex border-b border-b-gray-300">
                            <div className="bg-gray-300 block rounded-xl p-5 py-2 my-2 mr-2 w-[25%] h-[15vh]"></div>
                            <div className="w-full px-5">
                                <div className='block rounded-xl bg-gray-300 p-5 py-2 my-2 w-[65%] h-6'></div>
                                <div className='block rounded-xl bg-gray-300 p-5 py-2 my-2 w-[50%] h-2'></div>
                            </div>
                        </div>
                        <div className="flex border-b border-b-gray-300">
                            <div className="bg-gray-300 block rounded-xl p-5 py-2 my-2 mr-2 w-[25%] h-[15vh]"></div>
                            <div className="w-full px-5">
                                <div className='block rounded-xl bg-gray-300 p-5 py-2 my-2 w-[65%] h-6'></div>
                                <div className='block rounded-xl bg-gray-300 p-5 py-2 my-2 w-[50%] h-2'></div>
                            </div>
                        </div>
                        <div className="flex border-b border-b-gray-300">
                            <div className="bg-gray-300 block rounded-xl p-5 py-2 my-2 mr-2 w-[25%] h-[15vh]"></div>
                            <div className="w-full px-5">
                                <div className='block rounded-xl bg-gray-300 p-5 py-2 my-2 w-[65%] h-6'></div>
                                <div className='block rounded-xl bg-gray-300 p-5 py-2 my-2 w-[50%] h-2'></div>
                            </div>
                        </div>
                    </>}
                </div>
                {data && data.map(item => <Link to={'/teachers/courses/' + item.id} key={"cat-" + item.id} className="p-5 py-2 my-2 text-sm flex border-b border-b-[#aba9a9a7] group hover:bg-[#f0efef9e]">
                    <img src="/data/vid-1.webp" alt="" className="w-[25%] rounded-xl group-hover:scale-105 transition-all" />
                    <div className="mx-4">
                        <h2 className="text-2xl">{item.title}</h2>
                        <div className="text-color py-2 flex">
                            <span className="mx-2">{language && language["course_by"]} </span>
                            <strong className="text-bold primary-text">mohammed razi </strong>
                            <span>, electronic trainer and developer</span>
                        </div>

                    </div>
                </Link>)}
            </div>
        </ThemeContainer>
    )
}
