import React from 'react'
import { Link } from 'react-router-dom';
import { translation } from '../../config/translations';

export default function Sidebar({ page }) {
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
            window.localStorage.setItem("language", 'arabic');
            setLanguage(translation[1]);
            window.document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
        }
    }, []);

    return (<aside className="w-[20%] h-screen py-10 m-2 bg-white">
        <Link to="/dashboard" className={`rounded pointer m-2 py-1 bg-gradient-to-br ${page == 'dashboard' &&  'rtl:from-[#FFEFB4] rtl:to-[#FD9800] ltr:from-[#FD9800] ltr:to-[#FFEFB4]'} text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 flex px-1 py-2`}><img src="/icons/dashboard.png" className="w-5 rtl:ml-2 ltr:mr-2" /> {language && language['dashboard']}</Link>
        <Link to="/dashboard/users" className={`rounded pointer m-2 py-1 bg-gradient-to-br ${page == 'users_management' &&  'rtl:from-[#FFEFB4] rtl:to-[#FD9800] ltr:from-[#FD9800] ltr:to-[#FFEFB4]'} text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 flex px-1 py-2`}> <img src="/icons/group.png" className="w-5 rtl:ml-2 ltr:mr-2" />{language && language['users_management']}</Link>
        <Link to="/dashboard/schools" className={`rounded pointer m-2 py-1 bg-gradient-to-br ${page == 'schools' &&  'rtl:from-[#FFEFB4] rtl:to-[#FD9800] ltr:from-[#FD9800] ltr:to-[#FFEFB4]'} text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 flex px-1 py-2`}><img src="/icons/graduate.png" className="w-5 rtl:ml-2 ltr:mr-2" /> {language && language['schools']}</Link>
        <Link to="/dashboard/teachers" className={`rounded pointer m-2 py-1 bg-gradient-to-br ${page == 'teachers' &&  'rtl:from-[#FFEFB4] rtl:to-[#FD9800] ltr:from-[#FD9800] ltr:to-[#FFEFB4]'} text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 flex px-1 py-2`}><img src="/icons/whiteboard.png" className="w-5 rtl:ml-2 ltr:mr-2" /> {language && language['teachers_performances']}</Link>
        <Link to="/dashboard/courses" className={`rounded pointer m-2 py-1 bg-gradient-to-br ${page == 'courses' &&  'rtl:from-[#FFEFB4] rtl:to-[#FD9800] ltr:from-[#FD9800] ltr:to-[#FFEFB4]'} text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 flex px-1 py-2`}><img src="/icons/streaming.png" className="w-5 rtl:ml-2 ltr:mr-2" /> {language && language['courses']}</Link>
        <Link to="/dashboard/success-stroies" className={`rounded pointer m-2 py-1 bg-gradient-to-br ${page == 'success_stroies' &&  'rtl:from-[#FFEFB4] rtl:to-[#FD9800] ltr:from-[#FD9800] ltr:to-[#FFEFB4]'} text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 flex px-1 py-2`}><img src="/icons/diploma.png" className="w-5 rtl:ml-2 ltr:mr-2" /> {language && language['success_stroies']}</Link>
        <Link to="/dashboard/certifications-issue-orders" className={`rounded pointer m-2 py-1 bg-gradient-to-br ${page == 'certifications_issue_orders' &&  'rtl:from-[#FFEFB4] rtl:to-[#FD9800] ltr:from-[#FD9800] ltr:to-[#FFEFB4]'} text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 flex px-1 py-2`}> <img src="/icons/checklist.png" className="w-5 rtl:ml-2 ltr:mr-2" />{language && language['certifications_issue_orders']}</Link>
    </aside>)
}
