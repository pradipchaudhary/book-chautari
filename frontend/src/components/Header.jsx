import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Logo from "../assets/logo.jpg";
const Header = () => {
    return (
        <header>
            <div className="container header">
                <Link to="/" className="brand-logo">
                    {/* <h1>Book Chautari</h1> */}
                    <img src={Logo} alt="Book Chautari, Logo" width={100} />
                </Link>
                <Navbar />
            </div>
        </header>
    );
};

export default Header;
