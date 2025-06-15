import React from 'react'
import { Link } from 'react-router-dom'
import { faThumbsUp, faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function CourseItem({ language, link, item, continue_course, creator }) {
    return (<Link to={link + item.id} key={"item-" + item.id} className="flex flex-col justify-between 2xl:w-[15%] md:w-[23%] bg-white p-0 mx-2 my-3 hover:scale-102 font-bold h-[470px] rounded-xl shadow group">
        <div>
            <div className="relative p-0 mx-0 w-full flex items-center justify-center">
                <img src="/play_btn.png" alt="" className="block mx-auto absolute z-10 w-12  group-hover:scale-95 transition-all" />
                <img src={item.featured_image_url ? item.featured_image_url : '/data/sale-5.webp'} className="w-full h-[190px] object-cover rounded-t-xl" />
            </div>
            <h3 className="text-xs mx-2 my-4 font-bold">{item.title}</h3>
            <div className="h-[70px] text-color">
                <p className="text-xs mx-2 my-2 font-light">{language && language['course_by']} {item.title}</p>
                <p className="text-xs mx-2 font-light">{item.description}</p>
            </div>
            <p className="text-xs font-light my-4 mx-2 text-color">
                <span className="">
                    <FontAwesomeIcon icon={faUser} className="text-xs font-light" /> 122.6
                </span>
                <span className="mx-4">
                    <FontAwesomeIcon icon={faThumbsUp} className="text-xs font-light" /> 90%
                </span>
            </p>
        </div>
        <div>
            <p className="text-[#fa9600] mx-2 py-3 text-xs font-bold">{language && language['best_growth']}: 96%</p>
            {creator && <div className="p-2"></div>}
            {!creator && <div className="rounded m-3 pointer py-3 px-5 bg-[#fa9600] text-l text-center text-white">{language && (continue_course ? language["continue"] : language["start"])}</div>}
        </div>
    </Link>)
}
