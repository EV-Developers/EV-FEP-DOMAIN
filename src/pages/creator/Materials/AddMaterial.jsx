import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'

import api from '../../../config/api';
import { translation } from '../../../config/translations';
import ThemeContainer from '../../../compenents/parts/ThemeContainer';

export default function AddMaterial() {
  const [language, setLanguage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [fileName, setFileName] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const navigate = useNavigate();

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

  const handleSetFile = (e) => {
    if (e.target.files[0]) {
      setFileName(e.target.files[0].name)
    }
  }

  /**
   * handle edit and update materials
   * @param {Event} e form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    if (e.target.description.value != "" && e.target.title.value != "" && e.target.file.files.length != 0) {      
      const formData = new FormData();
      formData.append("title", e.target.title.value);
      formData.append("description", e.target.description.value);
      formData.append("file", e.target.file.files[0]);
      formData.append("level", "1");

      console.log(formData.get("file"));
      

      try {
        const response = await api.post("/materials", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });

        if (response.status == 200) {
          setLoading(false);
          navigate('/materials');
        } else {
          setLoading(false);
          setMsg(language["error_msg"]);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    } else {
      setLoading(false);
      setMsg(language["error_validation_msg"])
    }

  }

  return (
    <ThemeContainer>
      <div className="w-[75%] block mx-auto rounded-xl m-5 bg-white p-5">
        <div className="flex">
          <Link to={"/materials"}>
            <img src="/logo/course-logo.png" alt="" className="w-10 h-10 my-1" />
          </Link>
          <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
          <Link className="m-2 my-3 hover:text-[#4b4b4b]" to={"/materials/"}>{language && language["materials"]}</Link>
          <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
          <p className="m-3 my-3 text-color">{language && language["new"]}</p>
        </div>
        <hr className="text-gray-200 my-5" />
        <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
          <label htmlFor="courseOverview">
            <p className="my-3 font-bold">{language && language["add_your_material_title"]}</p>
            <input id="courseOverview" name="title" className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400 " placeholder={language && language["write_here"]} />
          </label>

          <label htmlFor="courseOverview">
            <p className="my-3 font-bold">{language && language["description"]}</p>
            <textarea id="courseOverview" name="description" className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400 " placeholder={language && language["write_here"]} ></textarea>
          </label>

          <label htmlFor="file" className="p-14 h-[300px] w-full flex items-center justify-center my-4 rounded-xl bg-color border inset-shadow-sm inset-gray-indigo-800 border-gray-300">
            <div className="text-center">
              <FontAwesomeIcon icon={faArrowUp} className="text-3xl rounded-xl bg-gradient-to-b from-[#fa9600] to-[#ffe696] p-3 px-4 text-gray-100" />
              <p className="text-l font-bold">{language && language["upload_material"]}</p>
              <p className="text-sm text-gray-400">{language && language["Drag_drop"]}</p>
              {fileName && <p className="p-4">{fileName}</p>}
            </div>
            <input type="file" id="file" name="file" className="hidden " onChange={handleSetFile} />

          </label>

          {msg && <div className="p-4 m-2">{msg}</div>}

          <div className="flex flex-row justify-between">
            <button type="submit" className="flex cursor-pointer rounded text-sm pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 mx-auto">{loading && <img className="animate-spin w-4 h-4 m-1" src="/loading_white.png" />} <span>{language && language["add"]}</span></button>
          </div>
        </form>
      </div>
    </ThemeContainer>
  )
}
