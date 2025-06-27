'use client';

import { Notification } from '../../(router)/notifications/data';
import BaseCard from './BaseCard';

interface EmergencyCardProps {
  notification: Notification;
}

export default function EmergencyCard({ notification }: EmergencyCardProps) {
  const handleClick = () => {
    console.log('응급 알림 클릭:', notification.id);
    // 응급 상황 관련 액션 처리
  };

  return (
    <BaseCard
      type={notification.type}
      iconType="notification"
      title={notification.title}
      description={notification.description}
      className="bg-red-100 border-red-200 hover:bg-red-150 transition-colors cursor-pointer"
      onClick={handleClick}
    />
  );
} 