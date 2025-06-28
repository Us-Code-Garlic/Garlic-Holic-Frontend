import { DailyReportResponse } from './types.js';
import { NotificationApiResponse } from '../(router)/notifications/data';

export const sendDailyReport = async (): Promise<number> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/mail?toEmail=1`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('API 응답 상태:', res.status);
    
    if (!res.ok) {
      console.error(`서버 응답 에러: ${res.status}`);
      return res.status; // 실제 상태 코드 반환
    }
    
    return res.status; // 성공 시에도 실제 상태 코드 반환
  } catch (e) {
    console.error('일일 리포트 전송 실패:', e);
    return 0; // 네트워크 에러 등의 경우 0 반환
  }
};

// 알림 데이터를 API에서 가져오는 함수
export const getNotificationReports = async (): Promise<NotificationApiResponse | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/report`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('알림 데이터 API 응답 상태:', res.status);
    
    if (!res.ok) {
      console.error(`서버 응답 에러: ${res.status}`);
      return null;
    }
    
    const data: NotificationApiResponse = await res.json();
    return data;
  } catch (e) {
    console.error('알림 데이터 조회 실패:', e);
    return null;
  }
};

export const getDailyReport = async (): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/report`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('API 응답 상태:', res.status);
    
    if (!res.ok) {
      console.error(`서버 응답 에러: ${res.status}`);
      return res.status;
    }
    
    const data = await res.json();
    return data;
  } catch (e) {
    console.error('일일 리포트 조회 실패:', e);
    return null;
  }
};

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
      patientName: '강예정',
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