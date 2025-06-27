'use client';

import Image from 'next/image';

interface SettingsCharacterProps {
  characterSrc?: string;
  size?: number;
}

export default function SettingsCharacter({ 
  characterSrc = "/graphic/graphic_nuri_01.svg", 
  size = 120 
}: SettingsCharacterProps) {
  return (
    <div className="flex justify-center mt-8">
      <Image 
        src={characterSrc} 
        alt="누리 캐릭터" 
        width={size} 
        height={size}
      />
    </div>
  );
} 