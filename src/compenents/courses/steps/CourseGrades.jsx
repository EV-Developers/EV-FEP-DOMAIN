import React, { useState } from 'react'

export default function CourseGrades({ handleSteps, level, setLevel, levelNewName, setLevelNewName }) {

    //
    const levels_list = [
        {
            id: '0',
            title: 'None',
            grade: "Grade0",
            level: '0'
        },
        {
            id: '1',
            title: 'SCratch',
            grade: "GRADE1",
            level: '1'
        },
        {
            id: '2',
            title: 'Arduino',
            grade: "GRADE2",
            level: '2'
        },
        {
            id: '3',
            title: 'Microbit',
            grade: "GRADE3",
            level: '3'
        },
        {
            id: '4',
            title: 'Electronics',
            grade: "GRADE4",
            level: '4'
        },
    ]
    return (
        <div>
            {levels_list && levels_list.map(item => <button key={item.id} className={`py-5 px-14 rounded-xl shadow-sm w-full placeholder-gray-400 flex justify-between my-4 ${(level == item.level && levelNewName == '') ? 'bg-[#ffe696] border border-amber-300' : 'bg-color'}`} onClick={() => setLevel(item.level)}>
                <p>{item.title}</p>
                <p>{item.grade}</p>
            </button>)}

            <label htmlFor="courseOverview" className="p-4">
                <p className="my-3 font-bold">New Level</p>
                <textarea value={levelNewName} onChange={val => setLevelNewName(val.target.value)} id="courseOverview" name="course-overview" className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400 " placeholder="Grade Name" ></textarea>
            </label>

            <div className="flex flex-row justify-between mt-14">
                <button onClick={() => handleSteps('prev')} className="rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400">Previous</button>
                <button onClick={() => handleSteps('next')} className="rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400">Continue</button>
            </div>
        </div>
    )
}
