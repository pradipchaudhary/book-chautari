const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-screen  py-10 text-white ">
            <div className="container mx-auto text-center border-t border-slate-400/10 py-10">
                <p className="text-sm">
                    Copyright &copy; {currentYear} Book Chautari. All rights
                    reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
