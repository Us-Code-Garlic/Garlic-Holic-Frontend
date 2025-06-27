'use client';

// import Link from 'next/link';
import { notifications, Notification } from './data';
import NotificationCard from './NotificationCard';
import ReportModal from '../../components/ReportModal';

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
  const groupedNotifications = groupNotificationsByDate(notifications);
  const sortedDates = Object.keys(groupedNotifications).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  return (
    <>
      <div className="bg-transparent min-h-screen font-sans text-[#432D27]">
        <div className="p-4">
          {sortedDates.map((date) => (
            <div key={date} className="mb-6">
              <h2 className="text-lg font-semibold mb-3">{formatDateLabel(date)}</h2>
              <div className="space-y-3">
                {groupedNotifications[date].map((notification) => (
                  <NotificationCard key={notification.id} notification={notification} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ReportModal />
    </>
  );
};

export default NotificationsPage; 