import { useRef } from 'react';
import useAudioStore from '../store/audioStore';
import { postVoice } from '../services/voice';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export const useAudioRecorder = () => {
  const recognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { setIsLoading, setAudioUrl, isRecording, setIsRecording } = useAudioStore();

  const uploadAudio = async () => {
    const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
    setAudioUrl(URL.createObjectURL(blob));

    setIsLoading(true);
    try {
      const response = await postVoice(blob);
      console.log(response);
      if (response.success) {
        alert(`결과: ${response.success.answer}`);
      } else {
        alert(`에러: ${response.error?.message || '알 수 없는 오류'}`);
      }
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : '업로드 실패';
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };
      recorder.onstop = uploadAudio;
      mediaRecorderRef.current = recorder;
      recorder.start();

      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SR) return alert('SpeechRecognition 미지원');
      const recog = new SR();
      recog.lang = 'ko-KR';
      recog.interimResults = false;
      recog.onresult = (e: any) => {
        console.log('인식:', e.results[0][0].transcript);
      };
      recog.onend = () => {
        mediaRecorderRef.current?.stop();
        setIsRecording(false);
      };
      recog.onerror = () => {
        mediaRecorderRef.current?.stop();
        setIsRecording(false);
      };
      recognitionRef.current = recog;
      recog.start();

      setIsRecording(true);
    } catch (error) {
      console.error('녹음 시작 실패:', error);
      alert('마이크 접근 권한이 필요합니다.');
    }
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return {
    startRecording,
    stopRecording,
    toggleRecording,
  };
}; 