import React from 'react'
import { Link } from 'react-router-dom'

import { translation } from '../../../config/translations';
import ThemeContainer from '../../../compenents/parts/ThemeContainer';
import api from '../../../config/api';

export default function TMaterials() {
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

    return (
        <ThemeContainer role="teachers">
            <div className="block mx-auto w-[75%] pt-4">
                
                {list && list.map(item => <Link to={'/teachers/materials/' + item.id} className='block hover:bg-gray-100 hover:border hover:border-gray-200 rounded-xl bg-white p-5 my-2 text-sm'>{item.title}</Link>)}
            </div>
        </ThemeContainer>
    )
}
