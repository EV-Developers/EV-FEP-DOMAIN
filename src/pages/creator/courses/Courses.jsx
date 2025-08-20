import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import api from '../../../config/api';
import { translation } from '../../../config/translations';
import ThemeContainer from '../../../compenents/parts/ThemeContainer';
import CourseItem from '../../../compenents/parts/CourseItem';

export default function Courses() {
    const [data, setData] = React.useState(null);
    const [categoriesData, setCategoriesData] = React.useState(null);
    const [categoriesShadowData, setCategoriesShadowData] = React.useState(null);
    const [category, setCategory] = React.useState(null);
    const [language, setLanguage] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [loadingCats, setLoadingCats] = React.useState(true);

    const navigate = useNavigate();
    const ref = useRef();

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

    React.useEffect(() => {
        loadCategoriesData();
    }, [])

    const loadCategoriesData = async () => {
        try {
            const response = await api.get('/course-categories');

            if (response.status == 200) {
                setLoadingCats(false);
                let tmpArr = response.data;
                setCategoriesData(tmpArr);
                setCategoriesShadowData(tmpArr);
                if (tmpArr && tmpArr.length != 0) {
                    setCategory(tmpArr[0].id);
                }
            } else {
                setLoadingCats(false);
            }
        } catch (error) {
            setLoadingCats(false);
        }
    }

    React.useEffect(() => {
        getCoursesByCategory();
    }, [category]);

    const getCoursesByCategory = async () => {
        setLoading(true);
        setData(null);

        try {
            const response = await api.get('/courses?sort_by=level_id&category_id=' + category);

            if (response.status == 200) {
                if (response && response.data && response.data.data) {
                    setLoading(false);
                    const tmpArr = response.data.data.sort((a, b) => a.level - b.level);

                    setData(tmpArr);
                }
            } else {
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
        }
    }

    const filterCategoryByName = (val) => {
        if (categoriesShadowData && val.length != 0) {
            let cats = categoriesShadowData.filter(item => item.name.toLowerCase().includes(val.toLowerCase()));
            setCategoriesData(cats);
        } else {
            setCategoriesData(categoriesShadowData);
        }
    }

    const resetSearch = () => {
        ref.current.value = "";
        setCategoriesData(categoriesShadowData);
    }

    return (
        <ThemeContainer>
            <div className="flex">
                <div className="w-[25%]">
                    <h3 className="text-2xl my-3">{language && language['categories']}</h3>
                    <div className="block mx-auto relative mb-6">
                        <input
                            type="search"
                            name="search"
                            placeholder=" "
                            onChange={val => filterCategoryByName(val.target.value)}
                            className="peer w-full border-b border-gray-600 bg-transparent pt-4 pb-2 text-sm text-gray-600 focus:outline-none"
                        />
                        <label className={`absolute ${language && language['dir'] == 'ltr' ? 'left-0' : 'right-0'} -top-2 text-xs text-gray-600 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 transition-all`}>
                            {language && language["search"]}
                        </label>
                    </div>
                    {categoriesData && categoriesData.map(item => <div key={item.id}>
                        <button className={`py-2 cursor-pointer px-3 ${category == item.id ? language && language['dir'] == 'ltr' ? 'border-l-2 border-l-[#fa9600]' : 'border-r-2 border-r-[#fa9600]' : ''}`} onClick={() => setCategory(item.id)}>{item.name}</button>
                    </div>)}
                    {!categoriesData && loadingCats && <div className="animate-pulse">
                        <div className="w-[65%] h-8 bg-gray-300 my-4"></div>
                        <div className="w-[65%] h-8 bg-gray-300 my-4"></div>
                        <div className="w-[65%] h-8 bg-gray-300 my-4"></div>
                    </div>}
                </div>

                <div className="w-[75%]">
                    <div className="flex justify-between">
                        <div></div>
                        <Link to="/new-course" className="block rounded pointer m-4 py-3 px-10 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400   font-bold">{language && language["create"]}</Link>
                    </div>
                    <div className="*:animate-pulse">
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
                    {data && data.map(item => <Link to={'/courses/' + item.id} key={"cat-" + item.id} className="p-5 py-2 my-2 text-sm flex border-b border-b-[#aba9a9a7] group hover:bg-[#f0efef9e]">
                        <img src={item.featured_image_url ? item.featured_image_url : '/data/sale-5.webp'} alt="" className="w-[25%] h-[200px] object-cover rounded-xl group-hover:scale-105 transition-all" />
                        <div className="mx-4">
                            <h2 className="text-2xl">{item.title}</h2>
                            {/* <p className="text-color py-2 flex">
                                <span className="mx-2">{language && language["course_by"]} </span>
                                <strong className="text-bold primary-text">Mohammed Razi </strong>
                                <span>, Electronic Trainer and Developer</span>
                            </p> */}
                        </div>
                    </Link>)}
                </div>
            </div>
        </ThemeContainer>
    )
}
