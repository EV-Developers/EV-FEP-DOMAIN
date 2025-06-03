import React from 'react'
import { Link } from 'react-router-dom'

import api from '../../../config/api';
import { translation } from '../../../config/translations';
import ThemeContainer from '../../../compenents/parts/ThemeContainer';

export default function SGames() {
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
        <ThemeContainer role="students">
            <div className="block mx-auto w-[75%]">
                {list && list.map(item => <Link to={'/students/games/' + item.id} className='block hover:bg-gray-100 hover:border hover:border-gray-200 rounded-xl bg-white p-5 my-2 text-sm'>{item.title}</Link>)}
            </div>
        </ThemeContainer>
    )
}
