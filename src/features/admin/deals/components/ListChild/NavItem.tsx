import { LayoutProps } from "../../../../../utils/Types";

type NavItemProps = {
    isActive?: boolean
    href?: string
}

type T = LayoutProps & NavItemProps

const NavItem = ({ href, isActive, children }: T) => {
    return (
        <li>
            <a
                href={href}
                className={`block px-3 py-2 rounded-md ${isActive ? 'bg-sky-500 text-white' : 'bg-slate-50'}`}>
                {children}
            </a>
        </li>
    )
}

export default NavItem;