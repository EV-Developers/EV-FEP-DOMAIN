import React from 'react'
import "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";

import ThemeContainer from '../../compenents/parts/ThemeContainer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChildren, faUserGraduate, faUsers } from '@fortawesome/free-solid-svg-icons';
import { translation } from '../../config/translations';

export default function AHome() {
  const [data, setData] = React.useState(null);
  const [language, setLanguage] = React.useState(null);
  const [username, setUsername] = React.useState("");
  const statics = [
    {
      id: 1,
      title: "Subscriptions",
      total: 200,
      number: 117,
      icon: faUsers,
      state: 'Renewed',
      precintage: ((200 - 117) * 100) / 100
    },
    {
      id: 2,
      title: "Teachers",
      total: 200,
      number: 117,
      state: "activated",
      icon: faUserGraduate,
      precintage: ((200 - 117) * 100) / 100
    },
    {
      id: 3,
      title: "Students",
      total: 200,
      number: 117,
      state: "activated",
      icon: faChildren,
      precintage: ((200 - 117) * 100) / 100
    },
  ];

  const tmp_data = {
    labels: ['test 1', 'test 2', 'test 3', 'test 4'],
    datasets: [
      {
        label: "Daily Report",
        backgroundColor: "#fff",
        borderColor: "#ccc",
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
    const user_name = window.localStorage.getItem("VPHl3hMFGI8w9kq");
    setUsername(user_name);

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
    console.log(tmp_data);
  }, []);

  return (<ThemeContainer role="admin">
    <div className="block w-[75%] mx-auto">
      <h2 className="py-5 my-5 text-2xl font-bold border-b border-b-gray-200">{language && language['hello']} {username}, {language && language['to_dashboard']}</h2>
      <div className="flex w-full flex-wrap">
        {statics && statics.map(item => <div key={"stat-" + item.id} className="flex items-center gap-5 rounded-xl bg-white p-4 shadow-lg ring-1 ring-black/5 w-[30%] m-3">
          <div className="grid grid-cols-1 grid-rows-1">
            <FontAwesomeIcon icon={item.icon} />
          </div>
          <div className="w-0 flex-1 text-sm text-gray-950">
            <p className="font-medium">{item.title} - {item.precintage}% {item.state}</p>
            <p className="mt-1 text-gray-500 "><span className="font-medium">{item.number} </span> out of {item.total}</p>
          </div>
        </div>)}
      </div>
      <div className="flex my-5">
        {data && <div className="w-full md:w-[50%]"><Bar data={data} /></div>}
        {data && <div className="w-full md:w-[50%]"><Line data={data} /></div>}
      </div>
    </div>

  </ThemeContainer>)
}
