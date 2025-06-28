'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

import NotificationIcon from '@/../public/icons/Notification.svg';
// NavBar 설정 타입 정의
interface NavBarConfig {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
}

// 뒤로가기 버튼 컴포넌트
const BackButton = ({ href }: { href: string }) => (
  <Link href={href} className="p-2">
<Image src="/icons/ArrowLeftCircle.svg" alt="뒤로가기" width={30} height={30} />
  </Link>
);

// 홈 NavBar 아이콘들 컴포넌트
const HomeIcons = () => (
  <div className="flex items-center gap-4">
    <Link href="/notifications">
   <NotificationIcon width={36} height={36} className="cursor-pointer text-primary" />
    </Link>
    <Link href="/settings">
      <Image
        src="/icons/Setting.svg"
        alt="세팅"
        width={36}
        height={36}
        className="cursor-pointer"
      />
    </Link>
  </div>
);

// 페이지 제목 컴포넌트
const PageTitle = ({ title }: { title: string }) => (
  <h1 className="text-xl font-bold">{title}</h1>
);



// 빈 공간 컴포넌트
const EmptySpace = () => <div></div>;

// 경로별 NavBar 설정 객체
const navbarConfigs: Record<string, NavBarConfig> = {
  // 홈페이지
  '/': {
    left: <EmptySpace />,
    right: <HomeIcons />,
  },
  
  // 알림 페이지
  '/notifications': {
    left: <BackButton href="/" />,
    center: <PageTitle title="알림" />,
    right: <EmptySpace />,
  },
  
  // 설정 페이지
  '/settings': {
    left: <BackButton href="/" />,
    center: <PageTitle title="설정" />,
    right: <EmptySpace />,
  },
  
  // 리포트 페이지 (동적 라우트를 위한 패턴)
  '/reports': {
    left: <BackButton href="/notifications" />,
    center: <PageTitle title="리포트 상세" />,
    right: <EmptySpace />,
  },
};

// 경로를 기반으로 설정을 찾는 함수
const getNavBarConfig = (pathname: string): NavBarConfig => {
  // 정확한 경로 매칭
  if (navbarConfigs[pathname]) {
    return navbarConfigs[pathname];
  }
  
  // 동적 라우트 매칭 (예: /reports/123 -> /reports)
  for (const [route, config] of Object.entries(navbarConfigs)) {
    if (pathname.startsWith(route) && route !== '/') {
      return config;
    }
  }
  
  // 기본값 (홈페이지 설정)
  return navbarConfigs['/'];
};

export default function Navbar() {
  const pathname = usePathname();
  const config = getNavBarConfig(pathname);

  return (
    <nav className="w-full h-[60px] flex py-2 text-primary items-center bg-transparent relative">
      {/* 좌측 - 절대 위치 */}
      <div className="absolute left-0 flex items-center">
        {config.left}
      </div>
      
      {/* 중앙 - 절대 위치로 정중앙에 배치 */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
        {config.center}
      </div>
      
      {/* 우측 - 절대 위치 */}
      <div className="absolute right-0 flex items-center">
        {config.right}
      </div>
    </nav>
  );
} 