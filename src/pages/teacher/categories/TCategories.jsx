import React from 'react'
import { Link } from 'react-router-dom'

import api from '../../../config/api';
import { translation } from '../../../config/translations';
import ThemeContainer from '../../../compenents/parts/ThemeContainer';

export default function TCategories() {
    const [data, setData] = React.useState(null);
    const [language, setLanguage] = React.useState(null);

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

    React.useEffect(() => {
        loadData();
    }, []);

    /**
     * @async
     * load all courses categories data
     */
    const loadData = async () => {
        const response = await api.get('/course-categories');
        if (response.status == 200) {
            setData(response.data);
        }
    }

    return (
        <ThemeContainer role="teachers" customeClasses="w-full">
            <div className="2xl:w-[75%] mx-auto mt-0 h-[300px] w-full bg-green-600 bg-[url(/imgs/catsbanner.png)] bg-cover ">
                <div className="mx-auto w-[75%] text-center text-blue-950">
                    <h2 className="text-5xl font-bold p-3 pt-14">{language && language['categories']}</h2>
                </div>
            </div>

            <div className="block mx-auto w-[75%]">
                <div className="flex flex-wrap my-5">
                    {data && data.map(item => <Link to={'/teachers/categories/' + item.id} key={"cat-" + item.id} className="hover:bg-gray-100 hover:border hover:border-gray-200 rounded-xl bg-white p-5 py-20 my-2 w-[20%] mx-2 text-sm text-center text-white flex flex-col justify-center items-center bg-[url('/imgs/catsbg.png')] bg-cover transition-all hover:scale-105">
                    <img src="/imgs/cats.png" alt="" />
                    <p className="my-3 font-bold">{item.name}</p>
                </Link>)}
                </div>
                {!data && <div role='status' className='animate-pulse flex'>
                    <div className='rounded-xl bg-gray-300 p-5 py-2 my-2 mx-3 w-[20%] h-[200px]'></div>
                    <div className='rounded-xl bg-gray-300 p-5 py-2 my-2 mx-3 w-[20%] h-[200px]'></div>
                    <div className='rounded-xl bg-gray-300 p-5 py-2 my-2 mx-3 w-[20%] h-[200px]'></div>
                    <div className='rounded-xl bg-gray-300 p-5 py-2 my-2 mx-3 w-[20%] h-[200px]'></div>
                </div>}
            </div>
        </ThemeContainer>
    )
}
