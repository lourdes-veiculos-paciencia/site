"use client";

import { useState } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";

import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

type Props = {
  imagens: string[];
};

export default function VehicleGallery({ imagens }: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div>

      {/* Foto principal */}
      <Swiper
        navigation
        modules={[Navigation, Thumbs]}
        thumbs={{
          swiper:
            thumbsSwiper && !thumbsSwiper.destroyed
              ? thumbsSwiper
              : null,
        }}
        className="rounded-2xl overflow-hidden shadow-lg"
      >
        {imagens.map((imagem, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[500px]">

              <Image
                src={imagem}
                alt={`Foto ${index + 1}`}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Miniaturas */}
      <Swiper
        onSwiper={setThumbsSwiper}
        modules={[Thumbs]}
        watchSlidesProgress
        slidesPerView={4}
        spaceBetween={12}
        className="mt-4"
      >
        {imagens.map((imagem, index) => (
          <SwiperSlide key={index}>

            <div className="relative h-24 cursor-pointer overflow-hidden rounded-lg border">

              <Image
                src={imagem}
                alt={`Miniatura ${index + 1}`}
                fill
                sizes="120px"
                className="object-cover"
              />

            </div>

          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
}