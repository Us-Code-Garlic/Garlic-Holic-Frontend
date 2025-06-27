'use client';

interface AddCaregiverCardProps {
  onAdd?: () => void;
}

export default function AddCaregiverCard({ onAdd }: AddCaregiverCardProps) {
  return (
    <div 
      className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-primary cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={onAdd}
    >
      <div className="flex items-center justify-between">
        <span className="font-semibold">보호자 추가</span>
        <div className="w-8 h-8 bg-[#B59779] rounded-full flex items-center justify-center">
          <span className="text-white text-lg font-bold">+</span>
        </div>
      </div>
    </div>
  );
} 