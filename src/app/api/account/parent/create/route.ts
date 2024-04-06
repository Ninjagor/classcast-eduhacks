import { NextResponse } from "next/server";
import { type CreateAccountBodyInterface } from "@/common/types/CreateAccountBody";
import { Hash } from "@/utils/bcrypt/bcrypt";
import { newJwt } from "@/utils/jwt";
import { db } from "@/server/db";

export async function POST(
    req:Request
) {
    try {
        if (typeof req.json == undefined || typeof req.json == null) {
            return new NextResponse("Invalid request body", { status: 400 });
        } else {
            const body: CreateAccountBodyInterface = await req.json() as CreateAccountBodyInterface;
            const { name, email, password } = body;

            if (!name || !email || !password) {
                return new NextResponse("Incomplete request body parameters", { status: 400 });
            }

            const hashed_password: string = await Hash(password, 8);

            const existing_parents = await db.parent.findFirst({
                where: {
                    email: email
                }
            });

            if (existing_parents) {
                return new NextResponse("User with email already exists", { status: 409 });
            }

            const new_parent = await db.parent.create({
                data: {
                    name,
                    email,
                    password: hashed_password
                }
            });

            const jwt_input: {
                name: string,
                email: string,
                password: string 
                type: "parent"
            } = {
                name: new_parent.name,
                email: new_parent.email,
                password: new_parent.password,
                type: "parent"
            };

            const jwt = newJwt(jwt_input);

            return NextResponse.json({ "data": "success", "jwt": jwt, "uid": new_parent.id }, { status: 201 });
        }

    } catch(error) {
        console.log('[CREATE_ACCOUNT_PARENT_ERROR]', error);
        throw new NextResponse("Internal Server Error", { status: 500 });
    }
}