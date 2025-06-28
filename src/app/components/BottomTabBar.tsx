'use client';
import { useState } from 'react';
import CallButton from './buttons/CallButton';
import VoiceButton from './buttons/VoiceButton';
import useAudioStore from '../store/audioStore';

export default function BottomTabBar() {
  const [activeTab, setActiveTab] = useState('voice');
  const isLoading = useAudioStore((state) => state.isLoading);

  return (
    <div className="w-full bg-transparent text-white left-0 right-0 px-4 py-2 mb-2 sm:mb-4 md:mb-8">
      <div 
        className="flex items-center justify-around max-w-md mx-auto"
        style={{
          height: 'min(120px, 15vh)' // 높이에 따라 동적 조절
        }}
      >
        {isLoading ? (
          <CallButton activeTab={activeTab} setActiveTab={setActiveTab} />
        ) : (
          <VoiceButton activeTab={activeTab} setActiveTab={setActiveTab} />
        )}
      </div>
    </div>
  );
}
