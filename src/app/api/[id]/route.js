import { NextResponse } from "next/server";
import User from "@/model/user";
import dbConnection from "@/lib/dbConnection";

const GET = async (req, context)=>{
   await dbConnection();
   try {
     const id = context.params.id;
     const user = await User.findOne({_id: id});
     return NextResponse.json(user, {status: 200});
   } catch (error) {
    return NextResponse.json(error, {status: 400});
   }
};

const PUT = async (req, context)=>{
    await dbConnection();
    try {
    const body = await req.json();
    console.log(body, "body");
    const id = context.params.id;
    const replacedUser = await User.findOneAndReplace({_id: id}, body, {new: true, upsert: false});
    console.log(replacedUser, "replacedUser");
    return NextResponse.json(replacedUser);
    } catch (error) {
        return NextResponse.json(error, {status: 400});
    }
};

const PATCH = async (req, context)=>{
    await dbConnection();
    try {
      const id = context.params.id;
      const body = await req.json();
      const updatedUser = await User.findOneAndUpdate({_id: id}, body, {new: true});
      console.log(updatedUser);
      return NextResponse.json(updatedUser);
    } catch (error) {
        return NextResponse.json(error, {status: 400});
    }
};

const DELETE = async (req, context)=>{
    await dbConnection();
    try {
        const id = context.params.id;
        const deletedUser = await User.findOneAndDelete({_id: id});
        console.log(deletedUser);
        return NextResponse.json(deletedUser);
    } catch (error) {
        return NextResponse.json(error, {status: 400});
    }
};

export { GET, PUT, PATCH, DELETE };
