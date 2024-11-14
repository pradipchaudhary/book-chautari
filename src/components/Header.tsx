import React from "react";

const Header = () => {
    return (
        <header className="py-8 bg-slate-400">
            <div className="container mx-auto px-4">
                <nav className="flex justify-between items-center">
                    <h1 className="text-3xl font-semibold">Book Chautari</h1>
                    <ul className="flex gap-8">
                        <li>Home</li>
                        <li>Books</li>
                        <li>Contact</li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
