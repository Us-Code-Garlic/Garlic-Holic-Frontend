// 브라우저 내장 Web Speech API를 사용한 텍스트 음성 변환
export function speakTextBrowser(text: string, options?: {
  rate?: number;
  pitch?: number;
  volume?: number;
  lang?: string;
}) {
  // 브라우저 환경에서만 실행
  if (typeof window === 'undefined') {
    console.warn('speakTextBrowser는 브라우저 환경에서만 사용할 수 있습니다.');
    return;
  }

  if (!('speechSynthesis' in window)) {
    console.error('이 브라우저는 Web Speech API를 지원하지 않습니다.');
    return;
  }

  // 기존 음성 중지
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // 옵션 설정
  utterance.rate = options?.rate || 1;
  utterance.pitch = options?.pitch || 1;
  utterance.volume = options?.volume || 1;
  utterance.lang = options?.lang || 'ko-KR';

  // 이벤트 리스너
  utterance.onstart = () => console.log('음성 재생 시작');
  utterance.onend = () => console.log('음성 재생 완료');
  utterance.onerror = (event) => console.error('음성 재생 오류:', event.error);

  // 음성 재생
  window.speechSynthesis.speak(utterance);
}

// 음성 재생을 중지하는 함수
export function stopSpeech() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
} 