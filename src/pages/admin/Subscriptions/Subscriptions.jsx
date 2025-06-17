import React from 'react'
import ThemeContainer from '../../../compenents/parts/ThemeContainer'
import { Link } from 'react-router-dom'
import { translation } from '../../../config/translations';

export default function Subscriptions() {
  const [language, setLanguage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const lang = window.localStorage.getItem("language");
    const role = window.localStorage.getItem("z8C2XXEo52uJQj7");

    if (role && role != "" && role != null) {
      if (role == 'teacher') {
        navigate('/teachers');
      }
    }

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

  return (<ThemeContainer role="admin">
    <div className="block mx-auto w-[75%]">
      <div className="flex justify-between">
        <div></div>
        <Link to="/dashboard/new-subscription" className="block rounded pointer m-4 py-3 px-10 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400   font-bold">{language && language["create"]}</Link>
      </div>
      <div>
        <div className="flex ">
          <div className="w-full px-5">
            <Link to={"/dashboard/subscriptions/1"} className='block rounded-xl bg-white p-5 py-2 my-2 w-[65%]'>
              <p className="text-color py-2 flex justify-between">
                <h4 className="text-l font-bold">Al Hayat School</h4>
                <span className="mx-2">Regestration Type: 12-05-2025</span>
              </p>
            </Link>
          </div>
        </div>
      </div>
      <div className="*:animate-pulse">
        {(!data && loading) && <>
          <div className="flex ">
            <div className="w-full px-5">
              <div className='block rounded-xl bg-gray-300 p-5 py-2 my-2 w-[65%] h-6'></div>
            </div>
          </div>
          <div className="flex ">
            <div className="w-full px-5">
              <div className='block rounded-xl bg-gray-300 p-5 py-2 my-2 w-[65%] h-6'></div>
            </div>
          </div>
          <div className="flex ">
            <div className="w-full px-5">
              <div className='block rounded-xl bg-gray-300 p-5 py-2 my-2 w-[65%] h-6'></div>
            </div>
          </div>
        </>}
      </div>

    </div>
  </ThemeContainer>)
}
