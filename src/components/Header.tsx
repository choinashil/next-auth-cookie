import { useAuth } from '@/contexts/AuthProvider';
import Link from 'next/link';

const Header = () => {
  const { user, isLoading, logout } = useAuth();

  return (
    <header className='flex justify-between items-center p-10'>
      <Link href='/' className='text-2xl font-bold'>
        Logo
      </Link>
      {isLoading ? (
        <p className='text-blue-500'>Loading...</p>
      ) : user?.name ? (
        <div className='flex gap-2'>
          <p>User: {user.name}</p>
          <button onClick={logout} className='text-blue-500'>
            Logout
          </button>
        </div>
      ) : (
        <Link href='/login' className='text-blue-500'>
          Login
        </Link>
      )}
    </header>
  );
};

export default Header;
