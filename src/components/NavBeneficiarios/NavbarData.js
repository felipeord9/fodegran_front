import * as MdIcons from "react-icons/md"
import * as AiIcons from "react-icons/ai"
import * as FaIcons from "react-icons/fa"
import * as LiaIcons from "react-icons/lia"
import { MdRequestPage } from "react-icons/md";

export const NavBarData = [
  {
    title: "Afiliación",
    path: "/odontologia",
    icon: <MdIcons.MdOutlineInventory />,
    cName: "nav-text",
    access: ['admin', 'vendedor', 'agencia']
  }
];