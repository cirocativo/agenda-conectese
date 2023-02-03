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
import { useContact } from "../../providers/Contacts";
import { useEffect, useState } from "react";

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

export default function ModalEditContact({ isOpen, onClose }: IModalProps) {
  const { contact } = useContact();
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
    mode: "onChange",
  });

  const createContact = (data: IRegisterFormValues) => {
    console.log(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay color="red" />
      <ModalContent backgroundColor="rgb(210 210 210)">
        <ModalHeader>Contato</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(createContact)}>
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
                classProps="bg-red-800 text-white hover:bg-red-600"
                icon={<GoCheck size={22} />}
              />
              <Button
                type="button"
                onClick={onClose}
                text="Excluir"
                classProps="bg-red-500 text-white  hover:animate-pulse"
                icon={<BiTrash size={22}></BiTrash>}
              />
              <Button
                type="reset"
                onClick={onClose}
                text="Fechar"
                classProps="bg-red-800 text-white hover:bg-red-600"
              />
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
