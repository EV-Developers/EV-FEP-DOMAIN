import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'

export default function CourseDetails({ categories, handleSteps, title, setTitle, categoryId, setCategoryId }) {
    const [show, setShow] = useState(false);

    return (
        <div>
            <label htmlFor="sectionTitle">
                <p id="sectionTitle" className="my-3 font-bold">Add New Course</p>
                <input type="text" id="sectionTitle" placeholder="Write here" className="py-2 px-14 rounded shadow-sm bg-color w-full placeholder-gray-400" value={title} onChange={val => setTitle(val.target.value)} />
            </label>
            <p className="my-3 font-bold">Choose Category</p>
            <div className="relative">
                <button className="flex justify-between font-bold bg-color py-2 px-5 mx-3 rounded-xl text-sm" onClick={() => setShow(!show)}><span className="mr-4">Category</span> <FontAwesomeIcon icon={faCaretDown} /></button>
                {show && <div className="bg-color block rounded-xl w-[25%] p-3 absolute z-10">
                    {categories && categories.map(item => <button onClick={() => setCategoryId(item.id)} key={item.id} className={`block text-left font-bold rounded-xl w-full mb-3 p-3 ${categoryId == item.id ? 'bg-gradient-to-br from-[#fa9600] to-[#ffe696] hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400' : 'bg-white'}`}>
                        {item.name}
                    </button>)}
                </div>}
            </div>

            <div className="flex flex-row justify-between mt-7">
                <button className="bg-color pointer rounded m-2 py-1 px-5 text-sm">Previous</button>
                <button onClick={() => handleSteps('next')} className="rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400">Continue</button>
            </div>
        </div>
    )
}
