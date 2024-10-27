// app/open/[postId]/page.js

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import teamLogos from '../../../lib/teamLogos'; // 올바른 상대 경로로 수정
import { v4 as uuidv4 } from 'uuid'; // 댓글 임시 ID 생성용

export default function OpenPostDetail({ params }) {
  const { postId } = params;

  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 게시글 가져오기
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(
          `/api/posts/byId/${encodeURIComponent(postId)}`
        ); // 새로운 API 엔드포인트 사용
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
  }, [postId]);

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
        `/api/posts/${encodeURIComponent(post.team)}/${encodeURIComponent(
          postId
        )}/comments`,
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

  // 댓글 수정 시작
  const startEditing = (commentId, currentText) => {
    setEditingCommentId(commentId);
    setEditingCommentText(currentText);
  };

  // 댓글 수정 취소
  const cancelEditing = () => {
    setEditingCommentId(null);
    setEditingCommentText('');
  };

  // 댓글 수정 제출
  const handleEditComment = async (commentId) => {
    if (editingCommentText.trim() === '') {
      alert('댓글을 입력해주세요.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/posts/${encodeURIComponent(post.team)}/${encodeURIComponent(
          postId
        )}/comments/${encodeURIComponent(commentId)}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: editingCommentText }),
        }
      );

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || '댓글을 수정하는 데 실패했습니다.');
      }

      setPost(data.data);
      setEditingCommentId(null);
      setEditingCommentText('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 댓글 삭제
  const handleDeleteComment = async (commentId) => {
    if (!confirm('댓글을 삭제하시겠습니까?')) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/posts/${encodeURIComponent(post.team)}/${encodeURIComponent(
          postId
        )}/comments/${encodeURIComponent(commentId)}`,
        {
          method: 'DELETE',
        }
      );

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || '댓글을 삭제하는 데 실패했습니다.');
      }

      setPost(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 팀 로고 가져오기
  const teamLogo = post ? teamLogos[post.team] || null : null;

  if (error) {
    return (
      <div className="container mx-auto px-4 py-10">
        <p className="text-red-500">{error}</p>
        <Link
          href={`/team/${post ? post.team : ''}`}
          className="text-blue-400 hover:underline"
        >
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
        href={`/team/${post.team}`}
        className="text-blue-400 hover:underline mb-4 inline-block"
      >
        ← 팬덤 게시판으로 돌아가기
      </Link>
      <div className="flex items-center mb-6">
        {teamLogo && (
          <Image
            src={teamLogo}
            alt={`${post.team} 로고`}
            width={50}
            height={50}
            className="mr-4"
          />
        )}
        <h1 className="text-3xl font-bold text-white">{post.title}</h1>
      </div>
      <div className="bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-lg p-6 rounded-md mb-6">
        <p className="text-gray-300">{post.content}</p>
      </div>

      {/* 댓글 섹션 */}
      <div className="bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-lg p-6 rounded-md">
        <h2 className="text-2xl font-semibold text-white mb-4">댓글</h2>
        <div className="space-y-4">
          {post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <div
                key={comment._id}
                className="p-3 bg-gray-700 rounded-md flex justify-between items-center"
              >
                {editingCommentId === comment._id ? (
                  <input
                    type="text"
                    value={editingCommentText}
                    onChange={(e) => setEditingCommentText(e.target.value)}
                    className="flex-1 p-2 rounded-md bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                ) : (
                  <p className="text-white">{comment.text}</p>
                )}
                <div className="ml-4 flex space-x-2">
                  {editingCommentId === comment._id ? (
                    <>
                      <button
                        onClick={() => handleEditComment(comment._id)}
                        className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
                      >
                        저장
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300"
                      >
                        취소
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditing(comment._id, comment.text)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                      >
                        삭제
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">작성된 댓글이 없습니다.</p>
          )}
        </div>
        {/* 댓글 작성 입력란 */}
        <div className="mt-6 flex">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 p-2 rounded-l-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="댓글을 입력하세요..."
          />
          <button
            onClick={handleAddComment}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded-r-md hover:bg-red-700 transition duration-300 disabled:bg-red-400"
          >
            {loading ? '댓글 추가 중...' : '달기'}
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}
