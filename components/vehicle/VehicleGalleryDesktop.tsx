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

export default function VehicleGalleryDesktop({
  imagens,
}: Props) {
  const [thumbsSwiper, setThumbsSwiper] =
    useState<SwiperType | null>(null);

  return (
    <div className="hidden lg:block">

      <Swiper
        navigation
        modules={[Navigation, Thumbs]}
        thumbs={{
          swiper:
            thumbsSwiper &&
            !thumbsSwiper.destroyed
              ? thumbsSwiper
              : null,
        }}
        className="overflow-hidden rounded-2xl shadow-lg"
      >
        {imagens.map((imagem, index) => (
          <SwiperSlide key={index}>

            <div className="relative h-[520px]">

              <Image
                src={imagem}
                alt={`Foto ${index + 1}`}
                fill
                priority={index === 0}
                className="object-cover"
              />

            </div>

          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        modules={[Thumbs]}
        watchSlidesProgress
        slidesPerView={4}
        spaceBetween={10}
        className="mt-4"
      >
        {imagens.map((imagem, index) => (
          <SwiperSlide key={index}>

            <div className="relative h-24 overflow-hidden rounded-lg border cursor-pointer">

              <Image
                src={imagem}
                alt={`Miniatura ${index + 1}`}
                fill
                className="object-cover"
              />

            </div>

          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
}