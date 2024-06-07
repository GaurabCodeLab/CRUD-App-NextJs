import { NextResponse } from "next/server";
import dbConnection from "@/lib/dbConnection";
import User from "@/model/user";

const GET = async (req)=>{
  await dbConnection();
  try {
    const users = await User.find();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(error, {status: 400})
  }
};

const POST = async (req)=>{
  await dbConnection();
  try {
    const body = await req.json();
    const newUser = await User.create(body);
    return NextResponse.json(newUser, {status: 201, statusText: "Create ho gaya"});
  } catch (error) {
    return NextResponse.json(error, {status: 400});
  }
}

export { GET, POST };