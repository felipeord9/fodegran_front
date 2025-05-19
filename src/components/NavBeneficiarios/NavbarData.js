import * as MdIcons from "react-icons/md"

export const NavBarData = [
  {
    title: "Afiliación",
    path: "/odontologia",
    icon: <MdIcons.MdOutlineInventory />,
    cName: "nav-text",
    access: ['admin', 'vendedor', 'agencia']
  }
];