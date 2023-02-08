import AppDataSource from "../data-source";
import { Contact } from "../entities/contact.entity";
import { IContactRequest, IContactUpdate } from "../interfaces";
import { validate as uuidValidate } from "uuid";
import AppError from "../errors/AppError";
import { User } from "../entities/user.entity";

export const createContactService = async (
  { name, email, phone }: IContactRequest,
  userId: string
): Promise<Contact> => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    id: userId,
  });

  if (!user) throw new AppError(" User not found", 404);

  const contact = contactRepository.create({
    name,
    email,
    phone,
    user,
  });

  await contactRepository.save(contact);

  return contact;
};

export const getContactsService = async (
  userId: string
): Promise<Contact[]> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      id: userId,
    },
    relations: {
      contacts: true,
    },
  });

  if (!user) throw new AppError(" User id not found", 404);

  return user.contacts;
};

export const updateContactService = async (
  { email, name, phone }: IContactUpdate,
  id: string,
  userId: string
): Promise<Contact> => {
  const ContactRepository = AppDataSource.getRepository(Contact);

  const isuuidValid = uuidValidate(id);

  if (!isuuidValid) throw new AppError(" Invalid Contact id");

  const findContact = await ContactRepository.findOne({
    where: {
      id,
    },
    relations: {
      user: true,
    },
  });

  if (!findContact) throw new AppError("Contact id not found", 404);

  if (findContact.user.id !== userId) throw new AppError("Unauthorized", 403);

  await ContactRepository.update(id, {
    email: email || findContact.email,
    name: name || findContact.name,
    phone: phone || findContact.phone,
  });

  const updatedContact = await ContactRepository.findOneBy({
    id,
  });

  return updatedContact!;
};

export const deleteContactService = async (id: string, userId: string) => {
  const ContactRepository = AppDataSource.getRepository(Contact);

  const isuuidValid = uuidValidate(id);

  if (!isuuidValid) throw new AppError(" Invalid Contact id");

  const findContact = await ContactRepository.findOne({
    where: {
      id,
    },
    relations: {
      user: true,
    },
  });

  if (!findContact) throw new AppError("Contact id not found", 404);

  if (findContact.user.id !== userId) throw new AppError("Unauthorized", 403);

  await ContactRepository.delete({ id });

  return "Contact deleted successfully";
};
