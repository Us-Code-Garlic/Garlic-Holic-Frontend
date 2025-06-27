'use client';

import useAudioStore from '../store/audioStore';

export default function GlobalSpinner() {
  const isLoading = useAudioStore((state) => state.isLoading);

  if (!isLoading) return null;

  return (
    <div className="top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
    </div>
  );
}
