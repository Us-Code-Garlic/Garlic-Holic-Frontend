'use client';

import BaseCard from './BaseCard';
import { Notification } from '../../(router)/notifications/data';

interface MedicationCardProps {
  notification: Notification;
}

export default function MedicationCard({ notification }: MedicationCardProps) {
  const handleClick = () => {
    console.log('복약 알림 클릭:', notification.id);
    // 복약 관련 액션 처리
  };

  return (
    <BaseCard
      type={notification.type}
      iconType="notification"
      title={notification.title}
      description={notification.description}
      className="bg-white hover:bg-blue-50 transition-colors cursor-pointer border-primary"
      onClick={handleClick}
    />
  );
} 