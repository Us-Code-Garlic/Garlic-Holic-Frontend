'use client';

import { useState } from 'react';
import PatientCard from '../../components/settings/PatientCard';
import CaregiverCard from '../../components/settings/CaregiverCard';
import AddCaregiverCard from '../../components/settings/AddCaregiverCard';
import SettingsCharacter from '../../components/settings/SettingsCharacter';
import { PatientInfo, Caregiver } from '../../types/settings';

// 더미 데이터
const patientData: PatientInfo = {
  name: '홍길동',
  age: 79,
  height: 168,
  weight: 55,
  bloodType: 'A',
};

const initialCaregivers: Caregiver[] = [
  {
    id: '1',
    name: '홍길순',
    phone: '010-1234-1234',
    relationship: '보호자',
  },
  {
    id: '2',
    name: '홍길순',
    phone: '010-1234-1234',
    relationship: '보호자',
  },
];

const SettingsPage = () => {
  const [caregivers, setCaregivers] = useState<Caregiver[]>(initialCaregivers);

  const handleEditPatient = () => {
    console.log('환자 정보 수정');
    // 환자 정보 수정 모달 또는 페이지로 이동
  };

  const handleEditCaregiver = (id: string) => {
    console.log('보호자 수정:', id);
    // 보호자 수정 모달 또는 페이지로 이동
  };

  const handleDeleteCaregiver = (id: string) => {
    console.log('보호자 삭제:', id);
    // 삭제 확인 모달 후 삭제 처리
    setCaregivers(prev => prev.filter(caregiver => caregiver.id !== id));
  };

  const handleAddCaregiver = () => {
    console.log('보호자 추가');
    // 보호자 추가 모달 또는 페이지로 이동
  };

  return (
    <div className="bg-transparent min-h-screen font-sans text-[#432D27] p-4">
      {/* 환자 의료 정보 카드 */}
      <PatientCard 
        patient={patientData} 
        onEdit={handleEditPatient}
      />

      {/* 보호자 목록 */}
      {caregivers.map((caregiver) => (
        <CaregiverCard
          key={caregiver.id}
          caregiver={caregiver}
          onEdit={handleEditCaregiver}
          onDelete={handleDeleteCaregiver}
        />
      ))}

      {/* 보호자 추가 */}
      <AddCaregiverCard onAdd={handleAddCaregiver} />

      {/* 하단 캐릭터 */}
      <SettingsCharacter />
    </div>
  );
};

export default SettingsPage;
