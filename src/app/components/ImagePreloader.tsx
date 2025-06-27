'use client';
import { imageUrls } from '../utils/imagePrefetch';

export default function ImagePreloader() {
  const allImages = [
    ...imageUrls.nuri,
    imageUrls.loading,
    imageUrls.onboarding,
    ...imageUrls.icons.slice(0, 5) // 주요 아이콘만 preload
  ];

  return (
    <>
      {allImages.map((src) => (
        <link
          key={src}
          rel="preload"
          href={src}
          as="image"
          type="image/svg+xml"
        />
      ))}
    </>
  );
} 