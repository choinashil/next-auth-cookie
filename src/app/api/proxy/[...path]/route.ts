import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
  const { path } = await params;
  const subpath = path.join('/');

  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 코드잇 API로 요청
  let response = await fetch(`${process.env.API_BASE_URL}/${subpath}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // 기존 토큰으로 인증 실패
  if (response.status === 401) {
    const refreshToken = cookieStore.get('refresh_token')?.value;
    if (!refreshToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 리프레시 토큰으로 토큰 갱신
    const refreshResponse = await fetch(`${process.env.API_BASE_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!refreshResponse.ok) {
      return NextResponse.json({ error: 'Token refresh failed' }, { status: 401 });
    }

    // 갱신된 토큰 쿠키에 저장
    const { accessToken } = await refreshResponse.json();
    cookieStore.set('access_token', accessToken, {
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'lax',
      maxAge: 3600, // 1시간
    });

    // 갱신된 토큰으로 재요청
    response = await fetch(`${process.env.API_BASE_URL}/${subpath}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  const data = await response.json();
  return NextResponse.json(data);
}
