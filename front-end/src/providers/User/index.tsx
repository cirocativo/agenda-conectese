import { createContext, ReactNode, useContext, useState } from "react";

interface IUserProps {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

interface IUserProviderProps {
  children: ReactNode;
}

interface IUserProviderData {
  user: IUserProps;
  setUser: (User: IUserProps) => void;
}

const UserContext = createContext<IUserProviderData>({} as IUserProviderData);

export const UserProvider = ({ children }: IUserProviderProps) => {
  const [user, setUser] = useState<IUserProps>({} as IUserProps);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
