import userModel from '@/app/server/model/userModel';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import db from '@/app/server/db';
import mongoose from 'mongoose';
import { User } from '../../../../typing';

//! CREATE
export async function POST(req: Request, _res: NextResponse) {
  const { name, email, password } = await req.json();

  try {
    if (!email) {
      return NextResponse.json({ Message: 'Email is missing' });
    }

    await db.dbConnect();

    const isUserExisting: User | null = await userModel.findOne<User>({
      email: email,
    });

    if (isUserExisting) {
      return NextResponse.json(isUserExisting);
    } else {
      if (!name || !password) {
        return NextResponse.json({ Message: 'Invalid data input' });
      }
      const hashedPassword = await hash(password, 10);

      const newUser = new userModel({
        name: name,
        email: email,
        password: hashedPassword,
      });

      await newUser.save();
      return NextResponse.json(newUser);
    }
  } catch (error) {
    throw Error('Error while creating a new User' + error);
  }
}

//! UPDATE
export async function PUT(req: Request, _res: NextResponse) {
  const { name, email, password } = await req.json();

  try {
    if (!email) {
      return NextResponse.json({ Message: 'Email is missing' });
    }

    await db.dbConnect();

    const existingUser = await userModel.findOne({ email: email }).exec();

    if (!existingUser) {
      return NextResponse.json({ Message: "User doesn't exist" });
    }

    if (!name || !password) {
      return NextResponse.json({ Message: 'Invalid data input' });
    }

    const hashedPassword: string = await hash(password, 10);

    let userUpdated: User = await existingUser.updateOne({
      name: name,
      password: hashedPassword,
    });
    userUpdated = await existingUser.save();
    return NextResponse.json(userUpdated);
  } catch (error) {
    throw Error('Error while creating a new User' + error);
  }
}

//! DELETE

export async function DELETE(req: Request, _res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  try {
    if (!mongoose.isValidObjectId(userId) || !userId) {
      throw Error('Invalid user id');
    }

    await db.dbConnect();

    const userToDelete = await userModel.findById(userId);

    if (!userToDelete) {
      throw Error('User not found');
    }

    await userToDelete.deleteOne();

    //todo: Eliminare la one to many

    return NextResponse.json({
      success: 'user' + userToDelete + 'has been deleted',
    });
  } catch (error) {
    throw Error('Error' + error);
  }
}
