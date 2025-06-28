'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import BottomTabBar from './components/BottomTabBar';
import useAudioStore from './store/audioStore';
import OnboardingScreen from './components/OnboardingScreen';
import MedicationModal from './components/MedicationModal';
import { speakText, speakTextBrowser } from './services/textToSpeech';

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
];

export default function Home() {
  const isLoading = useAudioStore((state) => state.isLoading);
  const recognizedText = useAudioStore((state) => state.recognizedText);
  
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
  const [showVoiceTest, setShowVoiceTest] = useState(false);

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

  // 누리 캐릭터 클릭 함수
  const handleNuriClick = async () => {
    // 이미지 랜덤 변경
    const newIndex = Math.floor(Math.random() * nuriImages.length);
    setRandomIndex(newIndex);
    
    // 랜덤 인사말
    const greetings = [
      "안녕하세요 예정님! 저는 누리예요~",
      "오늘도 건강한 하루 보내세요!",
      "누리가 언제나 예정님과 함께할게요!",
      "기분이 어떠세요? 언제든 말씀해주세요!",
      "예정님의 건강을 누리가 지켜드릴게요!"
    ];
    
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    
    // 음성 재생 (Google TTS 우선, 실패시 브라우저 TTS)
    try {
      await speakText(randomGreeting, true);
    } catch {
      console.log('음성 재생 실패, 브라우저 TTS로 재시도');
      speakTextBrowser(randomGreeting);
    }
  };

  // 메뉴 아이템 클릭 핸들러
  const handleMenuClick = async (item: MenuItem) => {
    switch (item.type) {
      case 'medication':
        handleOpenModal();
        break;
      case 'mood':
        // 누리의 기분 대답
        const moodText = "저는 언제나 기분이 좋아요, 예정님은요?";
        try {
          await speakText(moodText, true);
        } catch {
          console.log('음성 재생 실패, 브라우저 TTS로 재시도');
          speakTextBrowser(moodText);
        }
        break;
      default:
        break;
    }
  };

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
      <div className='h-full flex flex-col items-center w-full justify-center'>
          <div className="w-[48px] h-[48px] mb-8 relative">
            <Image
              src={isLoading ? '/icons/Loader.svg' : '/icons/Volume_up.svg'}
              alt={isLoading ? '로딩 중' : '볼륨'}
              fill
              className={`object-contain ${isLoading ? 'animate-spin' : ''}`}
              onClick={() => setShowVoiceTest(!showVoiceTest)}
            />
          </div>
            <div className="flex w-75 h-75 justify-center items-center relative float-bounce-animation" >
            {isLoading ? (
                <Image src='/graphic/graphic_loading.svg'  fill  loading='eager' alt='느리_2' />
            ) : (
                <Image 
                  src={randomImage} 
                  loading='eager' 
                  alt='누리' 
             fill
                  className="cursor-pointer transition-all duration-300 hover:scale-110"
                  onClick={handleNuriClick}
                />
            )}
           </div>
        {isLoading? <div className='px-[24px] py-[10px] w-full'>
          <div className='bg-white p-[24px] border border-primary rounded-xl flex justify-center items-center'>
            <span className='block text-2xl'>느리가 생각하고 있어요~</span>
          </div>
        </div>:
        <div className="flex gap-[12px] p-2 mt-5 justify-start w-full pl-[24px] overflow-x-auto scrollbar-hide whitespace-nowrap">
          {menuItems.map((item) => {
            return (
              <div
                key={item.title}
                className="text-[20px] p-[12px] text-gray1 bg-secondary rounded-xl  cursor-pointer transition-all duration-300 ease-in-out shadow-md hover:shadow-lg hover:shadow-secondary/50 hover:scale-105 hover:-translate-y-1 transform whitespace-nowrap"
                onClick={() => handleMenuClick(item)}
              >
                {item.title}
              </div>
            );
          })}
        </div>}
        </div>
      
      {/* 인식된 텍스트 표시 영역 */}
      {recognizedText && (
        <div className="w-full px-6 py-3 bg-transparent">
          <div className="text-center text-gray-700">
            <p className="text-lg font-medium mt-1">{recognizedText}</p>
          </div>
        </div>
      )}
      
      <BottomTabBar />
      {isModalOpen && <MedicationModal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSaveMedication} />}
    </div>
  );
}
