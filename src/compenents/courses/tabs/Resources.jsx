import React from 'react'
import { Link } from 'react-router-dom'

export default function Resources({ resources_list }) {
  return (
    <div>
      <div className="flex border-b border-gray-200">
          <Link to="/new-resource" className="block rounded pointer my-3 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 m-2">Upload New</Link>
      </div>
      {resources_list && resources_list.map(item => <div className="border-b border-b-gray-200 p-4 ">
        <h2 className="font-bold text-xl py-2">{item.title}</h2>
        <p>{item.description}</p>
        <div className="flex">
          <button className="block rounded pointer my-3 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400" >Delete</button>
          <a href={item.file} download={true} className='block rounded pointer my-3 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 mx-3'>Download</a>
        </div>
      </div>)}
    </div>
  )
}
