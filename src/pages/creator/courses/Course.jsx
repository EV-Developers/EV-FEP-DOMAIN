import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import api from '../../../config/api';
import ConfrimModal from '../../../compenents/parts/ConfrimModal';
import { translation } from '../../../config/translations';
import ThemeContainer from '../../../compenents/parts/ThemeContainer';
import Lessons from './tabs/Lessons';
import Overview from './tabs/Overview';
import Comments from './tabs/Comments';
import Resources from './tabs/Resources';

export default function Course() {
    const [tabs, setTabs] = React.useState('content');
    const [showModal, setShowModal] = React.useState(false);
    const [data, setData] = React.useState(null);
    const [lessonsData, setLessonData] = React.useState(null);
    const [lessonshadowData, setShadowLessonData] = React.useState(null);
    const [resources, setResources] = React.useState(null);
    const [assignments, setAssignmentsData] = React.useState(null);
    const [language, setLanguage] = React.useState(null);
    const [userSort, setUserSort] = React.useState(null);
    const { courseId } = useParams();
    const navigate = useNavigate();

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
    }, []);

    React.useEffect(() => {
        getData();
    }, []);

    async function getData() {
        try {
            const tmpData = await api.get('/courses/' + courseId);

            if (tmpData && tmpData.status == 200) {
                if (tmpData.data && tmpData.data.data) {
                    setData(tmpData.data.data);

                    if (tmpData.data.data.lessons) {
                        if (tmpData.data.data && tmpData.data.data.lessons.length != 0) {
                            const tmpArr = tmpData.data.data.lessons.sort((a, b) => a._order - b._order);
                            setLessonData(tmpArr);
                            setShadowLessonData(tmpArr);
                        } else {
                            setLessonData([]);
                        }
                    }

                    if (tmpData.data.data.resources) {
                        setResources(tmpData.data.data.resources);
                    }

                    if (tmpData.data.data.assignments) {
                        setAssignmentsData(tmpData.data.data.assignments);
                    }
                }
            }
        } catch (error) {
            //console.log(error);
        }
    }

    const handleDelete = async () => {
        try {
            const response = await api.delete('/courses/' + courseId);

            if (response.status == 200) {
                navigate("/courses")
            } else {
                //console.log('error');
            }
        } catch (error) {
            //console.log(error);
        }
    }

    React.useEffect(() => {
        if (userSort) {
            setUserSort(false);
            handleSort();
        }
    }, [lessonsData]);

    const handleSort = () => {
        if (userSort) {
            const newIndex = userSort.newIndex;
            const oldIndex = userSort.oldIndex;

            const sorted = lessonshadowData.filter((item, index) => index == newIndex || index == oldIndex);

            if (sorted && sorted.length != 0 && sorted.length == 2) {
                sorted.map(async (item, index) => {
                    const sort_index = index == 0 ? 1 : 0;
                    const _sort = sorted[sort_index]._order;

                    try {
                        const tmpData = await api.post('/lessons/' + item.id, {
                            _order: _sort
                        });

                        if (tmpData.status == 200) {
                            //console.log(tmpData);
                        }
                    } catch (error) {
                        //console.log(error);
                    }
                });
            }
        }
    }

    return (
        <ThemeContainer>
            {showModal && <ConfrimModal message={language && language['confirm']} action={handleDelete} title={language && language['delete']} language={language} open={showModal} setOpen={setShowModal} />}

            {!data && <div className="*:animate-pulse mt-4">
                <div className="bg-gray-300 h-4 w-[65%] p-5"></div>
                <div className="bg-gray-300 h-2 py-2 mt-2 w-[45%] p-3"></div>
            </div>}
            <h2 className="mt-4 text-3xl p-2 font-bold">{data && data.title}</h2>
            <p className="text-color py-2 flex">
                <span className="mx-2"><strong className="text-bold primary-text">{data && data.category.name}</strong></span>
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
                    <span className={`absolute bottom-0 ${language && language['dir'] == 'ltr' ? 'left-0' : 'right-0'} h-0.5 bg-[#fa9600] w-0 transition-all duration-300 group-hover:w-full`}></span>
                </button>
                <button className={`mx-2 cursor-pointer ${tabs == 'overview' && 'border-b-2 border-b-[#fa9600]'} relative group hover:border-none`} onClick={() => setTabs('overview')}>{language && language["overview"]}
                    <span className={`absolute bottom-0 ${language && language['dir'] == 'ltr' ? 'left-0' : 'right-0'} h-0.5 bg-[#fa9600] w-0 transition-all duration-300 group-hover:w-full`}></span>
                </button>
                <button className={`mx-2 cursor-pointer ${tabs == 'comments' && 'border-b-2 border-b-[#fa9600]'} relative group hover:border-none`} onClick={() => setTabs('comments')}>{language && language["comments"]}
                    <span className={`absolute bottom-0 ${language && language['dir'] == 'ltr' ? 'left-0' : 'right-0'} h-0.5 bg-[#fa9600] w-0 transition-all duration-300 group-hover:w-full`}></span>
                </button>
                <button className={`mx-2 cursor-pointer ${tabs == 'resources' && 'border-b-2 border-b-[#fa9600]'} relative group hover:border-none`} onClick={() => setTabs('resources')}>{language && language["resources"]}
                    <span className={`absolute bottom-0 ${language && language['dir'] == 'ltr' ? 'left-0' : 'right-0'} h-0.5 bg-[#fa9600] w-0 transition-all duration-300 group-hover:w-full`}></span>
                </button>
            </div>

            {tabs == 'content' && <div className="flex">
                <div className="w-[75%]">
                    <Lessons courseId={courseId} lessons={lessonsData} setLessons={setLessonData} assignments={assignments} handleSort={setUserSort} />
                </div>
                <div className="w-[25%] relative pb-[5%]">
                    <h2 className="text-xl py-7">{language && language["course_summary"]}</h2>
                    {lessonsData && lessonsData.map(item => <a href={"#lesson-" + item.id} key={item.id} className="flex justify-between cursor-pointer w-full">
                        <div className="relative group hover:border-none">
                            <div className="inline-block text-xs w-7 h-7 text-center bg-amber-500 p-2 rounded-full">{item.level}</div>
                            <p className="inline-block py-4 mx-3">{item.title}</p>
                            <span className={`absolute bottom-0 ${language && language['dir'] == 'ltr' ? 'left-0' : 'right-0'} h-0.5 bg-[#fa9600] w-0 transition-all duration-300 group-hover:w-full`}></span>
                        </div>
                        {/* <FontAwesomeIcon icon={language && language['dir'] == 'rtl' ? faArrowLeft : faArrowRight} className="text-amber-500 p-4" /> */}
                    </a>)}
                </div>
            </div>}
            {tabs == 'overview' && <Overview data={data} courseId={courseId} />}
            {tabs == 'comments' && <Comments data={data} courseId={courseId} />}
            {tabs == 'resources' && <Resources data={data} courseId={courseId} resources_list={resources} />}
        </ThemeContainer>
    )
}
