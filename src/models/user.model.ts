import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    description: 'Id for the current session.',
    required: false,
  },
  username: {
    type: String,
    description: 'The username of the user.',
    required: true,
    unique: true,
  },
  email: {
    type: String,
    description: 'The email address of the user.',
    required: true,
    unique: true,
  },
  password: {
    type: String,
    description: 'The hashed user password',
    required: true,
  },
});

export const USER_PUBLIC_FIELDS = '_id username';
export const USER_PUBLIC_FIELDS_PRO = `${USER_PUBLIC_FIELDS} email`;

// hash the password
userSchema.methods.generateHash = function (password: string) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// checking if password is valid
userSchema.methods.validPassword = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};

mongoose.model('User', userSchema);