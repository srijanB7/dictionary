import { createContext, useContext, useState } from "react";

type Props = {
    children?: JSX.Element | JSX.Element[];
};
type Theme = "light" | "dark";
type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void;
};

export const ThemeContext = createContext({} as ThemeContextType);

export const ThemeProvider = ({ children }: Props) => {
    const [theme, setTheme] = useState<Theme>("dark");

    function toggleTheme() {
        if (theme === "light") setTheme("dark");
        else setTheme("light");
    }
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
