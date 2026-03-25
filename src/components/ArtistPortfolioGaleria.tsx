"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

//@ts-ignore
import "swiper/css";
//@ts-ignore
import "swiper/css/navigation";
//@ts-ignore
import "swiper/css/pagination";


type Slide = {
  image: string;
  alt: string;
  title: string;
};

const slides: Slide[] = [
  {
    image: "/eventim/imgs/Seal_mapa_Rj_qualistage_v2.png",
    alt: "Mapa RJ",
    title: "Seal Mapa RJ v1",
  },
  {
    image: "/eventim/imgs/Seal_mapa_Sp_allianz_v1.png",
    alt: "Mapa SP",
    title: "Seal Mapa SP v1",
  },
   {
    image: "/eventim/imgs/Seal_mapa_Rj_qualistage_v2.png",
    alt: "Mapa RJ",
    title: "Seal Mapa RJ v1",
  },
    {
    image: "/eventim/imgs/Seal_mapa_Sp_allianz_v1.png",
    alt: "Mapa SP",
    title: "Seal Mapa SP v1",
  },
];

export function ArtistPortfolioGaleria() {
  return (
    <section className="gallery-container">
   <Swiper
  modules={[Navigation, Pagination]}
  loop
  centeredSlides
  navigation
  pagination={{ type: "fraction" }}
  slidesPerView={2} // 👈 padrão mobile
  breakpoints={{
    768: {
      slidesPerView: 3, // 👈 desktop
    },
  }}
  className="gallery-swiper"
>
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="gallery-slide">
              <img
                src={slide.image}
                alt={slide.alt}
                className="gallery-image"
              />
            </div>

            <p className="gallery-caption">
              {slide.title}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}