// components/Layout.tsx
"use client"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Sidebar would go here */}
        {children}
      </main>
    </div>
  )
}