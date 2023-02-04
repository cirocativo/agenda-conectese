import { Request, Response } from "express";
import { IContactUpdate } from "../interfaces";
import {
  createContactService,
  deleteContactService,
  getContactsService,
  updateContactService,
} from "../services/contacts.service";

export const createContactController = async (
  request: Request,
  response: Response
) => {
  const newContact = request.body;
  const userId = request.user.id;

  const contactCreated = await createContactService(newContact, userId);

  return response.status(201).json(contactCreated);
};

export const getContactsController = async (
  request: Request,
  response: Response
) => {
  const userId = request.user.id;

  const contacts = await getContactsService(userId);

  return response.json(contacts);
};

export const updateContactController = async (
  request: Request,
  response: Response
) => {
  const contact: IContactUpdate = request.body;
  const id: string = request.params.id;
  const userId = request.user.id;

  const updatedContact = await updateContactService(contact, id, userId);

  return response.status(201).json(updatedContact);
};

export const deleteContactController = async (
  request: Request,
  response: Response
) => {
  const id: string = request.params.id;
  const userId = request.user.id;

  await deleteContactService(id, userId);

  return response.status(204).send();
};
