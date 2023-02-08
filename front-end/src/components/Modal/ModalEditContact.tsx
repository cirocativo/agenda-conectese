import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Button } from "../Button";
import { GoCheck } from "react-icons/go";
import { BiTrash } from "react-icons/bi";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import "yup-phone";
import { IContactProps, useContact } from "../../providers/Contacts";
import { useEffect, useState } from "react";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: IContactProps;
  // setIsContactClicked: (_: boolean) => void;
}

interface IRegisterFormValues {
  name: string;
  email: string;
  phone: string;
}

const schema = yup.object({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().required("E-mail obrigatório"),
  phone: yup
    .string()
    .phone("BR", true, "Número inválido")
    .required("Telefone obrigatório"),
});

export default function ModalEditContact({
  isOpen,
  onClose,
  contact,
}: // setIsContactClicked,
IModalProps) {
  const { editContact, deleteContact, refreshContactList } = useContact();
  const [contactInfo, setContactInfo] = useState(contact);
  useEffect(() => {
    setContactInfo(contact);
    setDefaultValues(contact);
  }, [contact]);

  const [defaultValues, setDefaultValues] = useState(contactInfo);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormValues>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  const handleEditContact = (data: IRegisterFormValues) => {
    editContact(data, contact.id);

    onClose();
  };

  const handleDeleteContact = () => {
    deleteContact(contact.id);

    onClose();
  };

  const handleOnCloseComplete = () => {
    refreshContactList();
    // setIsContactClicked(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onCloseComplete={handleOnCloseComplete}
    >
      <ModalOverlay color="red" />
      <ModalContent backgroundColor="rgb(210 210 210)">
        <ModalHeader>Contato</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(handleEditContact)}>
            <label className="font-bold">
              Nome Completo
              <input
                type="text"
                className={`input
              ${errors.name ? " border-red-500" : ""}
            `}
                {...register("name")}
              />
              <span className="text-red-700 block animate-pulse-color-black mb-4">
                {errors.name?.message}
              </span>
            </label>
            <label className="label">
              E-mail
              <input
                type="email"
                className={`input
              ${errors.email ? " border-red-500" : ""}
            `}
                {...register("email")}
              />
              <span className="text-red-700 block animate-pulse-color-black mb-4">
                {errors.email?.message}
              </span>
            </label>

            <label className="label">
              Telefone
              <input
                type="text"
                className={`input
              ${errors.phone ? " border-red-500" : ""}
            `}
                {...register("phone")}
              />
              <span className="text-red-700 inline animate-pulse-color-black">
                {errors.phone?.message}
              </span>
            </label>
            <div className="flex gap-4 ">
              <Button
                type="submit"
                text="Atualizar"
                classProps="my-7 bg-red-800 text-white hover:bg-red-600"
                icon={<GoCheck size={22} />}
              />
              <Button
                type="button"
                onClick={handleDeleteContact}
                text="Excluir"
                classProps="my-7 bg-red-500 text-white  hover:animate-pulse"
                icon={<BiTrash size={22}></BiTrash>}
              />
              <Button
                type="reset"
                onClick={onClose}
                text="Fechar"
                classProps="my-7 bg-red-800 text-white hover:bg-red-600"
              />
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
