import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import { translation } from '../../config/translations';
import ThemeContainer from '../../compenents/parts/ThemeContainer';
import api from '../../config/api';

export default function Search() {
  const { query } = useParams()
  const [data, setData] = React.useState(null);
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

  React.useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const tmpData = await api.get('/courses/q=' + query);
      if (tmpData.status == 200) {
        setData(tmpData.data.data);
      } else {
        setData([]);
      }
    } catch (error) {
      console.log(error);

      setData([]);
    }
  }

  return (
    <ThemeContainer>
      <div className="block mx-auto w-[75%]">
        <div className="flex">
          <Link to={"/"}>
            <img src="/logo/course-logo.png" alt="" className="w-10 h-10 my-1" />
          </Link>
          <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
          <Link className="m-2 my-3 hover:text-[#4b4b4b]" to={"/"}>{language && language["home"]}</Link>
          <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
          <p className="m-3 my-3 text-color">{language && language["search_results"]} {query}</p>
        </div>
        <hr className="text-gray-200 my-5" />

        {data && data.map(item => <Link to={'/courses/' + item.id} key={"cat-" + item.id} className='block hover:bg-gray-100 hover:border hover:border-gray-200 rounded-xl bg-white p-5 py-2 my-2 text-sm'>{item.title}</Link>)}

        {!data && <div role='status' className='animate-pulse'>
          <div className='block rounded-xl bg-gray-300 p-5 py-2 my-2 w-full h-8'></div>
          <div className='block rounded-xl bg-gray-300 p-5 py-2 my-2 w-full h-8'></div>
          <div className='block rounded-xl bg-gray-300 p-5 py-2 my-2 w-full h-8'></div>
          <div className='block rounded-xl bg-gray-300 p-5 py-2 my-2 w-full h-8'></div>
        </div>}

        {data && data.length == 0 && <p className="p-5 m-5">{language && language["no_search_results"]} {query}...</p>}
      </div>
    </ThemeContainer>
  )
}
