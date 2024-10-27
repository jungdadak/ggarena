// app/api/posts/[team]/[id]/comments/route.js
import dbConnect from '../../../../../../../lib/dbConnect.js';
import Post from '../../../../../../../models/Post.js';

export async function POST(request, { params }) {
  const { team, id } = params;
  const { comment } = await request.json();

  if (!comment) {
    return new Response(
      JSON.stringify({ success: false, error: '댓글 내용이 없습니다.' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

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

    post.comments.push({ text: comment });
    await post.save();

    return new Response(JSON.stringify({ success: true, data: post }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('댓글 추가 중 오류 발생:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: '댓글을 추가하는 중 오류가 발생했습니다.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
