import React, { useState } from 'react';
import Modal from './Modal';

interface MedicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { date: string; time: string; medication: string; dosage: string; }) => void;
}

const MedicationModal: React.FC<MedicationModalProps> = ({ isOpen, onClose, onSave }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [medication, setMedication] = useState('');
  const [dosage] = useState('');

  const handleSave = () => {
    onSave({ date, time, medication, dosage });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">복약 알림 설정</h2>
        <div className="mb-4">
          <label className="block font-medium text-gray-700">종류</label>
          <input
            type="date"
            value={date}
            placeholder='관절염 약 2정'
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 px-4 py-3 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium text-gray-700">시간</label>
          <input
            type="time"
            value={time}
            placeholder='매일 아침 8시'
            onChange={(e) => setTime(e.target.value)}
            className="mt-1 block w-full border border-gray-300 px-4 py-3 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium text-gray-700">기타</label>
          <input
            type="text"
            value={medication}
            placeholder={"붓기 발생 시 복용 중단"}
            onChange={(e) => setMedication(e.target.value)}
            className="mt-1 block w-full border border-gray-300 px-4 py-3 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md mr-2"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="bg-primary text-white px-4 py-2 rounded-md"
          >
            저장
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default MedicationModal; 