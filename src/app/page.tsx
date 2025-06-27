'use client';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import BottomTabBar from './components/BottomTabBar';
import useAudioStore from './store/audioStore';
import Navbar from './components/Navbar';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function Home() {
  const isLoading = useAudioStore((state) => state.isLoading);
  const [randomImage, setRandomImage] = useState('/graphic/graphic_nuri_01.svg');

  useEffect(() => {
    if (!isLoading) {
      const nuriImages = [
        '/graphic/graphic_nuri_01.svg',
        '/graphic/graphic_nuri_02.svg',
        '/graphic/graphic_nuri_03.svg',
        '/graphic/graphic_nuri_04.svg',
      ];
      const randomIndex = Math.floor(Math.random() * nuriImages.length);
      setRandomImage(nuriImages[randomIndex]);
    }
  }, [isLoading]);

  return (
    <div className='h-full flex flex-col items-center w-full justify-center'>
      <div className='h-full flex-1 flex flex-col items-center w-full justify-center'>
        <div className="flex flex-col items-center">
          {isLoading ? (
            <Image src="/icons/Loader.svg" alt="로딩 중" width={48} height={242} className='animate-spin mb-12' />
          ) : (
            <Image src="/icons/Volume_up.svg" alt="볼륨" width={48} height={242} className='mb-12' />
          )}
          <div className="flex w-75 h-75 justify-center items-center" >
          {isLoading?
            <Image src='/graphic/graphic_loading.svg' alt='느리_2' width={300} height={300} />
          :
          <Image src={randomImage} alt='느리' width={300} height={300} />
          }
          </div>
        </div>
        {isLoading&&<div className='px-[24px] py-[10px] w-full'>
          <div className='bg-white p-[24px] border border-[#B59779] rounded-xl flex justify-center items-center'>
            <span className='block'>잠시만 기다려 주세요</span>
          </div>
        </div>}
          {!isLoading&&<div className="flex gap-[12px] p-2  mt-5 justify-start w-full pl-[24px] overflow-x-auto scrollbar-hide whitespace-nowrap">
            {['오늘의 기분은?', '복약 알림', '일정 알림'].map((title) => {
              return (
                <div
                  key={title}
                  className="text-[20px] p-[12px] text-gray1 bg-secondary rounded-xl inline-block shrink-0 cursor-pointer transition-all duration-300 ease-in-out shadow-md hover:shadow-lg hover:shadow-secondary/50 hover:scale-105 hover:-translate-y-1 transform"
                >
                  {title}
                </div>
              );
            })}
        </div>}
        </div>
      <BottomTabBar />
    </div>
  );
}
