import { useDisclosure } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ModalEditUser from "../../components/Modal/ModalEditUser";
import { useUser } from "../../providers/User";
import { useNavigate } from "react-router-dom";
import { MenuHamburger } from "../Menu";

interface IHeaderProps {
  title: string;
}

export function Header({ title }: IHeaderProps) {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const {
    isOpen: isOpenEditClientModal,
    onOpen: onOpenEditClientModal,
    onClose: onCloseEditClientModal,
  } = useDisclosure();

  function onLogOut() {
    setUser(null);
    localStorage.clear();
    navigate("/");
  }

  function onPdfClicked() {
    navigate("/pdf");
  }

  return (
    <header className="w-screen h-24 flex items-center justify-between shadow-lg shadow-black bg-red-900 sticky top-0 left-0 right-0 z-1 ">
      {user && (
        <ModalEditUser
          isOpen={isOpenEditClientModal}
          onClose={onCloseEditClientModal}
        />
      )}
      <div className="min-[420px]:w-1/3"></div>
      <div className="w-1/3 flex justify-center min-w-fit pl-4 min-[420px]:pl-0">
        <Link to="/" className="  text-5xl text-cyan-50 font-righteous">
          {title}
        </Link>
      </div>
      <div className="w-1/3 flex justify-end">
        {user && (
          <MenuHamburger
            option1={onOpenEditClientModal}
            option2={onPdfClicked}
            option3={onLogOut}
          />
        )}
      </div>
    </header>
  );
}
