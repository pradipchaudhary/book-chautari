const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-screen  py-10 text-white">
            <div className="container mx-auto text-center">
                <p className="text-sm">
                    &copy; {currentYear} Book Chautari. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
