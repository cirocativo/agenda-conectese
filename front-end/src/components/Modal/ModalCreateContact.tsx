import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Button } from "../Button";
import { IoMdAddCircle } from "react-icons/io";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import "yup-phone";

import { IContactRequest, useContact } from "../../providers/Contacts";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
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

export default function ModalCreateContact({ isOpen, onClose }: IModalProps) {
  const { createContact, refreshContactList } = useContact();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormValues>({
    resolver: yupResolver(schema),
  });

  const handleNewContactClicked = async (data: IContactRequest) => {
    createContact(data);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onCloseComplete={refreshContactList}
    >
      <ModalOverlay color="red" />
      <ModalContent backgroundColor="rgb(210 210 210)">
        <ModalHeader>Novo Contato</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(handleNewContactClicked)}>
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
              E-mail{" "}
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
            <div className="flex justify-between">
              <Button
                type="submit"
                text="Adicionar"
                classProps="my-7 bg-red-800 text-white hover:bg-red-600"
                icon={<IoMdAddCircle size={22} />}
              />
              <Button
                onClick={onClose}
                type="reset"
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
