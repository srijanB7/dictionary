import book from "../../assets/book.svg";
import sun from "../../assets/sun.svg";
import bookDark from "../../assets/bookdark.svg"
import moon from "../../assets/moon.svg";
import { useTheme } from "../../contexts/ThemeProvider";
import styles from "./Header.module.css";

const Header = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <nav className={styles.container}>
            <img src={theme === "light" ? book : bookDark} />
            <h1>Dictionary</h1>
            <button className={styles.button} onClick={toggleTheme}>
                <img src={theme === "light" ? sun : moon} />
            </button>
        </nav>
    );
};

export default Header;
