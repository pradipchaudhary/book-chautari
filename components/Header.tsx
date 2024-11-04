"use client";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className=" text-white py-4">
            <div className="container mx-auto flex justify-between items-center p-4 md:px-8">
                {/* Logo */}
                <div className="text-4xl font-bold">
                    <Link href="/">B</Link>
                </div>

                {/* Mobile Menu Toggle Button */}
                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={toggleMenu}
                    aria-label="Toggle navigation menu"
                >
                    {/* Hamburger Icon */}
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </button>

                {/* Nav Links */}
                <nav
                    className={`${
                        isMenuOpen ? "flex" : "hidden"
                    } flex-col md:flex md:flex-row md:items-center md:space-x-6 absolute md:static w-full md:w-auto top-16 md:top-0 left-0 bg-blue-600 md:bg-transparent transition-transform duration-300 ease-in-out`}
                >
                    <Link
                        href="/books"
                        className="block px-4 py-2 md:p-0 hover:bg-blue-500 md:hover:bg-transparent"
                    >
                        Books
                    </Link>
                    <Link
                        href="/about"
                        className="block px-4 py-2 md:p-0 hover:bg-blue-500 md:hover:bg-transparent"
                    >
                        About
                    </Link>
                    <Link
                        href="/contact"
                        className="block px-4 py-2 md:p-0 hover:bg-blue-500 md:hover:bg-transparent"
                    >
                        Contact
                    </Link>
                </nav>
            </div>
        </header>
    );
}
