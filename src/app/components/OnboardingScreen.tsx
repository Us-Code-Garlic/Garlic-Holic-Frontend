'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface OnboardingScreenProps {
  onComplete: () => void;
}

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 3000; // 3초
    const interval = 50; // 50ms마다 업데이트
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete(), 200); // 약간의 지연 후 완료
          return 100;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="h-full flex flex-col items-center justify-center w-full bg-[#FCF8F5] relative">
      <div className="flex flex-col items-center space-y-8">
        {/* 로딩 아이콘 */}
        <div className="relative">
          <Image 
            src="/icons/Loader.svg" 
            alt="로딩 중" 
            width={48} 
            height={48} 
            className="animate-spin"
          />
        </div>

        {/* 온보딩 캐릭터 */}
        <div className="flex justify-center items-center">
          <Image 
            src="/graphic/onboading.svg" 
            alt="느리 온보딩" 
            width={250} 
            height={250} 
            className="animate-pulse"
          />
        </div>

        {/* 온보딩 메시지 */}
        <div className="text-center space-y-4 px-6">
          <h1 className="text-2xl font-bold text-gray-800">
            느리와 함께하는 건강한 하루
          </h1>
          <p className="text-lg text-gray-600">
            AI 케어 도우미가 준비되고 있어요
          </p>
        </div>

        {/* 프로그레스 바 */}
        <div className="w-64 bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-[#B59779] to-[#D4B896] h-2 rounded-full transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* 로딩 텍스트 */}
        <p className="text-sm text-gray-500 animate-pulse">
          잠시만 기다려 주세요...
        </p>
      </div>
    </div>
  );
} 