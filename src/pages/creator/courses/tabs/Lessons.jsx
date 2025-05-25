import React from 'react'
import { Link } from 'react-router-dom'
import { translation } from '../../../../config/translations';
import Lesson from '../Lesson';
import Assesment from '../Assesment';


export default function Lessons({ lessons, assesments, courseId }) {
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

    return (<div>
        <div className="flex justify-between mt-3">
            <Link to={"/add-lessons/" + courseId} className="block rounded pointer m-1 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 transition-all">{language && language["new_lesson"]}</Link>
            {assesments && assesments.length == 0 && <Link to={"/add-assesment/" + courseId} className="block rounded pointer m-1 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 transition-all">{language && language["new_assesment"]}</Link>}
        </div>
        <p className="text-2xl m-4">{language && language["course_lessons"]}:</p>
        {lessons && lessons.map(item => <Lesson courseId={courseId} item={item} key={item.id} />)}
        {assesments && assesments.map(item => <Assesment item={item} key={item.id} />)}
    </div>)
}
