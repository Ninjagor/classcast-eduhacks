import { NextResponse } from "next/server";
import { db } from "@/server/db";


export async function POST(
    req:Request
) {
    try {
        if (typeof req.json == undefined || typeof req.json == null) {
            return new NextResponse("Invalid request body", { status: 400 });
        } else {
            const body: {
                id: string
            } = await req.json() as {
                id: string
            };

            const { id } = body;

            if (!id) {
                return new NextResponse("Incomplete Request Parameters", { status: 400 });
            }

            const classes = await db.parentClass.findMany({
                where: {
                    parentId: id
                }
            });

            console.log("CLASSES", classes, "\n");

            const classDetails = [];

            for (const _class of classes) {
                const found_class = await db.class.findFirst({
                    where: {
                        id: _class.classId
                    }
                })
                const detail = {
                    id: _class.classId,
                    name: found_class?.name
                }
                classDetails.push(detail);
            }

            return NextResponse.json({ "data": classDetails }, { status: 200 });
        }
    } catch(error) {
        console.log('[FINDMANY_PARENT_CLASS_ERROR]', error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}