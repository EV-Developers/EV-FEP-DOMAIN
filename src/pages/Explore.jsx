import React from 'react'
import { Link } from 'react-router-dom';

import api from '../config/api';
import ThemeContainer from '../compenents/parts/ThemeContainer'
import { translation } from '../config/translations';

export default function Explore() {
    const [coursesData, setCoursesData] = React.useState(null);
    const [language, setLanguage] = React.useState(null);
    const [category, setCategory] = React.useState(null);
    const [data, setData] = React.useState(null);
    const [shadowData, setShadowData] = React.useState(null);
    const [loading, setLoading] = React.useState(null);

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

        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const response = await api.get('/course-categories');
            if (response.status == 200) {
                setData(response.data);
                setShadowData(response.data);
                loadCoursesData()
            }
        } catch (error) {
            //console.log(error);
        }
    }

    const loadCoursesData = async () => {
        try {
            const tmpData = await api.get('/courses');

            if (tmpData.status == 200) {
                setLoading(false);
                setCoursesData(tmpData.data.data);
            } else {
                setLoading(false);
            }
        } catch (error) {
            //console.log(error);
        }
    }

    const handleCats = (cat_id) => {
        setCategory(cat_id);
    }

    const filterCategoryByName = (val) => {
        if (shadowData && val.length != 0) {
            let cats = shadowData.filter(item => item.name.toLowerCase().includes(val.toLowerCase()));
            setData(cats);
        } else {
            setData(shadowData);
        }
    }

    return (<ThemeContainer role="teachers">
        <div className="block mx-auto w-[75%]">
            <div className="flex">
                <div className="w-full md:w-[25%] flex items-center">
                    <div>
                        <div className="block mx-auto relative mb-6">
                            <input
                                type="search"
                                name="search"
                                placeholder=" "
                                onChange={(val) => filterCategoryByName(val.target.value)}
                                className="peer w-full border-b border-gray-600 bg-transparent pt-4 pb-2 text-sm text-gray-600 focus:outline-none"
                            />
                            <label className="absolute left-0 -top-2 text-xs text-gray-600 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 transition-all">
                                {language && language["search"]}
                            </label>
                        </div>
                        {data && data.map(item => <div key={"cat-" + item.id}>
                            <button onClick={() => handleCats(item.id)} className={`text-gray-400 text-sm px-2 hover:text-gray-600 hover:border-b-gray-600 rounded-xl cursor-pointer text-left w-full ${category == item.id && 'border border-gray-400'}`}>{item.name}</button>
                        </div>)}
                    </div>
                </div>
                <div className="p-5 w-[75%]">
                    <div className="flex">
                        {coursesData && coursesData.map(item => <Link to={"/teachers/courses/" + item.id} key={"item-" + item.id} className="block w-[25%] bg-white rounded-t-xl p-0 mx-2 hover:scale-102">
                            <img src="/data/vid-1.webp" className="w-full rounded-t-xl" />
                            <h3 className="text-xs mx-2 my-4 font-bold">{item.title}</h3>
                        </Link>)}
                    </div>

                    {!coursesData && loading && <div className="flex animate-pulse">
                        <div className="shadow block w-[25%] rounded-2xl p-2 mx-2 ">
                            <div className="w-full h-24 bg-gray-300"></div>
                            <div className="w-full h-2 bg-gray-300 my-4"></div>
                        </div>
                        <div className="shadow block w-[25%] rounded-2xl p-2 mx-2 ">
                            <div className="w-full h-24 bg-gray-300"></div>
                            <div className="w-full h-2 bg-gray-300 my-4"></div>
                        </div>
                        <div className="shadow block w-[25%] rounded-2xl p-2 mx-2 ">
                            <div className="w-full h-24 bg-gray-300"></div>
                            <div className="w-full h-2 bg-gray-300 my-4"></div>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    </ThemeContainer>)
}
