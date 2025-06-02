import React from 'react';
import ThemeContainer from '../../compenents/parts/ThemeContainer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

export default function SHome() {
  const slides = [
    {
      id: "img-1",
      img: 'slide_1.jpg',
      alt: "Slide 1"
    },
    {
      id: "img-2",
      img: 'slide_2.jpg',
      alt: "Slide 2"
    },
  ]

  return (<ThemeContainer role="students" customeClasses="">
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
  </ThemeContainer>
  )
}
