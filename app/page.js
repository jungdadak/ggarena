"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import profile2 from "/public/profile2.jpg";
import profile from "/public/profile.jpg";
import teamLogo1 from "/public/team-logo1.png";
import teamLogo2 from "/public/team-logo2.png";
import teamLogo3 from "/public/team-logo3.png";
import teamLogo4 from "/public/team-logo4.png";
import teamLogo5 from "/public/team-logo5.png";
import teamLogo6 from "/public/team-logo6.png";
import teamLogo7 from "/public/team-logo7.png";
import teamLogo8 from "/public/team-logo8.png";
import ad from "/public/ad.png";
import { LCKRankRolling, FanRankRolling } from "./components/rolling";

// 추가: 평균 티어 이미지 (예시로 추가)
import averageTier1 from "/public/averageTier1.png";
import averageTier2 from "/public/averageTier2.png";
import averageTier3 from "/public/averageTier3.png";
import averageTier4 from "/public/averageTier4.png";
import averageTier5 from "/public/averageTier5.png";
// ... 필요한 평균 티어 이미지 추가

export default function HomePage() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [fanIndex, setFanIndex] = useState(0);

	const teams = [
		{ name: "T1", logo: teamLogo1, rank: 1 },
		{ name: "Gen G", logo: teamLogo2, rank: 2 },
		{ name: "DRX", logo: teamLogo3, rank: 3 },
		{ name: "Damwon", logo: teamLogo4, rank: 4 },
		{ name: "Rolster", logo: teamLogo5, rank: 5 },
		{ name: "Team 6", logo: teamLogo6, rank: 6 },
		{ name: "Hanhwa", logo: teamLogo7, rank: 7 },
		{ name: "Team 8", logo: teamLogo8, rank: 8 },
	];

	// 팬 팀 배열 (frank 기준으로 정렬)
	const fanTeams = [
		{ name: "T1 fan", logo: teamLogo1, frank: 4, averageTier: averageTier1 },
		{ name: "Gen G fan", logo: teamLogo2, frank: 5, averageTier: averageTier2 },
		{ name: "DRX fan", logo: teamLogo3, frank: 6, averageTier: averageTier4 },
		{
			name: "Damwon fan",
			logo: teamLogo4,
			frank: 1,
			averageTier: averageTier3,
		},
		{
			name: "Rolster fan",
			logo: teamLogo5,
			frank: 8,
			averageTier: averageTier5,
		},
		{
			name: "Team 6 fan",
			logo: teamLogo6,
			frank: 3,
			averageTier: averageTier4,
		},
		{
			name: "Hanhwa fan",
			logo: teamLogo7,
			frank: 7,
			averageTier: averageTier2,
		},
		{
			name: "Team 8 fan",
			logo: teamLogo8,
			frank: 2,
			averageTier: averageTier1,
		},
	];

	// frank 기준으로 팬 팀 정렬
	const sortedFanTeams = [...fanTeams].sort((a, b) => a.frank - b.frank);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % teams.length);
			setFanIndex((prevIndex) => (prevIndex + 1) % sortedFanTeams.length);
		}, 30); // 3초마다 롤링
		return () => clearInterval(interval);
	}, [teams.length, sortedFanTeams.length]);
	const [teamIndex, setTeamIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % teams.length);
			setFanIndex((prevIndex) => (prevIndex + 1) % sortedFanTeams.length);
			setTeamIndex((prevIndex) => (prevIndex + 1) % teams.length);
		}, 30); // 3초마다 롤링
		return () => clearInterval(interval);
	}, [teams.length, sortedFanTeams.length]);

	// 댓글 상태 관리
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState("");

	const handleAddComment = () => {
		if (newComment.trim() === "") return;
		setComments([...comments, newComment.trim()]);
		setNewComment("");
	};

	return (
		<div className="container mx-auto px-4 py-0">
			<div className="flex flex-col lg:flex-row items-start mt-10 space-y-6 lg:space-y-0 lg:space-x-6 mb-10">
				{/* 네비게이션 바 및 검색 입력 필드 */}
				<div className="w-full lg:w-2/3 bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-md p-4 flex flex-col items-center space-y-6">
					{/* 내비게이션 바 */}
					<div className="flex flex-col items-center w-full">
						{/* 팀별 이름 링크 */}
						<div className="flex flex-wrap justify-center gap-3 text-base lg:text-lg">
							{teams.map((team, index) => (
								<a
									key={index}
									href={`/${team.name.replace(/\s+/g, "-").toLowerCase()}`}
									className="px-4 py-2 border-l border-r border-red-500 text-white hover:bg-red-600 rounded-full transition duration-300 neon-link"
								>
									{team.name}
								</a>
							))}
						</div>
						<div className="mt-4 flex flex-wrap justify-center gap-3 text-base lg:text-lg">
							{["전체 게시판", "인기글", "경기 토론방"].map((item, index) => (
								<a
									key={index}
									href={
										item === "전체 게시판"
											? `/open`
											: `/open/${item.replace(/\s+/g, "-").toLowerCase()}`
									}
									className="px-4 py-2 border-l border-r border-red-500 text-white hover:bg-red-600 rounded-full transition duration-300 neon-link"
								>
									{item}
								</a>
							))}
						</div>
					</div>

					{/* 검색 입력 필드 */}
					<div className="relative w-full mt-4">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
						</div>
						<input
							type="text"
							aria-label="Search"
							className="w-full p-2 pl-10 pr-4 border-2 border-gray-600 rounded-full bg-gray-800 bg-opacity-70 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
							placeholder="아무거나 검색하세요"
						/>
					</div>
				</div>

				{/* 인터뷰 섹션 */}
				<div className="w-full lg:w-1/3 flex flex-col space-y-4 justify-end">
					{[
						{
							name: "T1 Zeus",
							message: "롤이 제일 쉬웠어요 ..",
							image: profile,
							color: "text-red-500",
							strikethrough: true,
						},
						{
							name: "DK Kingen",
							message: "저희 경기도 보러와 주세요",
							image: profile2,
							color: "text-blue-500",
							strikethrough: false,
						},
					].map((interview, index) => (
						<div
							key={index}
							className="bg-black bg-opacity-40 backdrop-filter backdrop-blur-lg p-4 rounded-xl flex flex-col lg:flex-row items-center h-auto lg:h-[115px] w-full gap-2 border border-red-500"
						>
							<div className="w-full lg:w-[60%] flex flex-col space-y-1 relative">
								<div className="text-center lg:text-left">
									{/* GG Arena 네온 효과 추가 */}
									<span className="neon-multi text-lg md:text-xl lg:text-2xl font-bold">
										GG Arena
									</span>
									<span className="text-white text-xs md:text-sm lg:text-base ml-2">
										응원합니다
									</span>
								</div>
								<h3
									className={`${interview.color} text-center lg:text-left lg:ml-2 text-xs md:text-sm lg:text-base leading-snug font-bold`}
								>
									{interview.name}
									<span className="text-white text-xs md:text-sm lg:text-base">
										인터뷰
									</span>
								</h3>
								<p
									className={`text-slate-200 text-sm md:text-base lg:text-lg font-bold leading-loose text-center lg:text-left ${
										interview.strikethrough ? "line-through" : ""
									}`}
								>
									{interview.message}
								</p>
							</div>
							<div className="h-auto lg:h-full flex justify-center items-center ml-2">
								<Image
									src={interview.image}
									alt={`${interview.name} Profile`}
									width={80}
									height={80}
									className="object-contain rounded-full neon-image"
								/>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="container mx-auto px-4 py-0">
				<div className="grid grid-cols-1 lg:grid-cols-11 gap-2 mt-10">
					{/* Hilight Videos + 댓글 섹션 */}
					<div className="lg:col-span-5 space-y-4">
						<h2 className="text-xl font-bold text-white">Hilight Videos</h2>
						<div className="relative h-[450px] bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-md p-4">
							<iframe
								width="100%"
								height="70%"
								src="https://www.youtube.com/embed/PojyOXq-QNI?autoplay=1&mute=1"
								title="YouTube video player"
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
								className="rounded-lg mb-2"
							></iframe>

							{/* 댓글 섹션 */}
							<div className="bg-black bg-opacity-30 p-3 rounded-md mt-4">
								<h3 className="text-lg font-bold text-white mb-2">댓글</h3>
								<div className="space-y-2 max-h-28 overflow-y-auto">
									{comments.map((comment, index) => (
										<div key={index} className="p-2 bg-gray-700 rounded-md">
											<p className="text-white text-sm">{comment}</p>
										</div>
									))}
								</div>
								<div className="mt-2 flex">
									<input
										type="text"
										value={newComment}
										onChange={(e) => setNewComment(e.target.value)}
										className="flex-1 p-2 rounded-l-md bg-gray-800 text-white text-sm placeholder-gray-500 focus:outline-none"
										placeholder="댓글을 입력하세요..."
									/>
									<button
										onClick={handleAddComment}
										className="px-3 py-1 bg-red-600 text-white rounded-r-md text-sm hover:bg-red-700 transition duration-300"
									>
										달기
									</button>
								</div>
							</div>
						</div>
					</div>

					<div className="lg:col-span-3">
						<h2 className="text-xl font-bold mb-3 text-white">LCK Rank</h2>
						<LCKRankRolling teams={teams} />
					</div>

					<div className="lg:col-span-3">
						<h2 className="text-xl font-bold mb-3 text-white">Fan Rank</h2>
						<FanRankRolling fanTeams={sortedFanTeams} />
					</div>
				</div>
			</div>
			{/* 광고 섹션 */}
			<div className="bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg p-8 rounded-lg flex justify-center mb-10 mt-10">
				<Image src={ad} alt="Advertisement" />
			</div>
			<div className="bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg p-8 rounded-lg mt-10">
				<section className="grid grid-cols-2 gap-8 place-items-center">
					{teams.map((team, index) => (
						<div
							key={team.name}
							className={`team-board pb-4 ${
								index < teams.length - 1 ? "border-b border-gray-700 mb-4" : ""
							}`}
						>
							<h3 className="text-2xl font-semibold text-white mb-2">{team.name}</h3>
							<a href={`/${team.name.replace(/\s+/g, "-").toLowerCase()}`}>
								<Image
									src={team.logo}
									alt={`${team.name} Logo`}
									width={100}
									height={100}
									className="mb-4 neon-image cursor-pointer"
								/>
							</a>
							<a
								href={`/${team.name.replace(/\s+/g, "-").toLowerCase()}`}
								className="text-blue-400 underline"
							>
								Go to {team.name} Board
							</a>
						</div>
					))}
				</section>
			</div>
		</div>
	);
}

// 게시판 카드 컴포넌트 (필요 시 제거)
const BoardCard = ({ title, description }) => (
	<div className="board-card flex flex-col items-center p-4 rounded-md">
		<h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
		<p className="text-gray-300 text-center">{description}</p>
	</div>
);

// 팬덤 게시판 카드 컴포넌트 (필요 시 제거)
const FandomBoardCard = ({ team }) => (
	<a
		href={`/${team.name.replace(/\s+/g, "-").toLowerCase()}`}
		className="fandom-board-card flex flex-col items-center p-4 rounded-md"
	>
		<Image
			src={team.logo}
			alt={`${team.name} Logo`}
			width={100}
			height={100}
			className="mb-4"
		/>
		<h3 className="text-lg font-bold">{team.name} 팬덤</h3>
	</a>
);

// 아이콘 컴포넌트 예시 (필요에 따라 설치하거나 커스텀)
const MagnifyingGlassIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className="h-5 w-5"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
		/>
	</svg>
);
