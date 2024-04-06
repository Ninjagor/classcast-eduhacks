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

            const classes = await db.class.findMany({
                where: {
                    educatorId: id
                }
            });

            return NextResponse.json({ "data": classes }, { status: 200 });
        }
    } catch(error) {
        console.log('[FINDMANY_EDUCATOR_CLASS_ERROR]', error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}