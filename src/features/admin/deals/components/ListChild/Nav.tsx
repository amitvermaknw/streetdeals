import React from 'react';

type LayoutProps = {
    children: React.ReactNode
}

const Nav = ({ children }: LayoutProps) => {
    return (
        <nav className="py-4 px-2 text-sm font-medium">
            <ul className="flex space-x-3">
                {children}
            </ul>
        </nav>
    )
}

export default Nav