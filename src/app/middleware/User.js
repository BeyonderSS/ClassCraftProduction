import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    uid: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    courses: Array,
    university: String,
    role: {
      type: String,
      default: null,
    },
  },
  {
    collection: 'Users',
  }
);

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;