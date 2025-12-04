"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
  { month: "January", paid: 186, unpaid: 100, total: 286 },
  { month: "February", paid: 305, unpaid: 100, total: 405 },
  { month: "March", paid: 237, unpaid: 500 },
  { month: "April", paid: 139, unpaid: 300 },
  { month: "May", paid: 400, unpaid: 200 },
  { month: "June", paid: 137, unpaid: 100 },
  { month: "July", paid: 737, unpaid: 100 },
  { month: "August", paid: 337, unpaid: 100 },
  { month: "September", paid: 237, unpaid: 100 },
  { month: "October", paid: 237, unpaid: 100 },
  { month: "November", paid: 467, unpaid: 103 },
  { month: "December", paid: 397, unpaid: 100 },
]

const chartConfig = {
  paid: {
    label: "Paid",
    color: "#f61dceff",
  },
  unpaid: {
    label: "Unpaid",
    color: "#ee0f7eff",
  },
  total: {
    label: "Total",
    color: "#ee0f7eff",
  },
} satisfies ChartConfig

export default function FeeCollectionChart() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-gray-600">Fee Collection</CardTitle>
        <CardDescription>Description</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              interval={0} 
              tickLine={false}
              tickMargin={8}
              minTickGap={64}
              axisLine={false}
              tickFormatter={(value) => value.substring(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar stackId="a" dataKey="paid" barSize={20} fill="#425af2ff" radius={[0, 0, 4, 4]} />
            <Bar stackId="a" dataKey="unpaid" barSize={20} fill="#d5d8ebff" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        
      </CardFooter>
    </Card>
  )
}
