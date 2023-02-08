import { IContactProps, useContact } from "../../providers/Contacts";
import { ContactCard } from "../ContactCard";

export const ContactList = () => {
  const { contactList } = useContact();
  return (
    <ul className="flex flex-wrap mt-10">
      {contactList.map((contact: IContactProps, index) => (
        <ContactCard contact={contact} key={contact.id} />
      ))}
    </ul>
  );
};
