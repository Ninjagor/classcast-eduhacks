import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { type CreateUpdateBodyInterface } from "@/common/types/CreateUpdateBody";

export async function POST(
    req:Request
) {
    try {
        if (typeof req.json == undefined || typeof req.json == null) {
            return new NextResponse("Invalid request body", { status: 400 });
        } else {
            const body: CreateUpdateBodyInterface = await req.json() as CreateUpdateBodyInterface;
            const{contents,classId,title} = body;

            if (!contents || !classId || !title) {
                return new NextResponse("Incomplete Request Parameters", { status: 400 });
            }

            const check_class = await db.class.findFirst({
                where: {
                    id: classId
                }
            });

            if (!check_class) {
                return new NextResponse("Class with that ID not found", { status: 404 });
            }

            const new_post = await db.classUpdate.create({
                data: {
                    updateTitle: title,
                    updateDescription: contents,
                    classId: classId
                }
            });

            return NextResponse.json({ "data": "sucess" }, { status: 201 });

        }
    } catch(error) {
        console.log('[CREATE_UPDATE_ERROR]', error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}