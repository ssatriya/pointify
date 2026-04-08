import { useAppearance, type Appearance } from "@/hooks/use-appearance";
import { cn } from "@/lib/utils";
import { Monitor, Moon, Sun, type LucideIcon } from "lucide-react";
import { HTMLAttributes } from "react";
import { Button } from "@/components/ui/button";

export default function AppearanceTabs({
    className = "",
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    const { appearance, updateAppearance } = useAppearance();

    const tabs: { value: Appearance; icon: LucideIcon; label: string }[] = [
        { value: "light", icon: Sun, label: "Light" },
        { value: "dark", icon: Moon, label: "Dark" },
        { value: "system", icon: Monitor, label: "System" },
    ];

    return (
        <div
            className={cn(
                "inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800",
                className,
            )}
            {...props}
        >
            {tabs.map(({ value, icon: Icon, label }) => (
                <Button
                    key={value}
                    variant="ghost"
                    size="sm"
                    onClick={() => updateAppearance(value)}
                    className={cn(
                        "px-3.5 transition-colors",
                        appearance === value
                            ? "bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100"
                            : "text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60",
                    )}
                >
                    <Icon className="-ml-1 h-4 w-4" />
                    <span className="ml-1.5 text-sm">{label}</span>
                </Button>
            ))}
        </div>
    );
}
