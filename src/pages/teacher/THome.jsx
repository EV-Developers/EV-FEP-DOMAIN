import React from 'react'
import ThemeContainer from '../../compenents/parts/ThemeContainer'
import api from '../../config/api';
import { Link } from 'react-router-dom';
import { translation } from '../../config/translations';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

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
          src={"/"+item.img}
          className="w-full h-full object-cover"
          alt={item.alt}
        />
      </SwiperSlide>)}
    </Swiper>
    <div className="block w-[75%] mx-auto">
      <h2 className="py-5 my-5 text-2xl font-bold border-b border-b-gray-200">{language && language['hello']} {username}, {language && language['to_dashboard']}</h2>
      <div className="flex">
        {data && data.map(item => <Link to={"/teachers/courses/" + item.id} key={"item-" + item.id} className="block w-[25%] bg-white rounded-t-2xl p-2 mx-2 hover:scale-102 font-bold">
          <div className="relative p-0 mx-0">
            <div style={{ width: '75%' }} className="text-amber-600 bg-amber-500 absolute bottom-0 z-20 mx-0 my-0 h-2 transition-all"></div>
            <div style={{ width: '75%' }} className="text-amber-600 bg-amber-500 absolute bottom-0 z-20 mx-0 my-0 h-2 blur-xs transition-all"></div>
            <div className="text-gray-300 w-full bg-gray-300 absolute bottom-0 z-10 mx-0 my-0 h-2 transition-all"></div>
            <img src="/data/vid-1.webp" className="w-full rounded" />
          </div>
          <h3 className="text-l mx-2 my-4 font-bold">{item.title}</h3>
          <div className="rounded w-full pointer m-1 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br  hover:from-amber-700 group-hover:to-amber-400 text-center ">{language && language["continue"]}</div>
        </Link>)}
      </div>
      {!data && loading && <div className="flex animate-pulse">
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
        <div className="shadow block w-[25%] rounded-2xl p-2 mx-2">
          <div className="w-full h-24 bg-gray-300"></div>
          <div className="w-full h-2 bg-gray-300 my-4"></div>
          <div className="w-full h-6 bg-gray-300 mt-4 rounded"></div>
        </div>
      </div>}
    </div>
  </ThemeContainer>)
}
