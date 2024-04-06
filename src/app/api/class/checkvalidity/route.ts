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
                id: string,
                uid: string
            } = await req.json() as {
                id: string,
                uid: string
            };
            const{id, uid}=body;
            if (!id || !uid) {
                return new NextResponse("Incomplete Request Parameters", { status: 400 });
            }

            const check_class = await db.class.findFirst({
                where: {
                    id: id,
                    educatorId: uid
                }
            });

            if(!check_class) {
                const check_parent_class = await db.parentClass.findFirst({
                    where: {
                        classId: id,
                        parentId: uid
                    }
                })

                if (!check_parent_class) {
                    return new NextResponse("Invalid class", { status: 403 })
                }
            }

            return NextResponse.json({"data":"valid"});
        }
    } catch(error) {
        console.log('[CHECK_CLASS_VALIDITY_ERROR]', error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}