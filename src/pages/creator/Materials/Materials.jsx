import React from 'react'
import { Link } from 'react-router-dom'

import api from '../../../config/api';
import { translation } from '../../../config/translations';
import ThemeContainer from '../../../compenents/parts/ThemeContainer';

export default function Materials() {
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
            id: 'mat-1',
            title: 'Material One'
        },
        {
            id: 'mat-2',
            title: 'Material Two'
        }
    ]

    const handleSelectAll = (e) => {
        const items = document.getElementsByClassName('items');

        for (let index = 0; index < items.length; index++) {
            const element = items[index];

            element.checked = e.target.checked
        }
    }

    return (
        <ThemeContainer>
            <div className="block mx-auto w-[75%]">
                <div className="flex justify-between">
                    <div></div>
                    <Link to="/add-material" className="block rounded pointer m-4 py-3 px-10 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400   font-bold">{language && language["create"]}</Link>
                </div>

                {list && list.map(item => <Link key={"material-"+item.id} to={'/materials/' + item.id} className='block hover:bg-gray-100 hover:border hover:border-gray-200 rounded-xl bg-white p-5 my-2 text-sm'>{item.title}</Link>)}
            </div>
        </ThemeContainer>
    )
}
