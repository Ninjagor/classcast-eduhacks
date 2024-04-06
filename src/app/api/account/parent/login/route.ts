import { NextResponse } from "next/server";
import { type LoginAccountBodyInterface } from "@/common/types/LoginAccountBody";

import { db } from "@/server/db";
import { Compare } from "@/utils/bcrypt/bcrypt";
import { newJwt } from "@/utils/jwt";

export async function POST(
    req:Request
) {
    try {
        if (typeof req.json == undefined || typeof req.json == null) {
            return new NextResponse("Invalid request body", { status: 400 });
        } else { 
            const body: LoginAccountBodyInterface = await req.json() as LoginAccountBodyInterface;
            const { email, password } = body;
            if (!email || !password) {
                return new NextResponse("Incomplete Request Parameters", { status: 400 });
            }

            const user_exists_check = await db.parent.findFirst({
                where: {
                    email: email
                }
            })

            if (!user_exists_check) {
                return new NextResponse("User with that email not found", { status: 404 });
            }

            const does_password_match: boolean = await Compare(password, user_exists_check.password);
            if (!does_password_match) {
                return new NextResponse("Invalid Credentials", { status: 403 });
            }

            const jwt_input: {
                name: string,
                email: string,
                password: string 
                type: "parent"
            } = {
                name: user_exists_check.name,
                email: user_exists_check.email,
                password: user_exists_check.password,
                type: "parent"
            };

            const jwt = newJwt(jwt_input);

            return NextResponse.json({ "data": "success", "jwt": jwt, "uid": user_exists_check.id }, { status: 200 });

        }
    } catch(error) {
        console.log('[LOGIN_PARENT_ERROR]', error);
        return new NextResponse(
            "Internal Server Error",
            { status: 500 }
        );
    }
}