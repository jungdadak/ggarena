import './globals.css';
import Image from 'next/image';
import Head from 'next/head';
import Navbar from './Navbar';

// 이미지 파일 임포트
import bg1 from '/public/background1.jpg';
import bg2 from '/public/background2.jpg';
import bg3 from '/public/background3.webp';
import bg4 from '/public/background4.webp';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>GG Arena</title> {/* 페이지 제목 */}
        <meta
          name="description"
          content="GG Arena - 팀과 팬을 위한 최고의 커뮤니티"
        />{' '}
        {/* 설명 추가 */}
      </Head>
      <body className="bg-neutral-900">
        <div className="relative p-0">
          {/* 배경 이미지들 */}
          {/* 필요 시 배경 이미지 사용 */}
          {/* 
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
          */}

          {/* 네비게이션 바 컴포넌트 추가 */}
          <Navbar />

          {/* 메인 콘텐츠 */}
          <main className="relative z-10 mt-[20vh] text-white">{children}</main>

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
