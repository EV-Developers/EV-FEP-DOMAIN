import React from 'react'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

import { translation } from '../../config/translations';
import ThemeContainer from '../../compenents/parts/ThemeContainer'
import api from '../../config/api';
import CourseItem from '../../compenents/parts/CourseItem';

export default function THome() {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [language, setLanguage] = React.useState(null);
  const [username, setUsername] = React.useState("");
  const slides = [
    {
      id: "img-1",
      img: 'slide_2.jpg',
      alt: "Slide 1"
    },
    {
      id: "img-2",
      img: 'slide_2.jpg',
      alt: "Slide 2"
    },
  ]

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
  }, []);

  React.useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const list = await api.get('/courses');

    if (list.status == 200) {
      if (list.data.data) {
        setData(list.data.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  }

  return (<ThemeContainer role="teachers" customeClasses="">
    <Swiper
      modules={[Autoplay, Pagination]}
      slidesPerView={1}
      autoplay={{ delay: 4000 }}
      pagination={{ clickable: true }}
      className="h-full [&_.swiper-pagination-bullet]:bg-gray-400 [&_.swiper-pagination-bullet-active]:bg-orange-500"
    >
      {slides && slides.map(item => <SwiperSlide key={item.id}>
        <img
          src={"/" + item.img}
          className="w-full 2xl:w-[75%] mx-auto md:w-full 2xl:h-[600px] md:h-[460px] object-cover"
          alt={item.alt}
        />
      </SwiperSlide>)}
    </Swiper>
    <div className="block w-[75%] mx-auto">
      <h2 className="my-2 text-2xl font-bold">{language && language['hello']} {username}, {language && language['to_dashboard']}</h2>
      <p className="mb-10 mt-3 text-xl font-medium">{language && language['home_quote']}</p>
      <div className="flex flex-wrap ">
        {data && data.map(item => <CourseItem key={'course-'+item.id} language={language} link="/teachers/courses/" item={item} />)}
      </div>

      {!data && loading && <div className="flex animate-pulse">
        <div className="shadow block w-[25%] rounded-l p-2 mx-2">
          <div className="w-full h-24 bg-gray-300"></div>
          <div className="w-full h-2 bg-gray-300 my-4"></div>
          <div className="w-full h-6 bg-gray-300 mt-4 rounded"></div>
        </div>
        <div className="shadow block w-[25%] rounded-2xl p-2 mx-2">
          <div className="w-full h-24 bg-gray-300"></div>
          <div className="w-full h-2 bg-gray-300 my-4"></div>
          <div className="w-full h-6 bg-gray-300 mt-4 rounded"></div>
        </div>
        <div className="shadow block w-[25%] rounded-2xl p-2 mx-2">
          <div className="w-full h-24 bg-gray-300"></div>
          <div className="w-full h-2 bg-gray-300 my-4"></div>
          <div className="w-full h-6 bg-gray-300 mt-4 rounded"></div>
        </div>
      </div>}
    </div>

    <Link to="/teachers/courses" className="block mx-auto p-3 bg-[#fa9600] hover:bg-[#ffe696] w-[30%] text-center rounded-2xl my-7 transition-all">{language && language['see_more']}</Link>

  </ThemeContainer>)
}
