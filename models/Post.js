// models/Post.js

import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, '댓글 내용을 입력하세요.'],
    },
    author: {
      type: String,
      default: '익명', // 추후 사용자 인증을 도입하면 수정 가능
    },
  },
  { timestamps: true }
);

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, '제목을 입력하세요.'],
      maxlength: [100, '제목은 최대 100자까지 가능합니다.'],
    },
    content: {
      type: String,
      required: [true, '내용을 입력하세요.'],
    },
    team: {
      type: String, // 팀 이름을 저장
      required: true,
    },
    comments: [CommentSchema],
  },
  { timestamps: true }
);

// 모델이 이미 정의되어 있으면 기존 모델을 사용
export default mongoose.models.Post || mongoose.model('Post', PostSchema);
