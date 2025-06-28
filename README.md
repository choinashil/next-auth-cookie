# 소개

쿠키를 지원하지 않는 API를 사용하는 경우, API route를 통해 쿠키로 토큰을 관리할 수 있도록 하는 코드 예시를 제공합니다.<br />
주요 기능으로는 로그인, 로그아웃, 토큰이 필요한 요청 시 프록시, refresh token을 사용한 토큰 갱신이 포함됩니다.

<br />

# 실행 방법

1. 의존성 설치
    ```sh
    npm install
    ```
2. 개발 서버 시작
    ```sh
    npm run dev
    ```

3. 웹 브라우저에서 `http://localhost:3000`으로 접속

<br />

# 주요 기능

## 로그인

```
POST /api/login
```
사용자의 정보를 받아 API로 로그인 요청을 보내고, 성공 시 accessToken과 refreshToken을 쿠키에 저장합니다.

## 로그아웃

```
POST /api/logout
```
쿠키에 저장된 accessToken과 refreshToken을 삭제하여 로그아웃을 처리합니다.

## 토큰이 필요한 요청 시 프록시

```
GET /api/proxy/[...path]
```
쿠키에 저장된 accessToken을 요청 헤더의 Authorization에 넣어 실제 API 요청을 프록시합니다.

## 토큰 갱신

쿠키에 저장된 refreshToken을 사용해 accessToken을 갱신하고 다시 쿠키에 저장합니다.

