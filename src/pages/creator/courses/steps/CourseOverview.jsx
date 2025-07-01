import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'

import { translation } from '../../../../config/translations';

export default function CourseOverview({ uploadProgress, handleSteps, description, setDescription, featuredImage, setFeaturedImage, handleCreateCourse, msg, loading }) {
  const [language, setLanguage] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const ref = React.useRef();

  React.useEffect(() => {
    const lang = window.localStorage.getItem("language");

    if (lang && lang != '' && lang != null) {
      if (lang == 'english') {
        setLanguage(translation[0]);
        window.document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');
      } else {
        setLanguage(translation[1]);
        window.document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
      }
    } else {
      setLanguage(translation[0]);
      window.localStorage.setItem("language", 'english');
      window.document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');
    }

  }, []);

  React.useEffect(() => {
    if (featuredImage && featuredImage != '') {
      if (typeof featuredImage == Array && featuredImage[0]) {
        const imgUrl = window.URL.createObjectURL(featuredImage[0]);
        setImage(imgUrl);
      } else {
        setImage(featuredImage);
      }
    }
  }, []);

  const handleSetImage = (e) => {
    const imgUrl = window.URL.createObjectURL(e.target.files[0]);
    setImage(imgUrl);
    setFeaturedImage(e.target.files);
  }

  return (
    <div>
      <label htmlFor="courseOverview">
        <p className="my-3 font-bold">{language && language["course_overview"]}</p>
        <textarea onChange={val => setDescription(val.target.value)} id="courseOverview" name="course-overview" className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400 inset-shadow-sm inset-gray-indigo-800" placeholder={language && language["write_here"]} value={description} ></textarea>
      </label>

      <div className="block relative">
        <div
          className="inset-0 rounded-xl p-[2px] h-[300px] my-4"
          style={{
            background: `conic-gradient(#fa9600 ${uploadProgress}%, #ccc ${uploadProgress}% 100%)`,
          }}
        >
          <label htmlFor="uploadImage" className="h-full p-14 w-full flex items-center justify-center rounded-xl border border-gray-300 inset-shadow-sm inset-gray-indigo-800 bg-color bg-cover bg-no-repeat" ref={ref}>
            {image && <img src={image} className="flex m-auto w-[25%] align-middle self-center " />}
            {!image && <div className="text-center">
              <FontAwesomeIcon icon={faArrowUp} className="text-3xl rounded-xl bg-gradient-to-b from-[#fa9600] to-[#ffe696] p-3 px-4 text-gray-100" />
              <p className="text-l font-bold">{language && language["upload"]} PNG/JPG</p>
              <p className="text-sm text-gray-400">{language && language["drag_drop"]}</p>
            </div>}
            <input type="file" accept="image/jpg,image/png,image/jepg,image/webp" id="uploadImage" name="uploadImage" className="hidden" onChange={handleSetImage} />
          </label>
        </div>
      </div>

      {msg && <div className="p-4 m-2">
        {msg}
      </div>}

      <div className="flex flex-row justify-between">
        <button onClick={() => handleSteps('prev')} className="rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400">{language && language["previous"]}</button>
        <button onClick={handleCreateCourse} className="rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 flex">{loading && <img className="animate-spin w-4 h-4 m-1" src="/loading_white.png" />} <span>{language && language["update"]}</span></button>
      </div>
    </div>
  )
}
