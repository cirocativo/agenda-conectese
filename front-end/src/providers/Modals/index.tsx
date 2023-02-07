import { useDisclosure } from "@chakra-ui/react";
import { createContext, ReactNode, useContext } from "react";

interface IModalsProviderProps {
  children: ReactNode;
}

interface IModalsProviderData {
  isOpenCreateModal: boolean;
  onOpenCreateModal: () => void;
  onCloseCreateModal: () => void;

  isOpenEditModal: boolean;
  onOpenEditModal: () => void;
  onCloseEditModal: () => void;

  isOpenEditClientModal: boolean;
  onOpenEditClientModal: () => void;
  onCloseEditClientModal: () => void;
}

const ModalsContext = createContext<IModalsProviderData>(
  {} as IModalsProviderData
);

export const ModalsProvider = ({ children }: IModalsProviderProps) => {
  const {
    isOpen: isOpenCreateModal,
    onOpen: onOpenCreateModal,
    onClose: onCloseCreateModal,
  } = useDisclosure();
  const {
    isOpen: isOpenEditModal,
    onOpen: onOpenEditModal,
    onClose: onCloseEditModal,
  } = useDisclosure();
  const {
    isOpen: isOpenEditClientModal,
    onOpen: onOpenEditClientModal,
    onClose: onCloseEditClientModal,
  } = useDisclosure();
  return (
    <ModalsContext.Provider
      value={{
        isOpenCreateModal,
        onOpenCreateModal,
        onCloseCreateModal,

        isOpenEditModal,
        onOpenEditModal,
        onCloseEditModal,

        isOpenEditClientModal,
        onOpenEditClientModal,
        onCloseEditClientModal,
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
};

export const useModals = () => useContext(ModalsContext);
