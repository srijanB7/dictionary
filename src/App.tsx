import Dictionary from "./components/Dictionary/Dictionary";
import Header from "./components/Header/Header";
import "./App.css";
import { useTheme } from "./contexts/ThemeProvider";

function App() {
    const { theme } = useTheme();

    return (
        <div className={theme === "light" ? "light-theme" : "dark-theme"}>
            <Header />
            <Dictionary />
        </div>
    );
}

export default App;
