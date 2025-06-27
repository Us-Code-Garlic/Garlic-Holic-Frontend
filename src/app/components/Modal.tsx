'use client';

import { useCallback, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const onClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  // 메인 레이아웃 컨테이너의 스크롤 제어
  useEffect(() => {
    const mainLayout = document.getElementById('main-layout');
    
    if (isOpen && mainLayout) {
      mainLayout.style.overflow = 'hidden';
    } else if (mainLayout) {
      mainLayout.style.overflow = 'unset';
    }

    return () => {
      if (mainLayout) {
        mainLayout.style.overflow = 'unset';
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="absolute inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={onClick}
    >
      <div className="bg-white rounded-2xl max-w-sm w-full shadow-xl max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );
} 