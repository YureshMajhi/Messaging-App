import { createContext, useContext, useState, useCallback } from 'react';

// todo: remove mock functionality - replace with real auth
interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  bio: string;
  avatarUrl: string | null;
  friendCount: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// todo: remove mock functionality
const mockUser: User = {
  id: '1',
  username: 'johndoe',
  email: 'john@example.com',
  displayName: 'John Doe',
  bio: 'Living life and loving every moment with family and friends.',
  avatarUrl: null,
  friendCount: 42,
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    // todo: remove mock functionality - implement real login
    console.log('Login:', email, password);
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser(mockUser);
  }, []);

  const signup = useCallback(async (username: string, email: string, password: string) => {
    // todo: remove mock functionality - implement real signup
    console.log('Signup:', username, email, password);
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser({ ...mockUser, username, email, displayName: username });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const updateProfile = useCallback((data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
