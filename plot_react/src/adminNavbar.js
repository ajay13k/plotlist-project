import { BellIcon, ChevronDownIcon, HamburgerIcon ,SettingsIcon } from '@chakra-ui/icons';
import { BsFillPersonLinesFill ,BsHouseFill,BsPersonSquare,BsPersonXFill } from "react-icons/bs";

const a =  [
    { name: 'Home', icon: BsHouseFill ,  href:"/adminhome" },
    { name: 'Category', icon: BellIcon ,href:"/category"},
    { name: 'Listing', icon: HamburgerIcon ,href:"/listing" },
    { name: 'Users', icon: BsFillPersonLinesFill ,href:"/users" },
    { name: 'MyProfile', icon:BsPersonSquare , href:"/profile" },
    { name: 'Logout', icon: BsPersonXFill,href:"/"},
    { name: 'Site Management', icon: SettingsIcon, href:"/sitemanagement"}
]

export default a ;