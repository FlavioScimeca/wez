import mongoose, { Schema, InferSchemaType, model } from 'mongoose';

// Schema of User
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    articles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Article',
      },
    ],
  },
  { timestamps: true }
);

type User = InferSchemaType<typeof userSchema>;
// InferSchemaType will determine the type as follows:
// type User = {
//   name: string;
//   email: string;
//   password : string
// }

// `UserModel` will have `name: string`, etc.
export default mongoose.models.User || model<User>('User', userSchema);
