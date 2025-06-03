import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faArrowLeft, faArrowRight, faCheck } from '@fortawesome/free-solid-svg-icons';

import ConfrimModal from '../../../compenents/parts/ConfrimModal';
import { translation } from '../../../config/translations';
import ThemeContainer from '../../../compenents/parts/ThemeContainer';
import api from '../../../config/api';
import Lessons from './tabs/Lessons';
import Overview from './tabs/Overview';
import Comments from './tabs/Comments';
import Resources from './tabs/Resources';

export default function Course() {
    const [tabs, setTabs] = React.useState('content');
    const [showModal, setShowModal] = React.useState(false);
    const [data, setData] = React.useState(null);
    const [lessonsData, setLessonData] = React.useState(null);
    const [lessons, setLessons] = React.useState(null);
    const [assestmentsData, setAssestmentsData] = React.useState(null);
    const [language, setLanguage] = React.useState(null);
    const { courseId } = useParams();
    const navigate = useNavigate();

    const lessonsList = [
        {
            id: '3',
            title: 'lesson 1',
            video: '',
            level: 1,
            cover: 'vid-3.webp',
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora molestiae corrupti, mollitia facere reiciendis ipsa doloremque id veniam laudantium fuga ducimus repudiandae quibusdam voluptatum, sapiente excepturi et modi! Non, eius?"
        },
        {
            id: '4',
            title: 'lesson 2',
            video: '',
            level: 2,
            cover: 'vid-3.webp',
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora molestiae corrupti, mollitia facere reiciendis ipsa doloremque id veniam laudantium fuga ducimus repudiandae quibusdam voluptatum, sapiente excepturi et modi! Non, eius?"
        },
    ];

    React.useEffect(() => {
        const lang = window.localStorage.getItem("language");
        const role = window.localStorage.getItem("z8C2XXEo52uJQj7");

        if (role && role != "" && role != null) {
            if (role == 'teacher') {
                navigate('/teachers');
            }
        }

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

        setLessons(lessonsList);
    }, []);

    const assesments = [
        {
            id: 'assesment-1',
            title: 'Assesments 1',
            assesment_type: 'git',
            video: 'vid-3.webp'
        },
    ]

    const resources_list = [
        {
            id: 'res-1',
            title: 'Software & Tools',
            description: "Arduino IDE (Download from arduino.cc) Tinkercad Circuits",
            file: 'https://downloads.arduino.cc/arduino-ide/arduino-ide_latest_Windows_64bit.exe',
        }
    ]

    React.useEffect(() => {
        getData();
    }, []);

    async function getData() {
        try {
            const tmpData = await api.get('/courses/' + courseId);
            const tmpLessonsData = await api.get('/lessons');
            const tmpAssestmentsData = await api.get('/assignments');

            if (tmpData.status == 200) {
                setData(tmpData.data)
                console.log(tmpData.data);
            }

            if (tmpLessonsData.status == 200) {
                setLessonData(tmpLessonsData.data);
                console.log(tmpLessonsData.data);
            }

            if (tmpAssestmentsData.status == 200) {
                setAssestmentsData(tmpAssestmentsData.data);
                console.log(tmpAssestmentsData);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async () => {
        try {
            const response = await api.delete('/courses/' + courseId);
            console.log(response);
            if (response.status == 200) {
                navigate("/courses")
            } else {
                console.log('error');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ThemeContainer>
            {showModal && <ConfrimModal message={language && language['confirm']} action={handleDelete} title={language && language['delete']} language={language} open={showModal} setOpen={setShowModal} />}

            <h2 className="mt-4 text-3xl p-2 font-bold">Arduino pack: Design, Manage and Launch Arduino</h2>
            <p className="text-color py-2 flex">
                <span className="mx-2">{language && language["course_by"]} </span>
                <strong className="text-bold primary-text">Mohammed Razi </strong> <span>, Electronic Trainer and Developer</span>
            </p>
            <div className="flex">
                <Link to="/courses">
                    <img src="/logo/course-logo.png" alt="" className="w-10 h-10 my-1" />
                </Link>
                <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                <Link className="m-2 my-3 hover:text-[#4b4b4b]" to={"/courses"}>{language && language["courses"]}</Link>
                <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                <p className="m-3 my-3 text-color">{language && language["course_details"]}</p>
            </div>
            <div className="flex justify-between">
                <div></div>
                <div className="flex">
                    <button onClick={() => setShowModal(true)} className="block rounded py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 mx-2 ">{language && language["delete"]}</button>
                    <Link to={'/courses/edit/' + courseId} className="block rounded py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 mx-2 ">{language && language["edit"]}</Link>
                </div>
            </div>
            <div className="flex mt-4 border-b-1 border-b-[#cccccc] py-1 p-4">
                <button className={`mx-2 cursor-pointer ${tabs == 'content' && 'border-b-2 border-b-[#fa9600]'} relative group hover:border-none`} onClick={() => setTabs('content')}>{language && language["content"]}
                    <span className="absolute bottom-0 left-0 h-0.5 bg-[#fa9600] w-0 transition-all duration-300 group-hover:w-full"></span>
                </button>
                <button className={`mx-2 cursor-pointer ${tabs == 'overview' && 'border-b-2 border-b-[#fa9600]'} relative group hover:border-none`} onClick={() => setTabs('overview')}>{language && language["overview"]}
                    <span className="absolute bottom-0 left-0 h-0.5 bg-[#fa9600] w-0 transition-all duration-300 group-hover:w-full"></span></button>
                <button className={`mx-2 cursor-pointer ${tabs == 'comments' && 'border-b-2 border-b-[#fa9600]'} relative group hover:border-none`} onClick={() => setTabs('comments')}>{language && language["comments"]}
                    <span className="absolute bottom-0 left-0 h-0.5 bg-[#fa9600] w-0 transition-all duration-300 group-hover:w-full"></span></button>
                <button className={`mx-2 cursor-pointer ${tabs == 'resources' && 'border-b-2 border-b-[#fa9600]'} relative group hover:border-none`} onClick={() => setTabs('resources')}>{language && language["resources"]}
                    <span className="absolute bottom-0 left-0 h-0.5 bg-[#fa9600] w-0 transition-all duration-300 group-hover:w-full"></span></button>
            </div>

            {tabs == 'content' && <div className="flex">
                <div className="w-[75%]">
                    <Lessons courseId={courseId} lessons={lessons} setLessons={setLessons} assesments={assesments} />
                </div>
                <div className="w-[25%] relative pb-[5%]">
                    <h2 className="text-xl py-7">{language && language["course_summary"]}</h2>
                    {lessons && lessons.map(item => <a href={"#lesson-" + item.id} key={item.id} className="flex justify-between cursor-pointer w-full">
                        <div className="relative group hover:border-none">
                            <div className="inline-block text-xs w-7 h-7 text-center bg-amber-500 p-2 rounded-full">{item.level}</div><p className="inline-block py-4 mx-3">{item.title}</p>
                            <span className="absolute bottom-0 left-0 h-0.5 bg-[#fa9600] w-0 transition-all duration-300 group-hover:w-full"></span>
                        </div>
                        {/* <FontAwesomeIcon icon={language && language['dir'] == 'rtl' ? faArrowLeft : faArrowRight} className="text-amber-500 p-4" /> */}
                    </a>)}
                </div>
            </div>}
            {tabs == 'overview' && <Overview courseId={courseId} />}
            {tabs == 'comments' && <Comments courseId={courseId} />}
            {tabs == 'resources' && <Resources courseId={courseId} resources_list={resources_list} />}
        </ThemeContainer>
    )
}
