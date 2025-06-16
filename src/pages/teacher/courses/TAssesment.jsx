import React from 'react'
import { Link } from 'react-router-dom';

import { translation } from '../../../config/translations';

export default function TAssesment({ item }) {
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

    return (
        <div>
            <div className="p-5 m-4 rounded-xl transition-all">
                <div className="flex justify-between transition-all w-full pb-3">
                    <p className="text-l font-bold">{item.title}</p>
                </div>
                <p className="text-xs text-color">{item.description}</p>
                <div className="transition-all">
                    <p className="p-2">{language && language["assesment_type"]}: {language && language[item.type]}</p>

                    <Link to={"/teachers/submit-assesment/"+item.id} className="rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-xs hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 font-bold" >{language && language['submit']}</Link>
                </div>
            </div>
        </div>
    )
}
