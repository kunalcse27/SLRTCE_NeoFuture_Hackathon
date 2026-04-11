import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  courseBranch: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    enum: ["student", "teacher"],
    default: "student",
  }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;
