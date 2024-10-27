// app/[team]/[postId]/page.js

'use client'; // 클라이언트 컴포넌트로 지정

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TeamPostDetail({ params }) {
  const { team, postId } = params;

  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 게시글 가져오기
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(
          `/api/posts/${encodeURIComponent(team)}/${encodeURIComponent(postId)}`
        );
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(
            errorData.error || '게시글을 불러오는 데 실패했습니다.'
          );
        }
        const data = await res.json();
        if (data.success) {
          setPost(data.data);
        } else {
          throw new Error(data.error || '게시글을 불러오는 데 실패했습니다.');
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPost();
  }, [team, postId]);

  // 댓글 추가
  const handleAddComment = async () => {
    if (newComment.trim() === '') {
      alert('댓글을 입력해주세요.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/posts/${encodeURIComponent(team)}/${encodeURIComponent(postId)}`,
        {
          method: 'PUT', // 댓글 추가는 PUT 메서드를 사용
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ comment: newComment }),
        }
      );

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || '댓글을 추가하는 데 실패했습니다.');
      }

      setPost(data.data);
      setNewComment('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-10">
        <p className="text-red-500">{error}</p>
        <Link href={`/open/${team}`} className="text-blue-400 hover:underline">
          팬덤 게시판으로 돌아가기
        </Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-10">
        <p className="text-white">게시글을 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <Link
        href={`/open/${team}`}
        className="text-blue-400 hover:underline mb-4 inline-block"
      >
        ← 팬덤 게시판으로 돌아가기
      </Link>
      <div className="bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg p-6 rounded-md">
        <h1 className="text-3xl font-bold text-white mb-4">{post.title}</h1>
        <p className="text-gray-300 mb-6">{post.content}</p>

        {/* 댓글 섹션 */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-white mb-4">댓글</h2>
          <div className="space-y-4">
            {post.comments.length > 0 ? (
              post.comments.map((comment, index) => (
                <div key={index} className="p-3 bg-gray-700 rounded-md">
                  <p className="text-white">{comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">작성된 댓글이 없습니다.</p>
            )}
          </div>
          <div className="mt-4 flex">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 p-2 rounded-l-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none"
              placeholder="댓글을 입력하세요..."
            />
            <button
              onClick={handleAddComment}
              disabled={loading}
              className="px-4 py-2 bg-red-600 text-white rounded-r-md hover:bg-red-700 transition duration-300"
            >
              {loading ? '댓글 추가 중...' : '달기'}
            </button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
}
