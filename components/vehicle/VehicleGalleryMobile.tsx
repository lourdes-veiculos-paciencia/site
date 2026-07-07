"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  imagens: string[];
};

export default function VehicleGalleryMobile({
  imagens,
}: Props) {
  const [imagemAtual, setImagemAtual] = useState(0);

  return (
    <div className="lg:hidden">

      {/* Foto Principal */}
      <div className="overflow-hidden rounded-2xl bg-gray-100 shadow-lg">

        <Image
          src={imagens[imagemAtual]}
          alt={`Foto ${imagemAtual + 1}`}
          width={1200}
          height={900}
          priority
          className="h-64 w-full object-cover"
        />

      </div>

      {/* Contador */}
      <p className="mt-3 text-center text-sm text-gray-500">
        {imagemAtual + 1} / {imagens.length}
      </p>

      {/* Miniaturas */}
      <div className="mt-4 grid grid-cols-4 gap-2">

        {imagens.map((imagem, index) => (

          <button
            key={index}
            type="button"
            onClick={() => setImagemAtual(index)}
            className={`
              overflow-hidden
              rounded-lg
              border-2
              transition

              ${
                imagemAtual === index
                  ? "border-red-600"
                  : "border-transparent"
              }
            `}
          >

            <Image
              src={imagem}
              alt={`Miniatura ${index + 1}`}
              width={200}
              height={150}
              className="h-20 w-full object-cover"
            />

          </button>

        ))}

      </div>

    </div>
  );
}