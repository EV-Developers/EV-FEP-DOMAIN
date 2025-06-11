import React from 'react'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

import api from '../../config/api';
import { translation } from '../../config/translations';
import ThemeContainer from '../../compenents/parts/ThemeContainer'
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
  ];

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

  return (<ThemeContainer customeClasses="">
    <Swiper
      modules={[Autoplay, Pagination]}
      slidesPerView={1}
      autoplay={{ delay: 4000 }}
      pagination={{ clickable: true }}
      className="h-full [&_.swiper-pagination-bullet]:bg-gray-400 [&_.swiper-pagination-bullet-active]:bg-[#fa9600]"
    >
      {slides && slides.map(item => <SwiperSlide key={item.id}>
        <img
          src={"/" + item.img}
          className="w-full h-full object-cover"
          alt={item.alt}
        />
      </SwiperSlide>)}
    </Swiper>
    <div className="block w-[75%] mx-auto">
      <h2 className="py-5 my-5 text-2xl font-bold">{language && language['hello']} {username}, {language && language['to_dashboard']}</h2>

      <div className="flex flex-wrap ">
        {data && data.map(item => <CourseItem language={language} link="/courses/" item={item} creator={true} />)}
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
  </ThemeContainer>)
}