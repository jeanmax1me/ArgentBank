import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: String,
    password: String,
    firstName: String,
    lastName: String
  },
  {
    timestamps: true,
    toObject: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      transform: (doc, ret, options) => {
        ret.id = ret._id
        delete ret._id
        delete ret.password
        delete ret.__v
        return ret
      }
    }
  }
);

const User = mongoose.model('User', userSchema);

export default User;
