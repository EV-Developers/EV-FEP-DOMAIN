import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import api from '../../config/api';
import { translation } from '../../config/translations';
import ThemeContainer from '../../compenents/parts/ThemeContainer';
import CourseItem from '../../compenents/parts/CourseItem';

export default function Search() {
  const { query } = useParams()
  const [data, setData] = React.useState(null);
  const [language, setLanguage] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

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
      const tmpData = await api.get('/teachers/courses/q=' + query);
      if (tmpData.status == 200) {
        setData(tmpData.data.data);
        setLoading(false);
      } else {
        setLoading(false);
        setData([]);
      }
    } catch (error) {
      setLoading(false);
      setData([]);
    }
  }

  return (
    <ThemeContainer role="teachers">
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

        {data && data.map(item => <CourseItem language={language} link="/teachers/courses/" item={item} />)}

        {!data && loading && <div className="flex flex-wrap animate-pulse">
          <div className="shadow block w-[23%] h-[470px] rounded-l p-2 mx-2 my-3">
            <div className="w-full h-24 bg-gray-300"></div>
            <div className="w-full h-2 bg-gray-300 my-4"></div>
            <div className="w-full h-6 bg-gray-300 mt-4 rounded"></div>
          </div>
          <div className="shadow block w-[23%] rounded-2xl p-2 mx-2">
            <div className="w-full h-24 bg-gray-300"></div>
            <div className="w-full h-2 bg-gray-300 my-4"></div>
            <div className="w-full h-6 bg-gray-300 mt-4 rounded"></div>
          </div>
          <div className="shadow block w-[23%] rounded-2xl p-2 mx-2">
            <div className="w-full h-24 bg-gray-300"></div>
            <div className="w-full h-2 bg-gray-300 my-4"></div>
            <div className="w-full h-6 bg-gray-300 mt-4 rounded"></div>
          </div>
          <div className="shadow block w-[23%] rounded-2xl p-2 mx-2">
            <div className="w-full h-24 bg-gray-300"></div>
            <div className="w-full h-2 bg-gray-300 my-4"></div>
            <div className="w-full h-6 bg-gray-300 mt-4 rounded"></div>
          </div>
        </div>}

        {data && data.length == 0 && <p className="p-5 m-5">{language && language["no_search_results"]} {query}...</p>}
      </div>
    </ThemeContainer>
  )
}
