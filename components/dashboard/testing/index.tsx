/*eslint-disable*/
'use client';
import DashboardLayout from '@/components/layout';

import { Toaster } from 'sonner';
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";


export default function TeacherPage() {
    const eventsList = [
  {
    id: 1,
    title: "Math — Algebra",
    teacherId: 12,
    subjectId: 21,
    start: new Date("2025-12-10T09:00:00"),  // Monday 9 AM
    end: new Date("2025-12-10T10:30:00"),
    color: "#4F46E5",
  },
  {
    id: 2,
    title: "Science — Physics",
    teacherId: 12,
    subjectId: 22,
    start: new Date("2025-12-10T13:00:00"),  // Monday 1 PM
    end: new Date("2025-12-10T14:00:00"),
    color: "#10B981",
  },
  {
    id: 3,
    title: "English Literature",
    teacherId: 12,
    subjectId: 23,
    start: new Date("2025-12-11T08:30:00"),  // Tuesday
    end: new Date("2025-12-11T10:00:00"),
    color: "#F59E0B",
  },
  {
    id: 4,
    title: "Computer Science — Programming",
    teacherId: 12,
    subjectId: 24,
    start: new Date("2025-12-12T14:00:00"), // Wednesday
    end: new Date("2025-12-12T15:30:00"),
    color: "#EF4444",
  },
  {
    id: 5,
    title: "Math — Geometry",
    teacherId: 12,
    subjectId: 21,
    start: new Date("2025-12-13T09:00:00"), // Thursday
    end: new Date("2025-12-13T10:30:00"),
    color: "#4F46E5",
  },
  {
    id: 6,
    title: "Physics — Lab Work",
    teacherId: 12,
    subjectId: 22,
    start: new Date("2025-12-14T10:00:00"), // Friday
    end: new Date("2025-12-14T12:00:00"),
    color: "#10B981",
  },
];

  return (
    <DashboardLayout
      
      title="Subscription Page"
      description="Manage your subscriptions"
    >
      <Toaster position="top-right" />
      <div className="min-h-screen w-full">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl text-gray-700 font-semibold">Testing</h1>
        </div>
        <div className="rounded-lg border p-4 shadow-sm">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={eventsList}
        height="auto"
      />
    </div>
        
      </div>
    </DashboardLayout>
  );
}
