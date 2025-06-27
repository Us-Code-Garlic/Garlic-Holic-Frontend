import { create } from 'zustand';
import { devtools } from 'zustand/middleware'
interface AudioState {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  audioUrl: string | null;
  setAudioUrl: (audioUrl: string | null) => void;
  isRecording: boolean;
  setIsRecording: (isRecording: boolean) => void;
}

const useAudioStore = create<AudioState>()(
  devtools((set) => ({
    isLoading: false,
    setIsLoading: (isLoading: boolean) => set({ isLoading }),
    audioUrl: null,
    setAudioUrl: (audioUrl: string | null) => set({ audioUrl }),
    isRecording: false,
    setIsRecording: (isRecording: boolean) => set({ isRecording }),
  }))
);

export default useAudioStore;