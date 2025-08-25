import React from 'react'
import ThemeContainer from '../../../compenents/parts/ThemeContainer'
import { translation } from '../../../config/translations';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../config/api';

export default function TProfile() {
  const [data, setData] = React.useState(null);
  const [photo, setPhoto] = React.useState('/profile.jpeg');
  const [loading, setLoading] = React.useState(true);
  const [language, setLanguage] = React.useState(null);
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

    loadData();
  }, []);


  const loadData = async () => {
    try {
      const response = await api.get('/teacher/profile');

      if (response.status == 200) {
        if (response.data && response.data.profile) {
          setData(response.data);
          getTeacherPhoto();
        }
      }
    } catch (error) {
      //console.log(error);
    }
  }

  const handleLogout = async () => {
    navigate('/login');
    try {
      const response = await api.post("/logout");
      
      if (response.status == 200 || response.status == 201) {
        window.localStorage.clear();
      }
    } catch (error) {
      //console.log(error);
    }
  }

  const getTeacherPhoto = async () => {
    const token = window.localStorage.getItem('rJp7E3Qi7r172VD');
    const aurl = "https://fep.misk-donate.com/api/teacher/profile/download";

    try {
      fetch(aurl, {
        headers: {
          'Accept': "*",
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          try {
            if (response && !response.ok) {
              return null
            }
            return response.blob();
          } catch (error) {
            return null;
          }
        })
        .then(blob => {
          if (blob) {
            const tmpPotoURL = URL.createObjectURL(blob);
            setPhoto(tmpPotoURL);
          }
        })
        .catch(error => {
          //console.log(error);
        });
    } catch (error) {
      //console.log(error);
    }
  }

  return (<ThemeContainer role="teachers" customeClasses="w-full">
    <div className="mt-0 h-[300px] w-full bg-green-600 bg-[url(/imgs/profilebg.png)] bg-cover relative">
      <div className="absolute bottom-[-70px] m-4 mx-14 p-5">
        <img src={photo} alt="" className=" w-[200px] h-[200px] object-cover rounded-full  border-white border-4" />
      </div>
    </div>
    <div className="w-[85%] mx-auto mt-14">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold">{data && data.user.name}</h2>
        <p className="text-sm text-gray-400">{data && data.user.email}</p>
      </div>
      <div className="flex justify-between">
        <div className="flex">
          <Link to="/teachers/edit-profile" className="bg-blue-950 hover:bg-blue-200 px-3 md:px-7 py-2 my-4 text-sm text-white hover:text-blue-950 rounded-2xl border border-blue-950">{language && language['edit']}</Link>
          <Link to="/teachers/change-password" className="bg-blue-100 hover:bg-blue-950 border border-blue-950 px-3 md:px-7 py-2 my-4 mx-2 text-sm text-blue-950 hover:text-white rounded-2xl">{language && language['change_password']}</Link>
          <Link to="/teachers/performance" className="bg-blue-100 hover:bg-blue-950 border border-blue-950 px-3 md:px-7 py-2 my-4 mx-2 text-sm text-blue-950 hover:text-white rounded-2xl">{language && language['performance']}</Link>
        </div>

        <Link to="/teachers/certificates" className="bg-blue-100 hover:bg-blue-950 border border-blue-950 px-3 md:px-7 py-2 my-4 mx-2 text-sm text-blue-950 hover:text-white rounded-2xl">{language && language['certificates']}</Link>
      </div>
      <div>
        <p className="text-xl font-bold">{language && language['bio']}</p>
        <div className="bg-blue-100 w-full text-sm text-gray-400 max-h-[300px] p-5 my-4">{data && data.profile.bio}</div>
      </div>
      <button onClick={handleLogout} className="p-2 font-bold text-white mt-4 w-full  text-center bg-gradient-to-br from-[#fa9600] to-[#ff3300] hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 cursor-pointer block md:hidden">{language && language['logout']}</button>
    </div>
  </ThemeContainer>)
}
