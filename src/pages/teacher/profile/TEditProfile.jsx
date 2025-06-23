import React from 'react'
import ThemeContainer from '../../../compenents/parts/ThemeContainer'
import { translation } from '../../../config/translations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import api from '../../../config/api';

export default function TEditProfile() {
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [photo, setPhoto] = React.useState("/profile.jpeg");
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

  const getUserProfile = async () => {
    // teacher/profile
    // student/profile
    const user_id = window.localStorage.getItem("DDOj9KHr51qW1xi");
    const userRole = window.localStorage.getItem("z8C2XXEo52uJQj7");

    try {
      const tmpData = await api.get(`/${userRole}/profile/`);

      if (tmpData.status == 200) {
        setName(tmpData.data.name);
        setBio(tmpData.data.bio);
        setEmail(tmpData.data.email);
        setPhoto(tmpData.data.photo);
      }

    } catch (error) {
      //console.log(error);
    }
  }

  const handlePhotoChange = (e) => {
    e.preventDefault();

    if (e.target.files && e.target.files[0]) {
      const image = window.URL.createObjectURL(e.target.files[0])
      setPhoto(image);
    }
  }

  const handleUpdateUserProfile = (e) => {
    e.preventDefault();
    const authUser = window.localStorage.getItem("DDOj9KHr51qW1xi");
    const formData = new FormData(e.target);
    formData.append('user_id', authUser);
    const name = e.target.name.value;
    const bio = e.target.bio.value;
    const email = e.target.email.value;

    if (name == "" || bio == "" || email == "") {
      setMsg(language['error_validation_msg']);
      setLoading(false);
      return false;
    }
  }

  return (<ThemeContainer role="teachers">

    <div className="w-[75%] mx-auto">
      <form method="post" onSubmit={handleUpdateUserProfile} className="bg-white mx-auto m-3 rounded-xl p-5">
        <div className="flex">
          <Link to="/teachers">
            <img src="/logo/course-logo.png" alt="" className="w-10 h-10 my-1" />
          </Link>
          <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
          <Link className="m-2 my-3 hover:text-[#4b4b4b]" to={"/teachers/profile"}>{language && language["profile"]}</Link>
          <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
          <p className="m-3 my-3 text-color">{language && language["change_password"]}</p>
        </div>
        <h2 className="py-4 text-xl font-bold border-b border-b-gray-200 mt-4">{language && language["change_password"]}:</h2>
        <label htmlFor="photo" className="block">
          <img src={photo} className="rounded-full m-4 w-26 h-26 mx-auto block" />
          <input type="file" id="photo" name="photo" className="hidden" onChange={handlePhotoChange} />
        </label>
        <label htmlFor="name">
          <p id="name" className="my-3 font-bold">{language && language["name"]}</p>
          <input type="text" id="name" name="name" placeholder={language && language["write_here"]} defaultValue={name} onChange={val => setName(val.target.value)} className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400" />
        </label>
        <label htmlFor="bio">
          <p id="bio" className="my-3 font-bold">{language && language["bio"]}</p>
          <textarea type="text" id="bio" name="bio" defaultValue={bio} onChange={val => setBio(val.target.value)} placeholder={language && language["write_here"]} className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400"></textarea>
        </label>
        <label htmlFor="email">
          <p id="email" className="my-3 font-bold">{language && language["email"]}</p>
          <input type="text" id="email" name="email" defaultValue={email} onChange={val => setEmail(val.target.value)} placeholder={language && language["write_here"]} className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400" />
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
