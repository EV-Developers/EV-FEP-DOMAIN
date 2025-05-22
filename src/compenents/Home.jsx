import React from 'react'
import ThemeContainer from './parts/ThemeContainer';
import { Link } from 'react-router-dom';
import Loading from './parts/Loading';

export default function Home() {
    const data = {
        labels: ['', '', ''],
        datasets: [
            {
                label: "Report",
                backgroundColor: "#fff",
                borderColor: "#ccc",
                borderWidth: 2,
                data: [1, 2, 3],
                backgroundColor: ["#FD9800", "orange", "#FFEFB4", "orange"],
                borderColor: ["#FD9800", "orange", "#FFEFB4", "orange"],
                borderWidth: 1,
            },
        ],
    };

    return (<>
        {/* <Loading /> */}

        <ThemeContainer>
            <div className="w-[75%] block mx-auto">
                <h2 className="my-5 text-2xl">Hello "User", to dashboard.</h2>
                <div className="flex">
                    <div className='block w-[45%] rounded-xl bg-white p-5 my-14'>
                        <h2>Courses Recently Added</h2>
                        <div>
                            <Link to="/courses/1" className="hover:bg-gray-100 hover:border hover:border-gray-200 rounded-xl block p-3">Item</Link>
                            <Link to="/courses/1" className="hover:bg-gray-100 hover:border hover:border-gray-200 rounded-xl block p-3">Item</Link>
                            <Link to="/courses/1" className="hover:bg-gray-100 hover:border hover:border-gray-200 rounded-xl block p-3">Item</Link>
                            <Link to="/courses/1" className="hover:bg-gray-100 hover:border hover:border-gray-200 rounded-xl block p-3">Item</Link>
                            <Link to="/courses/1" className="hover:bg-gray-100 hover:border hover:border-gray-200 rounded-xl block p-3">Item</Link>
                        </div>
                    </div>
                    <div className='block w-[45%] rounded-xl bg-white p-5 m-5 my-14'>
                        <h2>Materials Recently Added</h2>
                        <div>
                            <Link to="/materials/1" className="hover:bg-gray-100 hover:border hover:border-gray-200 rounded-xl block p-3">Item</Link>
                            <Link to="/materials/1" className="hover:bg-gray-100 hover:border hover:border-gray-200 rounded-xl block p-3">Item</Link>
                            <Link to="/materials/1" className="hover:bg-gray-100 hover:border hover:border-gray-200 rounded-xl block p-3">Item</Link>
                            <Link to="/materials/1" className="hover:bg-gray-100 hover:border hover:border-gray-200 rounded-xl block p-3">Item</Link>
                            <Link to="/materials/1" className="hover:bg-gray-100 hover:border hover:border-gray-200 rounded-xl block p-3">Item</Link>
                        </div>
                    </div>
                </div>
            </div>
        </ThemeContainer></>)
}
