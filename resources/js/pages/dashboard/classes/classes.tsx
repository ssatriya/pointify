import AppLayout from "@/components/layout/app-layout";
import { Head } from "@inertiajs/react";
import SearchInput from "@/components/table/search-input";
import TableToolbar from "@/components/table/table-toolbar";
import { Button } from "@/components/ui/button";
import {
    CardTable,
    CardTableActions,
    CardTableContent,
    CardTableHeader,
    CardTableTitle
} from "@/components/ui/card-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Paginated, Class, BreadcrumbItem } from "@/types";
import TablePagination from "@/components/table/table-pagination";
import { useModal } from "@ebay/nice-modal-react";
import CreateClass from "./partials/create-class";
import StudentClassActions from "./partials/student-class-actions";
import { index as dashboardIndex } from "@/routes/dashboard";
import { index as classesIndex, reorder as classesReorder } from "@/routes/dashboard/student-classes";
import { useFilter } from "@/hooks/use-filter";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { GripVertical } from "lucide-react";
import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
    classes: Paginated<Class>;
};

export default function Classes({ classes }: Props) {
    const { show } = useModal(CreateClass)
    const {
        search,
        setSearch,
        resetFilters
    } = useFilter(classesIndex().url);

    const [items, setItems] = useState(classes.data);
    // const [isMounted, setIsMounted] = useState(false);

    // useEffect(() => {
    //     setItems(classes.data);
    //     setIsMounted(true);
    // }, [classes.data]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);

                const newItems = arrayMove(items, oldIndex, newIndex);

                router.put(classesReorder().url, {
                    ids: newItems.map((item) => item.id),
                }, {
                    preserveScroll: true,
                });

                return newItems;
            });
        }
    }

    return <>
        <Head title="Data Kelas" />
        <CardTable>
            <CardTableHeader>
                <CardTableTitle title="Data Kelas" />
                <CardTableActions>
                    <TableToolbar>
                        <SearchInput
                            search={search}
                            setSearch={setSearch}
                            hasSearch={!!search}
                            resetSearch={resetFilters}
                        />
                        <Button variant="outline" onClick={() => show()}>
                            Tambah
                        </Button>
                    </TableToolbar>
                </CardTableActions>
            </CardTableHeader>
            <CardTableContent>
                {/* {isMounted ? ( */}
                <DndContext
                    id="student-classes-dnd"
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    modifiers={[restrictToVerticalAxis]}
                    onDragEnd={handleDragEnd}
                >
                    <Table className="table-fixed min-w-[800px]">
                        <TableHeader>
                            <TableRow className="h-12">
                                <TableHead className="w-[4%]"></TableHead>
                                <TableHead className="w-[30%]">Nama</TableHead>
                                <TableHead className="w-[10%]">Tingkat</TableHead>
                                <TableHead className="w-[10%]">Rombel</TableHead>
                                <TableHead className="w-[20%]">Kejuruan</TableHead>
                                <TableHead className="w-[15%] min-w-[150px]">Tanggal Dibuat</TableHead>
                                <TableHead className="w-[5%] whitespace-nowrap"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <SortableContext
                                items={items.map(i => i.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                {items.length > 0 ? (
                                    items.map((item) => (
                                        <SortableRow key={item.id} item={item} />
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                                            Belum ada data
                                        </TableCell>
                                    </TableRow>
                                )}
                            </SortableContext>
                        </TableBody>
                    </Table>
                </DndContext>
                {/* ) : (
                    <Table className="table-fixed min-w-[800px]">
                        <TableHeader>
                            <TableRow className="h-12">
                                <TableHead className="w-[4%]"></TableHead>
                                <TableHead className="w-[30%]">Nama</TableHead>
                                <TableHead className="w-[10%]">Tingkat</TableHead>
                                <TableHead className="w-[10%]">Rombel</TableHead>
                                <TableHead className="w-[20%]">Kejuruan</TableHead>
                                <TableHead className="w-[15%] min-w-[150px]">Tanggal Dibuat</TableHead>
                                <TableHead className="w-[5%] whitespace-nowrap"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {classes.data.length > 0 ? (
                                classes.data.map((item) => (
                                    <TableRow key={item.id} className="h-12">
                                        <TableCell className="w-[4%]">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-muted-foreground"
                                                disabled
                                            >
                                                <GripVertical className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                        <TableCell className="truncate">{item.name}</TableCell>
                                        <TableCell>{item.grade_level.label}</TableCell>
                                        <TableCell>{item.section.label || "-"}</TableCell>
                                        <TableCell className="truncate">{item.vocational_program.label}</TableCell>
                                        <TableCell>{item.created_at}</TableCell>
                                        <TableCell className="text-end">
                                            <div className="flex justify-end gap-2">
                                                <StudentClassActions id={item.id} />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                                        Belum ada data
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                )} */}
                {/* <TablePagination links={classes.links} meta={classes.meta} /> */}
            </CardTableContent>
        </CardTable>
    </>
}

Classes.layout = [AppLayout, {
    breadcrumbs: [
        {
            title: "Dashboard",
            href: dashboardIndex().url
        },
        {
            title: "Kelas",
            href: classesIndex().url
        }
    ]
}]


function SortableRow({ item }: { item: Class }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 0,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <tr
            ref={setNodeRef}
            style={style}
            data-slot="table-row"
            className={cn(
                "h-12 border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
                isDragging && "bg-muted/50"
            )}
        >
            <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap w-[4%]">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
                    {...attributes}
                    {...listeners}
                >
                    <GripVertical className="h-4 w-4" />
                </Button>
            </td>
            <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap truncate">{item.name}</td>
            <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap">{item.grade_level.label}</td>
            <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap">{item.section.label || "-"}</td>
            <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap truncate">{item.vocational_program.label}</td>
            <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap">{item.created_at}</td>
            <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap text-end">
                <div className="flex justify-end gap-2">
                    <StudentClassActions id={item.id} />
                </div>
            </td>
        </tr>
    );
}

