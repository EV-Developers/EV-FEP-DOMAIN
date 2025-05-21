import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import api from '../../config/api';

export default function Assesment({ item }) {
    const [show, setShow] = React.useState(false);

    const handleDelete = async (item_id, coursesId) => {
        const r = window.confirm("Are you sure?");

        if(r){
            const response = await api.delete('/assignments/'+item_id);
            console.log(response);
            if (response.status == 200) {
                navigate("/courses/"+coursesId)
            } else {
                console.log('error');
            }
        }
    }

    return (
        <div>
            <div className="bg-white p-5 m-4 shadow-sm rounded-xl cursor-pointer transition-all">
                <button className="flex justify-between transition-all cursor-pointer w-full pb-3" onClick={() => setShow(!show)}>
                    <p className="text-l font-bold">{item.title}</p>
                    <FontAwesomeIcon icon={!show ? faCaretDown : faCaretUp} className="text-xl" />
                </button>
                {show && <div className="transition-all">
                    <div className="p-2">
                        <img src="/data/vid-1.webp" alt="" />
                    </div>
                    <p className="p-2">Assesment Type: {item.assesment_type}</p>
                    <div className="flex">
                        <button onClick={() => handleDelete(item.id, item.course_id)} className="block rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400  ">Delete</button>
                        <Link to={"/edit-assesment/"+item.id} className="block rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400  ">Edit</Link>
                    </div>
                </div>}
            </div>

        </div>
    )
}
