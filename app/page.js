"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

// 각 팀 로고 이미지 임포트
import teamLogo1 from "/public/team-logo1.png";
import teamLogo2 from "/public/team-logo2.png";
import teamLogo3 from "/public/team-logo3.png";
import teamLogo4 from "/public/team-logo4.png";
import teamLogo5 from "/public/team-logo5.png";
import teamLogo6 from "/public/team-logo6.png";
import teamLogo7 from "/public/team-logo7.png";
import teamLogo8 from "/public/team-logo8.png";
import ad from "/public/ad.png";

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

	// 팬 팀 배열 (무작위 섞기 및 frank 기준으로 정렬)
	const fanTeams = [
		{ name: "T1 fan", logo: teamLogo1, frank: 4 },
		{ name: "Gen G fan", logo: teamLogo2, frank: 5 },
		{ name: "DRX fan", logo: teamLogo3, frank: 6 },
		{ name: "Damwon fan", logo: teamLogo4, frank: 1 },
		{ name: "Rolster fan", logo: teamLogo5, frank: 8 },
		{ name: "Team 6 fan", logo: teamLogo6, frank: 3 },
		{ name: "Hanhwa fan", logo: teamLogo7, frank: 7 },
		{ name: "Team 8 fan", logo: teamLogo8, frank: 2 },
	];

	// frank 기준으로 팬 팀 정렬
	const sortedFanTeams = [...fanTeams].sort((a, b) => a.frank - b.frank);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % teams.length);
			setFanIndex((prevIndex) => (prevIndex + 1) % sortedFanTeams.length);
		}, 1000); // 3초마다 롤링
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="container mx-auto px-4 py-4 ">
			<div className="bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg p-8 rounded-lg flex justify-center mb-10">
				<Image src={ad} />
			</div>
			<div className="bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg p-8 rounded-lg flex justify-between">
				{/* 팀 순위 롤링 UI */}
				<div className="h-80 overflow-hidden w-[50%]">
					<iframe
						width="100%"
						height="100%"
						src="https://www.youtube.com/embed/PojyOXq-QNI?autoplay=1&mute=1" // 자동재생 및 음소거 설정 추가
						title="YouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
						className="rounded-lg" // 모서리를 둥글게 하기 위한 클래스
					></iframe>
				</div>
				<section
					id="team-ranking"
					className="relative h-80 w-[20%] overflow-hidden"
				>
					<div
						className="absolute w-full flex flex-col items-center"
						style={{
							transform: `translateY(-${currentIndex * (100 / (teams.length + 2))}%)`,
							transition: "transform 1s ease-in-out",
						}}
					>
						{/* 상단 팀 로고 */}
						<div className="flex items-center justify-between w-full bg-gray-800 text-white p-4 rounded-lg mb-4 h-20">
							{" "}
							{/* 높이 설정 */}
							<span className="text-xl font-semibold">
								#{teams[(currentIndex + teams.length - 1) % teams.length].rank}
							</span>
							<Image
								src={teams[(currentIndex + teams.length - 1) % teams.length].logo}
								alt={`${
									teams[(currentIndex + teams.length - 1) % teams.length].name
								} logo`}
								width={50}
								height={50}
								className="mx-auto" // 정 가운데 배치
							/>
							<span className="text-xl font-semibold">
								{teams[(currentIndex + teams.length - 1) % teams.length].name}
							</span>
						</div>

						{teams.map((team) => (
							<div
								key={team.name}
								className="flex items-center justify-between w-full bg-gray-800 text-white p-4 rounded-lg mb-4 h-20"
							>
								{" "}
								{/* 높이 설정 */}
								<span className="text-xl font-semibold">#{team.rank}</span>
								<Image
									src={team.logo}
									alt={`${team.name} logo`}
									width={50}
									height={50}
									className="mx-auto" // 정 가운데 배치
								/>
								<span className="text-xl font-semibold">{team.name}</span>
							</div>
						))}

						{/* 하단 팀 로고 */}
						<div className="flex items-center justify-between w-full bg-gray-800 text-white p-4 rounded-lg mb-4 h-20">
							{" "}
							{/* 높이 설정 */}
							<span className="text-xl font-semibold">
								#{teams[(currentIndex + 1) % teams.length].rank}
							</span>
							<Image
								src={teams[(currentIndex + 1) % teams.length].logo}
								alt={`${teams[(currentIndex + 1) % teams.length].name} logo`}
								width={50}
								height={50}
								className="mx-auto" // 정 가운데 배치
							/>
							<span className="text-xl font-semibold">
								{teams[(currentIndex + 1) % teams.length].name}
							</span>
						</div>
					</div>
				</section>

				{/* 팬 팀 순위 롤링 UI */}
				<section id="fan-ranking" className="relative h-80 w-[20%] overflow-hidden">
					<div
						className="absolute w-full flex flex-col items-center"
						style={{
							transform: `translateY(-${
								fanIndex * (100 / (sortedFanTeams.length + 2))
							}%)`,
							transition: "transform 1s ease-in-out",
						}}
					>
						{/* 상단 팬 팀 로고 */}
						<div className="flex items-center justify-between w-full bg-gray-800 text-white p-4 rounded-lg mb-4 h-20">
							{" "}
							{/* 높이 설정 */}
							<span className="text-xl font-semibold">
								#
								{
									sortedFanTeams[
										(fanIndex + sortedFanTeams.length - 1) % sortedFanTeams.length
									].frank
								}
							</span>
							<Image
								src={
									sortedFanTeams[
										(fanIndex + sortedFanTeams.length - 1) % sortedFanTeams.length
									].logo
								}
								alt={`${
									sortedFanTeams[
										(fanIndex + sortedFanTeams.length - 1) % sortedFanTeams.length
									].name
								} logo`}
								width={50}
								height={50}
								className="mx-auto" // 정 가운데 배치
							/>
							<span className="text-xl font-semibold">
								{
									sortedFanTeams[
										(fanIndex + sortedFanTeams.length - 1) % sortedFanTeams.length
									].name
								}
							</span>
						</div>

						{sortedFanTeams.map((fanTeam) => (
							<div
								key={fanTeam.name}
								className="flex items-center justify-between w-full bg-gray-800 text-white p-4 rounded-lg mb-4 h-20"
							>
								{" "}
								{/* 높이 설정 */}
								<span className="text-xl font-semibold">#{fanTeam.frank}</span>
								<Image
									src={fanTeam.logo}
									alt={`${fanTeam.name} logo`}
									width={50}
									height={50}
									className="mx-auto" // 정 가운데 배치
								/>
								<span className="text-xl font-semibold">{fanTeam.name}</span>
							</div>
						))}

						{/* 하단 팬 팀 로고 */}
						<div className="flex items-center justify-between w-full bg-gray-800 text-white p-4 rounded-lg mb-4 h-20">
							{" "}
							{/* 높이 설정 */}
							<span className="text-xl font-semibold">
								#{sortedFanTeams[(fanIndex + 1) % sortedFanTeams.length].frank}
							</span>
							<Image
								src={sortedFanTeams[(fanIndex + 1) % sortedFanTeams.length].logo}
								alt={`${
									sortedFanTeams[(fanIndex + 1) % sortedFanTeams.length].name
								} logo`}
								width={50}
								height={50}
								className="mx-auto" // 정 가운데 배치
							/>
							<span className="text-xl font-semibold">
								{sortedFanTeams[(fanIndex + 1) % sortedFanTeams.length].name}
							</span>
						</div>
					</div>
				</section>
			</div>
			{/* 전체 게시판 */}
			<div className="bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg p-8 rounded-lg mb-10 mt-10">
				<section id="overall-board" className="mt-20 mb-20">
					<h2 className="text-4xl font-bold text-white mb-4">Overall Board</h2>
					<p className="text-white">
						Here is the content of the overall board with detailed information about
						the matches, teams, etc.
					</p>
					<div className="bg-gray-800 p-4 rounded-lg mt-4">
						<h3 className="text-2xl font-semibold text-white mb-2">Match Schedule</h3>
						<br></br>
						<ul className="text-white item-center">
							<li>Match 1: Team 1 vs Team 2 - Date: 2024-10-10</li>
							<li>Match 2: Team 3 vs Team 4 - Date: 2024-10-12</li>
							<li>Match 3: Team 5 vs Team 6 - Date: 2024-10-15</li>
							<li>Match 4: Team 7 vs Team 8 - Date: 2024-10-20</li>
							<li>Match 1: Team 1 vs Team 2 - Date: 2024-10-10</li>
							<li>Match 2: Team 3 vs Team 4 - Date: 2024-10-12</li>
							<li>Match 3: Team 5 vs Team 6 - Date: 2024-10-15</li>
							<li>Match 4: Team 7 vs Team 8 - Date: 2024-10-20</li>
						</ul>
					</div>
				</section>
			</div>
			{/* 전체게시판 */}
			<div className="bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg p-8 rounded-lg mb-10">
				<section id="overall-board" className="mt-20 mb-20">
					<h2 className="text-4xl font-bold text-white mb-4">Forum Board</h2>
					<p className="text-white mb-6">
						Here is the content of the overall board with detailed information about
						the matches, teams, etc.
					</p>

					<div className="bg-gray-800 p-6 rounded-lg mt-4">
						<h3 className="text-2xl font-semibold text-white mb-4">Recent Posts</h3>

						<div className="space-y-4">
							{/* 게시물 1 */}
							<div className="bg-gray-700 p-4 rounded-lg">
								<h4 className="text-xl font-bold text-white">Post Title 1</h4>
								<p className="text-white">
									This is a brief description of the first post. It covers important
									updates and information regarding the event.
								</p>
								<span className="text-gray-400 text-sm">
									Posted by User1 on 2024-10-01
								</span>
							</div>

							{/* 게시물 2 */}
							<div className="bg-gray-700 p-4 rounded-lg">
								<h4 className="text-xl font-bold text-white">Post Title 2</h4>
								<p className="text-white">
									This is a brief description of the second post. It includes details
									about the match schedule and team performance.
								</p>
								<span className="text-gray-400 text-sm">
									Posted by User2 on 2024-10-02
								</span>
							</div>

							{/* 게시물 3 */}
							<div className="bg-gray-700 p-4 rounded-lg">
								<h4 className="text-xl font-bold text-white">Post Title 3</h4>
								<p className="text-white">
									This is a brief description of the third post. It highlights key
									moments from previous matches.
								</p>
								<span className="text-gray-400 text-sm">
									Posted by User3 on 2024-10-03
								</span>
							</div>

							{/* 게시물 4 */}
							<div className="bg-gray-700 p-4 rounded-lg">
								<h4 className="text-xl font-bold text-white">Post Title 4</h4>
								<p className="text-white">
									This is a brief description of the fourth post. It contains thoughts
									and opinions on team strategies.
								</p>
								<span className="text-gray-400 text-sm">
									Posted by User4 on 2024-10-04
								</span>
							</div>
						</div>
					</div>
				</section>
			</div>
			{/* 팀별게시판임여기부터 */}
			<div className="bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg p-8 rounded-lg">
				<section
					id="team-boards"
					className="grid grid-cols-2 gap-8 place-items-center"
				>
					{teams.map((team, index) => (
						<div
							key={team.name}
							className={`team-board pb-4 ${
								index < teams.length - 1 ? "border-b border-gray-700 mb-4" : ""
							}`}
						>
							<h3 className="text-2xl font-semibold text-white mb-2">{team.name}</h3>
							<Image
								src={team.logo}
								alt={`${team.name} Logo`}
								width={100}
								height={100}
							/>
							<a
								href={`#${team.name.replace(" ", "-").toLowerCase()}`}
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
