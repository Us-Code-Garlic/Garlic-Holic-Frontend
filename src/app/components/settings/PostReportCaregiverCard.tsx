'use client';

interface PostReportCaregiverCardProps {
  onAdd?: () => void;
}

export default function PostReportCaregiverCard({ onAdd }: PostReportCaregiverCardProps) {
  return (
    <div 
      className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-primary cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={onAdd}
    >
      <div className="flex items-center justify-center">
        <span className="font-semibold">보호자에게 일일 보고서 발송</span>
       
      </div>
    </div>
  );
} 