import React from "react";

const Footer = () => {
    return (<footer className="bg-white rounded-lg shadow dark:bg-gray-800 w-full">
        <div className="w-full mx-auto max-w-full p-4 md:flex md:items-center md:justify-between">
            <div className="">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://www.dealsburst.com" className="hover:underline">Deals Burst</a>. All Rights Reserved.
                </span>
            </div>
            <div className="flex  items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                <a href="/useragreement" className="hover:underline me-4 md:me-6">User Agreement</a>
            </div>
            {/* <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">About</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="/useragreement" className="hover:underline me-4 md:me-6">User Agreement</a>
                </li>
                <li>
                    <a href="#" className="hover:underline">Contact</a>
                </li>
            </ul> */}
        </div>
    </footer >)
};

export default Footer;