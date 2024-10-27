// app/api/posts/[team]/[id]/route.js

import dbConnect from '../../../../../lib/dbConnect';
import Post from '../../../../../models/Post';

export async function GET(request, { params }) {
  const { team, id } = params;

  try {
    await dbConnect();
    const post = await Post.findOne({ _id: id, team });

    if (!post) {
      return new Response(
        JSON.stringify({ success: false, error: '게시글을 찾을 수 없습니다.' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(JSON.stringify({ success: true, data: post }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching individual post:', error);
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

export async function PUT(request, { params }) {
  const { team, id } = params;

  try {
    const { comment } = await request.json();

    if (!comment) {
      return new Response(
        JSON.stringify({ success: false, error: '댓글을 입력하세요.' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    await dbConnect();
    const post = await Post.findOneAndUpdate(
      { _id: id, team },
      { $push: { comments: { text: comment } } },
      { new: true, runValidators: true }
    );

    if (!post) {
      return new Response(
        JSON.stringify({ success: false, error: '게시글을 찾을 수 없습니다.' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(JSON.stringify({ success: true, data: post }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: '댓글을 추가하는 데 실패했습니다.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

export async function DELETE(request, { params }) {
  const { team, id } = params;

  try {
    await dbConnect();
    const deletedPost = await Post.deleteOne({ _id: id, team });

    if (!deletedPost.deletedCount) {
      return new Response(
        JSON.stringify({ success: false, error: '게시글을 찾을 수 없습니다.' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(JSON.stringify({ success: true, data: {} }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error deleting post:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: '게시글을 삭제하는 데 실패했습니다.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
