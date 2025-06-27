'use client';

import Image from 'next/image';
// import Link from 'next/link';
import { Notification, NotificationType } from './data';
import useModalStore from '../../store/modalStore';

interface NotificationCardProps {
  notification: Notification;
}

const iconSrcMap: Record<NotificationType, string> = {
  'daily-report': '/file.svg',
  medication: '/icons/Notification.svg',
  emergency: '/icons/Notification.svg',
};

const NotificationCard = ({ notification }: NotificationCardProps) => {
  const { type, title, description, id } = notification;
  const iconSrc = iconSrcMap[type];
  const { openModal } = useModalStore();

  const cardStyle = {
    'daily-report': 'bg-white hover:bg-gray-50 transition-colors cursor-pointer',
    medication: 'bg-white',
    emergency: 'bg-red-100 border-red-200',
  };

  const cardContent = (
    <div
      className={`flex items-center p-4 rounded-lg shadow-md border ${cardStyle[type]}`}
    >
      <div className="mr-4 flex-shrink-0">
        <Image src={iconSrc} alt={title} width={24} height={24} />
      </div>
      <div className="flex-grow">
        <h3 className="font-bold">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      {type === 'daily-report' && (
        <div className="ml-4 flex-shrink-0">
          <Image src="/right-arrow-circle.svg" alt="이동" width={20} height={20} />
        </div>
      )}
    </div>
  );

  if (type === 'daily-report') {
    return (
      <div onClick={() => openModal(id)} className="block">
        {cardContent}
      </div>
    );
  }

  return cardContent;
};

export default NotificationCard; 