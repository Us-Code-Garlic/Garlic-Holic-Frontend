'use client';

import { Notification } from './data';
import DailyReportCard from '../../components/notifications/DailyReportCard';
import MedicationCard from '../../components/notifications/MedicationCard';
import EmergencyCard from '../../components/notifications/EmergencyCard';

interface NotificationCardProps {
  notification: Notification;
}

const NotificationCard = ({ notification }: NotificationCardProps) => {
  switch (notification.type) {
    case 'daily-report':
      return <DailyReportCard notification={notification} />;
    
    case 'medication':
      return <MedicationCard notification={notification} />;
    
    case 'emergency':
      return <EmergencyCard notification={notification} />;
    
    default:
      return null;
  }
};

export default NotificationCard; 