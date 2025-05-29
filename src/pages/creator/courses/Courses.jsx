import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { translation } from '../../../config/translations';
import ThemeContainer from '../../../compenents/parts/ThemeContainer';
import api from '../../../config/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

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
        const role = window.localStorage.getItem("auth_user_role");
                
        if(role && role != "" && role != null){
            if(role == 'teacher'){
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
            console.log(tmpData);
    
            if (tmpData.status == 200) {
                setLoading(false);
                setData(tmpData.data.data);
                loadCategoriesData();
            } else {
                setLoading(false);
                loadCategoriesData();
            }
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        loadData();
    }, [])

    const loadCategoriesData = async () => {
        try {
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
        } catch (error) {
            setLoadingCats(false);
            console.log(error);
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
            <div className="block mx-auto w-[75%]">
                <div className="flex justify-between">
                    <div></div>
                    <Link to="/new-course" className="block rounded pointer m-4 py-3 px-10 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400   font-bold">{language && language["create"]}</Link>
                </div>

                <div className="flex">
                    <div className='w-[25%] mx-5'>
                        {(!categoriesData && loadingCats) && <div className="animate-pulse">
                            <div className="flex">
                                <div className="w-full px-5">
                                    <div className='block rounded-xl bg-gray-300 p-5 py-2 my-2 w-[50%] h-2'></div>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="w-full px-5">
                                    <div className='block rounded-xl bg-gray-300 p-5 py-2 my-2 w-[50%] h-2'></div>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="w-full px-5">
                                    <div className='block rounded-xl bg-gray-300 p-5 py-2 my-2 w-[50%] h-2'></div>
                                </div>
                            </div>
                        </div>}
                        {categoriesData && <>
                            <div className="text-l font-bold py-2 px-2 border-b border-b-gray-200">{language && language['categories']}</div>
                            <div className="relative">
                                {(ref && ref.current && ref.current.value != 0) && <FontAwesomeIcon icon={faTimes} className="absolute right-0 m-3 my-5 cursor-pointer" onClick={resetSearch} />}
                                <input type="text" onChange={val => filterCategoryByName(val.target.value)} ref={ref} className="px-5 py-2 rounded-xl my-2 bg-white border border-gray-200 placeholder:text-gray-300 w-full" placeholder={language && language['search']} />
                            </div>
                            <div className="max-h-[30vh] overflow-auto">
                                {categoriesData.map(item => <button key={item.id} className={`py-2 px-4 rounded-xl w-full placeholder-gray-400 flex justify-between my-2 text-sm ${category == item.id
                                        ? "bg-[#ffe696]"
                                        : ""
                                    }`}
                                    onClick={() => setCategory(item.id)}>
                                    <p>{item.name}</p>
                                </button>)}
                            </div>
                        </>}
                    </div>

                    <div className="w-[75%]">
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
                            <img src="/data/vid-1.webp" alt="" className="w-[25%] rounded-xl group-hover:scale-105 transition-all" />
                            <div className="mx-4">
                                <h2 className="text-2xl">{item.title}</h2>
                                <p className="text-color py-2 flex">
                                    <span className="mx-2">{language && language["course_by"]} </span>
                                    <strong className="text-bold primary-text">mohammed razi </strong>
                                    <span>, electronic trainer and developer</span>
                                </p>

                            </div>
                        </Link>)}

                    </div>
                </div>
            </div>
        </ThemeContainer>
    )
}
