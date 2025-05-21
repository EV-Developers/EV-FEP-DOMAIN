import React from 'react'
import ThemeContainer from './parts/ThemeContainer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'

export default function AddResourses() {
  return (
    <ThemeContainer>
      <div className="bg-white mx-auto m-3 rounded-xl p-5 w-[75%]">
        <label htmlFor="sectionTitle">
          <p id="sectionTitle" className="my-3 font-bold">Important Resources</p>
          <input type="text" id="sectionTitle" placeholder="Write something or add a link" className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400" />
        </label>

        <label htmlFor="uploadImage" className="p-14 h-[300px] w-full flex items-center justify-center my-4 rounded-xl bg-color border border-color">
          <div className="text-center">
            <FontAwesomeIcon icon={faArrowUp} className="text-3xl rounded-xl bg-gradient-to-b from-[#fa9600] to-[#ffe696] p-3 px-4 text-gray-100" />
            <p className="text-l font-bold">Upload PNG/JPG</p>
            <p className="text-sm text-gray-400">Drag and drop</p>
          </div>
          <input type="file" accept="image/jpg,image/png" id="uploadImage" name="uploadImage" className="hidden" />
        </label>
        <button className="block rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 mx-auto">Add</button>
      </div>
    </ThemeContainer>
  )
}
