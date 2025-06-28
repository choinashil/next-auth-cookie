'use client';

import { useAuth } from '@/contexts/AuthProvider';
import Link from 'next/link';

// 테스트용 계정
const email = 'apple456@email.com';
const password = 'password';

export default function Login() {
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await login(email, password);
  };
  
  return (
    <div className='flex flex-col items-center gap-10 w-1/4 mx-auto'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-2 w-full'>
        <input type='text' name='email' placeholder='이메일' className='border border-gray-300 rounded-md p-2' />
        <input type='password' name='password' placeholder='비밀번호' className='border border-gray-300 rounded-md p-2' />
        <button type='submit' className='bg-blue-500 text-white rounded-md p-2'>
          로그인
        </button>
      </form>
      <div className='flex gap-10'>
        <Link href='/' className='text-blue-500'>
          홈으로 이동
        </Link>
      </div>
    </div>
  );
}
