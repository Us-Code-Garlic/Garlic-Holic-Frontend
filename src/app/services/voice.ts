export interface VoiceResponse {
  resultType: 'SUCCESS' | 'FAILURE';
  error: { message: string } | null;
  success: {
    answer: string;
    isDementia: boolean;
  } | null;
}

export const postVoice = async (blob: Blob): Promise<any> => {
  const data = new FormData();
  data.append('audio', blob, 'rec.webm');

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error(
      'API URL이 설정되지 않았습니다. .env.local 파일을 확인해주세요.',
    );
  }

  try {
    console.log('Requesting to:', `${apiUrl}/voice-chat`);
    const res = await fetch(
      `${apiUrl}/voice-chat`,
      {
        method: 'POST',
        body: data,
      },
    );
    console.log(res)
    if (!res.ok) {
      throw new Error(`서버 응답 에러: ${res.status}`);
    }

    const responseData: VoiceResponse = await res.json();
    return responseData;
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      throw new Error(`음성 업로드에 실패했습니다: ${e.message}`);
    }
    throw new Error('알 수 없는 오류로 음성 업로드에 실패했습니다.');
  }
};