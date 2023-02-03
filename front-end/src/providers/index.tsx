import { ReactNode } from "react";
import { ContactProvider } from "./Contacts";
import { UserProvider } from "./User";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => (
  <UserProvider>
    <ContactProvider>{children}</ContactProvider>
  </UserProvider>
);
