'use client';

import { useEffect } from 'react';
import Modal from './Modal';
import useModalStore from '../store/modalStore';
import { getDailyReportMock } from '../services/report';

export default function ReportModal() {
  const { 
    isOpen, 
    reportId, 
    reportData, 
    isLoading, 
    error,
    closeModal, 
    setReportData, 
    setLoading, 
    setError 
  } = useModalStore();

  // 모달이 열리고 reportId가 있지만 reportData가 없을 때만 API 호출
  useEffect(() => {
    if (isOpen && reportId && !reportData) {
      const fetchReport = async () => {
        setLoading(true);
        try {
          const response = await getDailyReportMock(reportId);
          if (response.resultType === 'SUCCESS' && response.data) {
            // 기존 DailyReportResponse 데이터를 ReportData 형식으로 변환
            const convertedData = {
              reportId: parseInt(reportId),
              patientName: response.data.patientName,
              datetime: response.data.createdAt,
              condition: response.data.mood.status,
              healthStatus: response.data.healthCheck.completed ? '정상' : '주의 필요',
              isMedicine: response.data.medication.taken,
              memo: response.data.memo
            };
            setReportData(convertedData);
          } else {
            setError(response.error?.message || '리포트를 불러올 수 없습니다.');
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
        }
      };

      fetchReport();
    }
  }, [isOpen, reportId, reportData, setLoading, setReportData, setError]);

  if (!reportId) return null;

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <div className="p-6">
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold">일일 리포트</h2>
        </div>
        
        {isLoading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-gray-600">리포트를 불러오는 중...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {reportData && !isLoading && (
          <div className="space-y-3 text-sm">
            <div>📈 [오늘의 건강 리포트]</div>
            <div>🍊 대상자: {reportData.patientName} 님</div>
            <div>🗓️ 날짜: {new Date(reportData.datetime).toLocaleDateString('ko-KR')}</div>
            <div>⏰ 오늘의 상태</div>
            <div>✓ 기분: {reportData.condition === '좋음' ? '😊' : reportData.condition === '보통' ? '😐' : '😞'} {reportData.condition}</div>
            <div>✓ 건강 상태: {reportData.healthStatus === '문제 없음' || reportData.healthStatus === '정상' ? '✅' : '⚠️'} {reportData.healthStatus}</div>
            <div>✓ 복약 여부: {reportData.isMedicine ? '✅ 복용함' : '❌ 미복용'}</div>
          </div>
        )}

        <button
          onClick={closeModal}
          className="w-full mt-6 py-3 bg-primary text-white rounded-lg font-medium"
          disabled={isLoading}
        >
          확인
        </button>
      </div>
    </Modal>
  );
} 