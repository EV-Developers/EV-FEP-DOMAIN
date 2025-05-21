import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Header from './parts/Header'
import Sidebar from './parts/Sidebar'
import { faEnvelope, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import Footer from './parts/Footer'
import ThemeContainer from './parts/ThemeContainer'

export default function AddMaterial() {
  return (
    <ThemeContainer>
      <div className="w-[75%] block mx-auto rounded-xl m-5 bg-white p-5">
        <label htmlFor="courseOverview">
          <p className="my-3 font-bold">Add your material title</p>
          <textarea id="courseOverview" name="course-overview" className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400 " placeholder="Write here" ></textarea>
        </label>
        <label htmlFor="uploadImage" className="p-14 h-[300px] w-full flex items-center justify-center my-4 rounded-xl bg-color border border-color">
          <div className="text-center">
            <FontAwesomeIcon icon={faArrowUp} className="text-3xl rounded-xl bg-gradient-to-b from-[#fa9600] to-[#ffe696] p-3 px-4 text-gray-100" />
            <p className="text-l font-bold">Upload Material</p>
            <p className="text-sm text-gray-400">Drag and drop</p>
          </div>
          <input type="file" accept="image/jpg,image/png" id="file" name="file" className="hidden " />
        </label>
        <button className="block rounded text-sm pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 mx-auto">Add</button>
      </div>
    </ThemeContainer>
  )
}
