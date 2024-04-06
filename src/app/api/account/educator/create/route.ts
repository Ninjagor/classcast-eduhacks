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

            const existing_educators = await db.educator.findFirst({
                where: {
                    email: email
                }
            });

            if (existing_educators) {
                return new NextResponse("User with email already exists", { status: 409 });
            }

            const new_educator = await db.educator.create({
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
                type: "educator"
            } = {
                name: new_educator.name,
                email: new_educator.email,
                password: new_educator.password,
                type: "educator"
            };

            const jwt = newJwt(jwt_input);

            return NextResponse.json({ "data": "success", "jwt": jwt, "uid": new_educator.id }, { status: 201 });
        }

    } catch(error) {
        console.log('[CREATE_ACCOUNT_EDUCATOR_ERROR]', error);
        throw new NextResponse("Internal Server Error", { status: 500 });
    }
}