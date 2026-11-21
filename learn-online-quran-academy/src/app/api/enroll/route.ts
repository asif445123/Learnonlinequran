import { NextResponse } from "next/server";

interface EnrollBody {
  fullName?: string;
  email?: string;
  phone?: string;
  course?: string;
  message?: string;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body: EnrollBody = await request.json();
    const fullName = body.fullName?.trim();
    const email = body.email?.trim();
    const phone = body.phone?.trim();

    if (!fullName || !email || !phone) {
      return NextResponse.json({ success: false, message: "Name, email and phone are required." }, { status: 400 });
    }
    if (!emailPattern.test(email)) {
      return NextResponse.json({ success: false, message: "Please enter a valid email address." }, { status: 400 });
    }

    // TODO: save to MongoDB or send an email notification here.
    console.log("New trial request:", { fullName, email, phone, course: body.course, message: body.message });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request." }, { status: 400 });
  }
}
