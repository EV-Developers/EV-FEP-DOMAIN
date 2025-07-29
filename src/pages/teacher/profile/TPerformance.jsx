import React from 'react'
import "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
import ThemeContainer from '../../../compenents/parts/ThemeContainer'
import { translation } from '../../../config/translations';
import { Link } from 'react-router-dom';
import api from '../../../config/api';

export default function TPerformance() {
  const [data, setData] = React.useState(null);
  const [chart, setChart] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [language, setLanguage] = React.useState(null);
  const [leaderboard, setLeaderboard] = React.useState(null);

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
        
        if(response.data && response.data.profile){
          setData(response.data);

          getTopLeads();
          getTeacherPhoto(response.data.profile.photo);
        }

      }
    } catch (error) {
      //console.log(error);
    }
  }

  React.useEffect(() => {
    if(data){
          const tmpArr = {
            labels: [language && language['assesments'], language && language['course_lessons'], language && language['current_performance'], language && language['quiz_performance'], language && language['attendance']],
            datasets: [
              {
                label: language && language['current_performance'],
                borderWidth: 2,
                data: [
                  data.performance.assignment_score,
                  data.performance.lesson_score,
                  data.performance.performance_score,
                  data.performance.quiz_score,
                  data.performance.time_score
                ],
                backgroundColor: ["#FD9800", "#ffa500", "#FFEFB4", "orange", "#ffa500"],
                borderColor: ["#FD9800", "#ffa500", "#FFEFB4", "orange", "#ffa500"],
                //borderWidth: 1,
              },
            ],
          }

          setChart(tmpArr);
    }
  }, [language, data])

  const getTopLeads = async() => {
    try {
      const topLeads = await api.get('/leaderboard/teachers');
  
      if(topLeads.status == 200){
        setLeaderboard(topLeads.data);
      }
    } catch (error) {
      //console.log(error);
    }
  }

  return (<ThemeContainer role="teachers" customeClasses="w-full">
    <div className="mt-0 h-[300px] w-full bg-green-600 bg-[url(/imgs/profilebg.png)] bg-cover relative">
      <div className="absolute bottom-[-70px] m-4 mx-14 p-5">
        <img src="/profile.jpeg" alt="" className=" w-[35%] rounded-full  border-white border-4" />
      </div>
    </div>
    <div className="w-[85%] mx-auto mt-14">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold">{data && data.user.name}</h2>
        <p className="text-sm text-gray-400">{data && data.user.email}</p>
      </div>
      <div className="flex">
        <div className="p-4 w-[30%]">
            <p className="text-xl font-bold py-3">{language && language['current_performance']}</p>
            <div className="flex ">
                <div className="w-[50%] bg-blue-50 border border-gray-300 p-3 rounded text-center">
                    <div className="flex justify-center items-center">
                        <img src="/imgs/barcharticon.png" className="w-10" alt="" />
                        <span>{data && data.performance.time_score}%</span>
                    </div>
                    <p className="text-gray-700">{language && language['attendance']}</p>
                </div>
                <div className="w-[50%] bg-blue-50 border border-gray-300 p-3 rounded text-center mx-3">
                    <div className="flex justify-center items-center">
                        <img src="/imgs/quiz.png" className="w-10" alt="" />
                        <span>{data && data.performance.quiz_score}</span>
                    </div>
                    <p className="text-gray-700">{language && language['quiz_performance']}</p>
                </div>
            </div>
            <p className="text-xl font-bold py-3">{language && language['lifetime_activity']}</p>
            <div className="flex items-center w-[98%] bg-blue-50 border border-gray-300 p-3 rounded text-center m-0">
                <img src="/imgs/eye.png" className="w-10 mx-2" alt="" />
                <span className="mx-2">{language && language['performance']}</span>
                <span>{data && data.performance.performance_score}%</span>
                <img src="/imgs/hat.png" className="w-10 mx-2" alt="" />
                <span className="mx-2">{language && language['mark']}</span>
                <span>{data && data.performance.assignment_score}</span>
            </div>
            <p className="text-xl font-bold py-3">{language && language['your_ranking']}</p>
            <div className="bg-blue-50 border border-gray-300 p-3 rounded">
              {leaderboard && leaderboard.map((item, index) => <div key={"leaderboard-"+index} className="flex justify-between my-3">
                <div className="flex">
                  <div className="rounded-full bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-white text-xs font-bold w-4 h-4 mx-2 px-1">{(index + 1)}</div>
                  <div className="text-xs">{item.name}</div>
                </div>
                <div className="text-xs">{item.performance_score}%</div>
              </div>)}
            </div>
            {/* <div className="flex flex-wrap items-center w-[98%] bg-blue-50 border border-gray-300 p-3 rounded text-center m-0">
            {leaderboard && leaderboard.map((item, index) => <div className="mx-2 relative hover:scale-105 transition-all" key={"rank-"+item.id}>
                <p className="absolute bottom-0 rounded-full bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-white text-xs font-bold w-6 h-6 p-1">{(index + 1)}</p>
                <img src={item.img} alt="" className="m-1 my-3 rounded-full w-12" />
            </div>)}
            </div> */}
        </div>
        <div className="p-4 w-[70%]">
            <p className="text-xl font-bold py-3">{language && language['current_top_goals']}</p>
            <div className="w-[98%] bg-blue-50 border border-gray-300 p-3 rounded m-0">
            {data && data.profile.user.course_progresses.map(item => <div className="mx-2 border-b border-b-gray-300 py-4" key={"rank-"+item.id}>
                <p className="text-l">{item.completed == 1 ? language && language['complete']:language && language['ongoing']} {item.start_date}</p>
                <p className="text-sm text-gray-400">{language && language['start']}: {item.start_date} {item.end_date && language && " ~ " + language['complete'] + ":"} {item.end_date}</p>
            </div>)}
            </div>
        </div>
      </div>
        {chart && <div className="w-full"><Line data={chart} /></div>}
    </div>
  </ThemeContainer>)
}
