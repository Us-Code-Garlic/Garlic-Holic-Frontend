'use client';

import { useState, useEffect } from 'react';
import { Notification, ReportData } from './data';
import NotificationCard from './NotificationCard';
import { getNotificationReports } from '../../services/report';

// 리포트 데이터에서 문제를 감지하는 함수
const detectProblems = (report: ReportData): string[] => {
  const problems: string[] = [];

  // 건강 상태 체크
  const criticalHealthStatus = ['문제 있음', '위험', '심각함', '응급'];
  const warningHealthStatus = ['주의 필요', '약간의 문제', '관찰 필요'];
  
  if (criticalHealthStatus.some(status => 
    report.healthStatus.toLowerCase().includes(status.toLowerCase())
  )) {
    problems.push(`건강 상태가 심각합니다: ${report.healthStatus}`);
  } else if (warningHealthStatus.some(status => 
    report.healthStatus.toLowerCase().includes(status.toLowerCase())
  )) {
    problems.push(`건강 상태 주의: ${report.healthStatus}`);
  }

  // 기분 상태 체크
  const badConditions = ['나쁨', '우울', '심각함', '매우 나쁨'];
  if (badConditions.some(condition => 
    report.condition.toLowerCase().includes(condition.toLowerCase())
  )) {
    problems.push(`기분 상태가 좋지 않습니다: ${report.condition}`);
  }

  // 복약 미복용 체크
  if (!report.isMedicine) {
    problems.push('복약을 하지 않았습니다');
  }

  // 메모에서 위험 키워드 체크
  const dangerKeywords = ['쓰러', '아프', '위험', '응급', '문제', '심각', '병원'];
  const hasDangerKeyword = dangerKeywords.some(keyword => 
    report.memo.includes(keyword)
  );
  if (hasDangerKeyword) {
    problems.push(`메모에 주의사항이 있습니다: ${report.memo}`);
  }

  return problems;
};

// API 데이터를 UI용 Notification 형식으로 변환하는 함수
const convertApiDataToNotifications = (reportData: ReportData[]): Notification[] => {
  const notifications: Notification[] = [];
  
  reportData.forEach((report, index) => {
    // 기본 일일 리포트 알림 추가
    notifications.push({
      id: report.reportId,
      type: 'daily-report' as const,
      title: '일일 리포트',
      description: `${report.patientName}님의 일일 리포트가 생성되었습니다.`,
      date: report.datetime.split('T')[0], // YYYY-MM-DD 형식으로 변환
      reportData: report
    });

    // 문제 감지 시 긴급 알림 추가
    const problems = detectProblems(report);
    if (problems.length > 0) {
      const emergencyId = report.reportId * 1000 + index; // 고유 ID 생성
      let emergencyTitle = '';
      let emergencyDescription = '';

      if (problems.length === 1) {
        emergencyTitle = '주의 알림';
        emergencyDescription = `${report.patientName}님: ${problems[0]}`;
      } else {
        emergencyTitle = '긴급 알림';
        emergencyDescription = `${report.patientName}님에게 문제가 감지되었습니다. 즉시 확인이 필요합니다.`;
      }

      notifications.push({
        id: emergencyId,
        type: 'emergency' as const,
        title: emergencyTitle,
        description: emergencyDescription,
        date: report.datetime.split('T')[0],
        reportData: report // 원본 리포트 데이터 참조
      });
    }
  });

  return notifications;
};

// 날짜별로 알림을 그룹화하는 함수
const groupNotificationsByDate = (notifications: Notification[]) => {
  return notifications.reduce(
    (acc, notification) => {
      const date = notification.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(notification);
      return acc;
    },
    {} as Record<string, Notification[]>,
  );
};

// 날짜 문자열을 "오늘", "어제" 등으로 변환하는 함수
const formatDateLabel = (date: string) => {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  today.setDate(today.getDate() - 1);
  const yesterdayStr = today.toISOString().split('T')[0];

  if (date === todayStr) {
    return '오늘';
  }
  if (date === yesterdayStr) {
    return '어제';
  }
  return date;
};

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setIsLoading(true);
        const apiResponse = await getNotificationReports();
        
        if (apiResponse && apiResponse.resultType === 'SUCCESS') {
          const convertedNotifications = convertApiDataToNotifications(apiResponse.success);
          setNotifications(convertedNotifications);
        } else {
          setError('알림 데이터를 불러올 수 없습니다.');
        }
      } catch (err) {
        console.error('알림 데이터 로딩 실패:', err);
        setError('알림 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-transparent min-h-screen font-sans text-[#432D27] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>알림을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-transparent min-h-screen font-sans text-[#432D27] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-primary text-white rounded-lg"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  const groupedNotifications = groupNotificationsByDate(notifications);
  const sortedDates = Object.keys(groupedNotifications).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  // 날짜별로 알림을 정렬 (emergency가 맨 위에 오도록)
  Object.keys(groupedNotifications).forEach(date => {
    groupedNotifications[date].sort((a, b) => {
      if (a.type === 'emergency' && b.type !== 'emergency') return -1;
      if (a.type !== 'emergency' && b.type === 'emergency') return 1;
      return 0;
    });
  });

  return (
    <div className="bg-transparent min-h-screen font-sans text-[#432D27]">
      <div className="p-4">
        {sortedDates.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">알림이 없습니다.</p>
          </div>
        ) : (
          sortedDates.map((date) => (
            <div key={date} className="mb-6">
              <h2 className="text-lg font-semibold mb-3">{formatDateLabel(date)}</h2>
              <div className="space-y-3">
                {groupedNotifications[date].map((notification) => (
                  <NotificationCard key={notification.id} notification={notification} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsPage; 