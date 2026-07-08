"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  imagens: string[];
};

export default function VehicleGallery({ imagens }: Props) {
  const [imagemAtual, setImagemAtual] = useState(0);

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 shadow-sm">
        <Image
          src={imagens[imagemAtual]}
          alt={`Foto ${imagemAtual + 1}`}
          width={1200}
          height={800}
          priority
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-[520px]"
        />
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {imagens.map((imagem, index) => (
          <button
            key={imagem}
            type="button"
            onClick={() => setImagemAtual(index)}
            aria-label={`Selecionar foto ${index + 1}`}
            className={`overflow-hidden rounded-lg border-2 transition-all ${
              imagemAtual === index
                ? "border-red-600 ring-2 ring-red-100"
                : "border-zinc-200 hover:border-zinc-400"
            }`}
          >
            <Image
              src={imagem}
              alt={`Miniatura ${index + 1}`}
              width={220}
              height={150}
              className="h-16 w-full object-cover sm:h-20"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
