// import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
// import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { CardMetric, CardMetricContent, CardMetricContentHeader, CardMetricTitle, CardMetricFooter } from "@/components/ui/card-metric";
// import type { Class } from "@/types";

// type ClassOverviewProps = {
//     studentClass: Class;
//     classOverview: {
//         total_students: number;
//         total_violations: number;
//         total_rewards: number;
//         avg_point_balance: number;
//         top_violation_type: string;
//         chart_data: { name: string; total: number; fill: string }[];
//     };
// };

// const chartConfig = {
//     total: {
//         label: "Poin",
//     },
//     Pelanggaran: {
//         label: "Pelanggaran",
//         color: "hsl(var(--destructive))",
//     },
//     Prestasi: {
//         label: "Prestasi",
//         color: "hsl(var(--success))",
//     },
// } satisfies ChartConfig;

// export default function ClassOverviewChart({ studentClass, classOverview }: ClassOverviewProps) {
//     return (
//         <>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                 <CardMetric>
//                     <CardMetricContent>
//                         <CardMetricContentHeader>
//                             <CardMetricTitle title="Jumlah Siswa" />
//                         </CardMetricContentHeader>
//                         <div className="text-3xl font-medium mt-2">{classOverview.total_students}</div>
//                     </CardMetricContent>
//                     <CardMetricFooter className="text-sm text-muted-foreground">
//                         {classOverview.total_students > 0
//                             ? "Siswa aktif tahun ini"
//                             : "Belum ada siswa"}
//                     </CardMetricFooter>
//                 </CardMetric>

//                 <CardMetric>
//                     <CardMetricContent>
//                         <CardMetricContentHeader>
//                             <CardMetricTitle title="Total Pelanggaran" />
//                         </CardMetricContentHeader>
//                         <div className="text-3xl font-medium mt-2 text-destructive">{classOverview.total_violations}</div>
//                     </CardMetricContent>
//                     <CardMetricFooter className="text-sm text-muted-foreground">
//                         {classOverview.total_violations > 0
//                             ? "Total poin pelanggaran"
//                             : "Tidak ada pelanggaran"}
//                     </CardMetricFooter>
//                 </CardMetric>

//                 <CardMetric>
//                     <CardMetricContent>
//                         <CardMetricContentHeader>
//                             <CardMetricTitle title="Rata-rata Poin" />
//                         </CardMetricContentHeader>
//                         <div className="text-3xl font-medium mt-2">{classOverview.avg_point_balance}</div>
//                     </CardMetricContent>
//                     <CardMetricFooter className="text-sm text-muted-foreground">
//                         {classOverview.total_students > 0
//                             ? "Rata-rata per siswa"
//                             : "Data tidak tersedia"}
//                     </CardMetricFooter>
//                 </CardMetric>

//                 <CardMetric>
//                     <CardMetricContent>
//                         <CardMetricContentHeader>
//                             <CardMetricTitle title="Pelanggaran Terbanyak" />
//                         </CardMetricContentHeader>
//                         <div className="text-3xl font-medium mt-2 text-orange-500">{classOverview.top_violation_type}</div>
//                     </CardMetricContent>
//                     <CardMetricFooter className="text-sm text-muted-foreground">
//                         {classOverview.total_violations > 0
//                             ? "Jenis paling sering"
//                             : "Data tidak tersedia"}
//                     </CardMetricFooter>
//                 </CardMetric>
//             </div>

//             <Card className="my-6">
//                 <CardHeader>
//                     <CardTitle>Perbandingan Poin Kelas</CardTitle>
//                     <CardDescription>Total pelanggaran vs prestasi untuk kelas {studentClass.name}</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <ChartContainer config={chartConfig} className="min-h-[200px] h-full w-full max-h-[300px]">
//                         <BarChart accessibilityLayer data={classOverview.chart_data} margin={{ top: 20 }}>
//                             <CartesianGrid vertical={false} />
//                             <XAxis
//                                 dataKey="name"
//                                 tickLine={false}
//                                 tickMargin={10}
//                                 axisLine={false}
//                             />
//                             <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
//                             <Bar dataKey="total" radius={8}>
//                                 <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
//                             </Bar>
//                         </BarChart>
//                     </ChartContainer>
//                 </CardContent>
//             </Card>
//         </>
//     );
// }

export default function Test() {
    return <h2>Test Chart</h2>;
}
