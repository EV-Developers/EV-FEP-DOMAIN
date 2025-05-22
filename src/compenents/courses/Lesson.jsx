import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import api from '../../config/api';

export default function Lesson({ courseId, item }) {
    const [show, setShow] = React.useState(false);
    const tmp_vid_url = "https://www.w3schools.com/html/mov_bbb.mp4";

    const handleDeleteLesson = async (lessonId) => {
        const r = window.confirm("Are you sure?");

        if(r){
            const response = await api.delete('/lessons/'+lessonId);
            console.log(response);
            if (response.status == 200) {
                window.location.reload()
            } else {
                console.log('error');
            }
        }
    }

    return (<div id={"lesson-"+item.id} className="bg-white p-5 m-4 shadow-sm rounded-xl cursor-pointer transition-all">
        <button className="flex justify-between transition-all cursor-pointer w-full pb-3" onClick={() => setShow(!show)}>
            <p className="text-l font-bold">{item.title}</p>
            <FontAwesomeIcon icon={!show ? faCaretDown : faCaretUp} className="text-xl" />
        </button>
        {show && <div className="transition-all">
            <video width="520" height="440" className="overflow-x-hidden rounded-2xl" poster="/data/vid-1.webp" controls>
                <source src={tmp_vid_url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <p className="p-2">{item.desc}</p>
            <div className="flex">
                <Link to={"/lessons/" + item.id} className="block rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400  ">Edit</Link>
                <button onClick={() => handleDeleteLesson(item.id)} className="block rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400  ">Delete</button>
                <Link to={"/lessons/quizzes/"+courseId+"/" + item.id} className="block rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400  ">Lesson Quizzes</Link>
            </div>
        </div>}
    </div>)
}
