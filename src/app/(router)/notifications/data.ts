export type NotificationType = 'daily-report' | 'medication' | 'emergency';

// API 응답에서 받는 리포트 데이터 타입
export interface ReportData {
  reportId: number;
  patientName: string;
  datetime: string;
  condition: string;
  healthStatus: string;
  isMedicine: boolean;
  memo: string;
}

// API 응답 타입
export interface NotificationApiResponse {
  resultType: 'SUCCESS' | 'FAILURE';
  error: string | null;
  success: ReportData[];
}

// 기존 notification 인터페이스 (UI용)
export interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD 형식
  reportData?: ReportData; // 일일 리포트의 경우 추가 데이터
}

// 실제 API 데이터를 기반으로 한 notifications
export const notifications: Notification[] = [
  {
    id: 1,
    type: 'daily-report',
    title: '일일 리포트',
    description: '강예정님의 일일 리포트가 생성되었습니다.',
    date: '2025-06-28',
    reportData: {
      reportId: 1,
      patientName: "강예정",
      datetime: "2025-06-28T06:35:18",
      condition: "좋음",
      healthStatus: "문제 없음",
      isMedicine: false,
      memo: "마늘밭 얘기하며 웃음꽃 피웠어."
    }
  },
  {
    id: 2,
    type: 'daily-report',
    title: '일일 리포트',
    description: '강예정님의 일일 리포트가 생성되었습니다.',
    date: '2025-06-27',
    reportData: {
      reportId: 2,
      patientName: "강예정",
      datetime: "2025-06-27T06:43:16",
      condition: "보통",
      healthStatus: "약간의 피로감",
      isMedicine: true,
      memo: "오늘은 조금 피곤해 보였지만 식사는 잘 하셨어요."
    }
  },
  {
    id: 3,
    type: 'medication',
    title: '복약 알림',
    description: '오전 8시에 관절염 약 2정을 복용해야 합니다.',
    date: new Date().toISOString().split('T')[0], // 오늘
  },
  {
    id: 4,
    type: 'daily-report',
    title: '일일 리포트',
    description: '강예정님의 일일 리포트가 생성되었습니다.',
    date: '2025-06-26',
    reportData: {
      reportId: 3,
      patientName: "강예정",
      datetime: "2025-06-26T07:15:32",
      condition: "좋음",
      healthStatus: "양호",
      isMedicine: true,
      memo: "아침 산책을 하며 기분이 매우 좋아 보였습니다."
    }
  },
  {
    id: 5,
    type: 'emergency',
    title: '긴급 알림',
    description: '치매 전조 증상 의심. 보호자에게 긴급 알림이 전송되었습니다.',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // 어제
  },
  {
    id: 6,
    type: 'medication',
    title: '복약 알림',
    description: '오전 8시에 관절염 약 2정을 복용해야 합니다.',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // 어제
  },
]; 