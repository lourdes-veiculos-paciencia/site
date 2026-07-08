"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  imagens: string[];
};

export default function VehicleGallery({
  imagens,
}: Props) {
  const [imagemAtual, setImagemAtual] = useState(0);

  return (
    <div className="space-y-3 sm:space-y-4">

      {/* Foto Principal */}
      <div className="overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl border bg-gray-100 shadow-lg">

        <Image
          src={imagens[imagemAtual]}
          alt={`Foto ${imagemAtual + 1}`}
          width={1200}
          height={800}
          priority
          className="
            h-48
            sm:h-64
            md:h-80
            lg:h-[420px]
            xl:h-[520px]
            w-full
            object-cover
          "
        />

      </div>

      {/* Miniaturas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">

        {imagens.map((imagem, index) => (

          <button
            key={index}
            type="button"
            onClick={() => setImagemAtual(index)}
            className={`
              overflow-hidden
              rounded-lg
              sm:rounded-lg
              md:rounded-xl
              border-2
              transition-all

              ${
                imagemAtual === index
                  ? "border-red-600"
                  : "border-gray-200"
              }
            `}
          >

            <Image
              src={imagem}
              alt={`Miniatura ${index + 1}`}
              width={200}
              height={140}
              className="
                h-16
                sm:h-20
                w-full
                object-cover
              "
            />

          </button>

        ))}

      </div>

    </div>
  );
}