import {type ReactNode} from "react";

interface TableToolbarProps {
    children: ReactNode;
}

export default function TableToolbar({children}: TableToolbarProps) {
    return (
        <div className="flex w-full justify-end flex-col flex-wrap gap-2 md:flex-row md:items-center">
            {children}
        </div>
    );
}
