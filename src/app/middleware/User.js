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
    university: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
    },
    role: {
      type: String,
      default: null,
    },
    subjects:Array,
  },
  {
    collection: "Users",
  }
);

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
