"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";

type Props = {
  label: string;
  name: string;
  defaultValues?: string[];
  onImagesChange: (urls: string[]) => void;
};

export default function ImageUploadField({
  label,
  name,
  defaultValues = [],
  onImagesChange,
}: Props) {
  const [images, setImages] = useState<string[]>(defaultValues);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileSelect(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = event.currentTarget.files;
    if (!files) return;

    setError(null);
    setIsUploading(true);

    try {
      const uploadedUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Validar tipo de arquivo
        if (!file.type.startsWith("image/")) {
          throw new Error("Apenas arquivos de imagem são permitidos");
        }

        // Validar tamanho (5MB max)
        if (file.size > 5 * 1024 * 1024) {
          throw new Error("Tamanho máximo de arquivo é 5MB");
        }

        // Gerar nome único
        const timestamp = Date.now();
        const randomString = Math.random()
          .toString(36)
          .substring(2, 9);
        const fileName = `${timestamp}-${randomString}-${file.name}`;

        // Upload para Supabase Storage
        const { data, error: uploadError } = await supabase.storage
          .from("veiculos")
          .upload(`imagens/${fileName}`, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          throw uploadError;
        }

        // Obter URL pública
        const {
          data: { publicUrl },
        } = supabase.storage
          .from("veiculos")
          .getPublicUrl(`imagens/${fileName}`);

        uploadedUrls.push(publicUrl);
      }

      const newImages = [...images, ...uploadedUrls];
      setImages(newImages);
      onImagesChange(newImages);

      // Limpar input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erro ao fazer upload de imagens"
      );
    } finally {
      setIsUploading(false);
    }
  }

  function handleRemoveImage(index: number) {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onImagesChange(newImages);
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
      </label>

      {/* Input de arquivo */}
      <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-blue-500 transition">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          disabled={isUploading}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="text-sm text-blue-600 hover:text-blue-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUploading ? "Fazendo upload..." : "Clique para selecionar fotos"}
        </button>

        <p className="text-xs text-gray-500 mt-2">
          ou arraste arquivos aqui
        </p>

        <p className="text-xs text-gray-400 mt-1">
          PNG, JPG, GIF até 5MB
        </p>
      </div>

      {/* Campo oculto para armazenar URLs */}
      <input
        type="hidden"
        name={name}
        value={JSON.stringify(images)}
      />

      {/* Exibir imagens carregadas */}
      {images.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-700">
            {images.length} imagem{images.length !== 1 ? "s" : ""} carregada{images.length !== 1 ? "s" : ""}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((url, index) => (
              <div
                key={index}
                className="relative group"
              >
                <Image
                  src={url}
                  alt={`Imagem ${index + 1}`}
                  width={200}
                  height={150}
                  className="w-full h-32 object-cover rounded-lg"
                />

                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center rounded-lg"
                >
                  <span className="text-white font-bold text-lg">
                    ✕
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700 border border-red-200">
          {error}
        </div>
      )}
    </div>
  );
}
