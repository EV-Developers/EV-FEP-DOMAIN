import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faCheck } from '@fortawesome/free-solid-svg-icons';
import { jsPDF } from "jspdf";
import { QRCode } from '@liquid-js/qrcode-generator';

import '../Certificates/Amiri-Regular-normal';
import { translation } from '../../../config/translations';
import ThemeContainer from '../../../compenents/parts/ThemeContainer';
import api from '../../../config/api';
import TLessons from './tabs/TLessons';
import TOverview from './tabs/TOverview';
import TComments from './tabs/TComments';
import TResources from './tabs/TResources';

export default function TCourse() {
    const [tabs, setTabs] = React.useState('content');
    const [data, setData] = React.useState(null);
    const [lessonsData, setLessonData] = React.useState(null);
    const [lessons, setLessons] = React.useState(null);
    const [assestmentsData, setAssestmentsData] = React.useState(null);
    const [language, setLanguage] = React.useState(null);
    const { courseId } = useParams();

    const lessonsList = [
        {
            id: '3',
            title: 'Lesson 1',
            video: '',
            level: 1,
            cover: 'vid-3.webp',
            progress: 100,
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora molestiae corrupti."
        },
        {
            id: '23423',
            title: 'Lesson 2',
            video: '',
            level: 2,
            cover: 'vid-3.webp',
            progress: 10,
            desc: "Mollitia facere reiciendis ipsa doloremque id veniam laudantium fuga ducimus repudiandae quibusdam voluptatum."
        },
        {
            id: '23424',
            title: 'Lesson 3',
            video: '',
            level: 3,
            cover: 'vid-3.webp',
            progress: 75,
            desc: "Repudiandae quibusdam voluptatum, sapiente excepturi et modi! Non, eius?"
        },
    ]

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

        setLessons(lessonsList);
    }, []);

    const assesments = [
        {
            id: 'assesment-1',
            title: 'Course Assesment',
            assesment_type: 'git',
            video: 'vid-3.webp'
        },
    ]

    const resources_list = [
        {
            id: 'comment-1',
            title: 'test',
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque nostrum iusto eum ad ratione in eveniet! Quaerat debitis tenetur deserunt rerum commodi. Sunt, quaerat non. Nisi dicta in amet excepturi.",
            file: '/data/logo.png'
        }
    ]

    React.useEffect(() => {
        getData();
    }, [])

    async function getData() {
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
    }

    const handleCourseCertificateDownload = () => {
        const username = window.localStorage.getItem("VPHl3hMFGI8w9kq");
        const courseTitle = "Arduino pack: Design, Manage and Launch Arduino";
        const date = new Date().toLocaleDateString('en-GB');

        if (username != null && username != '') {
            const cr_ref = String(Date.now());
            // Replace file name spaces with dash
            const file_name = courseTitle.replaceAll(' ', '-') + '-certificate.pdf';

            // add certificate URL as QR Code.
            const qr = new QRCode(4, 'L');
            qr.addData('https://fep.misk-donate.com/?c=' + cr_ref);
            qr.make();
            const qr_image = qr.toDataURL();

            let logo = "/logo/Logo.png";
            let bgcer = "/cerbg.png";

            // creating certificate PDF
            const doc = new jsPDF('landscape', 'pt', 'a4');
            const centerX = doc.internal.pageSize.getWidth() / 2;
            // get font name from 'Amiri-Regular-normal.js'
            doc.setFont('Amiri-Regular');
            doc.setTextColor('#212121');
            doc.setFontSize(26);
            doc.addImage(bgcer, 'png', 0, 0, 850, 600);
            doc.addImage(logo, 'png', centerX - 70, 180, 142, 54);
            doc.addImage(qr_image, 'png', centerX + 200, 450, 100, 100);
            doc.setFontSize(32);
            doc.text(username, centerX, 310, { align: 'center', dir: language['dir'] });
            doc.setFontSize(18);

            // if user UI language is arabic or english this will effect the certificate language.
            if (language['dir'] == 'ltr') {
                doc.text("In " + courseTitle + " on " + date, centerX, 350, { align: 'center', dir: 'ltr' });
            } else {
                doc.text("في برنامج " + courseTitle + " بتاريخ " + date, centerX, 350, { align: 'center', dir: 'rtl' });
            }

            doc.save(file_name);
        }
    }

    return (
        <ThemeContainer role="teachers">
            <h2 className="mt-4 text-3xl p-2 font-bold">Arduino pack: Design, Manage and Launch Arduino</h2>
            <div className="text-color py-2 flex">
                <span className="mx-2">{language && language["course_by"]} </span>
                <strong className="text-bold primary-text">mohammed razi </strong>
                <span>, electronic trainer and developer</span>
            </div>

            <div className="flex justify-between">
                <div></div>
                <Link to={'/teachers/generator/' + courseId} className="block rounded py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 mx-2 ">{language && language["certificates_generator"]}</Link>
            </div>
            <div className="flex">
                <Link to="/courses">
                    <img src="/logo/course-logo.png" alt="" className="w-10 h-10 my-1" />
                </Link>
                <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                <Link className="m-2 my-3 hover:text-[#4b4b4b]" to={"/teachers/courses"}>{language && language["courses"]}</Link>
                <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                <p className="m-3 my-3 text-color">{language && language["course_details"]}</p>
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
                    <TLessons courseId={courseId} lessons={lessons} setLessons={setLessons} assesments={assesments} />
                </div>
                <div className="w-[25%]">
                    <h2 className="text-xl py-7">{language && language["course_summary"]}</h2>
                    {lessons && lessons.map((item, index) => <a href={"#lesson-" + item.id} key={item.id} className="flex justify-between cursor-pointer w-full">
                        <div className="relative group hover:border-none">
                            <div className={`inline-block text-xs p-2 rounded-full ${index == 1 ? 'bg-amber-500' : 'bg-color'}`}>U{item.level}</div><p className="inline-block py-4 mx-3">{item.title}</p>
                            <span className="absolute bottom-0 left-0 h-0.5 bg-[#fa9600] w-0 transition-all duration-300 group-hover:w-full"></span>
                        </div>
                        <FontAwesomeIcon icon={faCheck} className="text-amber-500 p-4" />
                    </a>)}
                </div>
            </div>}
            {tabs == 'overview' && <TOverview />}
            {tabs == 'comments' && <TComments />}
            {tabs == 'resources' && <TResources resources_list={resources_list} />}

            <button onClick={handleCourseCertificateDownload} className="block rounded pointer my-3 p-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 mx-auto ">{language && language['download_cerificate']}</button>

        </ThemeContainer>
    )
}
