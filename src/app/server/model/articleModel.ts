import mongoose, { InferSchemaType, Schema } from 'mongoose';

let articleSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

type Article = InferSchemaType<typeof articleSchema>;

export default mongoose.models.Article ||
  mongoose.model<Article>('Article', articleSchema);
