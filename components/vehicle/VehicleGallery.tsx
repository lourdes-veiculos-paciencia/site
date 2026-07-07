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

export default function VehicleGallery({
  imagens,
}: Props) {
  const [thumbsSwiper, setThumbsSwiper] =
    useState<SwiperType | null>(null);

  return (
    <div className="w-full">

      {/* Foto principal */}

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

            <Image
              src={imagem}
              alt={`Foto ${index + 1}`}
              width={1200}
              height={900}
              priority={index === 0}
              className="
                w-full
                h-[250px]
                sm:h-[350px]
                lg:h-[520px]
                object-cover
              "
            />

          </SwiperSlide>
        ))}
      </Swiper>

      {/* Miniaturas */}

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

            <Image
              src={imagem}
              alt={`Miniatura ${index + 1}`}
              width={180}
              height={120}
              className="
                h-20
                w-full
                cursor-pointer
                rounded-lg
                border
                object-cover
              "
            />

          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
}