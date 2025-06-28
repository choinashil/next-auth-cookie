import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types/user';

const AuthContext = createContext<{
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}>({
  user: null,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // 유저 정보를 전역에서 참조하기 위해 context를 사용해 상태 관리
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (email: string, password: string) => {
    // api route를 통해 로그인 요청
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    
    const data = await res.json();
    
    if (res.ok && data.user) {
      setUser(data.user);
    }
  };

  const logout = async () => {
    // api route를 통해 로그아웃 요청
    await fetch('/api/logout', { method: 'POST' });
    // 서버에서 쿠키 삭제 후, 클라이언트에서 유저 정보 초기화하여 상태 동기화
    setUser(null);
  };

  useEffect(() => {
    // 페이지 첫 진입 시 유저 정보 가져오기
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/proxy/users/me');
        const data = res.ok ? await res.json() : { user: null };
        setUser(data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return <AuthContext.Provider value={{ user, isLoading, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
