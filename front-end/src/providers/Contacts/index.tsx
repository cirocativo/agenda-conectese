import { createContext, ReactNode, useContext, useState } from "react";

interface IContactProps {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

interface IContactProviderProps {
  children: ReactNode;
}

interface IContactProviderData {
  contact: IContactProps;
  setContact: (contact: IContactProps) => void;
}

const ContactContext = createContext<IContactProviderData>(
  {} as IContactProviderData
);

export const ContactProvider = ({ children }: IContactProviderProps) => {
  const [contact, setContact] = useState<IContactProps>({} as IContactProps);

  return (
    <ContactContext.Provider value={{ contact, setContact }}>
      {children}
    </ContactContext.Provider>
  );
};

export const useContact = () => useContext(ContactContext);
