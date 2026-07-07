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
    <div className="space-y-4">

      {/* Foto Principal */}
      <div className="overflow-hidden rounded-2xl border bg-gray-100 shadow-lg">

        <Image
          src={imagens[imagemAtual]}
          alt={`Foto ${imagemAtual + 1}`}
          width={1200}
          height={800}
          priority
          className="
            h-64
            w-full
            object-cover

            sm:h-80
            md:h-[420px]
            lg:h-[520px]
          "
        />

      </div>

      {/* Miniaturas */}
      <div className="grid grid-cols-4 gap-3">

        {imagens.map((imagem, index) => (

          <button
            key={index}
            type="button"
            onClick={() => setImagemAtual(index)}
            className={`
              overflow-hidden
              rounded-xl
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
                h-20
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