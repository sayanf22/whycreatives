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
            className="text-foreground hover:bg-secondary/80 h-14 w-14 md:h-16 md:w-16 flex-shrink-0"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? (
                <Sun className="h-6 w-6 md:h-7 md:w-7 transition-all" />
            ) : (
                <Moon className="h-6 w-6 md:h-7 md:w-7 transition-all" />
            )}
        </Button>
    );
}
