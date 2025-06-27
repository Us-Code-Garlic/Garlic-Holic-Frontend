'use client';
import Image from 'next/image';
import { useAudioRecorder } from '../../hooks/useAudioRecorder';
import useAudioStore from '../../store/audioStore';

interface VoiceButtonProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

export default function VoiceButton({ activeTab, setActiveTab }: VoiceButtonProps) {
  const { toggleRecording } = useAudioRecorder();
  const isRecording = useAudioStore((state) => state.isRecording);
  const tabId = 'voice';
  const icon = '/icons/Voice.svg';
  const label = '음성';

  return (
    <button
      onClick={() => {
        setActiveTab(tabId);
        toggleRecording();
      }}
      className={`flex flex-col items-center justify-center rounded-full cursor-pointer py-4 px-4 transition-all duration-300 ease-in-out ${
        isRecording ? 'bg-red-500' : 'bg-primary'
      } shadow-lg hover:shadow-2xl hover:shadow-primary/60 hover:scale-105 hover:text-white transform`}
    >
      <Image
        src={icon}
        alt={label}
        width={24}
        height={24}
        className={`${
          activeTab === tabId ? 'opacity-100 filter brightness-0 invert' : 'opacity-60 filter brightness-0 invert'
        }`}
      />
    </button>
  );
} 