import React from 'react'
import { Link } from 'react-router-dom'
import { faThumbsUp, faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function CourseItem({ language, link, item, continue_course, creator }) {
    const truncateText = (text, maxLength) => {
        if (!text) return '';
        return text.length > maxLength ? text.slice(0, maxLength) + '…' : text;
    };

    return (<Link to={link + item.id} key={"item-" + item.id} className="flex flex-col justify-between 2xl:w-[15%] md:w-[23%] bg-white p-0 mx-2 my-3 hover:scale-102 font-bold rounded-xl shadow group">
        <div>
            <div className="relative p-0 mx-0 w-full flex items-center justify-center">
                {!creator && <div id="progress" style={{ width: (parseInt(item.progressPercentage) - 0.7) + '%' }} className="text-amber-600 bg-amber-500 absolute bottom-0 z-20 mx-0 left-0 h-2 px-0 transition-all blur-xs pointer-events-none cursor-pointer" ></div>}
                {!creator && <div style={{ width: (parseInt(item.progressPercentage) - 0.7) + '%' }} className="text-amber-600 bg-amber-500 absolute bottom-0 z-20 mx-0 left-0 h-2 px-0 transition-all pointer-events-none cursor-pointer" ></div>}
                <img src="/play_btn.png" alt="" className="block mx-auto absolute z-10 w-12  group-hover:scale-95 transition-all" />
                <img src={item.featured_image_url ? item.featured_image_url : '/data/sale-5.webp'} className="w-full h-[170px] object-contain rounded-t-xl" />
            </div>
            <h3 className="text-xs mx-2 my-4 font-bold">{item.title}</h3>
            <div className="h-[70px] text-color">
                <p className="text-xs mx-2 my-2 font-light">{language && language['course_by']} {item.title}</p>
                <p className="text-xs mx-2 font-light">{truncateText(item.description, 40)}</p>
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
            {!creator && <div className="rounded m-3 pointer py-3 px-5 bg-[#fa9600] text-l text-center text-white">{language && (item.progressPercentage == 0 ? language["start"] : item.progressPercentage == 100 ? language['review'] : language["continue"])}</div>}
        </div>
    </Link>)
}
