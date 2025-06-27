export interface DailyReportResponse {
  resultType: 'SUCCESS' | 'FAILURE';
  error: { message: string } | null;
  data: {
    id: string;
    date: string;
    patientName: string;
    mood: {
      emoji: string;
      status: string;
    };
    healthCheck: {
      completed: boolean;
      items: string[];
    };
    medication: {
      taken: boolean;
      time?: string;
    };
    cognitionTest: {
      score: number;
      totalScore: number;
    };
    memo: string;
    createdAt: string;
  } | null;
} 