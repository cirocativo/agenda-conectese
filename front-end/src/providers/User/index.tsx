import { useToast } from "@chakra-ui/react";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../../services/api";

export interface IUserProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  isAdm: boolean;
}

export interface IUserRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface IUserEditRequest {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
}

interface IUserProviderProps {
  children: ReactNode;
}

interface IUserProviderData {
  user: IUserProps | null;
  setUser: (User: IUserProps) => void;
  login: (loginData: ILoginDataProps) => Promise<boolean>;
  loading: boolean;
  createUser: (user: IUserRequest) => Promise<boolean>;
  editUser: (data: IUserEditRequest) => void;
  deleteUser: () => void;
}

export interface ILoginDataProps {
  email: string;
  password: string;
}
export interface ILoginDataResponse {
  user: IUserProps;
  token: string;
}

const UserContext = createContext<IUserProviderData>({} as IUserProviderData);

export const UserProvider = ({ children }: IUserProviderProps) => {
  const [user, setUser] = useState<IUserProps | null>(null);

  const [loading, setLoading] = useState(true);

  const toast = useToast();

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

  const createUser = async (userData: IUserRequest): Promise<boolean> => {
    try {
      await api.post("users/", userData);

      showGoodToast("Conta criada", "Sua conta foi criada com sucesso");

      return true;
    } catch (error: any) {
      showBadToast("Ops! Este E-mail já existe");
      console.error(error.response);
    }
    return false;
  };

  const login = async (loginData: ILoginDataProps) => {
    try {
      const { data } = await api.post<ILoginDataResponse>("login/", loginData);
      setUser(data.user);
      localStorage.setItem("token", data.token);

      showGoodToast("Login realizado", "Login realizado com sucesso");
      return true;
    } catch (error: any) {
      showBadToast("Ops! E-mail e/ou senha incorretos");
      console.error(error.response);
      console.log(error.response?.data);

      return false;
    }
  };

  const editUser = async (userData: IUserEditRequest) => {
    try {
      const token = localStorage.getItem("token");

      api.defaults.headers.common.authorization = `Bearer ${token}`;

      const { data } = await api.patch<IUserProps>("users/", userData);

      setUser(data);
      showGoodToast("Conta atualizada", "Sua conta foi editada com sucesso!");
    } catch (error: any) {
      showBadToast("Houve algum erro. Este e-mail provavelmente já existe");
      console.error(error.response);
    }
  };

  const deleteUser = async () => {
    try {
      const token = localStorage.getItem("token");

      api.defaults.headers.common.authorization = `Bearer ${token}`;

      await api.delete("users/");

      setUser(null);

      showGoodToast("Conta deletada", "Você deletou sua conta com sucesso");
    } catch (error: any) {
      alert("Houve algum erro");
      showBadToast("Ops! Houve algum erro");
    }
  };

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          api.defaults.headers.authorization = `Bearer ${token}`;

          const { data } = await api.get("users/profile");

          setUser(data);
        } catch (error) {
          console.error(error);
          showBadToast("Você foi desconectado");
          localStorage.clearItem("token");
        }
      }
      setLoading(false);
    }

    loadUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        login,
        loading,
        createUser,
        editUser,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
