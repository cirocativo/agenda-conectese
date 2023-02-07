import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { MdPictureAsPdf } from "react-icons/md";

interface IMenuProps {
  option1: () => void;
  option2: () => void;
  option3: () => void;
}

export const MenuHamburger = (ops: IMenuProps) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<RiMenuLine />}
        variant="outline"
        backgroundColor={"whiteAlpha.700"}
        height="50px"
        width="50px"
        marginRight="2rem"
      />
      <MenuList>
        <MenuItem onClick={ops.option1} color="#B91C1C" icon={<CgProfile />}>
          Alterar Perfil
        </MenuItem>
        <MenuItem
          onClick={ops.option2}
          color="#B91C1C"
          icon={<MdPictureAsPdf />}
        >
          Gerar relatório
        </MenuItem>
        <MenuItem onClick={ops.option3} color="#B91C1C" icon={<FiLogOut />}>
          Sair
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
