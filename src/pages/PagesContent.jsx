import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useParams } from 'react-router-dom';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import ThemeContainer from '../compenents/parts/ThemeContainer';
import { translation } from '../config/translations';

export default function PagesContent() {
    const [language, setLanguage] = React.useState(null);
    const [userRole, setUserRole] = React.useState(null);
    const { pageName } = useParams();

    React.useEffect(() => {
        const lang = window.localStorage.getItem("language");
        let role = window.localStorage.getItem("z8C2XXEo52uJQj7");

        if (role && role != "" && role != null) {
            if (role == 'teacher') {
                role = 'teachers';
            } else if (role == 'student') {
                role = 'students';
            } else if (role == 'content_creator') {
                role = '';
            }
        } else {
            role = '';
        }

        setUserRole(role);

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

    return (<ThemeContainer role={userRole}>
        <div className="block mx-auto w-[75%]">
            <div className="flex">
                <Link className="m-2 my-3 hover:text-[#4b4b4b]" to={"/"}>{language && language["home"]}</Link>
                <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                <p className="m-3 my-3 text-color">{language && language[pageName]}</p>
            </div>
            <hr className="text-gray-200 my-5" />
            <div className="my-5 text-xl font-bold">Pages Content</div>
            <div>
                <p className="my-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus eum adipisci rerum distinctio autem voluptates inventore unde incidunt nemo, esse voluptate error vero velit facilis id, eveniet harum! Necessitatibus, minus.</p>
                <p className="my-3">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis quae iusto rerum aliquid eaque nemo! Natus, dignissimos perspiciatis aliquid sunt doloribus hic veniam excepturi omnis. Officia nostrum odit eveniet fugit.</p>
                <p className="my-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim nobis facere officiis consequuntur harum eligendi labore voluptate dolore ad nam, dolorem delectus at recusandae eveniet nulla adipisci quod ratione eaque.</p>
            </div>
        </div>
    </ThemeContainer>)
}
