// app/open/page.js

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import teamLogos from '../../lib/teamLogos';

export default function OpenBoard() {
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 게시글 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts?team=전체 게시판');
        if (!res.ok) {
          throw new Error('게시글을 불러오는 데 실패했습니다.');
        }
        const data = await res.json();
        if (data.success) {
          setPosts(data.data);
        } else {
          throw new Error(data.error || '게시글을 불러오는 데 실패했습니다.');
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPosts();
  }, []);

  // 게시글 생성
  const handleAddPost = async () => {
    if (newPostTitle.trim() === '' || newPostContent.trim() === '') {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    setLoading(true);
    setError(null);

    const postData = {
      title: newPostTitle,
      content: newPostContent,
      team: '전체 게시판',
    };

    console.log('Sending POST /api/posts with data:', postData);

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || '게시글을 생성하는 데 실패했습니다.');
      }

      setPosts([data.data, ...posts]);
      setNewPostTitle('');
      setNewPostContent('');
      console.log('Post created successfully:', data.data);
    } catch (err) {
      console.error('Error creating post:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <Link
        href="/"
        className="text-blue-400 hover:underline mb-4 inline-block"
      >
        ← 홈으로 돌아가기
      </Link>
      <h1 className="text-3xl font-bold text-white mb-6">전체 게시판</h1>

      {/* 새 글 작성 섹션 */}
      <div className="bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-lg p-6 rounded-md mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">새 글 작성</h2>
        <input
          type="text"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
          className="w-full p-3 mb-4 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="제목을 입력하세요..."
        />
        <textarea
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          className="w-full p-3 mb-4 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="내용을 입력하세요..."
          rows="4"
        ></textarea>
        <button
          onClick={handleAddPost}
          disabled={loading}
          className="w-full px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300 disabled:bg-red-400"
        >
          {loading ? '게시 중...' : '게시하기'}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {/* 게시글 목록 */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-lg p-6 rounded-md flex items-start"
          >
            {teamLogos[post.team] && (
              <Image
                src={teamLogos[post.team]}
                alt={`${post.team} 로고`}
                width={50}
                height={50}
                className="mr-4 rounded-full"
              />
            )}
            <div className="flex-1">
              <Link href={`/open/${post._id}`}>
                <h3 className="text-2xl font-bold text-blue-400 hover:underline">
                  {post.title}
                </h3>
              </Link>
              <p className="text-gray-300 mt-2">{post.content}</p>
              <p className="text-gray-500 mt-2">댓글: {post.comments.length}</p>
            </div>
          </div>
        ))}
        {posts.length === 0 && !error && (
          <p className="text-gray-400">작성된 게시글이 없습니다.</p>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}
