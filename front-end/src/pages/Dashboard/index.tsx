import ModalCreate from "../../components/Modal/ModalCreateContact";
import ModalEdit from "../../components/Modal/ModalEditContact";
import { useDisclosure } from "@chakra-ui/react";
import { Button } from "../../components/Button";
import { IoMdAddCircle } from "react-icons/io";

import { IContactProps, useContact } from "../../providers/Contacts";
import { useEffect, useState } from "react";
import { useUser } from "../../providers/User";

export const Dashboard = () => {
  const { setContact, contactList, refreshContactList } = useContact();

  const [isContactClicked, setIsContactClicked] = useState(false);
  const { user } = useUser();

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

  useEffect(() => {
    refreshContactList();
  }, []);

  return (
    <>
      <ModalCreate isOpen={isOpenCreateModal} onClose={onCloseCreateModal} />
      {isContactClicked && (
        <ModalEdit
          isOpen={isOpenEditModal}
          onClose={onCloseEditModal}
          setIsContactClicked={setIsContactClicked}
        />
      )}

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
        <ul className="flex flex-wrap mt-10">
          {contactList.map((contact: IContactProps, index) => (
            <li
              key={index}
              className="w-80 border-4 border-transparent m-4 p-4 text-red-200 flex flex-col rounded-lg shadow-lg shadow-red-500 bg-black/40 hover:border-white hover:scale-110 hover:cursor-pointer transition-all"
              onClick={() => {
                setContact(contact);
                setIsContactClicked(true);
                return onOpenEditModal();
              }}
            >
              <h3 className="font-bold text-lg ">{contact.name}</h3>
              <hr className="mb-2" />
              <p className="text-base">
                <strong>E-mail:</strong> {contact.email}
              </p>
              <p className="text-base">
                <strong>Telefone:</strong> {contact.phone}
              </p>
              <span className="text-xs pt-1">
                Criado em {contact.createdAt}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
