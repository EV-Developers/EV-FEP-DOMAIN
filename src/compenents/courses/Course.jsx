import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ThemeContainer from '../parts/ThemeContainer';
import Lessons from './tabs/Lessons';
import Overview from './tabs/Overview';
import Comments from './tabs/Comments';
import Resources from './tabs/Resources';
import api from '../../config/api';

export default function Course() {
    const [tabs, setTabs] = React.useState('content');
    const [data, setData] = React.useState(null);
    const [sectionsData, setSectionsData] = React.useState(null);
    const [assestmentsData, setAssestmentsData] = React.useState(null);
    const { coursesId } = useParams();
    const navigate = useNavigate();

    const sections = [
        {
            id: '3',
            title: 'section 1',
            video: '',
            cover: 'vid-3.webp',
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora molestiae corrupti, mollitia facere reiciendis ipsa doloremque id veniam laudantium fuga ducimus repudiandae quibusdam voluptatum, sapiente excepturi et modi! Non, eius?"
        }
    ]

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
        const tmpData = await api.get('/courses');
        const tmpLessonsData = await api.get('/lessons');
        const tmpAssestmentsData = await api.get('/assignments');
        if (tmpData.status == 200) {
            console.log(tmpData.data.data);
        }

        if (tmpLessonsData.status == 200) {
            setSectionsData(tmpLessonsData.data)
            console.log(tmpLessonsData.data);
        }

        if (tmpAssestmentsData.status == 200) {
            
            setAssestmentsData(tmpAssestmentsData.data)
        }
    }

    const handleDelete = async () => {
        const r = window.confirm("Are you sure?");

        if(r){
            const response = await api.delete('/courses/'+coursesId);
            console.log(response);
            if (response.status == 200) {
                navigate("/courses")
            } else {
                console.log('error');
            }
        }
    }

    return (
        <ThemeContainer>
            <h2 className="mt-4 text-3xl p-2 font-bold">Arduino pack: Design, Manage and Launch Arduino</h2>
            <p className="text-color p-2">A course by <strong className="text-bold primary-text">mohammed razi</strong>, electronic trainer and developer</p>
            <div className="flex justify-between">
                <div></div>
                <div className="flex">
                    <button onClick={handleDelete} className="block rounded py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 mx-2 ">Delete</button>
                    <Link to={'/courses/edit/' + coursesId} className="block rounded py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 mx-2 ">Edit</Link>
                </div>
            </div>
            <div className="flex mt-4 border-b-1 border-b-[#cccccc] py-1 p-4">
                <button className={`mx-2 cursor-pointer ${tabs == 'content' && 'border-b-2 border-b-[#fa9600]'} relative group hover:border-none`} onClick={() => setTabs('content')}>Content
                <span className="absolute bottom-0 left-0 h-0.5 bg-[#fa9600] w-0 transition-all duration-300 group-hover:w-full"></span>
                </button>
                <button className={`mx-2 cursor-pointer ${tabs == 'overview' && 'border-b-2 border-b-[#fa9600]'} relative group hover:border-none`} onClick={() => setTabs('overview')}>Overview
                <span className="absolute bottom-0 left-0 h-0.5 bg-[#fa9600] w-0 transition-all duration-300 group-hover:w-full"></span></button>
                <button className={`mx-2 cursor-pointer ${tabs == 'comments' && 'border-b-2 border-b-[#fa9600]'} relative group hover:border-none`} onClick={() => setTabs('comments')}>Comments
                <span className="absolute bottom-0 left-0 h-0.5 bg-[#fa9600] w-0 transition-all duration-300 group-hover:w-full"></span></button>
                <button className={`mx-2 cursor-pointer ${tabs == 'resources' && 'border-b-2 border-b-[#fa9600]'} relative group hover:border-none`} onClick={() => setTabs('resources')}>Resources
                <span className="absolute bottom-0 left-0 h-0.5 bg-[#fa9600] w-0 transition-all duration-300 group-hover:w-full"></span></button>
            </div>

            {tabs == 'content' && <Lessons courseId={coursesId} sections={sections} assesments={assesments} />}
            {tabs == 'overview' && <Overview />}
            {tabs == 'comments' && <Comments />}
            {tabs == 'resources' && <Resources resources_list={resources_list} />}
        </ThemeContainer>
    )
}
