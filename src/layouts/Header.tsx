import { useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import { Link } from 'react-router-dom';
import { useAdminContext } from '../features/authentication/hooks/useAdminContext';
import logo from '../assets/db_logo.svg'
import SignupWithGoogleDialog from '../features/users/signup/component/SignupWithGoogleDialog';
import { useUserContext } from '../features/authentication/hooks/useUserContext';

type Props = {
    onSubscribe: () => void
}

type UserInfo = {
    accessToken: string,
    displayName: string,
    email: string,
    emailVerified: boolean,
    phoneNumber: string,
    photoURL: string,
}

const Header = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const adminAuth = useAdminContext();
    const userAuth = useUserContext();
    const [profileDropdown, setProfileDropdown] = useState(false);
    const [signUpDialog, setSignupDialog] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState<UserInfo>();

    const toggleDropdown = (menuType: string) => {
        if (menuType === 'profile') {
            setProfileDropdown(!profileDropdown);
            setIsOpen(false);
        } else if (menuType === 'menu') {
            setIsOpen(!isOpen);
            setProfileDropdown(false);
        }
    };

    const onSignupDialogCancel = () => {
        setSignupDialog(false);
    }

    useEffect(() => {
        const userInfo = userAuth.userInfo ? userAuth.userInfo : '';
        if (userInfo) {
            const userInfoObject = JSON.parse(userInfo) as UserInfo;
            setLoggedInUser(userInfoObject);
        }
    }, [])

    return (<>
        <nav className="bg-gray-800">
            <div className="max-w-8xl px-4 mx-auto sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* <div className="flex items-center"> */}

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

                    <div className="flex items-center flex-shrink-0">
                        <Link to="/">
                            <img
                                className="h-14"
                                src={logo}
                                alt="logo"
                            />
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="container max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
                            <div className='flex items-center space-x-4'>
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
                                    {adminAuth.token ? '' : <Link
                                        to="/login"
                                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Login
                                    </Link>}
                                    {adminAuth.token ? <> <Link
                                        to="/dashboard"
                                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Dashboard
                                    </Link>
                                        <button onClick={() => adminAuth.logOut()} className="btn-submit text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                            Logout
                                        </button> </>
                                        : ''}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
                        {loggedInUser?.displayName ?
                            <button type="button"
                                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                id="user-menu-button"
                                aria-expanded={profileDropdown}
                                aria-haspopup="true"
                                onClick={() => toggleDropdown('profile')}
                            >
                                <span className="sr-only">Open user menu</span>
                                <img className="w-8 h-8 rounded-full" src={loggedInUser?.photoURL} alt="user photo" />
                            </button>
                            :
                            <button type="button"
                                className="py-1 px-3 me-2 font-light text-xs text-white focus:outline-none bg-gray-900 rounded-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                onClick={() => setSignupDialog(true)}
                            >
                                Sign up
                            </button>}

                    </div>
                    {profileDropdown && (<div className="absolute pt-2 pl-2 pr-2 z-50 mt-72 right-0 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                        id="user-dropdown"
                        role="menu"
                        aria-orientation='vertical'
                        aria-labelledby='user-menu-button'
                    >
                        <div className="px-4 py-3">
                            <span className="block text-sm text-gray-900 dark:text-white">{loggedInUser?.displayName}</span>
                            <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{loggedInUser?.email}</span>
                        </div>

                        <ul className="py-2">
                            {loggedInUser?.displayName ?
                                <>
                                    <li>
                                        <Link
                                            to="/"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            My Wishlist
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/"
                                            onClick={() => userAuth.logOut()}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                        >
                                            Logout
                                        </Link>
                                    </li>
                                </>
                                : ''
                            }

                            {/* <li>
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
                                {!loggedInUser?.displayName ? '' : <Link
                                    to="/login"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                    onClick={() => setIsOpen(false)}
                                >
                                    My Wishlist
                                </Link>}
                            </li>
                            {loggedInUser?.displayName ? <> <li><Link
                                to="/dashboard"
                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                My Wishlist
                            </Link></li>
                                <li>
                                    <Link
                                        to="/"
                                        onClick={() => adminAuth.logOut()}
                                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Logout
                                    </Link>
                                </li>
                            </>
                                : ''} */}
                        </ul>
                    </div>)}
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
                            {adminAuth.token ? '' : <Link
                                to="/login"
                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                Login
                            </Link>}
                            {adminAuth.token ? <> <Link
                                to="/dashboard"
                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                Dashboard
                            </Link>
                                <Link
                                    to="/"
                                    onClick={() => adminAuth.logOut()}
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

        {signUpDialog && (<SignupWithGoogleDialog onCancel={() => onSignupDialogCancel()} />)}
    </>)
}

export default Header;