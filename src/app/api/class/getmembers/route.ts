import { db } from "@/server/db";
import { NextResponse } from "next/server";

export async function POST(
    req:Request
) {
    try {
        if (typeof req.json == undefined || typeof req.json == null) {
            return new NextResponse("Invalid request body", { status: 400 });
        } else {
            const body: {
                classId: string
            } = await req.json() as {
                classId: string
            };
            const{classId}=body;
            if (!classId) {
                return new NextResponse("Incomplete Request Parameters", { status: 400 });
            }

            const check_class = await db.class.findFirst({
                where: {
                    id: classId
                }
            });

            if (!check_class) {
                return new NextResponse("Class with that ID does not exist", { status: 404 });
            }

            const educator = await db.educator.findFirst({
                where: {
                    id: check_class.educatorId
                }
            });

            const parents = await db.parentClass.findMany({
                where: {
                    classId: classId
                }
            });

            const parent_data = []
            for (const parent of parents) {
                const _parent = await db.parent.findFirst({
                    where: {
                        id: parent.parentId
                    }
                });
                parent_data.push(_parent);
            }

            return NextResponse.json({ "educator": educator, "parents": parent_data }, { status: 200 });
        }
    } catch(error) {
        console.log('[CLASS_GET_MEMBERS_ERROR]', error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}