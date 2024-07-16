import * as MdIcons from "react-icons/md"
import { FaTooth } from "react-icons/fa";
import { MdRequestPage } from "react-icons/md";

export const NavBarData = [
  /* {
    title: "Afiliación",
    path: "/afiliacion",
    icon: <MdIcons.MdOutlineInventory className="me-1"/>,
    cName: "nav-text",
    access: ['admin', 'vendedor', 'agencia']
  },
  {
    title: "Solicitar Crédito",
    path: "/Solicitud/credito",
    icon: <MdRequestPage className="me-1" />,
    cName: "nav-text",
    access: ['admin', 'aprobador']
  }, */
  {
    title: "Odontología",
    path: "/odontologia",
    icon: <FaTooth className="me-1" />,
    cName: "nav-text",
    access: ['admin', 'vendedor', 'agencia']
  },
];