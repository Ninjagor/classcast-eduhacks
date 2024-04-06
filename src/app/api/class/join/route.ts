import { NextResponse } from "next/server";
import { type JoinClassBodyInterface } from "@/common/types/JoinClassBody";
import { db } from "@/server/db";

export async function POST(
    req:Request
) {
    try {
        if (typeof req.json == undefined || typeof req.json == null) {
            return new NextResponse("Invalid request body", { status: 400 });
        } else  {
            const body: JoinClassBodyInterface = await req.json() as JoinClassBodyInterface;
            const { parentId, classId } = body;

            if (!parentId || !classId) {
                return new NextResponse("Incomplete Request Parameters", { status: 400 });
            }

            const check_class = await db.class.findFirst({
                where: {
                    id: classId
                }
            });

            const check_user = await db.parent.findFirst({
                where: {
                    id: parentId
                }
            });

            if (!check_class) {
                return new NextResponse("Class with that ID not found", { status: 404 });
            }

            if (!check_user) {
                return new NextResponse("User with that ID not found", { status: 404 });
            }

            const check_parent_class = await db.parentClass.findFirst({
                where: {
                    parentId: parentId,
                    classId: classId
                }
            });

            if (check_parent_class) {
                return new NextResponse("Already in class", { status: 400 });
            }
            
            const new_parent_class = await db.parentClass.create({
                data: {
                    parent: {
                        connect: {
                            id: check_user.id
                        }
                    },
                    class: {
                        connect: {
                            id: check_class.id
                        }
                    }
                }
            });

            return NextResponse.json({ "data": "success" }, { status: 201 });

        }
    } catch(error) {
        console.log('[JOIN_CLASS_ERROR]', error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}