import { NextRequest, NextResponse } from 'next/server';
import textToSpeech from '@google-cloud/text-to-speech';

// Google Cloud 인증 설정
process.env.GOOGLE_APPLICATION_CREDENTIALS = 'C://Users/YJ/key/sinuous-axiom-464220-u8-2c4a1c01cf61.json';

// 클라이언트 생성
const client = new textToSpeech.TextToSpeechClient();

export async function POST(request: NextRequest) {
  try {
    const { text, voiceGender = 'FEMALE', languageCode = 'ko-KR' } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const request_tts = {
      input: { text },
      voice: { 
        languageCode: languageCode, 
        ssmlGender: voiceGender as 'FEMALE' | 'MALE' | 'NEUTRAL'
      },
      audioConfig: { 
        audioEncoding: 'MP3' as const,
        speakingRate: 0.9, // 조금 느리게
        pitch: 0.5,        // 조금 높은 톤
      },
    };

    const [response] = await client.synthesizeSpeech(request_tts);
    
    if (!response.audioContent) {
      return NextResponse.json({ error: 'Failed to generate audio' }, { status: 500 });
    }

    // 오디오 데이터를 base64로 인코딩하여 반환
    const audioBase64 = Buffer.from(response.audioContent).toString('base64');
    
    return NextResponse.json({ 
      audioData: audioBase64,
      mimeType: 'audio/mpeg'
    });

  } catch (error) {
    console.error('TTS API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 