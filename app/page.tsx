'use client';

import ProtectedRoute from "@/components/protected-routes";



export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-xl">Loading dashboard...</div>
      </div>
    </ProtectedRoute>
  );
}
