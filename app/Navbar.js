'use client'; // 클라이언트 컴포넌트로 지정

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import logo from '/public/logo.webp';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // 스크롤 동작 처리
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY <= 0) {
      // 페이지 최상단에 있을 때
      setIsVisible(true);
    } else if (currentScrollY > lastScrollY) {
      // 아래로 스크롤
      setIsVisible(false);
    } else {
      // 위로 스크롤
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    // 호버 감지를 위한 래퍼
    <div className="fixed top-0 left-0 w-full z-20 m-0">
      {/* 호버 감지를 위한 투명 영역 */}
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => {
          // 페이지 최상단이 아닐 경우에만 숨김
          if (window.scrollY > 0) setIsVisible(false);
        }}
      >
        {/* 호버 감지를 위한 빈 div */}
      </div>

      <header
        className={`
          w-full transition-transform duration-300 ease-in-out
          ${isVisible ? 'translate-y-0' : '-translate-y-full'}
          bg-opacity-60 backdrop-blur-sm bg-gray-900
        `}
      >
        <nav className="container mx-auto p-4 flex justify-between items-center">
          <div>
            <a href="#rankings" className="text-white mx-4 hover:text-gray-300">
              Ranking
            </a>
            <a href="#schedule" className="text-white mx-4 hover:text-gray-300">
              LCK Schedule
            </a>
          </div>
          <div>
            <Image
              src={logo}
              alt="GG Arena Logo"
              width={200}
              height={80}
              className="md:w-48 md:h-20 w-32 h-16"
            />
          </div>

          <div>
            <a
              href="#overall-board"
              className="text-white mx-4 hover:text-gray-300"
            >
              Forums
            </a>
            <a
              href="#team-boards"
              className="text-white mx-4 hover:text-gray-300"
            >
              Team Boards
            </a>
            <ThemeToggle />
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
