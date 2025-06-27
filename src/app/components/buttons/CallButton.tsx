'use client';
import Image from 'next/image';

interface CallButtonProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

export default function CallButton({ activeTab, setActiveTab }: CallButtonProps) {
  const tabId = 'call';
  const icon = '/icons/CallSilent.svg';
  const label = '통화';

  const handler = () => console.log('통화 기능');

  return (
    <button
      onClick={() => {
        setActiveTab(tabId);
        handler();
      }}
      className={`flex flex-col items-center justify-center rounded-full cursor-pointer py-4 px-4 transition-all duration-300 ease-in-out bg-primary shadow-lg hover:shadow-2xl hover:shadow-primary/60 hover:scale-105 hover:text-white transform`}
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