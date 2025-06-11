import React from 'react';
import { Link } from 'react-router-dom';

import api from '../../../config/api';
import { translation } from '../../../config/translations';
import ThemeContainer from '../../../compenents/parts/ThemeContainer';
import CourseItem from '../../../compenents/parts/CourseItem';

export default function TCourses() {
    const [data, setData] = React.useState(null);
    const [categoriesData, setCategoriesData] = React.useState(null);
    const [categoriesShadowData, setCategoriesShadowData] = React.useState(null);
    const [language, setLanguage] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [loadingCats, setLoadingCats] = React.useState(true);

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
        const tmpData = await api.get('/courses');
        console.log(tmpData);

        if (tmpData.status == 200) {
            setLoading(false);
            setData(tmpData.data.data);
            loadCategoriesData();
        } else {
            setLoading(false);
            loadCategoriesData();
        }
    }

    React.useEffect(() => {
        loadData();
    }, [])

    const loadCategoriesData = async () => {
        const response = await api.get('/course-categories');
        console.log(response);
        if (response.status == 200) {
            setLoadingCats(false);
            let tmpArr = response.data;
            setCategoriesData(tmpArr);
            setCategoriesShadowData(tmpArr);
        } else {
            setLoadingCats(false);
            console.log('error');
        }
    }

    return (
        <ThemeContainer role="teachers">
            <div className="flex">
                <div className="w-[25%]">
                    <h3 className="text-2xl my-3">{language && language['categories']}</h3>
                    {categoriesData && categoriesData.map(item => <div key={item.id}>
                        <button className="py-2 cursor-pointer">{item.name}</button>
                    </div>)}
                </div>
                <div className="block mx-auto w-[75%]">
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
                    <div className="flex flex-wrap ">
                        {data && data.map(item => <CourseItem language={language} link="/teachers/courses/" item={item} />)}
                    </div>

                    {/* {data && data.map(item => <Link to={'/teachers/courses/' + item.id} key={"cat-" + item.id} className="p-5 py-2 my-2 text-sm flex border-b border-b-[#aba9a9a7] group hover:bg-[#f0efef9e]">
                    <img src={item.featured_image_url ? item.featured_image_url : '/data/sale-5.webp'} alt="" className="w-[25%] rounded-xl group-hover:scale-105 transition-all" />
                    <div className="mx-4">
                        <h2 className="text-2xl">{item.title}</h2>
                    </div>
                </Link>)} */}
                </div>
            </div>
        </ThemeContainer>
    )
}
