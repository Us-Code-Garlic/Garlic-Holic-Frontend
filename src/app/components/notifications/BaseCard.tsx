'use client';

import { ReactNode, ComponentType, SVGProps } from 'react';
import { NotificationType } from '../../(router)/notifications/data';

// SVG 컴포넌트 import
import NotificationIcon from '/public/icons/Notification.svg';
import FileIcon from '../../../../public/file.svg';

// 아이콘 매핑
const iconMap: Record<string, ComponentType<SVGProps<SVGElement>>> = {
  notification: NotificationIcon,
  file: FileIcon,
};

interface BaseCardProps {
  type?: NotificationType;
  iconType: 'notification' | 'file'; // icon prop을 iconType으로 변경
  title: string;
  description: string;
  className?: string;
  onClick?: () => void;
  rightElement?: ReactNode;
  iconColor?: string;
}

export default function BaseCard({ 
  type,
  iconType,
  title, 
  description, 
  className = '', 
  onClick,
  rightElement,
  iconColor
}: BaseCardProps) {
  // 아이콘 색상 결정 로직
  const getIconColorClass = () => {
    if (iconColor) {
      return iconColor;
    }
    
    if (type) {
      switch (type) {
        case 'emergency':
          return 'text-white';
        case 'daily-report':
          return 'text-primary';
        case 'medication':
          return 'text-primary';
        default:
          return 'text-primary';
      }
    }
    
    return 'text-primary';
  };

  // SVG 컴포넌트 가져오기
  const IconComponent = iconMap[iconType];

  return (
    <div
      className={`flex items-center p-4 rounded-lg shadow-md border ${className}`}
      onClick={onClick}
    >
      <div className="mr-4 flex-shrink-0">
        <IconComponent 
          width={36}  // 36x36 SVG를 24x24로 스케일링
          height={36}
          className={getIconColorClass()}
          aria-label={title}
        />
      </div>
      <div className="flex-grow">
        <h3 className="font-bold">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      {rightElement && (
        <div className="ml-4 flex-shrink-0">
          {rightElement}
        </div>
      )}
    </div>
  );
} 