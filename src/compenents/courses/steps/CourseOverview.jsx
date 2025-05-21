import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'

export default function CourseOverview({ handleSteps, description, setDescription, featuredImage, setFeaturedImage, handleCreateCourse, msg }) {
  const ref = React.useRef();

  React.useEffect(() => {
    if(featuredImage && featuredImage != ''){
      const imgUrl = window.URL.createObjectURL(featuredImage);
      ref.current.style.backgroundSize = 'contain';
      ref.current.style.background = `url(${imgUrl}) no-repeat`;

    }
  })

  const handleSetImage = (e) => {
    const imgUrl = window.URL.createObjectURL(e.target.files[0]);
    ref.current.style.backgroundSize = 'contain';
    ref.current.style.background = `url(${imgUrl}) no-repeat`;

    setFeaturedImage(e.target.files[0])
  }

  return (
    <div>
      <label htmlFor="courseOverview">
        <p className="my-3 font-bold">Course Overview</p>
        <textarea onChange={val => setDescription(val.target.value)} id="courseOverview" name="course-overview" className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400 " placeholder="Course Overview" value={description} ></textarea>
      </label>

      <label htmlFor="uploadImage" className="p-14 h-[300px] w-full flex items-center justify-center my-4 rounded-xl border border-color bg-color bg-cover bg-no-repeat" ref={ref}>
        <div className="text-center">
          <FontAwesomeIcon icon={faArrowUp} className="text-3xl rounded-xl bg-gradient-to-b from-[#fa9600] to-[#ffe696] p-3 px-4 text-gray-100" />
          <p className="text-l font-bold">Upload PNG/JPG</p>
          <p className="text-sm text-gray-400">Drag and drop</p>
        </div>
        <input type="file" accept="image/jpg,image/png,image/jepg,image/webp" id="uploadImage" name="uploadImage" className="hidden" onChange={handleSetImage} />
      </label>

      {msg && <div className="p-4 m-2">
        {msg}
      </div>}

      <div className="flex flex-row justify-between">
        <button onClick={() => handleSteps('prev')} className="rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400">Previous</button>
        <button onClick={handleCreateCourse} className="rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400">Add</button>
      </div>
    </div>
  )
}
