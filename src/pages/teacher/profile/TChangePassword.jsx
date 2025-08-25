import React from 'react'
import ThemeContainer from '../../../compenents/parts/ThemeContainer'
import { translation } from '../../../config/translations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

export default function TChangePassword() {
  const [loading, setLoading] = React.useState(false);
  const [msg, setMsg] = React.useState(null);
  const [language, setLanguage] = React.useState(null);

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

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    setLoading(true);

    const authUser = window.localStorage.getItem("DDOj9KHr51qW1xi");
    const password = e.target.password.value;
    const repeat_password = e.target.repeat_password.value;

    if (password != repeat_password) {
      setMsg(language['error_validation_password_match_msg']);
      setLoading(false);
      return false;
    }

    if (password.length < 6) {
      setMsg(language['error_validation_password_length_msg']);
      setLoading(false);
      return false;
    }
  }

  return (<ThemeContainer role="teachers">

    <div className="w-[75%] mx-auto">
      <form method="post" onSubmit={handleUpdatePassword} className="bg-white mx-auto m-3 rounded-xl p-5">
            <div className="hidden md:flex">
                <Link to="/teachers">
                    <img src="/logo/course-logo.png" alt="" className="w-10 h-10 my-1" />
                </Link>
                <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                <Link className="m-2 my-3 hover:text-[#4b4b4b]" to={"/teachers/profile"}>{language && language["profile"]}</Link>
                <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                <p className="m-3 my-3 text-color">{language && language["change_password"]}</p>
            </div>
        <h2 className="py-4 text-xl font-bold border-b border-b-gray-200 mt-4">{language && language["change_password"]}:</h2>
        <label htmlFor="password">
          <p id="password" className="my-3 font-bold">{language && language["password"]}</p>
          <input type="password" id="password" name="password" placeholder={language && language["write_here"]} className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400" />
        </label>
        <label htmlFor="repeat_password">
          <p id="repeat_password" className="my-3 font-bold">{language && language["repeat_password"]}</p>
          <input type="password" id="repeat_password" name="repeat_password" placeholder={language && language["write_here"]} className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400" />
        </label>

        {msg && <div className="p-4 m-2 text-center">
          {msg}
        </div>}

        <div className="flex justify-between w-full">
          <button className="flex rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 mx-auto mt-5">{loading && <img className="animate-spin w-4 h-4 m-1" src="/loading_white.png" />} <span>{language && language["update"]}</span></button>
        </div>
      </form>
    </div>
  </ThemeContainer>)
}
