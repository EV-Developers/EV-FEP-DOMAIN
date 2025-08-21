import React from 'react';
import { Link } from 'react-router-dom';

import api from '../../../config/api';
import { translation } from '../../../config/translations';
import ThemeContainer from '../../../compenents/parts/ThemeContainer';
import CourseItem from '../../../compenents/parts/CourseItem';

export default function TCourses() {
    const [data, setData] = React.useState(null);
    const [categoriesData, setCategoriesData] = React.useState(null);
    const [categoryId, setCategoryId] = React.useState(null);
    const [categoriesShadowData, setCategoriesShadowData] = React.useState(null);
    const [language, setLanguage] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [loadingCats, setLoadingCats] = React.useState(true);

    React.useEffect(() => {
        const lang = window.localStorage.getItem("language");
        const catId = window.localStorage.getItem("categoryId");
        if(catId && catId != "" && catId != null){
            console.log(catId, typeof catId);
            
            setCategoryId(Number(catId));
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
        const tmpData = await api.get('/courses');

        if (tmpData.status == 200) {
            setLoading(false);
            setData(tmpData.data.data);
        } else {
            setLoading(false);
            loadCategoriesData();
        }
    }

    React.useEffect(() => {
        loadCategoriesData();
    }, [])

    const loadCategoriesData = async () => {
        const response = await api.get('/course-categories');

        if (response.status == 200) {
            setLoadingCats(false);
            let tmpArr = response.data;
            setCategoriesData(tmpArr);
            setCategoriesShadowData(tmpArr);
            if (tmpArr && tmpArr.length != 0) {
                const catId = window.localStorage.getItem("categoryId");
                if(!catId || catId == "" || catId == null){
                    setCategoryId(tmpArr[0].id);
                }
            }
        } else {
            setLoadingCats(false);
        }
    }

    React.useEffect(() => {
        if(categoryId){
            window.localStorage.setItem("categoryId", categoryId);
            getCoursesByCategory();
        } else {
            getCoursesByCategory();
        }
        console.log(categoryId, typeof categoryId);
        
    }, [categoryId]);

    const getCoursesByCategory = async () => {
        setLoading(true);
        setData(null);
        let cat_id = 0;
        const catId = window.localStorage.getItem("categoryId");
        
        if(catId && catId != "" && catId != null){
            cat_id = catId;
        } else {
            cat_id = categoryId
        }
        try {
            const response = await api.get('/courses?sort_by=level_id&category_id=' + cat_id);

            if (response.status == 200) {
                const tmpList = response.data.data.sort((a, b) => a.level - b.level)
                
                setLoading(false);
                setData(tmpList);
            } else {
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
        }
    }

    return (
        <ThemeContainer role="teachers">
            <div className="flex 2xl:w-[80%] mx-auto">
                <div className="w-[25%]">
                    <h3 className="text-2xl my-3">{language && language['categories']}</h3>
                    {categoriesData && categoriesData.map(item => <div key={item.id}>
                        <button className={`py-2 cursor-pointer px-3 ${categoryId == item.id ? language && language['dir'] == 'ltr' ? 'border-l-2 border-l-[#fa9600]' : 'border-r-2 border-r-[#fa9600]' : ''}`} onClick={() => setCategoryId(item.id)}>{item.name}</button>
                    </div>)}
                    {!categoriesData && loadingCats && <div className="animate-pulse">
                        <div className="w-[65%] h-8 bg-gray-300 my-4"></div>
                        <div className="w-[65%] h-8 bg-gray-300 my-4"></div>
                        <div className="w-[65%] h-8 bg-gray-300 my-4"></div>
                    </div>}
                </div>
                <div className="block mx-auto w-[75%]">
                    {(!loadingCats && !data && loading) && <div className="flex flex-wrap animate-pulse">
                        <div className="shadow block w-[23%] h-[470px] rounded-l p-2 mx-2 my-3">
                            <div className="w-full h-24 bg-gray-300"></div>
                            <div className="w-full h-2 bg-gray-300 my-4"></div>
                            <div className="w-full h-6 bg-gray-300 mt-4 rounded"></div>
                        </div>
                        <div className="shadow block w-[23%] rounded-2xl p-2 mx-2">
                            <div className="w-full h-24 bg-gray-300"></div>
                            <div className="w-full h-2 bg-gray-300 my-4"></div>
                            <div className="w-full h-6 bg-gray-300 mt-4 rounded"></div>
                        </div>
                        <div className="shadow block w-[23%] rounded-2xl p-2 mx-2">
                            <div className="w-full h-24 bg-gray-300"></div>
                            <div className="w-full h-2 bg-gray-300 my-4"></div>
                            <div className="w-full h-6 bg-gray-300 mt-4 rounded"></div>
                        </div>
                        <div className="shadow block w-[23%] rounded-2xl p-2 mx-2">
                            <div className="w-full h-24 bg-gray-300"></div>
                            <div className="w-full h-2 bg-gray-300 my-4"></div>
                            <div className="w-full h-6 bg-gray-300 mt-4 rounded"></div>
                        </div>
                    </div>}
                    <div className="flex flex-wrap items-stretch">
                        {data && data.map(item => <CourseItem key={"course"+item.id} language={language} link="/teachers/courses/" item={item} />)}
                    </div>
                </div>
            </div>
        </ThemeContainer>
    )
}
