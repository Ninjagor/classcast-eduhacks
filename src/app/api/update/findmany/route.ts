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
                classId: string
            } = await req.json() as {
                classId: string
            };
            const{classId}=body;
            if (!classId) {
                return new NextResponse("Incomplete Request Parameters", { status: 400 });
            }
            const updates = await db.classUpdate.findMany({
                where: {
                    classId: classId
                }
            });

            const details = [];

            for (const update of updates) {
                const images = await db.image.findFirst({
                    where: {
                        classUpdateId: update.id
                    }
                });
                const detail = {
                    update: update,
                    image: images
                };
                details.push(detail)
            }

            return NextResponse.json({ "data": details }, { status: 200 });
        }
    } catch(error) {
        console.log('[FINDMANY_UPDATE_ERROR]', error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}