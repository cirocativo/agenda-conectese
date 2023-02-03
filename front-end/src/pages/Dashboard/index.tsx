import { contacts } from "./contacts";
import ModalCreate from "../../components/Modal/ModalCreateContact";
import ModalEdit from "../../components/Modal/ModalEditContact";
import { useDisclosure } from "@chakra-ui/react";
import { Button } from "../../components/Button";
import { IoMdAddCircle } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

import { useContact } from "../../providers/Contacts";
import { useUser } from "../../providers/User";
import { useNavigate } from "react-router-dom";
import ModalEditClient from "../../components/Modal/ModalEditClient";

interface IContactProps {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export const Dashboard = () => {
  const { setContact } = useContact();
  const { user, setUser } = useUser();
  const navigate = useNavigate();
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

  function onLogOut() {
    setUser({} as IContactProps);
    navigate("/");
  }

  return (
    <>
      <ModalCreate isOpen={isOpenCreateModal} onClose={onCloseCreateModal} />
      <ModalEdit isOpen={isOpenEditModal} onClose={onCloseEditModal} />
      <ModalEditClient
        isOpen={isOpenEditClientModal}
        onClose={onCloseEditClientModal}
      />
      <div className="w-screen h-5/6 flex flex-col mt-10">
        <div className="flex justify-between">
          <h2 className="ml-40 text-3xl font-bold text-red-100">
            Bem vindo, {user.name}
          </h2>
          <nav className="flex justify-end pr-8 items-start">
            <Button
              text="Novo Contato"
              onClick={onOpenCreateModal}
              classProps="ml-6 w-40 self-start text-red-700 bg-slate-100 hover:bg-red-900 hover:text-slate-100"
              icon={<IoMdAddCircle color="red" size={22} />}
            ></Button>
            <Button
              text="Editar perfil"
              onClick={onOpenEditClientModal}
              classProps="ml-6 w-40 self-start text-red-700 bg-slate-100 hover:bg-red-900 hover:text-slate-100"
              icon={<CgProfile color="red" size={22} />}
            ></Button>
            <Button
              text="Sair"
              onClick={onLogOut}
              classProps="ml-6 w-40 self-start text-red-700 bg-slate-100 hover:bg-red-900 hover:text-slate-100"
              icon={<FiLogOut color="red" size={22} />}
            ></Button>
          </nav>
        </div>
        <ul className="flex flex-wrap mt-10">
          {contacts.map((contact: IContactProps, index) => (
            <li
              key={index}
              className="w-80 border-4 border-transparent m-4 p-4 text-red-200 flex flex-col rounded-lg shadow-lg shadow-red-500 bg-black/40 hover:border-white hover:scale-110 hover:cursor-pointer transition-all"
              onClick={() => {
                setContact(contact);
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
