import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <nav className="ml-7">
        <Link to="/" className="bg-white p-3 mb-3 block rounded-xl mx-2 mt-7 hover:bg-gradient-to-br hover:from-[#fa9600] hover:to-[#ffe696]">Home</Link>   
        <Link to="/courses" className="bg-white p-3 mb-3 block rounded-xl mx-2 hover:bg-gradient-to-br hover:from-[#fa9600] hover:to-[#ffe696]">Courses</Link>   
        <Link to="/categories" className="bg-white p-3 mb-3 block rounded-xl mx-2 hover:bg-gradient-to-br hover:from-[#fa9600] hover:to-[#ffe696]">Categories</Link>   
        <Link to="/materials" className="bg-white p-3 mb-3 block rounded-xl mx-2 hover:bg-gradient-to-br hover:from-[#fa9600] hover:to-[#ffe696]">Materials</Link>   
    </nav>
  )
}
