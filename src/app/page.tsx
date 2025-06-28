'use client';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import BottomTabBar from './components/BottomTabBar';
import useAudioStore from './store/audioStore';
import OnboardingScreen from './components/OnboardingScreen';
import MedicationModal from './components/MedicationModal';
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface MenuItem {
  title: string;
  type: 'mood' | 'medication' | 'schedule';
}

const menuItems: MenuItem[] = [
  { title: '오늘의 기분은?', type: 'mood' },
  { title: '복약 알림', type: 'medication' },
  { title: '일정 알림', type: 'schedule' },
];

export default function Home() {
  const isLoading = useAudioStore((state) => state.isLoading);
  
  const nuriImages = [
    '/graphic/graphic_nuri_01.svg',
    '/graphic/graphic_nuri_02.svg',
    '/graphic/graphic_nuri_03.svg',
    '/graphic/graphic_nuri_04.svg',
  ];
  const [randomIndex, setRandomIndex] = useState(() => Math.floor(Math.random() * nuriImages.length));
  const [randomImage, setRandomImage] = useState(nuriImages[randomIndex]);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleSaveMedication = (data: { date: string; time: string; medication: string; dosage: string; }) => {
    console.log('Medication saved:', data);
  };

  // sessionStorage 체크로 온보딩 표시 여부 결정
  useEffect(() => {
    const hasSeenOnboarding = sessionStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
    setIsInitialized(true);
  }, []);

  // 온보딩 완료 처리
  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    sessionStorage.setItem('hasSeenOnboarding', 'true');
  };

  // 컴포넌트 마운트 시 랜덤 이미지 설정
  useEffect(() => {
    const nuriImages = [
      '/graphic/graphic_nuri_01.svg',
      '/graphic/graphic_nuri_02.svg',
      '/graphic/graphic_nuri_03.svg',
      '/graphic/graphic_nuri_04.svg',
    ];
    setRandomImage(nuriImages[randomIndex]);
  }, [randomIndex]);

  // 초기화 완료 전까지는 빈 화면
  if (!isInitialized) {
    return <div className="h-full bg-[#FCF8F5]"></div>;
  }

  // 온보딩 화면을 먼저 보여주기
  if (showOnboarding) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className='h-full flex flex-col items-center w-full justify-center'>
      <div className='min-h-[500px] h-full flex-1 flex flex-col items-center w-full justify-center'>
          <div className="w-[48px] h-[48px] mb-12 relative">
            <Image
              src={isLoading ? '/icons/Loader.svg' : '/icons/Volume_up.svg'}
              alt={isLoading ? '로딩 중' : '볼륨'}
              fill
              className={`object-contain ${isLoading ? 'animate-spin' : ''}`}
            />
            </div>
            <div className="flex w-75 h-75 justify-center items-center" >
            {isLoading ? (
              <Image src='/graphic/graphic_loading.svg' loading='eager' alt='느리_2' width={300} height={300} />
            ) : (
              <Image src={randomImage} loading='eager' alt='느리' width={300} height={300} />
            )}
           </div>
        {isLoading?<div className='px-[24px] py-[10px] w-full'>
          <div className='bg-white p-[24px] border border-primary rounded-xl flex justify-center items-center'>
            <span className='block'>잠시만 기다려 주세요</span>
          </div>
        </div>:
        <div className="flex gap-[12px] p-2 mt-5 justify-start w-full pl-[24px] overflow-x-auto scrollbar-hide whitespace-nowrap">
          {menuItems.map((item) => {
            return (
              <div
                key={item.title}
                className="text-[20px] p-[12px] text-gray1 bg-secondary rounded-xl inline-block shrink-0 cursor-pointer transition-all duration-300 ease-in-out shadow-md hover:shadow-lg hover:shadow-secondary/50 hover:scale-105 hover:-translate-y-1 transform"
                onClick={() => item.type === 'medication' && handleOpenModal()}
              >
                {item.title}
              </div>
            );
          })}
        </div>}
        </div>
      <BottomTabBar />
      {isModalOpen && <MedicationModal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSaveMedication} />}
    </div>
  );
}
