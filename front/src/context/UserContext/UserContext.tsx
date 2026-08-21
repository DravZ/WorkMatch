import React, {
  createContext,
  useContext,
  useState,
} from 'react';

interface User {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  role: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
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

  const clearUser = () => {
    setUserState(null);
    localStorage.removeItem('userWM');
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        clearUser,
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