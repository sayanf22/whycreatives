import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-foreground hover:bg-secondary/80 h-10 w-10 md:h-12 md:w-12 flex-shrink-0"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? (
                <Sun className="h-5 w-5 md:h-6 md:w-6 transition-all" />
            ) : (
                <Moon className="h-5 w-5 md:h-6 md:w-6 transition-all" />
            )}
        </Button>
    );
}
