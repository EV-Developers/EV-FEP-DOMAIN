import React from 'react'
import { translation } from '../../config/translations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarkerAlt, faPhone, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Footer({role}) {
    const [language, setLanguage] = React.useState(null);
    let slug = "";

    if(role){
        slug = '/'+role;
    }

    React.useEffect(() => {
        const lang = window.localStorage.getItem("language");
        const userRole = window.localStorage.getItem("z8C2XXEo52uJQj7");
        
        if(userRole && userRole != "" && userRole != null){
            if(userRole == 'teacher'){
                slug = '/teachers';
            } else if(userRole == 'student'){
                slug = '/students';
            }
        }

        if(lang && lang != '' && lang != null){
            if(lang == 'english'){
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
    <div className="mt-[90px] bg-[#FFEFB4]">
        <div className="flex my-14 mt-5 md:w-[90%] lg:w-[75%] text-sm mx-auto">
            <div className="text-xs m-14">
                <p><FontAwesomeIcon icon={faMapMarkerAlt} className="mx-2" /> Muscat, AL Mawaleh 200 Oman, CA 94110</p>
                <p><FontAwesomeIcon icon={faEnvelope} className="mx-2" /> evcentersinfo@outlook.com</p>
                <p><FontAwesomeIcon icon={language && language['dir'] == 'rtl' ? faPhoneAlt : faPhone} className="mx-2" /> 1-800-800-2299</p>
            </div>
            <div className="flex mt-7 text-xs">
                <div className="mx-14">
                    <p className="font-bold my-4">{language && language['main_title']}</p>
                    <p><Link to={slug + "/"} className="hover:underline">{language && language['home']}</Link></p>
                    {role && role != 'students' && <p><Link to={slug + "/courses"} className="hover:underline">{language && language['courses']}</Link></p>}
                    {role && role != 'students' && <p><Link to={slug + "/categories"} className="hover:underline">{language && language['categories']}</Link></p>}
                    <p><Link to={slug + "/materials"} className="hover:underline">{language && language['materials']}</Link></p>
                    <p><Link to={slug + "/games"} className="hover:underline">{language && language['games']}</Link></p> 
                </div>
                <div className="mx-14">
                    <p className="font-bold my-4">{language && language['informations']}</p>
                    <p><Link to="/pages/about" className="hover:underline">{language && language['about']}</Link></p>
                    {role && role != 'students' && <p><Link to={slug + "/explore"} className="hover:underline">{language && language['explore']}</Link></p>}
                    <p><Link to="/contact" className="hover:underline">{language && language['contact']}</Link></p>
                </div>
                <div className="mx-14">
                    <p className="font-bold my-4">{language && language['more']}</p>
                    <p><Link to="/pages/tos" className="hover:underline">{language && language['tos']}</Link></p> 
                    <p><Link to="/pages/privacy-policy" className="hover:underline">{language && language['privacy_policy']}</Link></p> 
                    <p><Link to="/pages/support" className="hover:underline">{language && language['support']}</Link></p> 
                </div>
            </div>
        </div>

        <div className="bg-[#FDC800] p-4">
            <div className="w-[75%] mx-auto">
                <div className="flex">
                    <div className="w-[75%]">
                        <p className="text-xs text-center ">&copy; {new Date().getFullYear()} {language && language['copyright']}.</p>
                    </div>
                    <div className="flex">
                        <p className="mx-2"><a href="https://instagram.com" target="_blank"><img src="/instagram.svg" className="rounded-2xl w-4" alt="" /></a></p>
                        <p className="mx-2"><a href="https://x.com" target="_blank"><img src="/x.jpg" className="rounded-l w-4" alt="" /></a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
