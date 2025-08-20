import React from 'react'
import "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";

import ThemeContainer from '../../compenents/parts/ThemeContainer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChildren, faUserGraduate, faUsers } from '@fortawesome/free-solid-svg-icons';
import { translation } from '../../config/translations';
import Sidebar from '../../compenents/parts/Sidebar';

export default function AHome() {
  const [data, setData] = React.useState(null);
  const [language, setLanguage] = React.useState(null);

  const tmp_data = {
    labels: ['test 1', 'test 2', 'test 3', 'test 4'],
    datasets: [
      {
        label: "Daily Report",
        borderWidth: 2,
        data: [
          44,
          55,
          66,
          99
        ],
        backgroundColor: ["#FD9800", "#ffa500", "#FFEFB4", "orange"],
        borderColor: ["#FD9800", "#ffa500", "#FFEFB4", "orange"],
        //borderWidth: 1,
      },
    ],
  };

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

    setData(tmp_data);
  }, []);

  return (<ThemeContainer role="admin">
    <div className="mt-0 h-[300px] w-full bg-gray-600 bg-[url(/imgs/aminbg.png)] bg-cover flex items-center justify-center text-center ">
      <h2 className="text-5xl font-bold p-3 text-white ">{language && language['dashboard']}</h2>
    </div>
    <div className="mx-auto flex">
      <Sidebar page="dashboard" />
      <div className="w-[80%]">
        <h2 className="px-3 py-5 my-5 text-2xl font-bold ">{language && language['dashboard']}</h2>
        
        {data && <div className="w-full bg-white rounded p-2"><Line data={data} /></div>}

        <div className="grid grid-cols-4 text-center font-bold text-2xl">
          <div className="items-center justify-center bg-white rounded my-3 py-7">
            <h3>64</h3>
            <p>{language && language['courses']}</p>
          </div>
          <div className="items-center justify-center bg-white rounded m-3 py-7">
            <h3>64</h3>
            <p>{language && language['success_stroies']}</p>
          </div>
          <div className="items-center justify-center bg-white rounded m-3 py-7">
            <h3>64</h3>
            <p>{language && language['teachers']}</p>
          </div>
          <div className="items-center justify-center bg-white rounded my-3 py-7">
            <h3>64</h3>
            <p>{language && language['schools']}</p>
          </div>
        </div>

      </div>
    </div>

  </ThemeContainer>)
}
