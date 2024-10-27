// app/api/posts/byId/[id]/route.js
import dbConnect from '../../../../../lib/dbConnect';
import Post from '../../../../../models/Post';

export async function GET(request, { params }) {
  const { id } = params;

  try {
    await dbConnect();
    const post = await Post.findById(id);

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
    console.error('Error fetching post by id:', error);
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
