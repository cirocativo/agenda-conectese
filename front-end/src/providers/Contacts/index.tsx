import { createContext, ReactNode, useContext, useState } from "react";
import api from "../../services/api";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../User";

export interface IContactProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface IContactRequest {
  name: string;
  email: string;
  phone: string;
}

interface IContactProviderProps {
  children: ReactNode;
}

interface IContactProviderData {
  refreshContactList: () => void;
  contactList: IContactProps[];
  createContact: (data: IContactRequest) => void;
  editContact: (data: IContactRequest, id: string) => void;
  deleteContact: (id: string) => void;
}

const ContactContext = createContext<IContactProviderData>(
  {} as IContactProviderData
);

export const ContactProvider = ({ children }: IContactProviderProps) => {
  const [contactList, setContactList] = useState([] as IContactProps[]);
  const toast = useToast();
  const { setUser } = useUser();

  function fixDate(data: IContactProps[]) {
    const list = [...data];

    list.forEach((contact) => {
      const date = new Date(contact.createdAt);
      contact.createdAt =
        date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    });

    setContactList(list);
  }

  function showGoodToast(title: string, description: string) {
    toast({
      title: title,
      description: description,
      status: "success",
      duration: 2000,
      isClosable: false,
    });
  }
  function showBadToast(description: string) {
    toast({
      title: "Erro",
      description: description,
      status: "error",
      duration: 2000,
      isClosable: false,
    });
  }

  const refreshContactList = async () => {
    try {
      const token = localStorage.getItem("token");

      api.defaults.headers.common.authorization = `Bearer ${token}`;

      const { data } = await api.get<IContactProps[]>("contacts/");

      fixDate(data);
    } catch (error: any) {
      console.error(error.response);
      if (error.response.status === 404) {
        showBadToast(
          "Você foi desconectado. Atualize a págine e tente novamente"
        );
        localStorage.clear();
        setUser(null);
      } else showBadToast("Ops! Houve algum erro");
    }
  };

  const createContact = async (contactData: IContactRequest) => {
    try {
      const token = localStorage.getItem("token");

      api.defaults.headers.common.authorization = `Bearer ${token}`;

      await api.post<IContactProps>("contacts/", contactData);

      showGoodToast("Contato criado", "Contato criado com sucesso");
    } catch (error: any) {
      console.error(error.response);
      if (error.response.status === 404) {
        showBadToast(
          "Você foi desconectado. Atualize a págine e tente novamente"
        );
        localStorage.clear();
        setUser(null);
      } else showBadToast("Ops! Houve algum erro");
    }
  };

  const editContact = async (contactData: IContactRequest, id: string) => {
    try {
      const token = localStorage.getItem("token");

      api.defaults.headers.common.authorization = `Bearer ${token}`;

      await api.patch<IContactProps>("contacts/" + id, contactData);

      showGoodToast("Contato atualizado", "Contato editado com sucesso");
    } catch (error: any) {
      console.error(error.response);
      if (error.response.status === 404) {
        showBadToast(
          "Você foi desconectado. Atualize a págine e tente novamente"
        );
        localStorage.clear();
        setUser(null);
      } else showBadToast("Ops! Houve algum erro");
    }
  };

  const deleteContact = async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      api.defaults.headers.common.authorization = `Bearer ${token}`;

      await api.delete("contacts/" + id);

      showGoodToast("Contato excluído", "Contato excluído com sucesso");
    } catch (error: any) {
      console.error(error.response);
      if (error.response.status === 404) {
        showBadToast(
          "Você foi desconectado. Atualize a págine e tente novamente"
        );
        localStorage.clear();
        setUser(null);
      } else showBadToast("Ops! Houve algum erro");
    }
  };

  return (
    <ContactContext.Provider
      value={{
        refreshContactList,
        contactList,
        createContact,
        editContact,
        deleteContact,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export const useContact = () => useContext(ContactContext);
