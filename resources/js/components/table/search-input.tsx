import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupButton,
} from "@/components/ui/input-group";
import {Search, XIcon} from "lucide-react";

interface SearchInputProps {
    search: string;
    setSearch: (value: string) => void;
    hasSearch: boolean;
    resetSearch: () => void;
    placeholder?: string;
    className?: string;
}

export default function SearchInput({
                                        search,
                                        setSearch,
                                        hasSearch,
                                        resetSearch,
                                        placeholder = "Cari...",
                                        className,
                                    }: SearchInputProps) {
    return (
        <div className={className ?? "w-full md:min-w-80 md:max-w-96"}>
            <InputGroup>
                <InputGroupInput
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={placeholder}
                />
                <InputGroupAddon>
                    <Search/>
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                    <InputGroupButton onClick={resetSearch} disabled={!hasSearch}>
                        <XIcon/>
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
        </div>
    );
}
