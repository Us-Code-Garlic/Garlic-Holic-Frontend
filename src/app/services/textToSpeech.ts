// 브라우저 내장 Web Speech API를 사용한 텍스트 음성 변환

// 가장 좋은 한국어 목소리를 자동으로 선택하는 함수
function getBestKoreanVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null;
  }
  
  const voices = window.speechSynthesis.getVoices();
  const koreanVoices = voices.filter(voice => 
    voice.lang.includes('ko') || 
    voice.lang.includes('KR') ||
    voice.name.includes('Korean')
  );
  
  if (koreanVoices.length === 0) {
    return null;
  }
  
  // 우선순위: Google > Microsoft > 기타 순으로 선택
  const preferredVoices = [
    'Google 한국의',
    'Microsoft Heami',
    'Microsoft SunHi',
    'Yuna',
    'Sora'
  ];
  
  for (const preferred of preferredVoices) {
    const voice = koreanVoices.find(v => 
      v.name.toLowerCase().includes(preferred.toLowerCase())
    );
    if (voice) return voice;
  }
  
  // 우선순위 목소리가 없으면 첫 번째 한국어 목소리 사용
  return koreanVoices[0];
}

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
  
  // 가장 좋은 한국어 목소리 자동 설정
  const bestVoice = getBestKoreanVoice();
  if (bestVoice) {
    utterance.voice = bestVoice;
    console.log('선택된 목소리:', bestVoice.name);
  }
  
  // 옵션 설정 (부드럽고 자연스러운 설정)
  utterance.rate = options?.rate || 0.9; // 조금 느리게
  utterance.pitch = options?.pitch || 1.1; // 조금 높은 톤
  utterance.volume = options?.volume || 1;
  utterance.lang = options?.lang || 'ko-KR';

  // 이벤트 리스너
  utterance.onstart = () => console.log('음성 재생 시작');
  utterance.onend = () => console.log('음성 재생 완료');
  utterance.onerror = (event) => console.error('음성 재생 오류:', event.error);

  // 음성 재생
  window.speechSynthesis.speak(utterance);
}

// Google Cloud TTS API를 사용한 텍스트 음성 변환 (더 좋은 음질)
export async function speakTextGoogleTTS(text: string, options?: {
  voiceGender?: 'FEMALE' | 'MALE' | 'NEUTRAL';
  languageCode?: string;
}) {
  try {
    console.log('Google TTS API 호출 중...');
    
    const response = await fetch('/api/tts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        voiceGender: options?.voiceGender || 'FEMALE',
        languageCode: options?.languageCode || 'ko-KR'
      }),
    });

    if (!response.ok) {
      throw new Error(`API 오류: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }

    // Base64 오디오 데이터를 Blob으로 변환
    const audioData = atob(data.audioData);
    const audioArray = new Uint8Array(audioData.length);
    for (let i = 0; i < audioData.length; i++) {
      audioArray[i] = audioData.charCodeAt(i);
    }
    const audioBlob = new Blob([audioArray], { type: data.mimeType });
    
    // 오디오 URL 생성 및 재생
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    
    // 재생 완료 후 URL 해제
    audio.onended = () => {
      URL.revokeObjectURL(audioUrl);
      console.log('Google TTS 재생 완료');
    };
    
    audio.onerror = (error) => {
      URL.revokeObjectURL(audioUrl);
      console.error('오디오 재생 오류:', error);
    };
    
    console.log('Google TTS 재생 시작');
    await audio.play();
    
  } catch (error) {
    console.error('Google TTS 오류:', error);
    // 실패 시 브라우저 기본 TTS로 폴백
    console.log('브라우저 TTS로 폴백...');
    speakTextBrowser(text);
  }
}

// 통합 음성 재생 함수 (Google TTS 우선, 실패 시 브라우저 TTS 폴백)
export async function speakText(text: string, useGoogleTTS: boolean = true) {
  if (useGoogleTTS) {
    await speakTextGoogleTTS(text);
  } else {
    speakTextBrowser(text);
  }
}

// 음성 재생을 중지하는 함수
export function stopSpeech() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  
  // 페이지의 모든 오디오 요소 정지
  const audioElements = document.querySelectorAll('audio');
  audioElements.forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });
} 