import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Header = () => {
    return (
        <header>
            <div className="container header">
                <Link to="/" className="brand-logo">
                    {/* <h1>Book Chautari</h1> */}
                    <img
                        src="https://scontent.fktm17-1.fna.fbcdn.net/v/t39.30808-6/412368775_122104367504154481_3772466238731167208_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGQkr-KiH1qcOqNILyJa0MvPwRgMqMQNTU_BGAyoxA1NfuW4bTQdsP9dllyZrKyWTMxEyeiMc8Sc-qsYfg1HABv&_nc_ohc=Qrz7T7ZXC-YQ7kNvgEIwK_j&_nc_ht=scontent.fktm17-1.fna&_nc_gid=AlipfDy65OrAzTkIzLdlDde&oh=00_AYCH6xjRS9lsNjywpnFWDif8OmXxXq5sQLSeJFZQmvkrug&oe=66E6B1A0"
                        alt=""
                        width={100}
                    />
                </Link>
                <Navbar />
            </div>
        </header>
    );
};

export default Header;
