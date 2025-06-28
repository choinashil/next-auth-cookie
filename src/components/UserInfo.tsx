'use client';

// 인증이 필요한 API 요청 예시
const UserInfo = () => {
  const handleButtonClick = async () => {
    // api route를 통해 서버에서 쿠키에 저장된 토큰을 사용해 요청
    const res = await fetch('/api/proxy/users/me');
    
    // 로컬스토리지를 사용했다면, 아래처럼 구현했을 코드
    // const res = await fetch('https://wikied-api.vercel.app/7722/users/me', {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });

    const data = await res.json();
    console.log('data', data);
  };

  return (
    <button onClick={handleButtonClick} className='text-blue-500'>
      유저 정보 가져오기
    </button>
  );
};

export default UserInfo;