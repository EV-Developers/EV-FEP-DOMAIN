import React from 'react'
import { translation } from '../../../../config/translations';
import Lesson from '../TLesson';
import Assesment from '../TAssesment';

export default function TLessons({ lessons, setLessons, assesments, courseId }) {
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
        <p className="text-2xl m-4">{language && language["course_lessons"]}:</p>
        {lessons && lessons && lessons.map(item => <Lesson courseId={courseId} item={item} key={item.id} />)}
        {assesments && assesments.map(item => <Assesment item={item} key={item.id} />)}
    </div>)
}
