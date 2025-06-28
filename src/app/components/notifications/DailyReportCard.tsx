'use client';

import BaseCard from './BaseCard';
import useModalStore from '../../store/modalStore';
import { Notification } from '../../(router)/notifications/data';
import ArrowRightIcon from '@/../public/icons/ArrowRight.svg';

interface DailyReportCardProps {
  notification: Notification;
}

export default function DailyReportCard({ notification }: DailyReportCardProps) {
  const { openModal } = useModalStore();

  const handleClick = () => {
    if (notification.reportData) {
      openModal(notification.id.toString(), notification.reportData);
    } else {
      openModal(notification.id.toString());
    }
  };

  return (
    <BaseCard
      type={notification.type}
      iconType="file"
      title={notification.title}
      description={notification.description}
      className="bg-white hover:bg-gray-50 transition-colors cursor-pointer border-primary"
      onClick={handleClick}
      rightElement={
        <ArrowRightIcon className="w-5 h-5 text-gray-400" />
      }
    />
  );
} 