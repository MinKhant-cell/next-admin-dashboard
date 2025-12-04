"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart"

export const description = "A donut chart with text"

const chartData = [
  { course_name: "English", students: 25, fill: "#5445faff" },
  { course_name: "Math", students: 15, fill: "#395afeff" },
  { course_name: "Science", students: 10, fill: "#6557fdff" },
  { course_name: "History", students: 25, fill: "#3c1dd4ff" },
  { course_name: "Geography", students: 20, fill: "#2d6efcff" },
  { course_name: "Biology", students: 35, fill: "#2a34fcff" },
]

const chartConfig = {
  students: {
    label: "Students",
  },
  English: {
    label: "English",
  },
  Math: {
    label: "Math",
  },
  Science: {
    label: "Science",
  },
  History: {
    label: "History",
  },
  Geography: {
    label: "Geography",
  },
  Biology: {
    label: "Biology",
  }
  
} satisfies ChartConfig

export default function CourseOverviewChart() {
 
  return (
    <Card className="flex w-full flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-gray-600">Courses Overview</CardTitle>
        <CardDescription>Description</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="students"
              nameKey="course_name"
            >
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="course_name" />}
              className="-translate-y-2 text-gray-600 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        
      </CardFooter>
    </Card>
  )
}
