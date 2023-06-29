import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import db from '@/app/server/db';
import userModel from '@/app/server/model/userModel';
import articleModel from '@/app/server/model/articleModel';

export async function GET(req: NextRequest, _res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  console.log('Started');

  try {
    if (!mongoose.isValidObjectId(userId) || !userId) {
      throw Error('Invalid note id');
    }

    await db.dbConnect();

    let usersArticles = await articleModel.find({ owner: userId });

    return NextResponse.json(usersArticles);
  } catch (error) {
    throw Error('Error' + error);
  }
}
