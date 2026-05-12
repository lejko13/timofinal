

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

type Props = {
  items: string[];
};

export default function MySwiper({ items }: Props) {
  return (
    <Swiper
      className="w-full h-full bg-black"
      modules={[Autoplay, EffectFade]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      speed={1000}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={true}
      slidesPerView={1}
    >
      {items.map((src, i) => (
        <SwiperSlide key={i}>
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}