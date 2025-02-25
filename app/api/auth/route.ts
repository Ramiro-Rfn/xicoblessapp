import users from '@/database/users.json';
import { generateToken } from "@/lib/jwt";
import { cookies } from 'next/headers';
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  const { email, password } = await req.json();
  const user = users.find((u) => u.email === email);


  if (!user || !(user.password === password)) {
    return NextResponse.json({ message: "Credenciais inválidas!" }, { status: 401 });
  }

  const token = generateToken({ id: user.id, email: user.email });

  const cookieStore = cookies()

  cookieStore.set("xicobless_token", token)
  cookieStore.set("xicobless_user", JSON.stringify(user))

  return NextResponse.json({ token });
}
