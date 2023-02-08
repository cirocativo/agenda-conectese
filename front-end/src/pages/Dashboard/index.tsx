import ModalCreate from "../../components/Modal/ModalCreateContact";
import { useDisclosure } from "@chakra-ui/react";
import { Button } from "../../components/Button";
import { IoMdAddCircle } from "react-icons/io";

import { useContact } from "../../providers/Contacts";
import { useEffect } from "react";
import { useUser } from "../../providers/User";

import { ContactList } from "../../components/ContactList";

export const Dashboard = () => {
  const { refreshContactList } = useContact();

  const { user } = useUser();

  const {
    isOpen: isOpenCreateModal,
    onOpen: onOpenCreateModal,
    onClose: onCloseCreateModal,
  } = useDisclosure();

  useEffect(() => {
    refreshContactList();
  }, []);

  return (
    <>
      <ModalCreate isOpen={isOpenCreateModal} onClose={onCloseCreateModal} />

      <div className="w-screen h-5/6 flex flex-col mt-10">
        <div className="flex justify-between flex-col">
          <div className="flex flex-start">
            <div className="w-1/12 sm:w-40 "></div>
            <h2 className=" text-3xl font-bold text-red-100">
              Bem vindo, {user?.name.split(" ")[0]}
            </h2>
          </div>

          <Button
            text="Novo Contato"
            onClick={onOpenCreateModal}
            classProps="my-button-red-style my mx-6 mt-10 w-40 self-start"
            icon={<IoMdAddCircle color="red" size={22} />}
          ></Button>
        </div>
        <ContactList />
      </div>
    </>
  );
};
