"use client";
import Link from "next/link";

export default function Header() {
    return (
        <header className=" text-white shadow-lg container mx-auto py-10">
            <div className="flex justify-between items-center p-4 md:px-8">
                {/* Logo */}
                <div className="text-4xl font-bold">
                    <Link href="/">B</Link>
                </div>

                {/* Nav Links */}
                <nav
                    className={`flex flex-col md:flex-row md:items-center md:space-x-6 absolute md:static w-full md:w-auto top-16 md:top-0 left-0 bg-blue-600 md:bg-transparent transition-transform duration-300 ease-in-out`}
                >
                    <Link
                        href="/books"
                        className="block px-4 py-2 md:p-0 hover:bg-blue-500 md:hover:bg-transparent md:text-white"
                    >
                        Books
                    </Link>
                    <Link
                        href="/about"
                        className="block px-4 py-2 md:p-0 hover:bg-blue-500 md:hover:bg-transparent md:text-white"
                    >
                        About
                    </Link>
                    <Link
                        href="/contact"
                        className="block px-4 py-2 md:p-0 hover:bg-blue-500 md:hover:bg-transparent md:text-white"
                    >
                        Contact
                    </Link>
                </nav>
            </div>
        </header>
    );
}
