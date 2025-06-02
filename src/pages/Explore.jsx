import React from 'react'
import ThemeContainer from '../compenents/parts/ThemeContainer'
import api from '../config/api';
import { Link } from 'react-router-dom';
import { translation } from '../config/translations';

export default function Explore() {
    const [coursesData, setCoursesData] = React.useState(null);
    const [language, setLanguage] = React.useState(null);
    const [data, setData] = React.useState(null);
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
                console.log(response.data);

                setData(response.data);
                loadCoursesData()
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
                setLoading(false);
                setCoursesData(tmpData.data.data);
            } else {
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleCats = (cat_id) => {
        console.log(cat_id);

    }

    return (<ThemeContainer role="teachers">
        <div className="block mx-auto w-[75%]">
            <div className="flex">
                <div className="w-[25%] text-center flex items-center">
                    <div>
                        {data && data.map(item => <div key={"cat-" + item.id}>
                            <button onClick={() => handleCats(item.id)} className="text-gray-400 text-sm px-2 hover:text-gray-600 hover:border-b-gray-600 cursor-pointer">{item.name}</button>
                        </div>)}
                    </div>
                </div>
                <div className="p-5 w-[75%]">
                    <div className="flex">
                        {coursesData && coursesData.map(item => <Link to={"/teachers/courses/" + item.id} key={"item-" + item.id} className="block w-[25%] bg-white rounded-2xl p-2 mx-2 hover:scale-102">
                            <div className="relative p-0 mx-0">
                                <div style={{ width: '75%' }} className={`text-amber-600 bg-amber-500 absolute bottom-0 z-10 mx-0 left-1 my-0 h-2 transition-all ${parseInt(75) == 100 ? 'rounded-b-2xl' : language && language['dir'] == 'ril' ? 'rounded-br-2xl' : 'rounded-bl-2xl'}`}></div>
                                <img src="/data/vid-1.webp" className="w-full rounded" />
                            </div>
                            <h3 className="text-l mx-2 my-4 font-bold">{item.title}</h3>
                            <div className="rounded w-full pointer m-1 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br  hover:from-amber-700 group-hover:to-amber-400 text-center ">{language && language["continue"]}</div>
                        </Link>)}
                    </div>

                    {!coursesData && loading && <div className="flex animate-pulse">
                        <div className="shadow block w-[25%] rounded-2xl p-2 mx-2 ">
                            <div className="w-full h-24 bg-gray-300"></div>
                            <div className="w-full h-2 bg-gray-300 my-4"></div>
                            <div className="w-full h-6 bg-gray-300 mt-4 rounded "></div>
                        </div>
                        <div className="shadow block w-[25%] rounded-2xl p-2 mx-2 ">
                            <div className="w-full h-24 bg-gray-300"></div>
                            <div className="w-full h-2 bg-gray-300 my-4"></div>
                            <div className="w-full h-6 bg-gray-300 mt-4 rounded "></div>
                        </div>
                        <div className="shadow block w-[25%] rounded-2xl p-2 mx-2 ">
                            <div className="w-full h-24 bg-gray-300"></div>
                            <div className="w-full h-2 bg-gray-300 my-4"></div>
                            <div className="w-full h-6 bg-gray-300 mt-4 rounded "></div>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    </ThemeContainer>)
}
