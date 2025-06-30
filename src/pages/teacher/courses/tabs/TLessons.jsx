import React from 'react'

import { translation } from '../../../../config/translations';
import Lesson from '../TLesson';
import Assesment from '../TAssesment';

export default function TLessons({ lessons, assignments, courseId, setTotalHourse }) {
    const [language, setLanguage] = React.useState(null);
    const [total, setTotal] = React.useState(0);
    const [videosTime, setVideosTime] = React.useState(null);
    const [videosTimes, setVideosTimes] = React.useState([]);

    React.useEffect(() => {        
        if(videosTime){
            let tmpTotal = total;
            let tmpArr = videosTimes;

            if(videosTimes.length == 0){
                tmpTotal += videosTime.duration;
            } else {
                let found = videosTimes.filter(item => item.id == videosTime.id);
                
                if(found.length == 0){
                    tmpTotal += videosTime.duration;

                    tmpArr.push(videosTime);
                }
            }

            if(videosTimes.length == (lessons.length - 1)){
                tmpTotal = tmpTotal >= 60 ? tmpTotal / 60 : tmpTotal / 100;
                tmpTotal = tmpTotal.toFixed(2).replace(".", ":");
            }
            
            setVideosTimes(tmpArr);
            setTotalHourse(tmpTotal);
            setTotal(tmpTotal);
        }
    }, [videosTime]);

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
        {lessons && lessons.map((item, index) => <Lesson videosTime={videosTime} setVideosTime={setVideosTime} courseId={courseId} item={item} key={item.id} playNext={lessons[index + 1] && lessons[index + 1]} />)}
        {assignments && assignments.map(item => <Assesment courseId={courseId} assignments={item} key={item.id} />)}
    </div>)
}
