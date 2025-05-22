import React from 'react'
import { Link } from 'react-router-dom'
import Lesson from '../Lesson'
import Assesment from '../Assesment'

export default function Lessons({ lessons, assesments, courseId }) {
    return (<div>
        <div className="flex justify-between mt-3">
            <Link to={"/add-lessons/"+courseId} className="block rounded pointer m-1 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 transition-all">New Lesson</Link>
            {assesments && assesments.length == 0 && <Link to={"/add-assesment/"+courseId} className="block rounded pointer m-1 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 transition-all">New Assesment</Link>}
        </div>
        <p className="text-2xl m-4">Course Lessons:</p>
        {lessons && lessons.map(item => <Lesson courseId={courseId} item={item} key={item.id} />)}
        {assesments && assesments.map(item => <Assesment item={item} key={item.id} />)}
    </div>)
}
