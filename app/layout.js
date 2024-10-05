import "./globals.css";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";
import Head from "next/head";

// 이미지 파일 임포트
import bg1 from "/public/background1.jpg";
import bg2 from "/public/background2.jpg";
import bg3 from "/public/background3.webp";
import bg4 from "/public/background4.webp";
import logo from "/public/logo.webp";

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<title>GG Arena</title> {/* 페이지 제목 */}
				<meta
					name="description"
					content="GG Arena - 팀과 팬을 위한 최고의 커뮤니티"
				/>{" "}
				{/* 설명 추가 */}
			</Head>
			<body>
				<div className="relative">
					{/* 배경 이미지들 */}
					<div className="fixed top-0 left-0 w-full h-full z-0 grid grid-cols-2 grid-rows-2">
						<Image
							src={bg1}
							alt="Background 1"
							width={800}
							height={300}
							className="object-cover w-full h-full"
						/>
						<Image
							src={bg2}
							alt="Background 2"
							width={800}
							height={300}
							className="object-cover w-full h-full"
						/>
						<Image
							src={bg3}
							alt="Background 3"
							width={800}
							height={300}
							className="object-cover w-full h-full"
						/>
						<Image
							src={bg4}
							alt="Background 4"
							width={800}
							height={300}
							className="object-cover w-full h-full"
						/>
					</div>

					{/* 네브바 - 고정 */}
					<header className="fixed top-0 left-0 w-full z-10 bg-opacity-60 backdrop-blur-sm bg-gray-900">
						<nav className="container mx-auto p-4 flex justify-between items-center">
							<div>
								<Image src={logo} alt="GG Arena Logo" width={120} height={40} />
							</div>

							<div>
								<a href="#overall-board" className="text-white mx-4">
									Overall Board
								</a>
								<a href="#team-boards" className="text-white mx-4">
									Team Boards
								</a>
								<ThemeToggle />
							</div>
						</nav>
					</header>

					{/* 메인 콘텐츠 */}
					<main className="relative z-10 mt-[20vh]">{children}</main>

					{/* 푸터바 */}
					<footer className="relative z-10 bg-opacity-60 backdrop-blur-sm bg-gray-900 p-4 text-center text-white">
						© 2024 GG Arena <br />
						팀명 : GG Arena
					</footer>
				</div>
			</body>
		</html>
	);
}
