// app/api/posts/route.js

import dbConnect from '../../../lib/dbConnect';
import Post from '../../../models/Post';

export async function GET(request) {
  const url = new URL(request.url);
  const team = url.searchParams.get('team');

  if (!team) {
    console.log('GET /api/posts - Missing team parameter');
    return new Response(
      JSON.stringify({ success: false, error: '팀을 지정하세요.' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    await dbConnect();
    const posts = await Post.find({ team }).sort({ createdAt: -1 });
    console.log(
      `GET /api/posts - Retrieved ${posts.length} posts for team: ${team}`
    );
    return new Response(JSON.stringify({ success: true, data: posts }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
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

export async function POST(request) {
  try {
    const { title, content, team } = await request.json();
    console.log('POST /api/posts - Received data:', { title, content, team });

    if (!title || !content || !team) {
      console.log('POST /api/posts - Missing required fields:', {
        title,
        content,
        team,
      });
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
    console.log('POST /api/posts - Created post:', post);

    return new Response(JSON.stringify({ success: true, data: post }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating post:', error);
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
