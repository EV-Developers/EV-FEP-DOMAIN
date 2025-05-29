import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { translation } from '../../config/translations';
import ThemeContainer from '../../compenents/parts/ThemeContainer';
import api from '../../config/api';

export default function Home() {
    const [language, setLanguage] = React.useState(null);
    const navigate = useNavigate();
    const role = window.localStorage.getItem("auth_user_role");
    /*
    if(role && role != "" && role != null){
        if(role == 'teacher'){
            navigate('/teachers');
        }
    }
    */
    
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
    
    const data = {
        labels: ['', '', ''],
        datasets: [
            {
                label: "Report",
                backgroundColor: "#fff",
                borderColor: "#ccc",
                borderWidth: 2,
                data: [1, 2, 3],
                backgroundColor: ["#FD9800", "orange", "#FFEFB4", "orange"],
                borderColor: ["#FD9800", "orange", "#FFEFB4", "orange"],
                borderWidth: 1,
            },
        ],
    };

    return (<>
        {/* <Loading /> */}

        <ThemeContainer>
            <div className="w-[75%] block mx-auto">
                <h2 className="my-5 text-2xl">{language && language["hello"]} "User", {language && language["to_dashboard"]}.</h2>
                <div className="flex">
                    <div className='block w-[45%] rounded-xl bg-white p-5 my-14'>
                        <h2>{language && language["recently_added"]}</h2>
                        <div>
                            <Link to="/courses/1" className="hover:bg-gray-100 hover:border hover:border-gray-200 rounded-xl block p-3">Item</Link>
                            <Link to="/courses/1" className="hover:bg-gray-100 hover:border hover:border-gray-200 rounded-xl block p-3">Item</Link>
                            <Link to="/courses/1" className="hover:bg-gray-100 hover:border hover:border-gray-200 rounded-xl block p-3">Item</Link>
                            <Link to="/courses/1" className="hover:bg-gray-100 hover:border hover:border-gray-200 rounded-xl block p-3">Item</Link>
                            <Link to="/courses/1" className="hover:bg-gray-100 hover:border hover:border-gray-200 rounded-xl block p-3">Item</Link>
                        </div>
                    </div>
                    <div className='block w-[45%] rounded-xl bg-white p-5 m-5 my-14'>
                        <h2>{language && language["recently_added"]}</h2>
                        <div>
                            <Link to="/materials/1" className="hover:bg-gray-100 hover:border hover:border-gray-200 rounded-xl block p-3">Item</Link>
                            <Link to="/materials/1" className="hover:bg-gray-100 hover:border hover:border-gray-200 rounded-xl block p-3">Item</Link>
                            <Link to="/materials/1" className="hover:bg-gray-100 hover:border hover:border-gray-200 rounded-xl block p-3">Item</Link>
                            <Link to="/materials/1" className="hover:bg-gray-100 hover:border hover:border-gray-200 rounded-xl block p-3">Item</Link>
                            <Link to="/materials/1" className="hover:bg-gray-100 hover:border hover:border-gray-200 rounded-xl block p-3">Item</Link>
                        </div>
                    </div>
                </div>
            </div>
        </ThemeContainer></>)
}
