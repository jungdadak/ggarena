import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// LCK 랭크 컴포넌트
const LCKRankRolling = ({ teams }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const duplicatedTeams = [...teams, ...teams]; // 무한 스크롤을 위한 복제

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex >= teams.length - 1) {
          return 0;
        }
        return prevIndex + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [teams.length]);

  return (
    <div className="relative h-[450px] overflow-hidden bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-md p-4">
      <section className="relative h-full w-full overflow-hidden">
        <div
          className="absolute w-full transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateY(-${currentIndex * 64}px)`,
          }}
        >
          {duplicatedTeams.map((team, index) => (
            <div
              key={`${team.name}-${index}`}
              className="flex items-center justify-between w-full bg-gray-800 text-white p-2 rounded-lg mb-2 h-16"
            >
              <span className="text-lg font-semibold">#{team.rank}</span>
              <Image
                src={team.logo}
                alt={`${team.name} logo`}
                width={40}
                height={40}
                className="mx-auto"
              />
              <span className="text-lg font-semibold">{team.name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// Fan 랭크 컴포넌트
const FanRankRolling = ({ fanTeams }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const duplicatedTeams = [...fanTeams, ...fanTeams]; // 무한 스크롤을 위한 복제

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex >= fanTeams.length - 1) {
          return 0;
        }
        return prevIndex + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [fanTeams.length]);

  return (
    <div className="relative h-[450px] overflow-hidden bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-md p-4">
      <section className="relative h-full w-full overflow-hidden">
        <div
          className="absolute w-full transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateY(-${currentIndex * 64}px)`,
          }}
        >
          {duplicatedTeams.map((team, index) => (
            <div
              key={`${team.name}-${index}`}
              className="flex items-center justify-between w-full bg-gray-800 text-white p-2 rounded-lg mb-2 h-16 space-x-2"
            >
              <span className="text-lg font-semibold">#{team.frank}</span>
              <div className="flex items-center space-x-2">
                <Image
                  src={team.logo}
                  alt={`${team.name} logo`}
                  width={40}
                  height={40}
                  className="mx-auto"
                />
                <span className="text-lg font-semibold">{team.name}</span>
              </div>
              <Image
                src={team.averageTier}
                alt={`${team.name} 평균 티어`}
                width={50}
                height={50}
                className="ml-auto"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export { LCKRankRolling, FanRankRolling };
