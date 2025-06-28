import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  // 코드잇 API로 로그인 요청
  const response = await fetch(`${process.env.API_BASE_URL}/auth/signIn`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Login failed' }, { status: 401 });
  }

  const { user, accessToken, refreshToken } = await response.json();

  // httpOnly 쿠키 설정
  const res = NextResponse.json({ user });
  res.cookies.set('access_token', accessToken, {
    httpOnly: true,
    secure: true,
    path: '/',
    sameSite: 'lax',
    maxAge: 3600, // 1시간
  });

  res.cookies.set('refresh_token', refreshToken, {
    httpOnly: true,
    secure: true,
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30일
  });

  return res;
}
