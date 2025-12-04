"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

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
} from "@/components/ui/chart"

export const description = "A bar chart"

const chartData = [
  { month: "January", student: 0 },
  { month: "February", student: 0 },
  { month: "March", student: 50 },
  { month: "April", student: 120 },
  { month: "May", student: 0 },
  { month: "June", student: 60 },
  { month: "July", student: 0 },
  { month: "August", student: 0 },
  { month: "September", student: 90 },
  { month: "October", student: 100 },
  { month: "November", student: 0 },
  { month: "December", student: 0 },
]

const chartConfig = {
  student: {
    label: "Paid",
    color: "#f61dceff",
  },
  
} satisfies ChartConfig

export default function AdmissionOverviewChart() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-gray-600">Admission Overview</CardTitle>
        <CardDescription>Description</CardDescription>
      </CardHeader>
      <CardContent>
      <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="student"
              type="linear"
              stroke="#425af2ff"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        
      </CardFooter>
    </Card>
  )
}
