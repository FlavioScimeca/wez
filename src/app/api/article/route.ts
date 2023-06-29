import db from '@/app/server/db';
import articleModel from '@/app/server/model/articleModel';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import userModel from '@/app/server/model/userModel';
import { Article, User } from '../../../../typing';

export async function POST(req: NextResponse, _res: NextResponse) {
  const { title, description, price, location, ownerId } = await req.json();

  console.log({
    'Data in  input create article': {
      title,
      description,
      price,
      location,
      ownerId,
    },
  });

  try {
    if (!title || !description || !price || !location) {
      return NextResponse.json({ message: 'Missing or Error data input' });
    }

    if (!mongoose.isValidObjectId(ownerId)) {
      return NextResponse.json({ message: 'Invalid owner id' });
    }

    await db.dbConnect();

    const newArticle = new articleModel({
      title: title,
      description: description,
      price: price,
      location: location,
      owner: ownerId,
    });

    let findUser = await userModel.findByIdAndUpdate<User>(ownerId, {
      $push: { articles: newArticle },
    });

    await newArticle.save();

    return NextResponse.json({ created: newArticle, user: findUser });
  } catch (error) {
    throw Error('Error' + error);
  }
}

export async function DELETE(req: NextResponse, _res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const articleId = searchParams.get('articleId');

  try {
    if (!mongoose.isValidObjectId(articleId) || !articleId) {
      throw Error('Invalid Article Id');
    }

    await db.dbConnect();

    let articleToDelete: Article | null = await articleModel.findByIdAndDelete(
      articleId
    );

    if (!articleToDelete) {
      throw Error('Article not found');
    }

    let userToUpdate: User | null = await userModel.findByIdAndUpdate<User>(
      articleToDelete.owner,
      { $pull: { articles: articleId } }
    );

    return NextResponse.json({
      'article deleted': articleToDelete,
      userUpdated: userToUpdate,
    });
  } catch (error) {
    throw Error('ERROR' + error);
  }
}
