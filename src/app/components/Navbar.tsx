'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const isNotificationPage = pathname === '/notifications';
console.log(pathname)
  return (
    <nav className="w-full h-[60px] flex py-2  text-primary items-center justify-between bg-transparent">
      {isNotificationPage ? (
        <>
          <Link href="/" className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>
          <h1 className="text-xl font-bold">알림</h1>
          <button className="text-sm text-gray-500">최근 알림 지우기</button>
        </>
      ) : (
        <>
          {/* 좌측: 로고 또는 텍스트 */}
          <div className="text-xl font-bold text-primary"></div>
          {/* 우측: 알람, 세팅 아이콘 */}
          <div className="flex items-center gap-4">
            <Link href="/notifications">
              <Image
                src="/icons/Notification.svg"
                alt="알림"
                width={36}
                height={36}
                className="cursor-pointer"
              />
            </Link>
            <Image
              src="/icons/Setting.svg"
              alt="세팅"
              width={36}
              height={36}
              className="cursor-pointer"
            />
          </div>
        </>
      )}
    </nav>
  );
} 