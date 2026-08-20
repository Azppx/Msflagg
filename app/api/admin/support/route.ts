import { NextRequest, NextResponse } from "next/server";
import { listTickets } from "@/lib/tickets";

const COOKIE_NAME = "pulse_admin";

export async function GET(req: NextRequest) {
  const session = req.cookies.get(COOKIE_NAME)?.value;
  if (!session || session !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  const tickets = await listTickets();
  return NextResponse.json({ tickets });
}
