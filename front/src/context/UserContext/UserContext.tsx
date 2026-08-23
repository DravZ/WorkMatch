import React, {
  createContext,
  useContext,
  useState,
} from 'react';

export type UserRole = 'work' | 'hire' | 'admin';

interface User {
  id: number;
  nombreCompleto: string;
  email: string;
  role: UserRole;
  empresaId?: number;
  nombreEmpresa?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
  patchUser: (data: Partial<User>) => void;
  clearUser: () => void;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUserState] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('userWM');

    return storedUser ? JSON.parse(storedUser) : null;
  });

  const setUser = (user: User) => {
    setUserState(user);
    localStorage.setItem('userWM', JSON.stringify(user));
  };

  const patchUser = (data: Partial<User>) => {
    setUserState((currentUser) => {
      if (!currentUser) {
        return null;
      }

      const updatedUser = {
        ...currentUser,
        ...data,
      };

      localStorage.setItem('userWM', JSON.stringify(updatedUser));

      return updatedUser;
    });
  };

  const clearUser = () => {
    setUserState(null);
    localStorage.removeItem('userWM');
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        patchUser,
        clearUser,
        isAuthenticated: user !== null,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      'useUser debe utilizarse dentro de un UserProvider',
    );
  }

  return context;
};