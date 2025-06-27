// 이미지 프리로드를 위한 유틸리티 함수들

export const imageUrls = {
  nuri: [
    '/graphic/graphic_nuri_01.svg',
    '/graphic/graphic_nuri_02.svg', 
    '/graphic/graphic_nuri_03.svg',
    '/graphic/graphic_nuri_04.svg',
  ],
  loading: '/graphic/graphic_loading.svg',
  onboarding: '/graphic/onboading.svg',
  icons: [
    '/icons/Loader.svg',
    '/icons/Volume_up.svg',
    '/icons/ArrowLeftCircle.svg',
    '/icons/ArrowRight.svg',
    '/icons/CallSilent.svg',
    '/icons/ImageCircle.svg',
    '/icons/Notification.svg',
    '/icons/Setting.svg',
    '/icons/Voice.svg',
  ]
};

// 단일 이미지 프리로드
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
};

// 여러 이미지 배치 프리로드
export const preloadImages = async (urls: string[]): Promise<void> => {
  try {
    await Promise.all(urls.map(url => preloadImage(url)));
    console.log('✅ 이미지 프리로드 완료:', urls.length, '개');
  } catch (error) {
    console.warn('⚠️ 일부 이미지 프리로드 실패:', error);
  }
};

// 모든 주요 이미지 프리로드
export const preloadAllImages = async (): Promise<void> => {
  const allImages = [
    ...imageUrls.nuri,
    imageUrls.loading,
    imageUrls.onboarding,
    ...imageUrls.icons
  ];
  
  await preloadImages(allImages);
}; 