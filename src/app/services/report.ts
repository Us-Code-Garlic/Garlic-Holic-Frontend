import { DailyReportResponse } from './types';

export const getDailyReport = async (reportId: string): Promise<DailyReportResponse> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/daily-reports/${reportId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!res.ok) {
      throw new Error(`서버 응답 에러: ${res.status}`);
    }

    const responseData: DailyReportResponse = await res.json();
    return responseData;
  } catch (e) {
    console.error('일일 리포트 조회 실패:', e);
    if (e instanceof Error) {
      throw new Error(`일일 리포트 조회에 실패했습니다: ${e.message}`);
    }
    throw new Error('알 수 없는 오류로 일일 리포트 조회에 실패했습니다.');
  }
};

// 데모용 모킹 함수 (실제 API가 없을 때 사용)
export const getDailyReportMock = async (reportId: string): Promise<DailyReportResponse> => {
  // 실제 API 호출을 시뮬레이션하기 위한 지연
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // 데모 데이터 반환
  return {
    resultType: 'SUCCESS',
    error: null,
    data: {
      id: reportId,
      date: '2025.06.29',
      patientName: '홍길동',
      mood: {
        emoji: '😊',
        status: '좋음'
      },
      healthCheck: {
        completed: true,
        items: ['혈압 측정', '체온 체크', '걸음 수 확인']
      },
      medication: {
        taken: true,
        time: '09:00'
      },
      cognitionTest: {
        score: 2,
        totalScore: 3
      },
      memo: '마음이 여기저기 흩날려 조용할 필요여요.',
      createdAt: '2025-06-29T09:00:00Z'
    }
  };
}; 