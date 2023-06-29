import db from '@/app/server/db';
import userModel from '@/app/server/model/userModel';
import { NextRequest, NextResponse } from 'next/server';
import { User } from '../../../../typing';

export async function GET(req: NextRequest, _res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  try {
    if (!email) {
      throw Error('Email is missing');
    }

    await db.dbConnect();

    const user = await userModel.findOne<User>({ email: email }).exec();

    if (!user) {
      throw Error('User with the email:' + email + 'not found');
    }

    return NextResponse.json(user._id);
  } catch (error) {
    throw Error('ERROR' + error);
  }
}
