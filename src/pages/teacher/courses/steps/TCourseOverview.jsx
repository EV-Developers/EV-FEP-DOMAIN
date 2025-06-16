import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'

import { translation } from '../../../../config/translations';

export default function TCourseOverview({ handleSteps, description, setDescription, featuredImage, setFeaturedImage, handleCreateCourse, msg, loading }) {
  const ref = React.useRef();
  const [language, setLanguage] = useState(null);

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
    if (featuredImage && featuredImage[0] && featuredImage != '') {
      /**
       * @constant {string} imgUrl create a URL form the HTMLElement image file.
       */
      try {
        const imgUrl = window.URL.createObjectURL(featuredImage[0]);
        ref.current.style.backgroundSize = 'contain';
        ref.current.style.background = `url(${imgUrl}) no-repeat`;
      } catch (error) {
        //console.log(error);
      }

    }
  })

  const handleSetImage = (e) => {
    /**
    * @constant {string} imgUrl create a URL form the HTMLElement image file.
    */

    if (e.target && e.target.files.length != 0) {
      const imgUrl = window.URL.createObjectURL(e.target.files[0]);
      ref.current.style.backgroundSize = 'contain';
      ref.current.style.background = `url(${imgUrl}) no-repeat`;

      setFeaturedImage(e.target.files);
    }
  }

  return (
    <div>
      <label htmlFor="courseOverview">
        <p className="my-3 font-bold">{language && language["course_overview"]}</p>
        <textarea onChange={val => setDescription(val.target.value)} id="courseOverview" name="course-overview" className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400 " placeholder={language && language["write_here"]} value={description} ></textarea>
      </label>

      <label htmlFor="uploadImage" className="p-14 h-[300px] w-full flex items-center justify-center my-4 rounded-xl border border-color bg-color bg-cover bg-no-repeat" ref={ref}>
        <div className="text-center">
          <FontAwesomeIcon icon={faArrowUp} className="text-3xl rounded-xl bg-gradient-to-b from-[#fa9600] to-[#ffe696] p-3 px-4 text-gray-100" />
          <p className="text-l font-bold">{language && language["upload"]} PNG/JPG</p>
          <p className="text-sm text-gray-400">{language && language["drag_drop"]}</p>
        </div>
        <input type="file" accept="image/jpg,image/png,image/jepg,image/webp" id="uploadImage" name="uploadImage" className="hidden" onChange={handleSetImage} />
      </label>

      {msg && <div className="p-4 m-2">
        {msg}
      </div>}

      <div className="flex flex-row justify-between">
        <button onClick={() => handleSteps('prev')} className="rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400">{language && language["previous"]}</button>
        <button onClick={handleCreateCourse} className="rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400">{loading && <img className="animate-spin w-4 h-4 m-1" src="/loading_white.png" />} <span>{language && language["add"]}</span></button>
      </div>
    </div>
  )
}
