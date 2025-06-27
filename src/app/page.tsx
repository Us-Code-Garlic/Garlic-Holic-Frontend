import Image from 'next/image';
'use client';
import React, { useRef, useState } from 'react';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function Home() {
  return (
    <div className='h-screen'>
      <div className='bg-[#FCF8F5] max-w-[513px] mx-auto h-full'>
        <div className='flex flex-col items-center w-full'>
          <p className='text-[20px] flex'>탭하여 통화를 시작하세요.</p>
          <Image src='/neuri-1.svg' alt='느리_1' width={174} height={242} />
          <div className='px-[24px] py-[10px] w-full'>
            <div className='bg-white p-[24px] border border-[#B59779] rounded-xl flex justify-between'>
              <span className='flex-1'>가나다라</span>
              <img src='/right-arrow-circle.svg' />
            </div>
          </div>
          <div className="flex gap-[12px] justify-start w-full pl-[24px] overflow-x-auto scrollbar-hide whitespace-nowrap">
            {['오늘의 기분은?', '복약 알림', '오늘 일정 알림', '오늘 일정 알림1', '오늘 일정 알림2'].map((title) => {
              return (
                <div
                  key={title}
                  className="text-[20px] p-[12px] text-white bg-[#B59779] rounded-xl inline-block shrink-0"
                >
                  {title}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
