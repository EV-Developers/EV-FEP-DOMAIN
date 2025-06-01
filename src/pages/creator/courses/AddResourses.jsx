import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { Link, useParams } from 'react-router-dom';

import { translation } from '../../../config/translations';
import ThemeContainer from '../../../compenents/parts/ThemeContainer';
import api from '../../../config/api';

export default function AddResourses() {
  const { courseId } = useParams();
  const [language, setLanguage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

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


  return (
    <ThemeContainer>
      <div className="bg-white mx-auto m-3 rounded-xl p-5 w-[75%]">
        <div className="flex">
          <Link to={"/courses/"}>
            <img src="/logo/course-logo.png" alt="" className="w-10 h-10 my-1" />
          </Link>
          <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
          <Link className="m-2 my-3 hover:text-[#4b4b4b]" to={"/courses/" + courseId}>{language && language["course"]} / {language && language["resources"]}</Link>
          <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
          <p className="m-3 my-3 text-color">{language && language["new"]}</p>
        </div>
        <hr className="text-gray-200 my-5" />

        <label htmlFor="sectionTitle">
          <p id="sectionTitle" className="my-3 font-bold">{language && language["important_resources"]}</p>
          <input type="text" id="sectionTitle" placeholder={language && language["write_here"]} className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400" />
        </label>

        <label htmlFor="uploadImage" className="p-14 h-[300px] w-full flex items-center justify-center my-4 rounded-xl bg-color border border-color">
          <div className="text-center">
            <FontAwesomeIcon icon={faArrowUp} className="text-3xl rounded-xl bg-gradient-to-b from-[#fa9600] to-[#ffe696] p-3 px-4 text-gray-100" />
            <p className="text-l font-bold">{language && language["upload"]} PNG/JPG</p>
            <p className="text-sm text-gray-400">{language && language["drag_drop"]}</p>
          </div>
          <input type="file" accept="image/jpg,image/png" id="uploadImage" name="uploadImage" className="hidden" />
        </label>
        <button className="block rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 mx-auto">{loading && <img className="animate-spin w-4 h-4 m-1" src="/loading_white.png" />} <span>{language && language["add"]}</span></button>
      </div>
    </ThemeContainer>
  )
}
