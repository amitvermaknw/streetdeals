import { useState } from 'react'
import { Transition } from '@headlessui/react'
import { Link } from 'react-router-dom';
import { useAuth } from '../features/authentication/hooks/useAuth';
import logo from '../assets/db_logo.svg'

type Props = {
    onSubscribe: () => void
}

const Header = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const auth = useAuth();

    const [profileDropdown, setProfileDropdown] = useState(false);

    const toggleDropdown = (menuType: string) => {
        if (menuType === 'profile') {
            setProfileDropdown(!profileDropdown);
            setIsOpen(false);
        } else if (menuType === 'menu') {
            setIsOpen(!isOpen);
            setProfileDropdown(false);
        }
    };

    return (<>
        <nav className="bg-gray-800">
            <div className="max-w-8xl px-4 mx-auto sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* <div className="flex items-center"> */}
                    <div className="flex justify-between items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
                        <button type="button"
                            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                            id="user-menu-button"
                            aria-expanded={profileDropdown}
                            aria-haspopup="true"
                            onClick={() => toggleDropdown('profile')}
                        >
                            <span className="sr-only">Open user menu</span>
                            <img className="w-8 h-8 rounded-full" src="https://picsum.photos/id/237/200/300" alt="user photo" />
                        </button>

                        {/* {profileDropdown && (<div className="absolute pt-2 pl-2 pr-2 z-50 mt-72 left-0 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                            id="user-dropdown"
                            role="menu"
                            aria-orientation='vertical'
                            aria-labelledby='user-menu-button'
                        >
                            <div className="px-4 py-3">
                                <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
                            </div>

                            <ul className="py-2">
                                <li>
                                    <Link
                                        to="/"
                                        className=" block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="deals"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Deals
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                        onClick={() => props.onSubscribe()}
                                    >
                                        Subscribe
                                    </Link>
                                </li>
                                <li>
                                    {auth.token ? '' : <Link
                                        to="/login"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Login
                                    </Link>}
                                </li>
                                {auth.token ? <> <li><Link
                                    to="/dashboard"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Dashboard
                                </Link></li>
                                    <li>
                                        <Link
                                            to="/"
                                            onClick={() => auth.logOut()}
                                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                        >
                                            Logout
                                        </Link>
                                    </li>
                                </>
                                    : ''}
                            </ul>
                        </div>)} */}
                        {/* <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                                    <span className="sr-only">Open main menu</span>
                                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                                    </svg>
                                </button> */}
                    </div>
                    <div className="flex items-center flex-shrink-0">
                        <Link to="/">
                            <img
                                className="h-14"
                                src={logo}
                                alt="logo"
                            />
                        </Link>
                    </div>

                    {/* <div className="container  max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
                        <div className='flex items-center space-x-4'>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <Link
                                        to="/"
                                        className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Home
                                    </Link>

                                    <Link
                                        to="deals"
                                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Deals
                                    </Link>

                                    <Link
                                        to="#"
                                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                        onClick={() => props.onSubscribe()}
                                    >
                                        Subscribe
                                    </Link>
                                    {auth.token ? '' : <Link
                                        to="/login"
                                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Login
                                    </Link>}
                                    {auth.token ? <> <Link
                                        to="/dashboard"
                                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Dashboard
                                    </Link>
                                        <button onClick={() => auth.logOut()} className="btn-submit text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                            Logout
                                        </button> </>
                                        : ''}
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => toggleDropdown('menu')}
                            type="button"
                            className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <Transition
                show={isOpen}
                enter="transition ease-out duration-100 transform"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                {() => (
                    <div className="md:hidden" id="mobile-menu">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
                            <Link
                                to="/"
                                className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                Home
                            </Link>

                            <Link
                                to="deals"
                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                Deals
                            </Link>

                            <Link
                                to="#"
                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                onClick={() => props.onSubscribe()}
                            >
                                Subscribe
                            </Link>
                            {auth.token ? '' : <Link
                                to="/login"
                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                Login
                            </Link>}
                            {auth.token ? <> <Link
                                to="/dashboard"
                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                Dashboard
                            </Link>
                                <Link
                                    to="/"
                                    onClick={() => auth.logOut()}
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Logout
                                </Link>
                            </>
                                : ''}
                        </div>
                    </div>
                )}
            </Transition>

            {profileDropdown && (
                <Transition
                    show={profileDropdown}
                    enter="transition ease-out duration-100 transform"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-75 transform"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    {() => (
                        <div className="md:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
                                <div className="px-3 py-1">
                                    <span className="block text-sm text-white dark:text-white">Bonnie Green</span>
                                    <span className="block text-sm  text-gray-400 truncate dark:text-gray-400">name@flowbite.com</span>
                                </div>

                                <hr className="h-px my-8 px-3 bg-gray-500 border-0 dark:bg-gray-700" />
                                <Link
                                    to="/"
                                    className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Home
                                </Link>

                                <Link
                                    to="deals"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Deals
                                </Link>

                                <Link
                                    to="#"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    onClick={() => props.onSubscribe()}
                                >
                                    Subscribe
                                </Link>
                                {auth.token ? '' : <Link
                                    to="/login"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Login
                                </Link>}
                                {auth.token ? <> <Link
                                    to="/dashboard"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Dashboard
                                </Link>
                                    <Link
                                        to="/"
                                        onClick={() => auth.logOut()}
                                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Logout
                                    </Link>
                                </>
                                    : ''}

                            </div>
                            {/* <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col"
                                id="user-dropdown"
                                role="menu"
                                aria-orientation='vertical'
                                aria-labelledby='user-menu-button'
                            >
                                <div className="px-4 py-3">
                                    <span className="block text-sm text-white dark:text-white">Bonnie Green</span>
                                    <span className="block text-sm  text-gray-400 truncate dark:text-gray-400">name@flowbite.com</span>
                                </div>

                                <ul className="py-2">
                                    <li>
                                        <Link
                                            to="/"
                                            className=" block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="deals"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Deals
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="#"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                            onClick={() => props.onSubscribe()}
                                        >
                                            Subscribe
                                        </Link>
                                    </li>
                                    <li>
                                        {auth.token ? '' : <Link
                                            to="/login"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Login
                                        </Link>}
                                    </li>
                                    {auth.token ? <> <li><Link
                                        to="/dashboard"
                                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Dashboard
                                    </Link></li>
                                        <li>
                                            <Link
                                                to="/"
                                                onClick={() => auth.logOut()}
                                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                            >
                                                Logout
                                            </Link>
                                        </li>
                                    </>
                                        : ''}
                                </ul>
                            </div> */}
                        </div>
                    )}
                </Transition>
            )}
        </nav>

        {/* <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                </div>
            </header>
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    
                    <div className="px-4 py-6 sm:px-0">
                        <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
                    </div>
                    
                </div>
            </main> */}
    </>)
}

export default Header;