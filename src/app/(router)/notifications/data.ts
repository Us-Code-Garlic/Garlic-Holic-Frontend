export type NotificationType = 'daily-report' | 'medication' | 'emergency';

export interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD 형식
}

export const notifications: Notification[] = [
  {
    id: 1,
    type: 'daily-report',
    title: '일일 리포트',
    description: '보호자에게 일일 리포트가 전송되었습니다.',
    date: new Date().toISOString().split('T')[0], // 오늘
  },
  {
    id: 2,
    type: 'medication',
    title: '복약 알림',
    description: '오전 8시에 관절염 약 2정을 복용해야 합니다.',
    date: new Date().toISOString().split('T')[0], // 오늘
  },
  {
    id: 3,
    type: 'daily-report',
    title: '일일 리포트',
    description: '보호자에게 일일 리포트가 전송되었습니다.',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // 어제
  },
  {
    id: 4,
    type: 'emergency',
    title: '긴급 알림',
    description: '치매 전조 증상 의심. 보호자에게 긴급 알림이 전송되었습니다.',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // 어제
  },
  {
    id: 5,
    type: 'medication',
    title: '복약 알림',
    description: '오전 8시에 관절염 약 2정을 복용해야 합니다.',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // 어제
  },
  {
    id: 6,
    type: 'daily-report',
    title: '일일 리포트',
    description: '보호자에게 일일 리포트가 전송되었습니다.',
    date: new Date(Date.now() - 172800000).toISOString().split('T')[0], // 그저께
  },
]; 