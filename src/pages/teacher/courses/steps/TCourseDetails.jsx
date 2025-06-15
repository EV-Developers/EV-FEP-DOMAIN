import React, { useState } from 'react'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import api from '../../../../config/api';
import { translation } from '../../../../config/translations';

export default function TCourseDetails({ categories, handleSteps, title, setTitle, categoryId, setCategoryId, categoryName, setCategoryName, level, setLevel }) {
    const [show, setShow] = useState(false);
    const [language, setLanguage] = useState(null);
    const [coursesData, setCoursesData] = React.useState(null);

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

    const levels_list = [
        {
            id: '0',
            title: 'None',
            grade: "Grade0",
            level: '0'
        },
        {
            id: '1',
            title: 'SCratch',
            grade: "GRADE1",
            level: '1'
        },
        {
            id: '2',
            title: 'Arduino',
            grade: "GRADE2",
            level: '2'
        },
        {
            id: '3',
            title: 'Microbit',
            grade: "GRADE3",
            level: '3'
        },
        {
            id: '4',
            title: 'Electronics',
            grade: "GRADE4",
            level: '4'
        },
    ]

    React.useEffect(() => {
        loadCoursesData();
    }, []);

    const loadCoursesData = async () => {
        const tmpData = await api.get('/courses');

        if (tmpData.status == 200) {
            setCoursesData(tmpData.data.data);
        }
    }

    return (<div>
        <div className="flex">
            <div className="w-[60%] px-4 border-r border-r-[#ccccccc1] mx-5">
                <label htmlFor="lessonTitle=">
                    <p id="lessonTitle=" className="my-3 font-bold">{language && language["title"]}</p>
                    <input type="text" id="lessonTitle=" placeholder={language && language["write_here"]} className="py-2 px-14 rounded shadow-sm bg-color w-full placeholder-gray-400" value={title} onChange={val => setTitle(val.target.value)} />
                </label>

                <label htmlFor="courseLevel">
                    <p className="my-3 font-bold">{language && language["level"]}</p>
                    <input type="text" className="py-2 px-14 rounded shodow-sm bg-color w-full placeholder-gray-400 " placeholder={language && language["write_here"]} value={level} onChange={val => setLevel(val.target.value)} />
                </label>
                <p className="my-3 font-bold">{language && language["choose_category"]}</p>
                <div className="relative">
                    <button className="flex justify-between font-bold bg-color py-2 px-5 mx-3 rounded-xl text-sm" onClick={() => setShow(!show)}><span className="mr-4">{categoryName === "" ? language && language["category"] : categoryName}</span> <FontAwesomeIcon icon={faCaretDown} className="mx-3" /></button>
                    {show && <div className="bg-color block rounded-xl w-[25%] p-3 absolute z-10">
                        {categories && categories.map(item => <button onClick={() => {
                            setCategoryId(item.id);
                            setCategoryName(item.name);
                        }} key={item.id} className={`block text-left font-bold rounded-xl w-full mb-3 p-3 ${categoryId == item.id ? 'bg-gradient-to-br from-[#fa9600] to-[#ffe696] hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400' : 'bg-white'}`}>
                            {item.name}
                        </button>)}
                    </div>}
                </div>
            </div>
            <div className="w-[35%]">
                {coursesData && coursesData.map((item, index) => (
                    <div key={item.id} className="py-2 px-14 rounded-xl shadow-sm w-full placeholder-gray-400 flex justify-between my-4 hover:bg-[#ffe696] hover:border hover:border-amber-300 cursor-grab">{item.title}</div>
                ))}

            </div>
        </div>

        <div className="flex flex-row justify-between mt-7">
            <button className="bg-color pointer rounded m-2 py-1 px-5 text-sm">Previous</button>
            <button onClick={() => handleSteps('next')} className="rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400">Continue</button>
        </div>
    </div>)
}
