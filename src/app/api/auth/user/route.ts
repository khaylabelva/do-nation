import { NextResponse } from "next/server";
import { getUser } from "@/lib/lucia";

export const GET = async () => {
    try {
        const user = await getUser(); // Call the existing `getUser` function
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        return NextResponse.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
