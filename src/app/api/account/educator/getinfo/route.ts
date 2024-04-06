import { NextResponse } from "next/server";
import { type GetAccountDetailsBodyInterface } from "@/common/types/GetAccountDetailsBody";

import { db } from "@/server/db";

export async function GET(
    req:Request
) {
    try {
        // eslint-disable-next-line
        const headers = req.headers;
        const body: GetAccountDetailsBodyInterface = await req.json() as GetAccountDetailsBodyInterface;
        const { uid } = body;
        if (!uid) {
            return new NextResponse("Incomplete Request Parameters", { status: 400 });
        }

        const user = await db.educator.findFirst({
            where: {
                id: uid
            }
        });

        return NextResponse.json({ "data": user }, { status: 200 });

    } catch(error) {
        console.log('[GET_EDUCATOR_INFO_ERROR]', error);
    }
}