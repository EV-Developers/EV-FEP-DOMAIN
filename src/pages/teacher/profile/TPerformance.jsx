import React from 'react'
import "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
import ThemeContainer from '../../../compenents/parts/ThemeContainer'
import { translation } from '../../../config/translations';
import { Link } from 'react-router-dom';

export default function TPerformance() {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [language, setLanguage] = React.useState(null);
  const [goals, setGoals] = React.useState([
    {
        id: 1, 
        goal: 'quizzes',
        date: new Date(),
        score: 12
    },
    {
        id: 2, 
        goal: 'ملخص',
        date: new Date(),
        score: "04 / 05 / 06"
    },
    {
        id: 3, 
        goal: 'ملخص',
        date: new Date(),
        score: "04 / 05 / 06"
    },
    {
        id: 4, 
        goal: 'ملخص',
        date: new Date(),
        score: "04 / 05 / 06"
    },
  ]);

  const [ranking, setRanking] = React.useState([
    {
        id: 1,
        img: '/profile.jpeg',
        title: 'معلم'
    },
    {
        id: 2,
        img: '/profile.jpeg',
        title: 'معلم'
    },
    {
        id: 3,
        img: '/profile.jpeg',
        title: 'معلم'
    },
    {
        id: 4,
        img: '/profile.jpeg',
        title: 'معلم'
    },
    {
        id: 5,
        img: '/profile.jpeg',
        title: 'معلم'
    },
    {
        id: 6,
        img: '/profile.jpeg',
        title: 'معلم'
    },
    {
        id: 7,
        img: '/profile.jpeg',
        title: 'معلم'
    },
    {
        id: 8,
        img: '/profile.jpeg',
        title: 'معلم'
    },
  ])

  const tmp_data = {
    labels: ['test 1', 'test 2', 'test 3', 'test 4'],
    datasets: [
      {
        label: language && language['current_performance'],
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
        <div className="p-4 w-[30%]">
            <p className="text-xl font-bold py-3">{language && language['current_performance']}</p>
            <div className="flex ">
                <div className="w-[50%] bg-blue-50 border border-gray-300 p-3 rounded text-center">
                    <div className="flex justify-center items-center">
                        <img src="/imgs/barcharticon.png" className="w-10" alt="" />
                        <span>55%</span>
                    </div>
                    <p className="text-gray-700">{language && language['attendance']}</p>
                </div>
                <div className="w-[50%] bg-blue-50 border border-gray-300 p-3 rounded text-center mx-3">
                    <div className="flex justify-center items-center">
                        <img src="/imgs/quiz.png" className="w-10" alt="" />
                        <span>88%</span>
                    </div>
                    <p className="text-gray-700">{language && language['quiz_performance']}</p>
                </div>
            </div>
            <p className="text-xl font-bold py-3">{language && language['lifetime_activity']}</p>
            <div className="flex items-center w-[98%] bg-blue-50 border border-gray-300 p-3 rounded text-center m-0">
                <img src="/imgs/eye.png" className="w-10 mx-2" alt="" />
                <span>333</span>
                <img src="/imgs/hat.png" className="w-10 mx-2" alt="" />
                <span>9</span>
            </div>
            <p className="text-xl font-bold py-3">{language && language['your_ranking']}</p>
            <div className="flex flex-wrap items-center w-[98%] bg-blue-50 border border-gray-300 p-3 rounded text-center m-0">
            {ranking && ranking.map((item, index) => <div className="mx-2 relative hover:scale-105 transition-all" key={"rank-"+item.id}>
                <p className="absolute bottom-0 rounded-full bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-white text-xs font-bold w-6 h-6 p-1">{(index + 1)}</p>
                <img src={item.img} alt="" className="m-1 my-3 rounded-full w-12" />
            </div>)}
            </div>
        </div>
        <div className="p-4 w-[70%]">
            <p className="text-xl font-bold py-3">{language && language['current_top_goals']}</p>
            <div className="w-[98%] bg-blue-50 border border-gray-300 p-3 rounded m-0">
            {goals && goals.map(item => <div className="mx-2 border-b border-b-gray-300 py-4" key={"rank-"+item.id}>
                <p className="text-l">{language && language['complete']} {item.score} {item.goal}</p>
                <p className="text-sm text-gray-400">{language && language['checked_in']} {item.date.toLocaleString()}</p>
            </div>)}
            </div>
        </div>
      </div>
        {tmp_data && <div className="w-full"><Line data={tmp_data} /></div>}
    </div>
  </ThemeContainer>)
}
