import * as React from "react";
import { Loader2 } from "lucide-react";
import type { OptionType } from "@/types";
import {
    Combobox,
    ComboboxInput,
    ComboboxContent,
    ComboboxList,
    ComboboxItem,
    ComboboxEmpty,
    ComboboxChips,
    ComboboxChip,
    ComboboxChipsInput,
} from "@/components/ui/combobox";

export interface AsyncComboboxProps {
    value: OptionType | OptionType[] | null;
    onChange: (option: any) => void;
    loadOptions: (inputValue: string) => Promise<OptionType[]>;
    placeholder?: string;
    isMulti?: boolean;
    isClearable?: boolean;
    isInvalid?: boolean;
    disabled?: boolean;
    defaultOptions?: boolean;
}

export function AsyncCombobox({
    value,
    onChange,
    loadOptions,
    placeholder = "Pilih...",
    isMulti = false,
    isClearable = true,
    isInvalid = false,
    disabled = false,
    defaultOptions = false,
}: AsyncComboboxProps) {
    const [inputValue, setInputValue] = React.useState("");
    const [options, setOptions] = React.useState<OptionType[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);

    // Use a ref for loadOptions to avoid infinite loops if the parent doesn't memoize it
    const loadOptionsRef = React.useRef(loadOptions);
    loadOptionsRef.current = loadOptions;

    // Maintain a cache of all items ever seen to avoid losing labels in multi-select
    const labelCache = React.useRef(new Map<string | number | boolean, OptionType>());

    // Ref for the trigger for proper alignment
    const triggerRef = React.useRef<HTMLDivElement>(null);

    // Store selected options so they remain resolvable even when search clears them
    const [selectedOptions, setSelectedOptions] = React.useState<OptionType[]>(
        [],
    );

    // Cache seen options for label resolution
    React.useEffect(() => {
        options.forEach(opt => labelCache.current.set(opt.value, opt));
    }, [options]);

    React.useEffect(() => {
        const newValue = !value
            ? []
            : Array.isArray(value)
            ? value
            : [value];

        // Enrich newValue with labels from cache if they are empty
        const enrichedValue = newValue.map(item => {
            const cached = labelCache.current.get(item.value);
            if (!item.label && cached) {
                return { ...item, label: cached.label };
            }
            // If the item has a label, update the cache
            if (item.label) {
                labelCache.current.set(item.value, item);
            }
            return item;
        });

        setSelectedOptions((prev) => {
            if (prev.length === enrichedValue.length && prev.every((v, i) => v.value === enrichedValue[i].value && v.label === enrichedValue[i].label)) {
                return prev;
            }
            return enrichedValue;
        });
    }, [value]);

    React.useEffect(() => {
        let isActive = true;

        const fetchOptions = async () => {
            if (!defaultOptions && inputValue === "") {
                setOptions([]);
                return;
            }

            setIsLoading(true);
            try {
                const results = await loadOptionsRef.current(inputValue);
                if (isActive) {
                    setOptions(results);
                }
            } catch (error) {
                console.error("Error loading options:", error);
                if (isActive) setOptions([]);
            } finally {
                if (isActive) setIsLoading(false);
            }
        };

        const timer = setTimeout(() => {
            fetchOptions();
        }, 300);

        return () => {
            isActive = false;
            clearTimeout(timer);
        };
    }, [inputValue, defaultOptions]);

    const handleValueChange = (val: OptionType | OptionType[] | null) => {
        onChange(val);
    };

    const displayOptions = React.useMemo(() => {
        const map = new Map();
        // Base options from search
        options.forEach((opt) => map.set(String(opt.value), opt));

        // Selected options should also be in the "pool" for resolution
        selectedOptions.forEach((opt) => {
            if (!map.has(String(opt.value))) {
                map.set(String(opt.value), opt)
            }
        });

        let results = Array.from(map.values()) as OptionType[];

        // Filter out already selected items from the menu options
        if (isMulti) {
            const selectedValues = new Set(selectedOptions.map(o => String(o.value)));
            // We only filter the "options" (search results) not the entire pool
            // Actually, displayOptions IS the pool.
            results = options.filter(opt => !selectedValues.has(String(opt.value)));

            // Re-add selected options to the pool if they were part of the initial "options"?
            // No, Combobox needs the items to be in the "items" prop to render correctly if they are value.
            // Wait! If I filter them from "items" prop, will ComboboxChip still work?
            // In Base UI, Combobox items must be in the items prop for value resolution?
            // Let's re-add them if they are selected.
            // Actually, if I want them to disappear from the MENU, but remain in the STATE,
            // I should filter them but they must be "resolvable".
            // Base UI uses the `items` prop. If I filter them, they might become "invalid" values.
            // A better way is to keep them in `items` but hide them in the `renderer`.
            // But let's try filtering and see if Base UI handles it.
            // Actually, if it's multiple, the Chip usually needs the data.
        }

        return results;
    }, [options, selectedOptions, isMulti]);

    return (
        <Combobox
            value={value as any}
            onValueChange={handleValueChange}
            onInputValueChange={setInputValue}
            items={displayOptions}
            itemToStringValue={(opt: OptionType) => String(opt?.label ?? "")}
            multiple={isMulti as any}
            disabled={disabled}
        >
            <div ref={triggerRef} className="relative w-full group/async-combobox">
                {isMulti ? (
                    <ComboboxChips aria-invalid={isInvalid}>
                        {selectedOptions.map((val) => (
                            <ComboboxChip
                                key={String(val.value)}
                                value={val}
                            >
                                {val.label}
                            </ComboboxChip>
                        ))}
                        <ComboboxChipsInput
                            aria-invalid={isInvalid}
                            placeholder={
                                !value || (value as OptionType[]).length === 0
                                    ? placeholder
                                    : ""
                            }
                        />
                    </ComboboxChips>
                ) : (
                    <ComboboxInput
                        aria-invalid={isInvalid}
                        placeholder={placeholder}
                        showClear={isClearable && !!value}
                    />
                )}
                {isLoading && (
                    <div className="absolute right-9 top-1/2 -translate-y-1/2">
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    </div>
                )}
            </div>

            <ComboboxContent anchor={triggerRef}>
                {!isLoading && (
                    <ComboboxEmpty>Data tidak ditemukan.</ComboboxEmpty>
                )}
                <ComboboxList>
                    {(opt: OptionType) => (
                        <ComboboxItem
                            key={String(opt.value)}
                            value={opt}
                        >
                            {opt.label}
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    );
}
