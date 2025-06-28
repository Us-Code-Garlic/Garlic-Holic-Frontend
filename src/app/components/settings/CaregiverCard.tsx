'use client';

import Image from 'next/image';
import { Caregiver } from '../../types/settings';

interface CaregiverCardProps {
  caregiver: Caregiver;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function CaregiverCard({ caregiver, onEdit, onDelete }: CaregiverCardProps) {
  const handleEdit = () => {
    onEdit?.(caregiver.id);
  };

  const handleDelete = () => {
    onDelete?.(caregiver.id);
  };

  return (
    <div className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-primary">
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
          <Image 
            src="/graphic/icon_avatar02.svg" 
            alt="보호자" 
            width={48} 
            height={48}
          />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold">
            {caregiver.relationship ? `${caregiver.relationship} ` : ''}
            {caregiver.name}
          </h4>
          <p className="text-sm text-gray-600">📞 {caregiver.phone}</p>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <button 
          onClick={handleEdit}
          className="flex-1 py-2 bg-gray-200 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
        >
          수정
        </button>
        <button 
          onClick={handleDelete}
          className="flex-1 py-2 bg-gray-200 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
        >
          삭제
        </button>
      </div>
    </div>
  );
} 