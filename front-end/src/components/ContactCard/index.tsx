import { useDisclosure } from "@chakra-ui/react";
import { IContactProps } from "../../providers/Contacts";
import ModalEditContact from "../Modal/ModalEditContact";

interface IContactCardProps {
  contact: IContactProps;
}

export const ContactCard = ({ contact }: IContactCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <li
      className="w-80 border-4 border-transparent m-4 p-4 text-red-200 flex flex-col rounded-lg shadow-lg shadow-red-500 bg-black/40 hover:border-white hover:scale-110 hover:cursor-pointer transition-all"
      onClick={() => onOpen()}
    >
      <h3 className="font-bold text-lg ">{contact.name}</h3>
      <hr className="mb-2" />
      <p className="text-base">
        <strong>E-mail:</strong> {contact.email}
      </p>
      <p className="text-base">
        <strong>Telefone:</strong> {contact.phone}
      </p>
      <span className="text-xs pt-1">Criado em {contact.createdAt}</span>
      <ModalEditContact isOpen={isOpen} onClose={onClose} contact={contact} />
    </li>
  );
};
