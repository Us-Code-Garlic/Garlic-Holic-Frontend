'use client';

import Modal from './Modal';
import useModalStore from '../store/modalStore';

export default function ReportModal() {
  const { isOpen, reportId, closeModal } = useModalStore();

  if (!reportId) return null;

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <div className="p-6">
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold">일일 리포트</h2>
        </div>
        
        <div className="space-y-3 text-sm">
          <div>📈 [오늘의 건강 리포트]</div>
          <div>🍊 대상자: 홍길동 님</div>
          <div>🗓️ 날짜: 2025.06.29(일)</div>
          <div>⏰ 오늘의 상태</div>
          <div>✓ 기분: 😊 좋음</div>
          <div>• 건강 체크: ✅ 모든 항목</div>
          <div>• 복약 여부: ✅ ✓</div>
          <div>• 인지 퀴즈 점수: ⭐ 2/3</div>
          <div>⚠️ 오늘의 메모</div>
          <div className="text-gray-600">
            "마음이 여기저기 흩날려 조용할 필요여요."
          </div>
        </div>

        <button
          onClick={closeModal}
          className="w-full mt-6 py-3 bg-[#B59779] text-white rounded-lg font-medium"
        >
          확인
        </button>
      </div>
    </Modal>
  );
} 