import React from 'react'
import { Link } from 'react-router-dom'

import api from '../../../config/api';
import { translation } from '../../../config/translations';
import ThemeContainer from '../../../compenents/parts/ThemeContainer';

export default function TGames() {
    const [loading, setLoading] = React.useState(false);
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

    const list = [
        {
            id: 'game-1',
            title: 'Game One'
        },
        {
            id: 'game-2',
            title: 'Game Two'
        }
    ]

    return (
        <ThemeContainer role="teachers" customeClasses="w-full">
            <div className="mt-0 h-[300px] w-full bg-green-600 bg-[url(/imgs/catsbanner.png)] bg-cover ">
                <div className="mx-auto w-[75%] text-center text-blue-950">
                    <h2 className="text-5xl font-bold p-3 pt-14">{language && language['materials']}</h2>
                </div>
            </div>

            <div className="block mx-auto w-[75%]">
                <div className="flex flex-wrap my-5 p-2">
                    {list && list.map(item => <Link Link to={'/categories/' + item.id} key={"cat-" + item.id} className="block p-4 py-5 my-2 w-[22%] mx-1 text-sm text-center bg-[#1a31d3] rounded-xl">
                        <div className="p-4  transition-all hover:scale-105 text-center text-white">
                            <img src="/imgs/gameicon.png" alt="" className="mx-auto" />
                            <p className="my-3 font-bold">{item.title}</p>
                            <p className="my-3 text-xs">{item.description}</p>
                        </div>
                    </Link>)}
                    {!list && <>
                        <div className='rounded-xl bg-gray-300 p-5 py-2 my-2 mx-3 w-[22%] h-[200px]'></div>
                        <div className='rounded-xl bg-gray-300 p-5 py-2 my-2 mx-3 w-[22%] h-[200px]'></div>
                        <div className='rounded-xl bg-gray-300 p-5 py-2 my-2 mx-3 w-[22%] h-[200px]'></div>
                        <div className='rounded-xl bg-gray-300 p-5 py-2 my-2 mx-3 w-[22%] h-[200px]'></div>
                    </>}
                </div>
            </div>
        </ThemeContainer>
    )
}
