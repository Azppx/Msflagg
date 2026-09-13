import { NextRequest, NextResponse } from "next/server";
import { deleteOrder } from "@/lib/orders";

const COOKIE_NAME = "pulse_admin";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = req.cookies.get(COOKIE_NAME)?.value;
  if (!session || session !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  await deleteOrder(params.id);
  return NextResponse.json({ ok: true });
}
