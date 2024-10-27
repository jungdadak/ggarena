// app/api/posts/[team]/route.js

import dbConnect from '../../../../lib/dbConnect';
import Post from '../../../../models/Post';

export async function GET(request, { params }) {
  const { team } = params;

  try {
    await dbConnect();
    const posts = await Post.find({ team }).sort({ createdAt: -1 });
    return new Response(JSON.stringify({ success: true, data: posts }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching team posts:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: '게시글을 불러오는 데 실패했습니다.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

export async function POST(request, { params }) {
  const { team } = params;

  try {
    const { title, content } = await request.json();

    if (!title || !content) {
      return new Response(
        JSON.stringify({
          success: false,
          error: '필수 필드를 모두 입력하세요.',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    await dbConnect();
    const post = await Post.create({ title, content, team, comments: [] });

    return new Response(JSON.stringify({ success: true, data: post }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating team post:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: '게시글을 생성하는 데 실패했습니다.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
