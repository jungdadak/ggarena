"use client"; // 클라이언트 컴포넌트로 지정

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import logojang from "/public/logojang.png"; // 추가: 양쪽 로고 이미지

const Navbar = () => {
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	// 스크롤 동작 처리
	const handleScroll = () => {
		const currentScrollY = window.scrollY;

		if (currentScrollY <= 0) {
			setIsVisible(true);
		} else if (currentScrollY > lastScrollY) {
			setIsVisible(false);
		} else {
			setIsVisible(true);
		}

		setLastScrollY(currentScrollY);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [lastScrollY]);

	return (
		<div className="fixed top-0 left-0 w-full z-20 m-0">
			<div
				onMouseEnter={() => setIsVisible(true)}
				onMouseLeave={() => {
					if (window.scrollY > 0) setIsVisible(false);
				}}
			></div>

			<header
				className={`
          w-full transition-transform duration-300 ease-in-out
          ${isVisible ? "translate-y-0" : "-translate-y-full"}
          bg-opacity-60 backdrop-blur-sm bg-gray-900
        `}
			>
				<nav className="container h-[120px] mx-auto p-4 flex justify-between items-center">
					<div>
						<a href="#rankings" className="text-white mx-4 hover:text-gray-300">
							Ranking
						</a>
						<a href="#schedule" className="text-white mx-4 hover:text-gray-300">
							LCK Schedule
						</a>
					</div>

					{/* GG ARENA 텍스트와 양옆 로고 배치 */}
					<div className="flex items-center space-x-2 gap-5">
						<Image
							src={logojang}
							alt="Left Logo"
							width={60}
							height={60}
							className="object-contain rounded-full"
						/>
						<span
							className="neon-multi  md:text-4xl font-bold text-center"
							style={{ fontSize: "70px" }}
						>
							GG ARENA
						</span>
						<Image
							src={logojang}
							alt="Right Logo"
							width={60}
							height={60}
							className="object-contain rounded-full"
						/>
					</div>

					<div>
						<a href="#overall-board" className="text-white mx-4 hover:text-gray-300">
							Forums
						</a>
						<a href="#team-boards" className="text-white mx-4 hover:text-gray-300">
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
