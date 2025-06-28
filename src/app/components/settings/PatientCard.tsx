'use client';

import Image from 'next/image';
import { PatientInfo } from '../../types/settings';

interface PatientCardProps {
  patient: PatientInfo;
  onEdit?: () => void;
}

export default function PatientCard({ patient, onEdit }: PatientCardProps) {
  return (
    <div className="bg-white px-9 py-5 rounded-2xl p-4 mb-4 border-primary shadow-sm border">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg mb-2">{patient.name} 님 의료 정보</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <div>나이 : {patient.age}세</div>
            <div>신장 : {patient.height}cm</div>
            <div>체중 : {patient.weight}kg</div>
            <div>혈액형 : {patient.bloodType}</div>
          </div>
        </div>
        <div 
          className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer"
          onClick={onEdit}
        >
          <Image 
            src={"/graphic/icon_avatar01.svg"} 
            alt="프로필" 
            width={80} 
            height={80}
          />
        </div>
      </div>
    </div>
  );
} 