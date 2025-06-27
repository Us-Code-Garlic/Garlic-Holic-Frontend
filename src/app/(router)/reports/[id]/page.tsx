'use client';

import Link from "next/link";

interface ReportPageProps {
  params: {
    id: string;
  };
}

const ReportPage = ({ params }: ReportPageProps) => {
  return (
    <div className="p-4 bg-white rounded-lg">
        <Link href="/notifications" className="text-blue-500 mb-4 inline-block">
            &larr; 알림 목록으로 돌아가기
        </Link>
      <h1 className="text-xl font-bold">리포트 상세</h1>
      <p className="mt-2">리포트 ID: {params.id}</p>
      <div className="mt-4 p-4 border rounded-md bg-gray-50">
        <p>이곳에 ID {params.id}에 해당하는 리포트 상세 내용이 표시됩니다.</p>
      </div>
    </div>
  );
};

export default ReportPage; 