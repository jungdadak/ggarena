// models/Team.js

import mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '팀 이름을 입력하세요.'],
      unique: true,
      trim: true,
    },
    logoUrl: {
      type: String,
      required: [true, '팀 로고 URL을 입력하세요.'],
    },
  },
  { timestamps: true }
);

// 모델이 이미 정의되어 있으면 기존 모델을 사용
export default mongoose.models.Team || mongoose.model('Team', TeamSchema);
