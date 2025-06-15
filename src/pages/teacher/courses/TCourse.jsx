import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faCheck, faMinus } from '@fortawesome/free-solid-svg-icons';
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
    const [assestmentsData, setAssestmentsData] = React.useState(null);
    const [resources, setResources] = React.useState(null);
    const [language, setLanguage] = React.useState(null);
    const { courseId } = useParams();

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

    React.useEffect(() => {
        getData();
    }, []);

    async function getData() {
        try {
            const tmpData = await api.get('/courses/' + courseId);
    
            if (tmpData && tmpData.status == 200) {
                setData(tmpData.data.data)
                setLessonData(tmpData.data.data.lessons);
                setAssestmentsData(tmpData.data.data.assignments);
                setResources(tmpData.data.data.resources)
            }
        } catch (error) {
            //console.log(error);
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
            {!data && <div className="*:animate-pulse mt-4">
                <div className="bg-gray-300 h-4 w-[65%] p-5"></div>
                <div className="bg-gray-300 h-2 py-2 mt-2 w-[45%] p-3"></div>
            </div>}
            <h2 className="mt-4 text-3xl p-2 font-bold">{data && data.title}</h2>
            <p className="text-color py-2 flex">
                <span className="mx-2"><strong className="text-bold primary-text">{data && data.category.name}</strong></span>
            </p>

            <div className="flex justify-between">
                <div></div>
                <div className="flex">
                    <Link to={'/teachers/generator/' + courseId} className="block rounded py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 mx-2 font-bold">{language && language["certificates_generator"]}</Link>
                    <button onClick={handleCourseCertificateDownload} className="block rounded pointer px-5 py-1 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 mx-auto font-bold cursor-pointer">{language && language['download_cerificate']}</button>
                </div>
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
                    <span className={`absolute bottom-0 ${language && language['dir'] == 'ltr' ? 'left-0' : 'right-0'} h-0.5 bg-[#fa9600] w-0 transition-all duration-300 group-hover:w-full`}></span>
                </button>
                <button className={`mx-2 cursor-pointer ${tabs == 'overview' && 'border-b-2 border-b-[#fa9600]'} relative group hover:border-none`} onClick={() => setTabs('overview')}>{language && language["overview"]}
                    <span className={`absolute bottom-0 ${language && language['dir'] == 'ltr' ? 'left-0' : 'right-0'} h-0.5 bg-[#fa9600] w-0 transition-all duration-300 group-hover:w-full`}></span></button>
                <button className={`mx-2 cursor-pointer ${tabs == 'comments' && 'border-b-2 border-b-[#fa9600]'} relative group hover:border-none`} onClick={() => setTabs('comments')}>{language && language["comments"]}
                    <span className={`absolute bottom-0 ${language && language['dir'] == 'ltr' ? 'left-0' : 'right-0'} h-0.5 bg-[#fa9600] w-0 transition-all duration-300 group-hover:w-full`}></span></button>
                <button className={`mx-2 cursor-pointer ${tabs == 'resources' && 'border-b-2 border-b-[#fa9600]'} relative group hover:border-none`} onClick={() => setTabs('resources')}>{language && language["resources"]}
                    <span className={`absolute bottom-0 ${language && language['dir'] == 'ltr' ? 'left-0' : 'right-0'} h-0.5 bg-[#fa9600] w-0 transition-all duration-300 group-hover:w-full`}></span></button>
            </div>

            {tabs == 'content' && <div className="flex">
                <div className="w-[75%]">
                    <TLessons courseId={courseId} lessons={lessonsData} assesments={assestmentsData} />
                </div>
                <div className="w-[25%]">
                    <h2 className="text-xl py-7">{language && language["course_summary"]}</h2>
                    {lessonsData && lessonsData.map((item, index) => <a href={"#lesson-" + item.id} key={item.id} className="flex justify-between cursor-pointer w-full">
                        <div className="relative group hover:border-none">
                            <div className={`inline-block text-xs p-2 w-7 h-7 text-center rounded-full ${index == 0 ? 'bg-amber-500' : 'bg-color'}`}>{item.level}</div>
                            <p className="inline-block py-4 mx-3">{item.title}</p>
                            <span className={`absolute bottom-0 ${language && language['dir'] == 'ltr' ? 'left-0' : 'right-0'} h-0.5 bg-[#fa9600] w-0 transition-all duration-300 group-hover:w-full`}></span>
                        </div>
                        {index == 0 && <FontAwesomeIcon icon={faCheck} className="text-amber-500 p-4" />}
                        {index != 0 && <FontAwesomeIcon icon={faMinus} className="text-amber-500 p-4" />}
                    </a>)}
                </div>
            </div>}
            {tabs == 'overview' && <TOverview data={data} language={language} />}
            {tabs == 'comments' && <TComments data={data} language={language} />}
            {tabs == 'resources' && <TResources data={data} resources_list={resources} />}
            <button onClick={handleCourseCertificateDownload} className="block rounded pointer my-3 p-5 py-2 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 mx-auto font-bold cursor-pointer">{language && language['download_cerificate']}</button>
        </ThemeContainer>
    )
}
