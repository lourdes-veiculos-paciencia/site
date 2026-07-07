"use client";

import VehicleGalleryDesktop from "./VehicleGalleryDesktop";
import VehicleGalleryMobile from "./VehicleGalleryMobile";

type Props = {
  imagens: string[];
};

export default function VehicleGallery({
  imagens,
}: Props) {
  return (
    <>
      <VehicleGalleryMobile
        imagens={imagens}
      />

      <VehicleGalleryDesktop
        imagens={imagens}
      />
    </>
  );
}