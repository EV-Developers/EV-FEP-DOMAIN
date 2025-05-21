import { faBell, faEnvelope, faPhone, faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../config/api';

export default function Header() {
    const navigate = useNavigate();
    const ref = useRef();

    const handleSearch = () => {
        if (ref.current.value != "") {
            navigate('/search/' + ref.current.value)
        }
    }

    React.useEffect(() => {
        const listen = document.getElementById("query").addEventListener('keydown', (ev) => {
            if (ev.key == 'Enter') {
                handleSearch()
            }
        });

        //return listen.removeEventListener()
    }, [ref])

    const handleLogout = async () => {
        try {
            const response = await api.post("/logout");

            if (response.status == 200 || response.status == 201) {
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (<div>
        <div className="bg-gradient-to-br from-[#fa9600] to-[#ffe696] hover:bg-gradient-to-br p-2 m-0 flex text-sm rounded-bl-2xl  rounded-br-2xl">
            <p className='mx-2'><FontAwesomeIcon icon={faEnvelope} className="mx-2 text-sm" /> <span>evcentersinfo@gmail.com</span></p>
            <p className='mx-2 text-sm'>
                <FontAwesomeIcon icon={faPhone} className="xm-2" /> <span>123456789</span>
            </p>
        </div>
        <div className="flex justify-between ml-10">
            <div className="flex my-2">
                <div className="border-r border-r-gray-400 w-[9%]">
                    <img src="/logo/Logo-bp.png" className="w-full" alt="" />
                </div>
                <div className="w-[25%]">
                    <img src="/logo/Logo.png" className="w-full border-r border-r-gray-400" alt="" />
                </div>
                <div>
                    <Link to="/explore" className="block p-3 text-[#fa9600] font-bold">Explore</Link>
                </div>
            </div>
            <div className="flex">
                <nav className="flex mr-14">
                    <Link to="/" className="block p-4 hover:text-[#fa9600] font-bold">Home</Link>
                    <Link to="/courses" className="block p-4 hover:text-[#fa9600] font-bold">Courses</Link>
                    <Link to="/categories" className="block p-4 hover:text-[#fa9600] font-bold">Categories</Link>
                    <Link to="/materials" className="block p-4 hover:text-[#fa9600] font-bold">Materials</Link>
                </nav>
                <div className="relative m-0">
                    <button onClick={handleSearch} className="absolute z-10 right-2 m-4">
                        <FontAwesomeIcon icon={faSearch} className="text-xl" />
                    </button>
                    <input type="text" placeholder="search" id="query" name="query" className="rounded-2xl py-2 my-2 p-4 mx-3 bg-white text-sm" ref={ref} />
                </div>
                <div className="group">
                    <button className="rounded-full mx-2 my-2 w-10 h-10 cursor-pointer  group-hover:bg-white">
                        <FontAwesomeIcon icon={faBell} className="text-xl primary-text" />
                    </button>
                    <div className="hidden group-hover:block bg-white rounded-xl w-[15%] p-2 absolute right-0 z-10 h-[300px] mx-5 shadow-sm">
                        <div className="flex items-center justify-center h-[300px]">
                            <p className="text-xs text-color text-center">No notifications avaiable..</p>
                        </div>
                    </div>
                </div>
                <div className="group">
                    <button className="rounded-full mx-2 my-2 w-10 h-10 bg-primary cursor-pointer">
                        <FontAwesomeIcon icon={faUser} className="text-xl text-white" />
                    </button>
                    <div className="hidden group-hover:block bg-white rounded-xl w-[15%] p-2 absolute right-0 z-10 mx-3 shadow-sm">
                        <a href="/profile" className="block text-left font-bold rounded-xl w-full mb-2 p-2 bg-gradient-to-br hover:from-[#fa9600] hover:to-[#ffe696] text-sm">
                            Profile
                        </a>
                        <button onClick={handleLogout} className="block text-left font-bold rounded-xl w-full mb-2 p-2 bg-gradient-to-br hover:from-[#fa9600] hover:to-[#ffe696] text-sm cursor-pointer">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}
