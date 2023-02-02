import { contacts } from "./contacts";
import { IoMdAddCircle } from "react-icons/io";

interface IContactProps {
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export const Dashboard = () => {
  return (
    <div className="w-screen h-5/6 flex flex-col justify-center mt-10">
      <h2 className="self-center text-xl font-bold text-red-400">JEFFERSON</h2>
      <button className=" buttonadd self-start m-6 flex gap-2 items-center border-2 p-2 rounded-lg font-bold text-red-700 bg-slate-100 hover:scale-105 hover:bg-red-900 hover:text-slate-100 transition-all">
        <IoMdAddCircle color="red" size={22} /> Novo Contato
      </button>
      <ul className="flex flex-wrap mt-10">
        {contacts.map((contact: IContactProps, index) => (
          <li
            key={index}
            className="w-80 border-4 border-transparent m-4 p-4 text-red-200 flex flex-col rounded-lg shadow-lg shadow-red-500 bg-black/40 hover:border-white hover:scale-110 hover:cursor-pointer transition-all"
          >
            <h3 className="font-bold text-lg ">{contact.name}</h3>
            <hr className="mb-2" />
            <p className="text-base">
              <strong>E-mail:</strong> {contact.email}
            </p>
            <p className="text-base">
              {" "}
              <strong>Telefone:</strong> {contact.phone}
            </p>
            <span className="text-xs pt-1">Criado em {contact.createdAt}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
