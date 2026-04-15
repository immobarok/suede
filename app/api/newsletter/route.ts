import { subscribeToNewsletter } from "@/app/actions/newsletter";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
        }

        const result = await subscribeToNewsletter(email);

        if (result.success) {
            return NextResponse.json(result);
        } else {
            return NextResponse.json(result, { status: 400 });
        }
    } catch (error) {
        console.error("API error in newsletter route:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}
