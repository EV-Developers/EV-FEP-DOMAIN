import React from 'react'
import ThemeContainer from '../../../compenents/parts/ThemeContainer'
import { translation } from '../../../config/translations';
import { Link } from 'react-router-dom';

export default function TProfile() {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [language, setLanguage] = React.useState(null);

  React.useEffect(() => {
    const lang = window.localStorage.getItem("language");
    const user_name = window.localStorage.getItem("VPHl3hMFGI8w9kq");
    const user_email = window.localStorage.getItem("L5HiP7ZpOyuVnO4");
    
    setData({
      name: user_name,
      email: user_email
    });

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

  return (<ThemeContainer role="teachers" customeClasses="w-full">
    <div className="mt-0 h-[300px] w-full bg-green-600 bg-[url(/imgs/profilebg.png)] bg-cover relative">
      <div className="absolute bottom-[-70px] m-4 mx-14 p-5">
        <img src="/profile.jpeg" alt="" className=" w-[35%] rounded-full  border-white border-4" />
      </div>
    </div>
    <div className="w-[85%] mx-auto mt-14">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold">{data && data.name}</h2>
        <p className="text-sm text-gray-400">{data && data.email}</p>
      </div>
      <div className="flex">
          <Link to="/teachers/edit-profile" className="bg-blue-950 hover:bg-blue-200 px-7 py-2 my-4 text-sm text-white hover:text-blue-950 rounded-2xl border border-blue-950">{language && language['edit']}</Link>
          <Link to="/teachers/change-password" className="bg-blue-100 hover:bg-blue-950 border border-blue-950 px-7 py-2 my-4 mx-2 text-sm text-blue-950 hover:text-white rounded-2xl">{language && language['change_password']}</Link>
      </div>
      <div>
        <p className="text-xl font-bold">Bio</p>
        <div className="bg-blue-100 w-full text-sm text-gray-400 max-h-[300px] p-5 my-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia modi quo ratione iste dicta, quaerat dolor voluptate vero quasi dolorem ex, harum impedit pariatur voluptatem amet itaque qui perferendis fugit!</div>
      </div>
    </div>
  </ThemeContainer>)
}
