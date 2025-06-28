import UserInfo from '@/components/UserInfo';

export default function Home() {
  return (
    <div className='flex flex-col items-center gap-10 w-1/4 mx-auto'>
      <h2>홈</h2>
      <UserInfo />
    </div>
  );
}
