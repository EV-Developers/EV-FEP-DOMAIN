import React, { useEffect } from 'react'
import Header from './parts/Header'
import Footer from './parts/Footer'
import Sidebar from './parts/Sidebar'
import { Link } from 'react-router-dom'
import api from '../config/api'
import ThemeContainer from './parts/ThemeContainer'

export default function Materials() {
    const list = [
        {
            id: 'mat-1',
            title: 'Material One'
        },
        {
            id: 'mat-2',
            title: 'Material Two'
        }
    ]

    const handleSelectAll = (e) => {
        const items = document.getElementsByClassName('items');
        console.log(e.target.checked);
        for (let index = 0; index < items.length; index++) {
            const element = items[index];

            element.checked = e.target.checked
        }
    }

    return (
        <ThemeContainer>
            <div className="block mx-auto w-[75%]">
                <div className="flex justify-between">
                    <div></div>
                    <Link to="/add-material" className="block rounded pointer m-4 py-3 px-10 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400  ">Create</Link>
                </div>

                {list && list.map(item => <Link to={'/materials/' + item.id} className='block hover:bg-gray-100 hover:border hover:border-gray-200 rounded-xl bg-white p-5 my-2 text-sm'>{item.title}</Link>)}
            </div>
        </ThemeContainer>
    )
}
