'use client';
import React, { useRef, useState } from 'react';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function Home() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    // 1) 마이크 접근
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    audioChunksRef.current = [];

    recorder.ondataavailable = (e) => {
      audioChunksRef.current.push(e.data);
    };
    recorder.onstop = uploadAudio;
    mediaRecorderRef.current = recorder;
    recorder.start();

    // 2) SpeechRecognition 세팅
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return alert('SpeechRecognition 미지원');
    const recog = new SR();
    recog.lang = 'ko-KR';
    recog.interimResults = false;
    recog.onresult = (e: any) => {
      console.log('인식:', e.results[0][0].transcript);
    };
    recog.onend = () => {
      // 사용자가 말 멈추면 녹음 종료
      mediaRecorderRef.current?.stop();
    };
    recog.onerror = () => {
      // 오류가 나도 녹음 종료
      mediaRecorderRef.current?.stop();
    };
    recognitionRef.current = recog;
    recog.start();

    setIsRecording(true);
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const uploadAudio = async () => {
    const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
    setAudioUrl(URL.createObjectURL(blob));

    const data = new FormData();
    data.append('audio', blob, 'rec.webm');

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/uvoice-chat`,
        { method: 'POST', body: data }
      );
      // 응답 처리는 필요에 따라 나중에 구현
      console.log('업로드 완료', res.status);
    } catch (e) {
      console.error(e);
      alert('업로드 실패');
    }
  };

  return (
    <main className="p-6">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isRecording ? '녹음 중지' : '녹음 시작'}
      </button>

      {audioUrl && (
        <div className="mt-4">
          <audio src={audioUrl} controls />
        </div>
      )}
    </main>
  );
}
