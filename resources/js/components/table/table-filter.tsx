import { useState } from "react";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface Option {
    label: string;
    value: string;
    count?: number;
    icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

interface TableFilterProps {
    title?: string;
    options: Option[];
    selectedValues: string[];
    onFilterChange: (values: string[]) => void;
}

export default function TableFilter({
    title,
    options,
    selectedValues,
    onFilterChange,
}: TableFilterProps) {
    const [open, setOpen] = useState(false);

    const onItemSelect = (option: Option, isSelected: boolean) => {
        if (isSelected) {
            onFilterChange(selectedValues.filter((v) => v !== option.value));
        } else {
            onFilterChange([...selectedValues, option.value]);
        }
    };

    const onReset = () => {
        onFilterChange([]);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger render={<Button variant="outline" />}>
                <PlusCircle className="size-4" />
                {title}
                {selectedValues.length > 0 && selectedValues[0] !== "" && (
                    <>
                        <div className="h-4 w-px bg-border" />
                        <div className="flex gap-1">
                            {selectedValues.slice(0, 2).map((value) => {
                                const option = options.find((opt) => opt.value === value);
                                return (
                                    <Badge
                                        key={value}
                                        variant="secondary"
                                        className="rounded-sm px-1 font-normal"
                                    >
                                        {option?.label}
                                    </Badge>
                                );
                            })}
                            {selectedValues.length > 2 && (
                                <Badge
                                    variant="secondary"
                                    className="rounded-sm px-1 font-normal"
                                >
                                    +{selectedValues.length - 2}
                                </Badge>
                            )}
                        </div>
                    </>
                )}
            </PopoverTrigger>
            <PopoverContent className="w-50 p-0" align="start">
                <Command>
                    <CommandInput placeholder={`Search ${title?.toLowerCase()}...`} />
                    <CommandList className="max-h-full">
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup className="max-h-[300px] scroll-py-1 overflow-y-auto overflow-x-hidden">
                            {options.map((option) => {
                                const isSelected = selectedValues.includes(option.value);
                                return (
                                    <CommandItem
                                        key={option.value}
                                        onSelect={() => onItemSelect(option, isSelected)}
                                    >
                                        <div
                                            className={cn(
                                                "mr-2 flex size-4 items-center justify-center rounded-sm border border-primary",
                                                isSelected
                                                    ? "bg-primary text-primary-foreground"
                                                    : "opacity-50 [&_svg]:invisible"
                                            )}
                                        >
                                            <Check className="size-4" />
                                        </div>
                                        {option.icon && (
                                            <option.icon className="mr-2 size-4 text-muted-foreground" />
                                        )}
                                        <span className="truncate">{option.label}</span>
                                        {option.count !== undefined && (
                                            <span className="ml-auto font-mono text-xs">
                                                {option.count}
                                            </span>
                                        )}
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                        {selectedValues.length > 0 && (
                            <>
                                <CommandSeparator />
                                <CommandGroup>
                                    <CommandItem
                                        onSelect={() => onReset()}
                                        className="justify-center text-center"
                                    >
                                        Hapus filter
                                    </CommandItem>
                                </CommandGroup>
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
