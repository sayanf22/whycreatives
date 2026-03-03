import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        // If current is system, figure out what system resolved to, and switch to the opposite explicitly
        if (theme === "system") {
            const isDark = document.documentElement.classList.contains("dark");
            setTheme(isDark ? "light" : "dark");
        } else {
            setTheme(theme === "dark" ? "light" : "dark");
        }
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-foreground hover:bg-secondary/80 h-10 w-10 md:h-12 md:w-12 flex-shrink-0 relative overflow-hidden"
            aria-label="Toggle theme"
        >
            <Sun className="h-5 w-5 md:h-6 md:w-6 transition-all duration-500 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 md:h-6 md:w-6 transition-all duration-500 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
