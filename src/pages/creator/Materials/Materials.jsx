import React from 'react'
import { Link } from 'react-router-dom'

import api from '../../../config/api';
import { translation } from '../../../config/translations';
import ThemeContainer from '../../../compenents/parts/ThemeContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';

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

        getFileExtension('http://google.com/erterer/erterter/file.pdf');
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

    const fileTypes = [
        "وثائق",
        "صور",
        "مطبوعات",
    ]

    const getFileExtension = (file) => {
        file = file.split('.');
        const extention = file[file.length - 1];

        return extention;
    }

    return (
        <ThemeContainer>
            <div className="block mx-auto w-[75%]">
                <div className="flex justify-between">
                    <div></div>
                    <Link to="/add-material" className="block rounded pointer m-4 py-3 px-10 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400   font-bold">{language && language["create"]}</Link>
                </div>

                <div className="flex">
                    {fileTypes && fileTypes.map((item, index) => <label key={"type-"+index} htmlFor={"type-"+index} className="bg-[#fa9600] mx-1 rounded-3xl px-4 text-white py-1 text-sm group-checked:bg-amber-700 checked:bg-amber-800 hover:bg-amber-800 cursor-pointer"><input type="radio" name="types" className="hidden " id={"type-"+index} /> {item}</label>)}
                </div>

                <div className="flex flex-row flex-wrap">
                    {list && list.map(item => <Link key={"material-"+item.id} to={'/materials/' + item.id} className='block hover:bg-blue-500 hover:border hover:border-gray-200 rounded-xl bg-blue-400 p-5 my-2 text-sm h-[150px] w-[25%] mx-1 text-center items-center justify-center'>
                        <FontAwesomeIcon icon={faFilePdf} className="text-7xl text-white " />
                        <p className="py-3 text-sm text-white">{item.title}</p>
                    </Link>)}
                </div>
            </div>
        </ThemeContainer>
    )
}
