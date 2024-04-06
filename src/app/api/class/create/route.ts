import { NextResponse } from "next/server";
import { type CreateClassBodyInterface } from "@/common/types/CreateClassBody";
import { db } from "@/server/db";

export async function POST(
    req:Request
) {
    try {
        if (typeof req.json == undefined || typeof req.json == null) {
            return new NextResponse("Invalid request body", { status: 400 });
        } else  {
            const body: CreateClassBodyInterface = await req.json() as CreateClassBodyInterface;

            const { name, educatorId } = body;

            if (!name || !educatorId) {
                return new NextResponse("Incomplete Request Parameters", { status: 400 });
            }

            const educator_exists_check  = await db.educator.findFirst({
                where: {
                    id: educatorId
                }
            });

            if (!educator_exists_check) {
                return new NextResponse("Educator with that ID not found", { status: 404 });
            }

            const new_class = await db.class.create({
                data: {
                    name,
                    educatorId,
                }
            });

            return NextResponse.json({ "data": "success" }, { status: 201 });

        }
    } catch(error) {
        console.log('[CREATE_CLASS_ERROR]', error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}